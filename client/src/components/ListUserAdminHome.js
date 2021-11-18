import React from 'react'
import BarreNavigationHome from './BarreNavigationHome'
import {useState,useEffect} from 'react';
import {logout,getUsers} from '../redux/userSlice'
import { useDispatch,useSelector } from 'react-redux'
import ReactLoading from 'react-loading';

const ListUserAdminHome = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user)

    useEffect(() => {
  

      
          dispatch(getUsers())
          
          
     
   
  }, [])
    return (
        <div>
              <h3 class="titular">List Users</h3>
        <div className='userHome'>

          
          {user.users &&
                  user.loading?<ReactLoading type="bubbles" color="white" height={100} width={100} />: user.users.slice(-3, user.users.length).map((elm)=>(
                       <div className='listProfileHome'>

                  {/*   <a class="add-button" href={`/profile`}><span class="icon entypo-plus scnd-font-color"></span></a> */}
                    <div class="profile-picture big-profile-picture clear">
                        <img  className='imgProfile' alt="Anne Hathaway picture" src={elm.image} />
                    </div>
                    <h1 class="user-name">{elm.firstName}  {elm.lastName} </h1>
                    <div class="profile-description">
                    { elm.blocked === false?
                     
                     <p class="scnd-font-color">{elm.role}</p>:
                     <p class="scnd-font-color"> Out services</p>
                        }
                    </div>
                {/*     <ul class="profile-options horizontal-list">
                        <li><a class="comments" href="#40"><p><span class="icon fontawesome-comment-alt scnd-font-color"></span>EDIT</p></a></li>
                        <li><a class="views" href="#41"><p><span class="icon fontawesome-eye-open scnd-font-color"></span> MORE</p></a></li>
                        <li><a class="likes" href="#42"><p><span class="icon fontawesome-heart-empty scnd-font-color"></span>DELETE</p></a></li>
                    </ul> */} 
        
                        </div>  
                     

                   )
 )}
          
        </div>
        </div>
    )
}

export default ListUserAdminHome
