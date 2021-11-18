import React from 'react'
import '../styleCss/profile.css'
import { Link } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import BarreNavigationHome from './BarreNavigationHome';
import {getUsers,updatePasswordUser,updateUserImage, verifPasswordUser,changePassword,updateUser} from '../redux/userSlice';
import {useState,useEffect} from 'react';
import{getDepartement} from '../redux/departementSlice'

import '../testCoponent/project.scss'
import bcrypt from "bcryptjs";
import "../styleCss/register.css"; 
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const ProfileUser = ({history}) => {
	const dispatch = useDispatch();

	const user = useSelector(state => state.user)
    const departement = useSelector(state => state.departement)

	useEffect(() => {
        dispatch(getDepartement())
  
        if(user.isAuth){
            
            dispatch(getUsers())
            
            
        }else{
            history.push('/login')
        }
    }, [user.isAuth])
    



const [passwordInfo, setPasswordInfo] = useState({
	currentPassword: '',
	newPassword: '',
});
const { currentPassword, newPassword } = passwordInfo;

const handleChangePassword = (e) => {
setPasswordInfo({ ...passwordInfo, [e.target.name]: e.target.value });
};

const handleSubmitPassword = (e, userId) => {
	e.preventDefault();
		   dispatch(changePassword({ id: userId, data: passwordInfo }));
		 

 };


 const [updatedInfo, setUpdatedInfo] = useState({});
 console.log(updatedInfo)
 const handleUpdate = (e) => {
	 setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value });
   };
   const handleUpdateSubmit = (e, userId) => {
	 e.preventDefault();
	 dispatch(updateUser({ id: userId, data: updatedInfo }));
     NotificationManager.success('profile updated!')
	 /* history.push('/listUsers') */

 };


	
	const handleUpdateImage = (e, userId) => {
		dispatch(updateUserImage({ id: userId, file: e.target.files[0] }));
	  };

	 
	 
  




    return (
      

<body>

<div class="main-container">
<center>      <h4 style={{color:'green'}}> {user && user.successMessage &&  user.successMessage}  </h4>  </center> 	
<center>	<h4 style={{color:'red'}}>{user.userErrors && user.userErrors }</h4></center>

  <BarreNavigationHome/>
  <NotificationContainer/>
  <div class="middle-container container">
   { user.users && user.users.filter(elm=>elm._id=== user.userInfo._id).map((el)=> (
 <div class="">  


<div class="containerProfile">
{/* {user && user.successMessage &&
                                                        <div className="alert alert-success mt-3" role="alert">
                                                            <h4 className="alert-heading">Well done!</h4>
                                                            <p>{user.successMessage}</p></div>} */}

{/* 	 { user.errors && <div style={{'backgroundColor':'red'}} role="alert">
                                                        <p>{user.errors}</p></div>
                                                    }
                                                    {user.successMessage &&
                                                        <div style={{'backgroundColor':'green','color':'white'}} role="alert">
                                                            <h4 className="alert-heading">Well done!</h4>
                                                            <p>{user.successMessage}</p></div>
                                                    }   */}
	<h1 class="title">MY PROFILE</h1>

	<div class="grid">
                <div class="form-group a">
                    <label id='labelProfile' for="name">EMAIL</label>
                    <input id='inputProfile' name="email" type="text" placeholder={el.email}  onChange= {handleUpdate}/>
                </div>
        
                <div class="form-group b">
                    <label id='labelProfile' for="first-name">ROLE</label>
					<input id='inputProfile' name="email" type="text" value={el.role}  />
					</div>
        
                <div class="form-group email-group">
                    <label id='labelProfile' for="email">FIRSTNAME</label>
                    <input id='inputProfile' name="firstName" type="text" placeholder={el.firstName} onChange= {handleUpdate}/>
                </div>
        
                <div class="form-group phone-group">
                    <label id='labelProfile' for="phone">LASTNAME</label>
                    <input id='inputProfile' name="lastName" type="text" placeholder={el.lastName} onChange= {handleUpdate}/>
                </div>
        
                <div class="textarea-group">
        <img style={{width:'150px',height:'150px',borderRadius:'50%'}}src={el.image}/>
		<input 
                      type="file"
                      name="image"
                      accept="image/*"
					  onChange={(e) => handleUpdateImage(e,user.userInfo._id )}
                    />
                </div>
        
                <div class="form-group">
                    <label id='labelProfile' for="address">AGE</label>
                    <input id='inputProfile'  type="text" name='age' placeholder={el.age} onChange= {handleUpdate}/>
                </div>
                <div class="form-group">
                    <label id='labelProfile' for="address">FAMILY SITUATION</label>
                    <select id='inputProfile'
                     name="familySituation"
                    onChange= {handleUpdate}
                  
                  >
                     <option    value="familySituation"  > {el.familySituation}</option>
                    <option    value="Single" >Single</option>
                    <option    value="Maried" >Maried</option>
                    <option   value="Devorced" >Devorced</option>
                  </select>
                </div>
                <div class="form-group">
                    <label id='labelProfile' for="address">CONTACT</label>
                    <input id='inputProfile' name='tel' type="text" placeholder={el.tel} onChange= {handleUpdate}/>
                </div>
        
                <div class="form-group">
                    <label id='labelProfile' for="address">ADRESS</label>
                    <input id='inputProfile' name="address" type="text"  placeholder={el.adress} onChange= {handleUpdate}/>
                </div>
                <div class="form-group">
                    <label id='labelProfile' for="address">TITLE</label>
                    <input id='inputProfile' name="title" type="text" placeholder={el.title}  onChange= {handleUpdate}/>
                </div>
                <div class="form-group">
                    <label id='labelProfile' for="address">DEPARTEMENT</label>
                {/*     <input id="address" type="text" placeholder={el.departement}/> */}
               
                <select id='inputProfile'  name="departement" onChange= {handleUpdate}>

                    <option value="Departement">{el.departement}</option>
                    {departement.departements&& departement.departements.filter(elm=>elm.inUse==='yes').map((elm)=>
    <option value={elm.name}>{elm.name}</option>
)}
                      
                    </select>
                    </div>
                    <div class="form-group">
                    <label id='labelProfile' for="address">JOIN DATE</label>
                    <input id='inputProfile' name="joinDate" type="text" value= {new Date (el.joinDate).getDate() + '/'+ parseInt(new Date (el.joinDate).getMonth()+1) + '/'+new Date (el.joinDate).getFullYear()}  />
                </div>
            
           </div>
        
             < div class="text-center">
          	<a style={{'marginLeft':'200px','marginTop':'-30px','width':'160px','height':'50px'}} class="sign-in button" onClick={(e)=>handleUpdateSubmit(e,el._id)} >UPDATE PROFILE  </a> 
             
            </div>	 
	
            < div class="text-center">
          
             <Link to={"/updatePassword"}> <a style={{'marginLeft':'560px','marginTop':'-70px','width':'180px','height':'50px'}} class="sign-in button"  >UPDATE PASSWORD  </a></Link>
            </div>

	
</div>




</div>  ))} </div> 

 
        </div>
	
		
		</body>
    )
}

export default ProfileUser
