import { css } from "@emotion/css";
import "./chat.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addMessage,
  clicksender,
  getallmessages,
  updateMessages,
} from "../../redux/messageSlice";
import { formatDistance } from "date-fns";
import ScrollToBottom from "react-scroll-to-bottom";
import ReactLoading from "react-loading";

const Chat = ({ messages }) => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const reduxMessages = useSelector((state) => state.message);

  const ROOT_CSS = css({
    height: 650,
    width: 725,
  });
  useEffect(()=>{ return function cleanup () {
    dispatch(clicksender(null))
   }
  },[])
  const handleSubmit = (e) => {
    const date = new Date();
    e.preventDefault();
    dispatch(
      addMessage({
        userId: users.userInfo._id,
        data: {
          body: input,
          sender: users.userInfo._id,
          timeStamp: date,
          receiver: reduxMessages.sender._id,
        },
      })
    );
    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerInfo">
          <h3>
            {reduxMessages.sender.firstName} {reduxMessages.sender.lastName}
          </h3>
        </div>
        <div className="chat__headerRight"></div>
      </div>

      <ScrollToBottom className={ROOT_CSS}>
        {reduxMessages.loading ? (
          <ReactLoading type="bubbles" color="white" height={100} width={100} />
        ) : (
          reduxMessages.messages.map((message) => (
            <div
              className={`chat__message ${
                message.sender === users.userInfo._id ? "chat__received" : null
              }`}
            >
              <div class="profile-picture small-profile-picture">
                <img
                  width="40px"
                  alt="Anne Hathaway picture"
                  src={`${
                    message.sender === users.userInfo._id
                      ? users.userInfo.image
                      : reduxMessages.sender.image
                  }`}
                />
              </div>
              <p style={{ color: "rgb(187, 187, 187)" }}>
                {reduxMessages.sender._id === message.sender ? (
                  <span className="chat__name">
                    {reduxMessages.sender.firstName}{" "}
                    {reduxMessages.sender.lastName}
                  </span>
                ) : (
                  <span className="chat__name">
                    {users.userInfo.firstName} {users.userInfo.lastName}
                  </span>
                )}
                {message.body}
                <span className="chat__timestamp">
                  {formatDistance(new Date(message.timeStamp), new Date(), {
                    addSuffix: true,
                  })}
                </span>
              </p>
            </div>
          ))
        )}
      </ScrollToBottom>

      <div className="chat__footer">
        <form>
          <input
            value={input}
            placeholder="type a message"
            onChange={(e) => setInput(e.target.value)}
            type="text"
          />
          <button type="submit" onClick={handleSubmit}>
            {" "}
            send a message
          </button>
        </form>
      </div>
    </div>
  );
};
export default Chat;
