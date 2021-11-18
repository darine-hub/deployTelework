import "./chat.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateMembers,
  addchatMessage,
  deleteChat,
  getAllChatrooms,
  updateChatName,
  clickedRoom,
  updateChatmessage,
  getchatmessages,
} from "../../redux/messageSlice";
import { css } from "@emotion/css";
import { formatDistance } from "date-fns";
import ScrollToBottom from "react-scroll-to-bottom";
import ReactLoading from "react-loading";

const Chatroom = () => {
  const [input, setInput] = useState("");

  const [displaydel, setDisplaydel] = useState("none");
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [showUsers, setShowusers] = useState(false);
  const [displayedit, setDisplayedit] = useState("none");
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const reduxMessages = useSelector((state) => state.message);
  let arr = [];
  reduxMessages.ChatRooms &&
    reduxMessages.ChatRooms.filter(
      (elm) => elm._id === reduxMessages.currentChat._id
    )
      .pop()
      .members.map((elm) => arr.push(elm._id));
  const [list, setList] = useState(arr);
  const ROOT_CSS = css({
    height: 650,
    width: 725,
  });
  useEffect(() => {
    return function cleanup() {
      dispatch(clickedRoom(null));
    };
  }, []);

  const handleClickEdit = () => {
    setDisplayedit("block");
  };
  const searchClick = (user) => {
    if (user === users.userInfo._id) {
      alert("are you sure you want to leave ?");
    } else if (!list.includes(user._id)) {
      dispatch(
        updateMembers({
          id: reduxMessages.currentChat._id,
          data: { members: [...list, user._id] },
        })
      );
      setSearch("");
      dispatch(getAllChatrooms(users.userInfo._id));
      setList([...list, user._id]);
    } else {
      alert("userExist!");
    }
  };
  const handleSubmit = (e) => {
    const date = new Date();
    e.preventDefault();
    dispatch(
      addchatMessage({
        body: input,
        sender: users.userInfo._id,
        timeStamp: date,
        Room: reduxMessages.currentChat._id,
      })
    );
    setInput("");
  };
  const changeName = () => {
    dispatch(
      updateChatName({
        id: reduxMessages.currentChat._id,
        userId: users.userInfo._id,
        data: { name: name },
      })
    );
  };
  const handleClose = () => {
    dispatch(
      deleteChat({
        userId: users.userInfo._id,
        data: reduxMessages.currentChat._id,
      })
    );

    setDisplaydel("none");
  };
  const handleCloseEdit = () => {
    setDisplayedit("none");
  };
  const deleteUser = (user) => {
    
    dispatch(
      updateMembers({
        id: reduxMessages.currentChat._id,
        userId: users.userInfo._id,
        data: { members: list.filter((elm) => elm !== user) },
      })
    );

    setList(list.filter((elm) => elm !== user));
  };
  const leaveDiscussion = () => {
    dispatch(
      updateMembers({
        id: reduxMessages.currentChat._id,
        userId: users.userInfo._id,
        data: { members: list.filter((elm) => elm !== users.userInfo._id) },
      })
    );
    dispatch(clickedRoom(null));
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <div
          className="chat__headerInfo"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h3 style={{ margin: "0.7em" }}>{reduxMessages.currentChat.name} </h3>
          <div>
            <i
              class="fa fa-trash-o"
              aria-hidden="true"
              style={{ margin: "1em" }}
              onClick={() => setDisplaydel("block")}
            ></i>
            <i
              class="fa fa-pencil-square-o"
              aria-hidden="true"
              style={{ margin: "1em" }}
              onClick={() => handleClickEdit()}
            ></i>
          </div>
        </div>
        <div className="chat__headerRight"></div>
      </div>
      <ScrollToBottom className={ROOT_CSS}>
        {reduxMessages.loading ? (
          <ReactLoading type="bubbles" color="white" height={100} width={100} />
        ) : (
          reduxMessages.Chatmessages.map((message) => (
            /*    <div>
             <div class="profile-picture small-profile-picture">
             <img width="40px" src={`${users.userInfo.image}`}/>
         </div>   
            <p className={`chat__message ${message.sender===users.userInfo._id?"chat__received":null}`}>
              
                {message.body}
                <span className="chat__timestamp">
                    {message.timeStamp}
                </span>
            </p>
            </div> */
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
                      : reduxMessages.currentChat &&
                        reduxMessages.currentChat.members
                          .filter((elm) => elm._id === message.sender)
                          .pop().image
                  }`}
                />
              </div>
              <p>
                <span className="chat__name">
                  {reduxMessages.currentChat &&
                    reduxMessages.currentChat.members
                      .filter((elm) => elm._id === message.sender)
                      .pop().firstName}{" "}
                  {reduxMessages.currentChat &&
                    reduxMessages.currentChat.members
                      .filter((elm) => elm._id === message.sender)
                      .pop().lastName}
                </span>
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
      {/**************************delete********************************* */}
      <div id="id01" style={{ display: `${displaydel}` }} className="w3-modal ">
        <div
          className="w3-modal-content-001"
          style={{ backgroundColor: "#394264", border: "2px solid black" }}
        >
          <div
            className="titular-001 modal-title"
            style={{ backgroundColor: "#11a8ab", padding: "0px" }}
          >
            Delete
          </div>

          <div className="w3-container">
            <div>
              <h2 style={{ padding: "10px" }}> delete chatRoom ?</h2>
              <div style={{ margin: "5px 35%" }}>
                <button variant="primary" onClick={handleClose}>
                  YES
                </button>
                <button onClick={() => setDisplaydel("none")}>NO</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/************************************************************ */}
      <div id="id01" style={{ display: `${displayedit}` }} className="w3-modal">
        <div
          className="w3-modal-content-001"
          style={{ backgroundColor: "#394264", border: "1px solid black" }}
        >
          <div
            className="titular-001 modal-title"
            style={{ backgroundColor: "#11a8ab", padding: "0px" }}
          >
            EDIT
          </div>

          <div className="w3-container" style={{margin:"5%"}}>
            <div>
              <div style={{display:"flex",margin:"20px"}}>
              <h4>{reduxMessages.currentChat.name}</h4>
              <i
                class="fa fa-pencil-square-o"
                aria-hidden="true"
                style={{ marginLeft: "1em" }}
                onClick={() => setShow(!show)}
              ></i>
              </div>
              {show ? (
                <div style={{display:"flex"}}>
                  <input
                    type="text"
                    placeholder="enter name..."
                    onChange={(e) => setName(e.target.value)}
                  />
                   <button
                style={{marginBottom:"20px",marginTop:0}}
              
                onClick={changeName}
              >Change</button>
                </div>
              ) : null}
             
            </div>
            <hr />
            <div>
            <div style={{display:"flex",margin:"20px"}}>
              <h4>List of users</h4>
              <i style={{marginLeft:"20px"}}
                class="fa fa-plus"
                aria-hidden="true"
                onClick={() => setShowusers(!showUsers)}
              ></i>
              </div>
              {reduxMessages.ChatRooms &&
                reduxMessages.ChatRooms.filter(
                  (elm) => elm._id === reduxMessages.currentChat._id
                )
                  .pop()
                  .members.map((elm) => (
                    <p style={{color:"white",margin:"15px"}}>
                      {elm.firstName} {elm.lastName}
                     {elm._id!==users.userInfo._id? <i style={{marginLeft:"10px"}}
                        class="fa fa-times"
                        aria-hidden="true"
                        onClick={() => deleteUser(elm._id)}
                      ></i>:null}
                    </p>
                  ))}
              {showUsers ? (
                <div>
                  <input
                    placeholder="Search people"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: "90%", margin: "0", padding: "10px" }}
                  />
                  <div className="search__menu" style={{borderRadius:"10px",backgroundColor:"white"}}>
                    {users.users
                      .filter((elm) =>
                        search !== ""
                          ? `${elm.firstName} ${elm.lastName}`
                              .toLocaleLowerCase()
                              .includes(search)
                          : null
                      )
                      .map((user) => (
                        <div
                          className="search__items"
                          onClick={() => searchClick(user)}
                          style={{borderRadius:"10px",backgroundColor:"white",color:"black",height:"15px",borderBottom:"gray"}}
                        >
                          {" "}
                          <h2>
                            {user.firstName} {user.lastName}
                          </h2>
                        </div>
                      ))}
                  </div>
                </div>
              ) : null}
            </div>
            <hr />
            <div style={{display:"flex",margin:"20px"}}>
            <h4>Leave discussion</h4>
            <i
              class="fa fa-sign-out"
              aria-hidden="true"
              style={{marginLeft:"20px"}}
              onClick={leaveDiscussion}
            ></i>
            </div>
            <div style={{ margin: "5px 30%" }}>
              <button variant="primary" onClick={handleCloseEdit}>
                Save Changes
              </button>
              <button onClick={() => setDisplayedit("none")}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chatroom;
