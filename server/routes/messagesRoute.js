const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  deleteChatroom,
  updateMembers,
  getAllChatrooms,
  updateRoomName,
  getRoomChat,
  addchatmessage,
  getmessages,
  getallmessages,
  addRoom,
  addmessage,
  updateStatueChatroom,
  updateStatueMessage,
  getallRoomChat
} = require("../Controllers/chatController");

router.get("/getAllChatrooms/:id", authMiddleware, getAllChatrooms);
router.post("/addRoom", authMiddleware, addRoom);
router.post("/addmessage", authMiddleware, addmessage);
router.get("/getmessages/:user1/:user2", authMiddleware, getmessages);
router.get("/getallmessages/:id", authMiddleware, getallmessages);
router.get("/getRoomChat/:id", authMiddleware, getRoomChat);
router.get("/getallRoomChat/:id/", authMiddleware, getallRoomChat);
router.post("/addchatmessage", authMiddleware, addchatmessage);
router.delete("/deleteChatroom/:id", authMiddleware, deleteChatroom);
router.put("/updateRoomName/:id", authMiddleware, updateRoomName);
router.put("/updateMembers/:id", authMiddleware, updateMembers);
router.put("/updateStatueChatroom/:id", authMiddleware, updateStatueChatroom);
router.put("/updateStatueMessage/:user1/:user2", authMiddleware, updateStatueMessage);

module.exports = router;
