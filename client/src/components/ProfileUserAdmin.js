import React from 'react'
import '../styleCss/profile.css'
import { Link } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import BarreNavigationHome from './BarreNavigationHome';
import {getUsers, updateUser} from '../redux/userSlice';
import {useState,useEffect} from 'react';
import{getDepartement} from '../redux/departementSlice'

const ProfileUserAdmin = ({history,match}) => {


    var maintenant=new Date();
var jour=maintenant.getDate();
var mois=maintenant.getMonth()+1;
var an=maintenant.getFullYear();
    const dispatch = useDispatch();
    
    const departement = useSelector(state => state.departement)
    const user = useSelector(state => state.user)
    useEffect(() => {
       
  
        if(user.isAuth){
            
            dispatch(getUsers())
            
            
        }else{
            history.push('/login')
        }
    }, [user.isAuth])


    const [updatedInfo, setUpdatedInfo] = useState({});
    console.log(updatedInfo)
    const handleUpdate = (e) => {
        setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value });
      };
      const handleUpdateSubmit = (e, userId) => {
        e.preventDefault();
        dispatch(updateUser({ id: userId, data: updatedInfo }));
        history.push('/listUsers')

    };
   

    return (
        <body>

        <div class="main-container">
      <center>  <h4 style={{color:'green'}}> {user && user.successMessage &&  user.successMessage}  </h4>  </center> 	
	<center><h4 style={{color:'red'}}>{user.userErrors && user.userErrors }</h4> </center>
          <BarreNavigationHome/>
          <div class="middle-container container">

   
           { user.users && user.users.filter(elm=>elm._id=== match.params.id).map((el)=> (
         <div class="">  
        
        
        <div class="containerProfile">
        
            <h1 class="title">MY PROFILE</h1>
        
            <div class="grid">
                <div class="form-group a">
                    <label id='labelProfile' for="name">EMAIL</label>
                    <input id='inputProfile'   name="email" type="text" placeholder={el.email}  onChange= {handleUpdate}/>
                </div>
        
                <div class="form-group b">
                    <label id='labelProfile' for="first-name">ROLE</label>
                    <select id='inputProfile' name="role" onChange= {handleUpdate} >
                    <option value="Role"> {el.role}</option>
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Employee">Employee</option>
                    </select>
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
                </div>
        
                <div class="form-group">
                    <label id='labelProfile' for="address">AGE</label>
                    <input id='inputProfile' type="text" name='age' placeholder={el.age} onChange= {handleUpdate}/>
                </div>
                <div class="form-group">
                    <label id='labelProfile' for="address">FAMILY SITUATION</label>
                    <select
                    
                    id='inputProfile'
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
               
                <select id='inputProfile' name="departement" onChange= {handleUpdate}>

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
          <Link to={'/listUsers'}>	<a style={{'marginLeft':'250px','marginTop':'-20px','height':'50px'}} class="sign-in button" onClick={(e)=>handleUpdateSubmit(e,el._id)} >UPDATE  </a> </Link>
            </div>	 
            
        </div>
        
        
        
        
        </div>  ))} </div> 
        
                </div></body>
    )
}

export default ProfileUserAdmin
