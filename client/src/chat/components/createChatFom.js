
import {useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import "./sidebar.css"
import { addChatroom } from "../../redux/messageSlice";
const MyVerticallyCenteredModal=(props)=> {
    const [search, setSearch] = useState("");
    const users = useSelector(state=>state.user)
    const [list, setList] = useState([])
    const [name, setName] = useState("")
    const dispatch = useDispatch()
    
    const searchClick = (user) => {
        setList([...list,user])
        setSearch("")
      }
      const handleSubmit = (e) => {
          e.preventDefault()
        dispatch(addChatroom({"name":name,"members":[...list,users.userInfo._id]}))
      
      }
    return (
      <div>
        <form action="/action_page.php">
  <label for="fname">ChatRoom name</label>
  <input type="text" id="fname" name="fname" onChange={(e)=>setName(e.target.value)}/>
  
  <input
            placeholder="Search or start new chat"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
           
          />
        
      
     
        <div className="search__menu">
          {users.users
            .filter((elm) =>
              search !== ""
                ? `${elm.firstName} ${elm.lastName}`
                    .toLocaleLowerCase()
                    .includes(search)
                : false
            )
            .map((user) => (
              <div className="search__items" onClick={()=>searchClick(user._id)}> <h2>
                {user.firstName} {user.lastName}
                </h2>
              </div>
            ))}
            </div>
     <div>{list.map(elm=><div>{elm}</div>)}</div>   
</form>
        
          <button onClick={(e)=>handleSubmit(e)}>Submit</button>
          </div>
    );
  }
  export default MyVerticallyCenteredModal