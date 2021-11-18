import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword, login } from '../redux/userSlice';

import ParticleComponent from "./particles" ;
import BubbleComponent from "./bubble" ;
import "../styleCss/login.css";
import img from "../images/tele.png";
import "../styleCss/HomePage.css";

const ForgetPassword = () => {
    const dispatch = useDispatch();
  const [userInput,setUserInput]=useState({});
  const user = useSelector((state) => state.user);
 

 
 const handleChange =(e)=>{
     setUserInput({...userInput,
         [e.target.name]:e.target.value
     })
 }
 
 const handleSubmit =(e)=>{
     e.preventDefault();
     dispatch(forgetPassword(userInput))
 }
  return (
    <>
  
<div class="bg"></div>
<div class="cont-1 animated fadeIn">
  <center>
    {/* <h2>
      <a href="#homepage">Login</a>
    </h2> */}

<div class="profile-picture middle-profile-picture clear">
                <img  className="imgProfile" style={{'width':'80px', 'height':'80px'}} alt="Anne Hathaway picture" src={img}/>
              
            </div>

            <a href='' style={{'color':'orange','fontSize':'30px','fontFamily': 'cursive','marginLeft':'-20px'}}>TELEWORK</a><br/>
            <a href='' style={{'color':'blue','fontSize':'20px','fontFamily': 'cursive','marginLeft':'-20px'}}>Forget Password</a>
  </center>
  <hr/>
  <form>
		<center>
      <div> 
        <input  type='email' placeholder='email' name='email' onChange={handleChange}/>
      {/*   <input type='password'
        placeholder='password'
        name='password'
        onChange={handleChange}/> */}
       </div>
		
    <button type='submit' onClick={handleSubmit}>
        verify email
      </button>
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

export default ForgetPassword
