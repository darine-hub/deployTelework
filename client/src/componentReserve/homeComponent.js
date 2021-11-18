import React from 'react'
import '../styleCss/home.css'
import {logout,getUsers} from '../redux/userSlice'
import {useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import PrimarySearchAppBar from './barApp'
import Dashboard from './drashbord'
import VerticalNavBar from '../components/VerticalNavBar'

const HomeComponent = ({history}) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    useEffect(() => {
        if(user.isAuth){
            history.push('/')
            dispatch(getUsers())
        }else{
            history.push('/login')
        }
    }, [user.isAuth])
 




const handleSubmit =(e)=>{
   
    dispatch(logout())
}
    return (
        <div>
            <div>
                
                
           <button  onClick={handleSubmit}  >Logout</button> 
         
        
           </div>
           <div>
        {user.users &&
          user.users.map((user) => (
            <>
            <img src={user.image}  />
              <h2>{user.firstName} {user.lastName} </h2>
              
             
            </>
          ))}
      </div>


      <div class="">


  <div class="card">
    <img src="" alt="Person" class="card__image"/>
    <p class="card__name">Bianca Serrano</p>
    <div class="grid-container">

      <div class="grid-child-posts">
        902 Post
      </div>

      <div class="grid-child-followers">
        1300 Likes
      </div>

    </div>
    <ul class="social-icons">
      <li><a href="#"><i class="fa fa-instagram"></i></a></li>
      <li><a href="#"><i class="fa fa-twitter"></i></a></li>
      <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
      <li><a href="#"><i class="fa fa-codepen"></i></a></li>
    </ul>
    <button class="btn draw-border">Follow</button>
    <button class="btn draw-border">Message</button>
  </div>
</div> 
        
      </div>
       
    )
}

export default HomeComponent
