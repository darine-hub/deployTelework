import React, { useState } from "react";
import PasswordChecklist from "react-password-checklist"


/* import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.min.js"; */

import { useDispatch ,useSelector  } from "react-redux";
import { changePassword, postNewUser } from "../redux/userSlice";
import BarreNavigationHome from "./BarreNavigationHome";
import {logout,getUsers,verifPassword} from '../redux/userSlice'
import {useEffect,useRef} from 'react';

 import "../styleCss/register.css"; 
 import axios from 'axios';
 import emailjs from 'emailjs-com';
 import '../testCoponent/project.scss';
 import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const ChangePassword = ({history}) => {

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

const [passwordInfo, setPasswordInfo] = useState({
	currentPassword: '',
	newPassword: '',
});
const { currentPassword, newPassword } = passwordInfo;

const handleChangePassword = (e) => {
setPasswordInfo({ ...passwordInfo, [e.target.name]: e.target.value });
setPasswordAgain({ ...passwordInfo, [e.target.name]: e.target.value })


};

const handleSubmitPassword = (e, userId) => {
	e.preventDefault();
  if(!passwordInfo.currentPassword){
    NotificationManager.warning('please enter your current password!!')
  }
/*   else if(user.users.filter(elm=>elm.email===userInput.email).length>0){
    NotificationManager.warning("you already have a user with this mail!");
  } */
   else if(!passwordInfo.newPassword){
      NotificationManager.warning('please enter your new password !!!!');
    }
    else if(passwordInfo.newPassword.length<6){
      NotificationManager.warning('your new password must be at least 6 characters!!');
    }
    else{
        dispatch(changePassword({ id: userId, data: passwordInfo }));
        
    }
		 
		 

 };

  
    
 
  

  const nextStep = () => {
    setStep(Number(step + 1));
  };

  const prevStep = () => {
    setStep(Number(step - 1));
  };

  return (

    <body>

    <div class="main-container">
    <center>      <h4 style={{color:'green'}}> {user && user.successMessage &&  user.successMessage}  </h4>  </center> 	
<center>	<h4 style={{color:'red'}}>{user.userErrors && user.userErrors }</h4></center>
{user.userErrors &&  NotificationManager.error(user.userErrors ) }

      <BarreNavigationHome/>
      <NotificationContainer/>
      
      <div class="middle-container container">
    
    
      <div class="block "> 

    
         
      <h2 class="mytitular"> UPDATE PASSWORD</h2><br/>

           
              <form id="msform">
   
                <fieldset style={{marginLeft:'-10px'}}> 
                  <div class="form-card">
                   
                 
                    <label class="fieldlabels"> Current Password: *</label>
                    <input
                      type="password"
                      name="currentPassword"
                      placeholder="Password"
                      onChange={handleChangePassword}
                    />
                    <label class="fieldlabels">New Password: *</label>
                    <input
                      type="password"
                      name="newPassword"
                      placeholder="new password"
                      onChange={handleChangePassword}
                    />
    {/*                  <PasswordChecklist
				rules={["minLength","specialChar","number","capital","match"]}
				minLength={5}
				value={passwordInfo.currentPassword}
				valueAgain={passwordInfo.newPassword}
				onChange={(isValid) => {}}
			/> */}
                  </div>
                 
                  <input
                    type="button"
                    name="next"
                    class="next action-button"
                    value="update"
                    onClick={(e) => handleSubmitPassword (e, user.userInfo._id)}
                  />
                </fieldset>
              </form>
           
          </div>
      
          </div>
          </div>



      </body>
          
        
  );
};

export default ChangePassword;
