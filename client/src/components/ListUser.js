import React from 'react'
import BarreNavigationHome from './BarreNavigationHome'
import {useState,useEffect} from 'react';
import {logout,getUsers,deleteUser,updateStateUser} from '../redux/userSlice'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import ReactLoading from 'react-loading';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


const ListUser = ({history}) => {
    const dispatch = useDispatch();
    const [search,setSearch]= useState('') 
    const [state,setState] = useState()
    const user = useSelector(state => state.user)

    useEffect(() => {
  

      
          dispatch(getUsers())
          
          
     
   
  }, [])


  const handleDeleteUser = (idUser) => {

    if (window.confirm( "are you sure to block this User!" ) ) {
      dispatch(updateStateUser(idUser));
      NotificationManager.success('user bloqued !')
  } else {
    alert = "You pressed Cancel!";
  }
  }


    return (
      <body>

        <div class="main-container">
              
    <center>      <h4 style={{color:'green'}}> {user && user.successMessage &&  user.successMessage}  </h4>  </center> 	
<center>	<h4 style={{color:'red'}}>{user.userErrors && user.userErrors }</h4></center>
          <BarreNavigationHome/>
          <NotificationContainer/>
          <div class="projects-section-line" style={{'marginLeft':'470px'}} >
        <div class="projects-status">
       
          <div class="item-status">
            <span class="status-number" style={{color:'white'}} >{user.users.filter(elm=>elm.role ==='Admin').length}</span>
            <span class="status-type" style={{color:'white'}} onClick={()=>setState('admin')}>ADMIN</span>
          </div>
          <div class="item-status">
            <span class="status-number" style={{color:'white'}} >{user.users.filter(elm=> elm.role ==='Manager').length}</span>
            <span class="status-type" style={{color:'white'}} onClick={()=>setState('manager')}> MANAGER</span>
          </div>

          <div class="item-status">
            <span class="status-number" style={{color:'white'}} >{user.users.filter(elm=> elm.role ==='Employee').length}</span>
            <span class="status-type" style={{color:'white'}} onClick={()=>setState('employee')}> EMPLOYEE</span>
          </div>
          <div class="item-status">
            <span class="status-number" style={{color:'white'}} >{user.users.length}</span>
            <span class="status-type" style={{color:'white'}}onClick={()=>setState('all')} >TOTAL</span>
          </div>
          <div class="item-status" style={{marginLeft:'-80px'}}>
                <input type="text" placeholder="serch user" class="email text-input" onChange={(e)=>setSearch(e.target.value)}/>
                {/* <div class="input-icon envelope-icon-newsletter"><span class=" icon entypo-search scnd-font-color"></span></div> */}
            </div>
        </div>
         </div>
          <div class="listProject">




     








   { ( search || !state || state==='all' ) ? 
            user.loading?<ReactLoading type="bubbles" color="white" height={100} width={100} />: user.users.filter(elm=>elm._id!== user.userInfo._id && elm.firstName
                    .toLowerCase().match(search.toLowerCase().trim())).map((elm)=>(
                       <div className='listProfile'>

                    <a class="add-button" href={`/profileUserAdmin/${elm._id}`}><span class="icon entypo-plus scnd-font-color"></span></a>
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
                    <ul class="profile-options horizontal-list">
                       <Link to={`/profileUserAdmin/${elm._id}`}> <li><a class="comments" href=''><p><span class="icon entypo-pencil scnd-font-color"></span>EDIT</p></a></li></Link>
                       <li><a class="views" href=''><Link to={`/profileUserAdmin/${elm._id}`}> <p><span class="icon fontawesome-eye-open scnd-font-color"></span> MORE</p></Link></a></li> 
                        <li onClick={()=>handleDeleteUser(elm._id)}><a class="likes"  href='#'><p><span span class="icon entypo-trash scnd-font-color" ></span >block</p></a></li>
                    </ul> 
        
                        </div>  
                     

                   )
 ):<div></div>}
          
   
{state==='admin' && 
      
     user.users && user.users.filter(elm=>elm._id!== user.userInfo._id && elm.role === 'Admin').map((elm) =>(

        <div className='listProfile'>

        <a class="add-button" href={`/profileUserAdmin/${elm._id}`}><span class="icon entypo-plus scnd-font-color"></span></a>
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
        <ul class="profile-options horizontal-list">
           <Link to={`/profileUserAdmin/${elm._id}`}> <li><a class="comments" href=''><p><span class="icon entypo-pencil scnd-font-color"></span>EDIT</p></a></li></Link>
           <li><a class="views" href=''><Link to={`/profileUserAdmin/${elm._id}`}> <p><span class="icon fontawesome-eye-open scnd-font-color"></span> MORE</p></Link></a></li> 
            <li onClick={()=>handleDeleteUser(elm._id)}><a class="likes"  href=''><p><span span class="icon entypo-trash scnd-font-color" ></span >block</p></a></li>
        </ul> 

            </div> 


      )) }
       
           


  {state==='manager' && 
      
      user.users && user.users.filter(elm=>elm.role === 'Manager').map((elm) =>(

        <div className='listProfile'>

        <a class="add-button" href={`/profileUserAdmin/${elm._id}`}><span class="icon entypo-plus scnd-font-color"></span></a>
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
        <ul class="profile-options horizontal-list">
           <Link to={`/profileUserAdmin/${elm._id}`}> <li><a class="comments" href=''><p><span class="icon entypo-pencil scnd-font-color"></span>EDIT</p></a></li></Link>
           <li><a class="views" href=''><Link to={`/profileUserAdmin/${elm._id}`}> <p><span class="icon fontawesome-eye-open scnd-font-color"></span> MORE</p></Link></a></li> 
            <li onClick={()=>handleDeleteUser(elm._id)}><a class="likes"  href=''><p><span span class="icon entypo-trash scnd-font-color" ></span >block</p></a></li>
        </ul> 

            </div> 


      )) } 
   



   {state==='employee' && 
      
      user.users && user.users.filter(elm=>elm.role === 'Employee').map((elm) =>(

        <div className='listProfile'>

        <a class="add-button" href={`/profileUserAdmin/${elm._id}`}><span class="icon entypo-plus scnd-font-color"></span></a>
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
        <ul class="profile-options horizontal-list">
           <Link to={`/profileUserAdmin/${elm._id}`}> <li><a class="comments" href=''><p><span class="icon entypo-pencil scnd-font-color"></span>EDIT</p></a></li></Link>
           <li><a class="views" href=''><Link to={`/profileUserAdmin/${elm._id}`}> <p><span class="icon fontawesome-eye-open scnd-font-color"></span> MORE</p></Link></a></li> 
            <li onClick={()=>handleDeleteUser(elm._id)}><a class="likes"  href=''><p><span span class="icon entypo-trash scnd-font-color" ></span >block</p></a></li>
        </ul> 

            </div> 


      )) }
   
           
      
   
   </div>  


        </div>
        </body>
    )
}

export default ListUser

