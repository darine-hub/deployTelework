const express= require('express');
const app = express();
require('dotenv').config();
const path = require ('path');
const cookieParser = require("cookie-parser");
const Pusher = require("pusher");
const pusher = new Pusher({
    appId: "1278954",
    key: "8039ec8f94cd766943cb",
    secret: "066751fffef7a77d05ba",
    cluster: "eu",
    useTLS: true,
  });
//setup for deploy

app.use(express.static(path.join(__dirname,'../','client','build')))
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'../','client','build','index.html'))
})

app.use(express.json())
//setup cors
const cors = require ('cors');
app.use(cors());

app.use('/uploads',express.static(path.join(__dirname,'../','/uploads')));


//routes
const userRoute = require ('./routes/userRoutes')
app.use('/users',userRoute);

const ProjectRoute = require ('./routes/projectRoutes')
app.use('/projects',ProjectRoute)

const TaskRoute = require ('./routes/taskRoutes')
app.use('/project/tasks',TaskRoute)

const reservationRoute = require ('./routes/reservationRoutes')
app.use("/reservation", reservationRoute);

const departementRoute = require ('./routes/departementRoutes')
app.use('/departements',departementRoute);

const notificationRoute = require ('./routes/notificationRoutes')
app.use("/notification", notificationRoute);

const BlogRoute = require("./routes/blogRoutes");
app.use('/api/blog',  BlogRoute);

const MessageRoute = require("./routes/messagesRoute");
app.use("/chat", MessageRoute);
//connecting to database
const mongoose = require ('mongoose');
mongoose.connect(process.env.MONGO, (err)=> err ? console.error(err):console.log('database connected'))
//chat
const db = mongoose.connection;
db.once("open", () => {
  console.log("Db connected");
  db.on('error', console.error.bind(console, 'Connection Error:'));
  const msgCollection = db.collection("messagecollections");
  const changeStream = msgCollection.watch();
  changeStream.on("change", (change) => {
    console.log(change);
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        sender: messageDetails.sender,
        receiver: messageDetails.receiver,
        timeStamp: messageDetails.timeStamp,
        body: messageDetails.body,
        seen: messageDetails.seen
      });
    } else {
      console.log("Erreur triggering Pusher");
    }
  });  
  const chatCollection = db.collection("chatmessages");
  const changeStreamchat = chatCollection.watch();
  changeStreamchat.on("change", (change) => {
    console.log(change);
    if (change.operationType === "insert") {
      const chatDetails = change.fullDocument;
      pusher.trigger("chatRooms", "inserted", {
        sender: chatDetails.sender,
        Room: chatDetails.Room,
        timeStamp: chatDetails.timeStamp,
        body: chatDetails.body,
        seen: chatDetails.seen

      });
    } else {
      console.log("Erreur triggering Pusher");
    }
})});
//creating server
app.listen(process.env.PORT,(err)=>err ? console.error(err):console.log ("server is running on port",process.env.PORT));

