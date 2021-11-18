import React from "react";
import "./sidebar.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUsers } from "../../redux/userSlice";
import SidebarChat from "./sidebarChat";
import ReactLoading from "react-loading";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

import { addChatroom ,updateChatmessage } from "../../redux/messageSlice";
import {
  clicksender,
  getmessages,
  getallmessages,
  getchatmessages,
  clickedRoom,
  getAllChatrooms,
} from "../../redux/messageSlice";
const Sidebar = () => {
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [search1, setSearch1] = useState("");
  const [display, setDisplay] = useState("none");
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const messages = useSelector((state) => state.message);
  const closeModal=()=>{
    setDisplay("none")
    setSearch1("")
    setList2([]);
    setList([]);
  }
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  useEffect(() => {
    if (users.userInfo) {
      dispatch(getallmessages(users.userInfo._id));
    }
  }, [dispatch]);
  useEffect(() => {
    if (users.userInfo) {
      dispatch(getAllChatrooms(users.userInfo._id));
    }
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addChatroom({ name: name, members: [...list2, users.userInfo._id] })
    );
    setDisplay("none");
    setList2([]);
    setSearch1("");
    setList([]);
    if (!(messages.loading && !messages.ChatRoomsErrors)) {
      NotificationManager.success("Room created!");
    } else if (messages.ChatRoomsErrors) {
      NotificationManager.error("An Error Occured");
    }
  };

  const searchClick1 = (user) => {
    setList([...list, user]);
    setList2([...list2, user._id]);
    setSearch1("");
  };
  const searchClick = (user) => {
    dispatch(clicksender(user));
    dispatch(getmessages({ user1: user._id, user2: users.userInfo._id }));
    setSearch("");
    dispatch(clickedRoom(null));
  };
  const clickroom = (id) => {
    dispatch(getchatmessages(id._id));
    dispatch(clickedRoom(id));
    dispatch(updateChatmessage({ id: id._id,chatId:users.userInfo._id, data: { seen: users.userInfo._id} }));
    dispatch(clicksender(null));
  };

  const test = users.users.map((user) =>
    messages.allmessages
      .filter(
        (el) =>
          (user._id === el.receiver || user._id === el.sender) &&
          user._id !== users.userInfo._id
      )
      .pop()
  );
  
  return (
    <div className="side_bar_chat">
      <NotificationContainer />
      {users.userInfo ? (
        <div>
          <div className="sidebar__header">
            <div className="sidebar__headerRight"></div>

            <a
              class="add-button"
              style={{ margin: "0" }}
              onClick={() => setDisplay("block")}
              href="#28"
            >
              <span class="icon entypo-plus scnd-font-color"></span>
            </a>

            <input
              placeholder="Search or start new chat"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "90%", margin: "0", padding: "10px" }}
            />
          </div>

          <div className="search__menu" style={{borderRadius:"10px",backgroundColor:"white"}}>
            {users.users
              .filter((elm) =>
                search !== ""
                  ? `${elm.firstName} ${elm.lastName}`
                      .toLocaleLowerCase()
                      .includes(search)
                  : false
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
          <h1
            style={{
              "background-color": "#394264",
              padding: "10px",
              margin: "0",
              "border-bottom": "solid #1f253d",
            }}
          >
            Direct Messages
          </h1>
          <div className="sidebar__chats">
            {messages.loading ? (
              <ReactLoading
                type="bubbles"
                color="white"
                height={50}
                width={50}
              />
            ) : test.length ? (
              test
                .filter((elm) => elm !== undefined)
                .sort(
                  (a, b) =>
                    new Date(b.timeStamp).getTime() -
                    new Date(a.timeStamp).getTime()
                )
                .map((message) => <SidebarChat message={message} />)
            ) : null}
          </div>
          <h1
            style={{
              "background-color": "#394264",
              padding: "10px",
              margin: "0",
              "border-bottom": "solid #1f253d",
              "border-top": "solid #1f253d",
            }}
          >
            ChatRooms
          </h1>
          <div className="sidebar__chats">
            {messages.loading ? (
              <ReactLoading
                type="bubbles"
                color="white"
                height={50}
                width={50}
              />
            ) : (
              messages.ChatRooms &&
              messages.ChatRooms.map((elm) => (
                <div className="sidebarChat" onClick={() => clickroom(elm)}>
                  <div className="sidebarChat_info">
                    <h2>{elm.name}</h2>
                  </div>
                </div>
              ))
            )}
          </div>
          <div id="id01" style={{ display: `${display}` }} className="w3-modal">
            <div
              className="w3-modal-content "
              style={{ padding: "0", margin: "0", border: "1px solid black" }}
            >
              <div className="titular" style={{ backgroundColor: "#15A4FA" }}>
                Add chatroom
              </div>
              <div
                className="w3-container block"
                style={{ margin: "0", padding: "10px", borderRadius: "0" }}
              >
                <form action="">
                 
                <input style={{width:'90%',marginLeft:'20px'}} type="text" id="fname" name="fname" placeholder='name chatRoom' onChange={(e)=>setName(e.target.value)}/>

                <input  style={{width:'90%',marginLeft:'20px'}}
            placeholder="Search people"
            type="text"
            value={search}
            onChange={(e) => setSearch1(e.target.value)}
           
          />
                  <div className="search__menu" style={{borderRadius:"10px",backgroundColor:"white"}}>
                    {users.users
                      .filter((elm) =>
                        search1 !== ""
                          ? `${elm.firstName} ${elm.lastName}`
                              .toLocaleLowerCase()
                              .includes(search1)
                          : null
                      )
                      .map((user) => (
                        <div
                          className="search__items"
                          onClick={() => searchClick1(user)}
                          style={{borderRadius:"10px",backgroundColor:"white",color:"black",height:"15px",borderBottom:"gray"}}
                        >
                          {" "}
                          <h2>
                            {user.firstName} {user.lastName}
                          </h2>
                        </div>
                      ))}
                  </div>
                  <div style={{margin:"10px"}}>
                    {list.map((elm) => (
                      <div >
                        {elm.firstName} {elm.lastName}
                      </div>
                    ))}
                  </div>
                </form>

                <button onClick={closeModal}>Close</button>
                <button onClick={(e) => handleSubmit(e)}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Sidebar;
