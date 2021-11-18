import React, { useEffect, useState } from "react";
import {getBlog} from '../../redux/postsSlice'
import axios from "axios";
import {useDispatch,useSelector} from 'react-redux'


function BlogPage({history}) {
  const dispatch = useDispatch()
  const users = useSelector(state=>state.user)
  const blogs = useSelector(state=>state.blogs)
 
    useEffect(() => {
      if (!users.isAuth) {
        history.push('/login');
      } 
      
    }, [users.isAuth,history]);
    useEffect(() => {
      dispatch(getBlog())}, [dispatch]);
  const renderCards = blogs.blogs.map((blog, index) => {
    return (
      <div>
        <div>
          <h1>Setting</h1>
          <h1>edit</h1>

          <div>div</div>
          <img src={blog.writer.image} />

          <div style={{ height: 150, overflowY: "scroll", marginTop: 10 }}>
            <div dangerouslySetInnerHTML={{ __html: blog.content }} ></div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1> Blog Lists </h1>
      <div>{renderCards}</div>
    </div>
  );
}

export default BlogPage;
