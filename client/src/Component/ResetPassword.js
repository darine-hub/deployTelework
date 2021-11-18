import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login,changeForgetPassword } from '../redux/userSlice';

import ParticleComponent from "./particles" ;
import BubbleComponent from "./bubble" ;
import "../styleCss/login.css";
import img from "../images/tele.png";
import "../styleCss/HomePage.css";
import { Link } from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
const ResetPassword = ({history,match}) => { 

  
    const [step, setStep] = useState(1);
  
    const [userInput, setUserInput] = useState({});
    const [fileInput, setFileInput] = useState({});
    const [password, setPassword] = useState("")
      const [passwordAgain, setPasswordAgain] = useState("")
  const token = match.params.token
     
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
  
    useEffect(() => {
      if(!user.isAuth){
        history.push(`/reset/${match.params.token}`)
          
      }else{
        history.push('/')  
      }
  }, [user.isAuth])

  
  
  const tokenuser = match.params.token
  const parseJwt=(token)=> {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
  
  const jsonToken = parseJwt(tokenuser)
  
  const iduser = jsonToken.id
  
  console.log(jsonToken)
  console.log(iduser)
  
  const [passwordInfo, setPasswordInfo] = useState({});
  
  
  const handleChangePassword = (e) => {
  setPasswordInfo({ ...passwordInfo, [e.target.name]: e.target.value });
 
  
  
  };
  
  const handleSubmitPassword = (e) => {
      e.preventDefault();
    if(!passwordInfo.newPassword){
      NotificationManager.warning('please enter your new password!!')
    }
  /*   else if(user.users.filter(elm=>elm.email===userInput.email).length>0){
      NotificationManager.warning("you already have a user with this mail!");
    } */
   
      else if(passwordInfo.newPassword.length<6){
        NotificationManager.warning('your new password must be at least 6 characters!!');
      }
      else if(!passwordInfo.confirmPassword){
        NotificationManager.warning('please confirm your new password !!!!');
      }
      else{
          dispatch(changeForgetPassword({ id: iduser, data: passwordInfo }));
          history.push('/login') 
      }
           
          
  
   };
  return (
    <>
  
<div class="bg"></div>
<div class="cont-1 animated fadeIn">
  <center>
    {/* <h2>
      <a href="#homepage">Login</a>
    </h2> */}
<NotificationContainer/>
<div class="profile-picture middle-profile-picture clear">
                <img  className="imgProfile" style={{'width':'80px', 'height':'80px'}} alt="Anne Hathaway picture" src={img}/>
              
            </div>

            <a href='' style={{'color':'orange','fontSize':'30px','fontFamily': 'cursive','marginLeft':'-20px'}}>TELEWORK</a><br/>
            <a href='' style={{'color':'blue','fontSize':'20px','fontFamily': 'cursive','marginLeft':'-20px'}}>Reset Password</a>
  </center>
  <hr/>
  <form>
		<center>
      <div> 
     
        <input type='password'
        placeholder='password'
        name='newPassword'
        onChange={handleChangePassword}/>
            <input type='password'
            name='confirmPassword'
        placeholder='confirm password'
        onChange={handleChangePassword}/>
      
       </div>
{/* 		<Link to={'/forgetPassword'}><p class="a-link"><a href="#forget-password">Forget password?</a></p></Link> */}

                   <button type='submit'  onClick={handleSubmitPassword}>reset </button>
		</center>
		<br/>
  
	</form>
    <h1 style={{color:'red'}}>{user.userErrors && user.userErrors }</h1>
  <h1 style={{color:'green'}}>{user.successMessage && user.successMessage }</h1>
</div>


  <ul class="bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
  


    
    <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }}
      >
        <ParticleComponent />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}
        >
       
          {/* You can render <Route> and <NavTabs /> here */}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }}
      >
        <BubbleComponent />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}
        >
          
        </div>
      
      </div>
    
    </>
  );
};

export default ResetPassword;