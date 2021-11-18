import React, {useEffect,useState} from "react";
import "./announcement.scss";
import {  formatDistance} from 'date-fns'
import { useDispatch , useSelector} from "react-redux";
import TextEditor from "./BlogPage/Section/CreatePage";
import {getBlog} from '../redux/postsSlice'
import { useHistory } from "react-router";
import ReactLoading from 'react-loading';
import "quill/dist/quill.snow.css";

const Announcement = () => {
  const [show, setShow] = useState(false);
  const [displaydel, setDisplaydel] = useState("none");
  const dispatch = useDispatch();
  const history = useHistory()
  useEffect(() => {
    dispatch(getBlog())}, [dispatch]);
const blogs = useSelector(state=>state.blogs)
const user = useSelector(state=>state.user)
 


  const handleClick = () => {
    setShow(!show);
    setDisplaydel("block");
  };
  
  return (
    <> <div>
      <div className="titular">
        <h3> Announcements </h3>
        </div>
        <div style={{padding:"30px",overflowY:"scroll" ,height:"510px",borderBottom:"1px solid black"}}>
        {blogs.loading?<ReactLoading type="bubbles" color="white" height={100} width={100} />:blogs.blogs.map(elm=>(
        <div className="notification001">
          <header>
            <div className="profile-001">
              <div>
                <img
                  className="profile-pic"
                  src={elm.writer.image}
                />

                <p> {elm.writer.firstName} {elm.writer.lastName}</p>
              </div>
            </div>
            <p style={{color:"white",paddingTop:"15px"}} >
         {elm.description} 
            </p>
            
            <p className="message" onClick={()=>history.push(`blog/post/${elm._id}`)}>read full announcement </p>
        
            <span className="span-01">{formatDistance(new Date(elm.createdAt), new Date(), { addSuffix: true })}</span>
          </header>
        </div>))}
       
        <div className="buttons" onClick={handleClick}>
         
        </div>
        <div
          id="id01"
          style={{ display: `${displaydel}` }}
          className="w3-modal"
        > 
          <div className="w3-modal-content">
            <div className="w3-container">
            <button onClick={() => setDisplaydel("none")}>X</button>
              <div>
                <TextEditor />
              
               
              </div>
            </div>
          </div>
        </div>
      </div>
    
      </div>
    </>
  );
};

export default Announcement;
