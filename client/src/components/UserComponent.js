import React, { useState } from "react";
import PasswordChecklist from "react-password-checklist"
import { Link } from "react-router-dom";


/* import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.min.js"; */

import { useDispatch ,useSelector  } from "react-redux";
import { postNewUser } from "../redux/userSlice";
import BarreNavigationHome from "./BarreNavigationHome";
import {logout,getUsers} from '../redux/userSlice'
import {useEffect,useRef} from 'react';

 import "../styleCss/register.css"; 
 import axios from 'axios';
 import emailjs from 'emailjs-com';
 import '../testCoponent/project.scss'
 import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const UserComponent = ({history}) => {

  const form = useRef();
  const [step, setStep] = useState(1);

  const [userInput, setUserInput] = useState({});
  const [fileInput, setFileInput] = useState({});
  const [password, setPassword] = useState("")
	const [passwordAgain, setPasswordAgain] = useState("")



  const dispatch = useDispatch();
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getUsers())

 
  
}, [])

const sendEmail = (e) => {
  e.preventDefault();

  emailjs.sendForm('service_ijlk7jy', 'template_tquv2vw',e.target, 'user_TnQ9mkOd2fnep9GX4SvMe')
    .then((result) => {
        console.log(result.text);
        history.push('/listUsers')
    }, (error) => {
        console.log(error.text);
    });
};


 

  const handleChange = (e) => {
    setPassword(e.target.value)
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  
  };

  console.log (userInput.email)

  const handleSubmit = (e) => {
    e.preventDefault();
  

     if(!userInput.firstName){
      NotificationManager.warning('please enter your firstname!!')
    }
    else if(!userInput.lastName){
      NotificationManager.warning('please enter your lastname!!')
    }
    else if(!userInput.role){
      NotificationManager.warning('please enter your role!!')
    }
 
   
    else{
      dispatch(postNewUser( userInput));
      nextStep();
    sendEmail(e)
    
    }
    
  
    
 
  };

  const nextStep = () => {
    if(!userInput.email){
      NotificationManager.warning('please enter your email!!')
    }
    else if(user.users.filter(elm=>elm.email===userInput.email).length>0){
      NotificationManager.warning("you already have a user with this mail!");
    }
    else if(!userInput.password ){
      NotificationManager.warning('please enter your password!!')
    }
    else if(userInput.password.length<6){
      NotificationManager.warning('your new password must be at least 6 characters!!');
    }
 else if(  !passwordAgain){
  NotificationManager.warning('please enter your confirm password!!')
    }
  
    else if( passwordAgain!==userInput.password){
      NotificationManager.warning('the password and the confirm password do not have the same value!')
        }

    else{
      setStep(Number(step + 1));
    }
   
  };

  const prevStep = () => {
    setStep(Number(step - 1));
  };

  return (

    <body>

    <div class="main-container">
{/*     <center>      <h4 style={{color:'green'}}> {user && user.successMessage &&  user.successMessage}  </h4>  </center> 	
<center>	<h4 style={{color:'red'}}>{user.userErrors && user.userErrors }</h4></center> */}
      <BarreNavigationHome/>
      <NotificationContainer/>
      <div class="middle-container container">
    
    
      <div class="block "> 

    
         
      <h2 class="mytitular"> ADD USER</h2><br/>

            {step === 1 ? (
              <form id="msform">
   
                <fieldset style={{marginLeft:'-10px'}}> 
                  <div class="form-card">
                    <div class="row">
                      <div class="col-7">
                        <h2 class="fs-title">Account Information:</h2>
                      </div>
                    </div>
                    <label class="fieldlabels">Email: * </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Id"
                      onChange={handleChange}
                    />
                    <label class="fieldlabels">Password: *</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                    />
                    <label class="fieldlabels">Confirm Password: *</label>
                    <input
                      type="password"
                      name="cpwd"
                      placeholder="Confirm Password"
                      onChange={e => setPasswordAgain(e.target.value)}
                    />
                  {/*    <PasswordChecklist
				rules={["minLength","specialChar","number","capital","match"]}
				minLength={5}
				value={password}
				valueAgain={passwordAgain}
				onChange={(isValid) => {}}
			/> */}
                  </div>
                 
                  <input
                    type="button"
                    name="next"
                    class="next action-button"
                    value="Next"
                    onClick={nextStep}
                  />
                </fieldset>
              </form>
            ) : step === 2 ? (
              <form id="msform">
         
                <fieldset style={{marginLeft:'-10px'}}>
                  <div class="form-card">
                    <div class="row">
                      <div class="col-7">
                        <h2 class="fs-title">Personal Information:</h2>
                      </div>
                    </div>
                    <label class="fieldlabels">First Name: *</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      onChange={handleChange}
                    />
                    <label class="fieldlabels">Last Name: *</label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      onChange={handleChange}
                    />
                  
                    <label class="fieldlabels">Role</label>
                 
                    <select id="options" name="role"  onChange={handleChange}>
                    <option value="Role"> role</option>
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Employee">Employee</option>
                    </select>
                  
                  </div> 
             
                        <input
                    type="button"
                    name="next"
                    class="next action-button"
                    value="Submit"
                    onClick={handleSubmit}
                  />
                  <input
                    type="button"
                    name="previous"
                    class="previous action-button-previous"
                    value="Previous"
                    onClick={prevStep}
                  />
               
             
                
                </fieldset>
              </form>
            ) : (
              <form id="msform" ref={form} onSubmit={sendEmail}>
             
                <fieldset style={{marginLeft:'-10px'}}>
                  <div class="form-card">
                    <div class="row">
                      <div class="col-7">
                     
                        <h2 class="fs-title">Send Mail to User:</h2>
                      </div>
                    </div>{" "}
                    <br />
                    <br />
                    <label class="fieldlabels">Name</label>
                    <input
                     type="text" name="user_name"
                      
                      value={userInput.firstName}
                    />
                    <label class="fieldlabels">Mail</label>
                    <input
                      type="text" name="user_email" 
                      value={userInput.email}
                      
                    />
                     <label class="fieldlabels">Message</label>
                    <input
                     type="text" name="message"
                      
                      value={userInput.password}
                    />  
                      <input
                    type="button"
                    name="send"
                    class="next action-button"
                   
                    type="submit" value="Send"
                  />

                   </div>
                </fieldset>
              </form>
            )}
          </div>
      
          </div>
          </div>



      </body>
          
        
  );
};

export default UserComponent;
