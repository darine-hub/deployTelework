import Sidebar from "./components/sidebar";
import Chat from "./components/chat";
import "./chatPage.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateMessage,
  getallmessages,
  getallchatmessages,
  updateMessages,
  updateChat,
  updateChatmessage,
} from "../redux/messageSlice";
import BarreNavigationHome from "../components/BarreNavigationHome";
import Pusher from "pusher-js";
import { useEffect } from "react";
import Chatroom from "./components/chatRoom";
import { useState } from "react";

function ChatPage({ history }) {
  const dispatch = useDispatch();
  const [dta, setDat] = useState();
  const reduxMessages = useSelector((state) => state.message);
  const users = useSelector((state) => state.user);
  useEffect(() => {
    if (!users.isAuth) {
      history.push("/login");
    }
  }, [users.isAuth, history]);

  useEffect(() => {
    const pusher = new Pusher("8039ec8f94cd766943cb", {
      cluster: "eu",
    });
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (data) => {
      console.log(data);
      dispatch(updateMessage(data));
      reduxMessages.sender &&
        dispatch(
          updateMessages({
            userId: users.userInfo._id,
            user1: data.receiver,
            user2: data.sender,
            data: { seen: true },
          })
        );
      if (users.userInfo) {
        dispatch(getallmessages(users.userInfo._id));
      }
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [reduxMessages]);
  useEffect(() => {
    const pusher = new Pusher("8039ec8f94cd766943cb", {
      cluster: "eu",
    });
    const channel = pusher.subscribe("chatRooms");
    channel.bind("inserted", (data) => {
      setDat(data);
      dispatch(updateChat(data));
      if (users.userInfo) {
        reduxMessages.currentChat &&
          dispatch(
            updateChatmessage({
              id: data.Room,
              data: { seen: users.userInfo._id },
            })
          );
        dispatch(getallchatmessages(users.userInfo._id));
      }
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [reduxMessages]);
  console.log(dta);
  return (
    <div className="app ">
      {reduxMessages ? (
        <div class="main-container">
          <BarreNavigationHome />

          <div
            className="app__body container middle-container"
            style={{width:"65%",backgroundColor:'#C0C0C0'}}
          >
            <Sidebar />
            {reduxMessages.sender && <Chat />}
            {reduxMessages.currentChat && <Chatroom />}
            {!(reduxMessages.currentChat || reduxMessages.sender) && (
              <h1 style={{ margin: "30%" }}>Nothing to see Here...</h1>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ChatPage;
