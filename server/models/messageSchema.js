const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = new Schema({
  sender:{
      type : Schema.Types.ObjectId,
      ref:'User',
      required:true
  },
  receiver:{
    type : Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  body:{
  type:String
  },
  timeStamp :{
      type:Date
  },
  seen:{
    type:Boolean,
    default:false}
  
  
});

const Message = mongoose.model("messagecollection", messageSchema);
module.exports = Message;