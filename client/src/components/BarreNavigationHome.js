import React from 'react'
import "../styleCss/HomePage.css"
import "../styleCss/notification.scss"
import { useDispatch,useSelector } from 'react-redux'
import {useState,useEffect} from 'react';
import {logout,getUsers} from '../redux/userSlice'
import { Link } from "react-router-dom";
import {
  getallmessages,
  getallchatmessages,
  clickedRoom,
  clicksender,
  getchatmessages,
} from "../redux/messageSlice";

import Calendar from "../Component/homeCalender";

/* import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component'; */
import img from "../images/tele.png";
import { getNotification, updateStateNotification } from '../redux/notificationSlice';
import { formatDistance} from 'date-fns'
/* import { notification } from 'antd'; */

/* import 'animate.css'; */
const BarreNavigationHome = ({notif}) => {
    console.log(notif)


    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const notification = useSelector(state=>state.notification)
    const task = useSelector(state=>state.task)
    const project = useSelector(state=>state.project)
    
  const messages = useSelector((state) => state.message);




 
   
    const [stateNotification,setStateNotification] = useState('false')
    const [color,setColor] = useState(false)

    const handlePostNotification=(idNotification)=>{

    dispatch(updateStateNotification(idNotification))
    setColor(true)
    }
    const handleLogout =(e)=>{
   
        dispatch(logout())
        dispatch(clicksender(null));
        dispatch(clickedRoom(null));
        
    }
    useEffect(() => {
      dispatch(getUsers())  
      dispatch(getNotification())
     
        
      }, []);
      useEffect(() => {
        if (user.userInfo) {
          dispatch(getallmessages(user.userInfo._id));
        }
      }, [dispatch]);
      useEffect(() => {
        if (user.userInfo) {
          dispatch(getallchatmessages(user.userInfo._id));
        }
      }, [dispatch]);

   /*  const handleClickDefault=()=>{
      
        store.addNotification({
           //content:MyNotify,
           title:'titre1',
           message:'you manager valid your task', 
            type:'info',
            container:'center',
            insert:'top',
            animationIn:['animated','fadeIn'],
            animationOut:['animated','fadeout'], 
             dismiss:{
                 duration:80000,
              showIcon:true
            }, 
            width:600
        })
    } */

  

    return (
        <div>

{/* <ReactNotification /> */}
    

         
 {user.isAuth &&
                user.users.filter(elId => elId._id === user.userInfo._id).map((elm)=>{
                    
             return elm.role === 'Admin' ? 

<header class="block">
<ul class="header-menu horizontal-list">

<li>
<div class="profile-picture middle-profile-picture clear">
                <img  className="imgProfile" style={{'width':'80px', 'height':'80px'}} alt="Anne Hathaway picture" src={img}/>
               
            </div>
            </li> 
            <li>
             <Link to={'/'}>   <a  href='#' style={{'color':'orange','fontSize':'20px','fontFamily': 'cursive','marginLeft':'0px'}}>TELEWORK</a></Link>
            </li>
          
    {/*  <p onClick={handleLogout}> Logout <a href="#26"><span class="icon entypo-lock scnd-font-color"></span></a></p> */}       
<li>
         <Link to={'/'}  >      <a class="header-menu-tab" href= '#' ><span class="icon entypo-home scnd-font-color"></span>Home </a>  </Link>
            </li>
           
            <li>
            <Link to={'/profile'}  >    <a class="header-menu-tab" href='#'> <span class="icon fontawesome-user scnd-font-color"></span>Account </a>  </Link>
            </li>
         
            <li>
               <Link to={'/register'}> <a class="header-menu-tab" href='#'><span class="icon entypo-user-add scnd-font-color"></span>User</a></Link>
            </li>

      {/* <li>
               <a class="header-menu-tab" href="#2"><span class="icon entypo-plus-squared scnd-font-color"></span>Departement</a>
            </li> */} 
           
           <li>
           <Link to={"/departement"}>  <a class="header-menu-tab" href="#2"><span class="icon entypo-plus-squared scnd-font-color"></span>Departement</a></Link> 
            </li>

            <li>
             <Link to={"/addsalle"}>  <a class="header-menu-tab" href='#'><span class="icon entypo-plus-circled scnd-font-color"></span>Room</a></Link> 
            </li>

            <li>
            <Link to={"/blog/create"}> <a class="header-menu-tab" href="#2"><span class="icon entypo-newspaper scnd-font-color"></span>Post</a></Link> 
            </li>

         
           {/*  <li>
            <div class="input-container">
                <input type="text" placeholder="serch project" class="email text-input" onChange={(e)=>setSearch(e.target.value)}/>
                <div class="input-icon envelope-icon-newsletter"><span class=" icon entypo-search scnd-font-color"></span></div>
            </div></li> */}
        </ul>
        
        <div class="profile-menu">
        <Link to={'/login'}>  <p onClick={handleLogout}> Logout <a href="#26"><span class="icon entypo-lock scnd-font-color"></span></a></p> </Link> 
            <p>{elm.role} <a href="#26"><span class="entypo-down-open scnd-font-color"></span></a></p>
            
            <div class="profile-picture small-profile-picture">
                <img width="40px" height="40px" alt="Anne Hathaway picture" src={elm.image}/>
            </div>
            
           
        </div>
    </header>: elm.role === 'Manager' ?

<header class="block">
<ul class="header-menu horizontal-list">
<li>
<div class="profile-picture middle-profile-picture clear">
                <img  className="imgProfile" style={{'width':'80px', 'height':'80px'}} alt="Anne Hathaway picture" src={img}/>
               
            </div>
            </li>
            <li>
             <Link to={'/'}>   <a  href='#' style={{'color':'orange','fontSize':'20px','fontFamily': 'cursive','marginLeft':'0px'}}>TELEWORK</a></Link>
            </li>
<li>
             <Link to={'/'}>   <a class="header-menu-tab" href='#'><span class="icon entypo-home scnd-font-color"></span>Home</a></Link>
            </li>
        
            <li>
               <Link to={'/profile'} ><a class="header-menu-tab" href='#'><span class="icon fontawesome-user scnd-font-color"></span>Account</a></Link>
            </li>
         


            <li>
               <Link to={'/project'}> <a class="header-menu-tab" href='#' ><span class=" icon entypo-folder scnd-font-color"></span>ADD Project</a></Link>
            </li>
          

            <li>
               <Link to={'/salles'}> <a class="header-menu-tab" href='#' ><span class=" icon entypo-calendar scnd-font-color"></span>ADD Disponibilities</a></Link>
            </li>

            <li>
            <a  class="header-menu-tab"  onClick={()=>setStateNotification('true')} href='#' ><span class=" icon entypo-bell scnd-font-color"></span>Notification<div class="menu-box-number" style={{backgroundColor:'red'}}>{notification.notifications&&notification.notifications.filter(elm=>elm.receiver._id===user.userInfo._id && elm.readed===false ).length }</div></a>
            </li>
          
          
           
        {/*     <li>
            <div class="input-container">
                <input type="text" placeholder="serch project" class="email text-input" onChange={(e)=>setSearch(e.target.value)}/>
                <div class="input-icon envelope-icon-newsletter"><span class=" icon entypo-search scnd-font-color"></span></div>
            </div></li> */}
        </ul>
       
        <div class="profile-menu">
        <Link to={'/login'}>  <p onClick={handleLogout}> Logout <a href="#"><span class="icon entypo-lock scnd-font-color"></span></a></p> </Link> 
            <p>{elm.role} <a href="#26"><span class="entypo-down-open scnd-font-color"></span></a></p>
            
            <div class="profile-picture small-profile-picture">
                <img width="40px" height="40px" alt="Anne Hathaway picture" src={elm.image}/>
            </div>
          
        </div>
    </header> :

<header class="block">
<ul class="header-menu horizontal-list">

<li>
<div class="profile-picture middle-profile-picture clear">
                <img  className="imgProfile" style={{'width':'80px', 'height':'80px'}} alt="Anne Hathaway picture" src={img}/>
               
            </div>
            </li>   
            <li>
             <Link to={'/'}>   <a  href='#' style={{'color':'orange','fontSize':'20px','fontFamily': 'cursive','marginLeft':'0px'}}>TELEWORK</a></Link>
            </li>
<li>
               <Link to={'/'}> <a class="header-menu-tab" href='#'><span class="icon entypo-home scnd-font-color"></span>Home</a></Link>
            </li>
           
           
           
            <li>
               <Link to={'/profile'} ><a class="header-menu-tab" href='#'><span class="icon fontawesome-user scnd-font-color"></span>Account</a></Link>
            </li>
            <li>
               <Link to={'/salles'}> <a class="header-menu-tab" href='#' ><span class=" icon entypo-calendar scnd-font-color"></span>ADD Disponibilities</a></Link>
            </li>
          
            <li>
<a                 class="header-menu-tab"  onClick={()=>setStateNotification('true')} href='#' ><span class=" icon entypo-bell scnd-font-color"></span>Notification<div class="menu-box-number" style={{backgroundColor:'red'}}>{notification.notifications&&notification.notifications.filter(elm=>elm.receiver._id===user.userInfo._id && elm.readed===false).length }</div></a>
            </li>
           
           
           
        </ul>

       
        <div class="profile-menu">
       
       <Link to={'/login'}>  <p onClick={handleLogout}> Logout <a href="#26"><span class="icon entypo-lock scnd-font-color"></span></a></p> </Link> 
            <p>{elm.role} <a href="#26"><span class="entypo-down-open scnd-font-color"></span></a></p>
            
            <div class="profile-picture small-profile-picture">
                <img width="40px" height="40px" alt="Anne Hathaway picture" src={elm.image}/>
            </div>
          <div>
           
            </div>
        </div>
    </header>

})}




  
    <div class="left-container container">
    {user.isAuth && 
                user.users.filter(elId => elId._id === user.userInfo._id).map((elm)=>{
                    
             return elm.role === 'Admin' ? 
        <div class="menu-box block"> 
            <h2 class="titular">MENU BOX</h2>
            <ul class="menu-box-menu">
            <li>
                    <Link to={"/chat"}><a class="menu-box-tab" href="#6"><span class="icon fontawesome-envelope scnd-font-color"></span>Messages<div class="menu-box-number">{messages.Allchatmessages &&
                              messages.allmessages &&
                              messages.allmessages.filter(
                                (elm) =>
                                  elm.seen === false &&
                                  elm.sender !== user.userInfo._id
                              ).length +
                                messages.Allchatmessages.filter(
                                  (elm) =>
                                   elm.seen&&(!elm.seen.includes(user.userInfo._id))
                                ).length}</div></a> </Link>                           
                </li>
          
          
                
               {/*  <li>
                    <a class="menu-box-tab" href="#8"><span class="icon entypo-paper-plane scnd-font-color"></span>Invites<div class="menu-box-number">3</div></a>                            
                </li> */}
              {/*   <li>
                <Link to={'/bigcalendar'}><a class="menu-box-tab" href="#"><span class="icon entypo-calendar scnd-font-color"></span>Events<div class="menu-box-number">5</div></a></Link>                            
                </li> */}
              
              
               
                <li>
                   <Link to={'/listUsers'}> <a class="menu-box-tab" href='#'><sapn class="icon entypo-users scnd-font-color"></sapn>List Users</a></Link>
                </li>

               {/*  <li>
                <Link to={'/bigcalendar'}> <a class="menu-box-tab" href="#13"><sapn class="icon entypo-calendar scnd-font-color"></sapn>List Disponibilities</a></Link> 
                </li> */}

            </ul>
        </div> : elm.role ==='Manager'?

<div class="menu-box block"> 
<h2 class="titular">MENU BOX</h2>
<ul class="menu-box-menu">
<li>
    <Link to={"/chat"}><a class="menu-box-tab" href="#6"><span class="icon fontawesome-envelope scnd-font-color"></span>Messages<div class="menu-box-number">{messages.Allchatmessages &&
                              messages.allmessages &&
                              messages.allmessages.filter(
                                (elm) =>
                                  elm.seen === false &&
                                  elm.sender !== user.userInfo._id
                              ).length +
                                messages.Allchatmessages.filter(
                                  (elm) =>
                                   elm.seen&&(!elm.seen.includes(user.userInfo._id))
                                ).length}</div></a> </Link>                              
    </li>


    
    {/* <li>
        <a class="menu-box-tab" href="#8"><span class="icon entypo-paper-plane scnd-font-color"></span>Invites<div class="menu-box-number">3</div></a>                            
    </li> */}
    {/* <li>
    <Link to={'/bigcalendar'}><a class="menu-box-tab" href="#"><span class="icon entypo-calendar scnd-font-color"></span>Events<div class="menu-box-number">5</div></a></Link>                            
    </li> */}
   
   
    <li>
       <Link to={'/listProject'}><a class="menu-box-tab" href='#'><sapn class="icon entypo-folder scnd-font-color"></sapn> List Projects</a></Link> 
    </li>

    <li>
    <Link to={'/bigcalendar'}> <a class="menu-box-tab" href="#13"><sapn class="icon entypo-calendar scnd-font-color"></sapn>List Disponibilities</a></Link> 
    </li>

</ul>
</div>:

<div class="menu-box block"> 
<h2 class="titular">MENU BOX</h2>
<ul class="menu-box-menu">
<li>
    <Link to={"/chat"}><a class="menu-box-tab" href="#6"><span class="icon fontawesome-envelope scnd-font-color"></span>Messages<div class="menu-box-number">{messages.Allchatmessages &&
                              messages.allmessages &&
                              messages.allmessages.filter(
                                (elm) =>
                                  elm.seen === false &&
                                  elm.sender !== user.userInfo._id
                              ).length +
                                messages.Allchatmessages.filter(
                                  (elm) =>
                                   elm.seen&&(!elm.seen.includes(user.userInfo._id))
                                ).length}</div></a> </Link>                                                         
    </li>


    
    {/* <li>
        <a class="menu-box-tab" href="#8"><span class="icon entypo-paper-plane scnd-font-color"></span>Invites<div class="menu-box-number">3</div></a>                            
    </li> */}
    {/* <li>
    <Link to={'/bigcalendar'}><a class="menu-box-tab" href="#"><span class="icon entypo-calendar scnd-font-color"></span>Events<div class="menu-box-number">5</div></a></Link>                          
    </li> */}
 
    <li>
     <Link to={'/listProject'} >  <a class="menu-box-tab" href='#' ><sapn class="icon entypo-folder scnd-font-color"></sapn> List Projects</a></Link>
    </li>
    <li>
    <Link to={'/bigcalendar'}> <a class="menu-box-tab" href="#13"><sapn class="icon entypo-calendar scnd-font-color"></sapn>List Disponibilities</a></Link> 
    </li>

</ul>
</div>
    
    })}
        
        
        
     




        <div class="donut-chart-block block"> 
            <Calendar/>
        </div>
      {/*  <div class="line-chart-block block clear"> 
            <div class="line-chart">
        
                <div class='grafico'>
                   <ul class='eje-y'>
                     <li data-ejeY='30'></li>
                     <li data-ejeY='20'></li>
                     <li data-ejeY='10'></li>
                     <li data-ejeY='0'></li>
                   </ul>
                   <ul class='eje-x'>
                     <li>Apr</li>
                     <li>May</li>
                     <li>Jun</li>
                   </ul>
                     <span data-valor='25'>
                       <span data-valor='8'>
                         <span data-valor='13'>
                           <span data-valor='5'>   
                             <span data-valor='23'>   
                             <span data-valor='12'>
                                 <span data-valor='15'>
                                 </span></span></span></span></span></span></span>
                </div>
             
            </div>
            <ul class="time-lenght horizontal-list">
                <li><a class="time-lenght-btn" href="#14">Week</a></li>
                <li><a class="time-lenght-btn" href="#15">Month</a></li>
                <li><a class="time-lenght-btn" href="#16">Year</a></li>
            </ul>
            <ul class="month-data clear">
                <li>
                    <p>APR<span class="scnd-font-color"> 2013</span></p>
                    <p><span class="entypo-plus increment"> </span>21<sup>%</sup></p>
                </li>
                <li>
                    <p>MAY<span class="scnd-font-color"> 2013</span></p>
                    <p><span class="entypo-plus increment"> </span>48<sup>%</sup></p>
                </li>
                <li>
                    <p>JUN<span class="scnd-font-color"> 2013</span></p>
                    <p><span class="entypo-plus increment"> </span>35<sup>%</sup></p>
                </li>
            </ul>
        </div>
        <div class="media block"> 
            <div id="media-display">
                <a class="media-btn play" href="#23"><span class="fontawesome-play"></span></a>
            </div>
            <div class="media-control-bar">
                <a class="media-btn play" href="#23"><span class="fontawesome-play scnd-font-color"></span></a>
                <p class="time-passed">4:15 <span class="time-duration scnd-font-color">/ 9:23</span></p>
                <a class="media-btn volume" href="#24"><span class="fontawesome-volume-up scnd-font-color"></span></a>
                <a class="media-btn resize" href="#25"><span class="fontawesome-resize-full scnd-font-color"></span></a>
            </div>
        </div>
        <ul class="social horizontal-list block"> 
            <li class="facebook"><p class="icon"><span class="zocial-facebook"></span></p><p class="number">248k</p></li>
            <li class="twitter"><p class="icon"><span class="zocial-twitter"></span></p><p class="number">30k</p></li>
            <li class="googleplus"><p class="icon"><span class="zocial-googleplus"></span></p><p class="number">124k</p></li>
            <li class="mailbox"><p class="icon"><span class="fontawesome-envelope"></span></p><p class="number">89k</p></li>
        </ul> */}
    </div>

{stateNotification === 'true' && <transition   name="fadeStart" v-cloak>
     <div v-if="show" class="tooltip"   >
        <div id="heading">
          <div class="heading-left">
            <h6 class="heading-title">Notifications</h6>
          </div>
          <div class="heading-right">
          <p onClick={()=>setStateNotification('false')}>close</p>
           {/*  <a class="notification-link" href="#">See all</a> */}
          </div>
        </div>
   
                  <ul  class="notification-list" style={{'overflowY':'scroll','height':'700px'}}>
                  {notification.notifications&&notification.notifications &&
            notification.notifications.filter(el=>el.receiver._id === user.userInfo._id /* && el.readed===false */).sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate)) .slice(0,30) .map((elm)=>(
          <li class="notification-item" v-for="user of users">
            <div class="img-left">
              <img class="user-photo" alt="User Photo" src={elm.owner.image} />
            </div>
            <div class="user-content">
              <p class="user-info"><span></span> {elm.owner.firstName} {elm.owner.lastName}</p>
              <p /* style={{'color':color}} */ class="time">{elm.title} {elm.message}</p>
              <p> {new Date (elm.joinDate).getDate() + '/'+ parseInt(new Date (elm.joinDate).getMonth()+1) + '/'+new Date (elm.joinDate).getFullYear()} {/* <p style={{color:'orange'}}>{formatDistance(new Date(elm.joinDate), new Date(), { addSuffix: true })} </p> */}</p>
              
  
 <p style={elm.readed?{color:'blue',cursor: 'pointer'}:{color:'red',cursor: 'pointer'}} onClick={()=>handlePostNotification(elm._id)}> {elm.readed?'seen':'not seen'}</p>

              
             
            </div>
          </li>
           ))}
        </ul>
      
      </div>
     
    </transition>} 
  </div>
            
      
    )
}

 /* const MyNotify=()=>{
   const notification = useSelector(state=>state.notification)
   const user = useSelector(state => state.user)
    return(
        <>
       
        <div style={{}}>
        {notification.notifications&&notification.notifications &&
            notification.notifications.filter(el=>el.receiver._id === user.userInfo._id).map((elm)=>(
            <div>
             <div class="profile-picture small-profile-picture">
                <img width="40px" height="40px" alt="Anne Hathaway picture" src={elm.owner.image}/>
              
            </div> 
            <label>{elm.owner.firstName} {elm.owner.lastName}</label>  
            <h3>{elm.title} {elm.message}</h3>
           
            </div>
                    ))}
        </div>
 
 </>   )
}  */


export default BarreNavigationHome