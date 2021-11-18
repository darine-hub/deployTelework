const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const chatSchema = new Schema({
  name: { type: String ,
  required:true},
  members: {
    type: [Schema.Types.ObjectId],
    ref: "user",
    required: true,
  },
});

const ChatRoom = mongoose.model("chatRoom", chatSchema);
module.exports = ChatRoom;
