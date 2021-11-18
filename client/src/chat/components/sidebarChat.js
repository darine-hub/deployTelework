import "./sidebarChat.css";
import { useDispatch, useSelector } from "react-redux";
import { updateMessages,clickedRoom, clicksender, getmessages } from "../../redux/messageSlice";
import { formatDistance} from 'date-fns'

const SidebarChat = ({ message }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const reduxMessages = useSelector((state) => state.message);
   const handleClick = () => {
    
    dispatch(getmessages({ user1: message.receiver, user2: message.sender }));
    dispatch(clicksender(users.users.filter(elm=>
      (((message.receiver===elm._id)||(message.sender===elm._id))&&(elm._id!==users.userInfo._id)))[0])
        
   );
   dispatch(clickedRoom(null))
  
      dispatch(
        updateMessages({
          userId: users.userInfo._id,
          user1: message.receiver,
           user2: message.sender,
          data: { seen: true },
        })
      );
    
  
  };
  
 console.log(message)
  return (
    <div className="sidebarChat" onClick={handleClick}>
      <div className="sidebarChat_info">
        
        {
        users.users.map(elm=>
          (((message.receiver===elm._id)||(message.sender===elm._id))&&(elm._id!==users.userInfo._id))?
            <h2>{elm.firstName} {elm.lastName} </h2>:null
          
       )}
        <p>{message.body} {formatDistance(new Date(message.timeStamp), new Date(), { addSuffix: true })}</p>
      </div>
    </div>
  );
};
export default SidebarChat;
