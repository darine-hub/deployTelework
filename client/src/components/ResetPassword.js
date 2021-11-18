import React, { useState } from "react";
import PasswordChecklist from "react-password-checklist"


/* import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.min.js"; */

import { useDispatch ,useSelector  } from "react-redux";
import { changePassword, postNewUser ,changeForgetPassword} from "../redux/userSlice";
import BarreNavigationHome from "./BarreNavigationHome";
import {logout,getUsers,verifPassword} from '../redux/userSlice'
import {useEffect,useRef} from 'react';

 import "../styleCss/register.css"; 
 import axios from 'axios';
 import emailjs from 'emailjs-com';
 import '../testCoponent/project.scss';
 import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const ResetPassword = ({history,match}) => {

  const form = useRef();
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
  useEffect(() => {
   
    dispatch(getUsers())

 
  
}, [])

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

const [passwordInfo, setPasswordInfo] = useState({
	currentPassword: '',
	newPassword: '',
});
const { currentPassword, newPassword } = passwordInfo;

const handleChangePassword = (e) => {
setPasswordInfo({ ...passwordInfo, [e.target.name]: e.target.value });
setPasswordAgain({ ...passwordInfo, [e.target.name]: e.target.value })


};

const handleSubmitPassword = (e) => {
	e.preventDefault();
  if(!passwordInfo.currentPassword){
    NotificationManager.warning('please enter your new password!!')
  }
/*   else if(user.users.filter(elm=>elm.email===userInput.email).length>0){
    NotificationManager.warning("you already have a user with this mail!");
  } */
   else if(!passwordInfo.newPassword){
      NotificationManager.warning('please confirm your new password !!!!');
    }
    else if(passwordInfo.currentPassword.length<6){
      NotificationManager.warning('your new password must be at least 6 characters!!');
    }
    else{
        dispatch(changeForgetPassword({ id: iduser, data: passwordInfo }));
        
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
 


      <BarreNavigationHome/>
      <NotificationContainer/>
      
      <div class="middle-container container">
    
    
      <div class="block "> 

    
         
      <h2 class="mytitular"> RESET PASSWORD</h2><br/>

           
              <form id="msform">
   
                <fieldset style={{marginLeft:'-10px'}}> 
                  <div class="form-card">
                   
                 
                    <label class="fieldlabels"> New Password: *</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="New Password"
                      onChange={handleChangePassword}
                    />
                    <label class="fieldlabels"> Confirm Password: *</label>
                    <input
                      type="password"
                      name="newPassword"
                      placeholder="confirm password"
                     /*  onChange={handleChangePassword} */
                    />
                     <PasswordChecklist
				rules={["minLength","specialChar","number","capital","match"]}
				minLength={5}
				value={passwordInfo.currentPassword}
				valueAgain={passwordInfo.newPassword}
				onChange={(isValid) => {}}
			/>
                  </div>
                 
                  <input
                    type="button"
                    name="next"
                    class="next action-button"
                    value="reset"
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

export default ResetPassword;
