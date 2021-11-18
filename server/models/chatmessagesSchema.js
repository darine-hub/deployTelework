const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const chatMessageSchema = new Schema({
  sender:{
      type : Schema.Types.ObjectId,
      ref:'User',
      required:true
  },
  Room:{
    type : Schema.Types.ObjectId,
    ref:'chatRoom',
    required:true
  },
  body:{
  type:String
  },
  timeStamp :{
      type:Date
  },
  seen:{
    type:Array
    }
  
  
});

const Chatmsg = mongoose.model("chatmessage", chatMessageSchema);
module.exports = Chatmsg;