
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema ({

title :{
    type:String,
    required:false

},
message:{
    type:String,
    required:false
},
joinDate:{
    type:Date,
    default:Date.now()
},

owner:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:false
},

receiver:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:false 
},
readed:{
    type: Boolean,
    default :false,

  } 
  ,
  joinDate:{
    type:Date,
    default:Date.now()
},




})

const Notification = mongoose.model('Notification',notificationSchema);
module.exports = Notification;