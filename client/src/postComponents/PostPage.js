import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {  formatDistance} from 'date-fns'
import {getUsers} from "../redux/userSlice.js"
import { Typography } from 'antd';
import BarreNavigationHome from "../components/BarreNavigationHome"
import { useSelector,useDispatch} from 'react-redux';
import "./announcement.scss"


function PostPage({match,history}) {
    
    const { Title } = Typography
    const [post, setPost] = useState([])
    const postId = match.params.postId;
    const users = useSelector(state=>state.user)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsers())
  
        if(!users.isAuth){
            history.push('/login')
        }
    }, [users.isAuth])
    useEffect(() => {

        const variable = { postId: postId }

        axios.post('http://localhost:5000/api/blog/getPost/', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.post)
                    setPost(response.data.post)
                } else {
                    alert('Couldnt get post')
                }
            })
    }, [])
    console.log(post.content&&post.content.replace(/img/g,'img style={{maxWidth:"300px"}}'))
return(
    <div className="main-container">
   <BarreNavigationHome/>
    {(post.writer) ?
    
       
            <div className="middle-container container block" style={{width:"65%",height:"auto"}}>
                <div className="titular" style={{backgroundColor:"#e64c65"}}><h4>Post</h4></div>
             <p style={{"padding":"20px"}}>{formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true })}</p>
            <div class="profile-picture big-profile-picture clear" style={{height:"50px",width:"50px"}}>
              <img
                className="imgProfile"
                alt="Anne Hathaway picture"
                src={post.writer.image}
                style={{height:"53px",width:"53px"}}
              />
            </div>
            <h1 class="user-name">
            {post.writer.firstName} {post.writer.lastName}{" "}
            </h1>
            <div class="post-content" style={{"padding":"40px"}}>
            <div dangerouslySetInnerHTML={{ __html:post.content&&post.content.replace(/width="100%"/g,'style="max-width:60%;margin:0 20%"')}} />

            </div>
           
          </div>:
  
            <div style={{ width: '80%', margin: '3rem auto' }}>loading...</div>
        }
</div>)
}

export default PostPage