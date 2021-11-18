
//import '../styleCss/project.css'

import { useDispatch ,useSelector} from "react-redux";
import { postNewProject } from "../redux/projectSlice";
import BarreNavigationHome from './BarreNavigationHome';
import {useState,useEffect} from 'react';
import {logout,getUsers,deleteUser} from '../redux/userSlice'
import { Link } from "react-router-dom";
import "../styleCss/HomePage.css";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


const FormProject = ({history}) => {

const project = useSelector(state => state.project)
const user = useSelector(state => state.user)

  const dispatch = useDispatch();
  const [projectInput, setProjectInput] = useState({});
  const handleChange = (e) => {
    setProjectInput({ ...projectInput, [e.target.name]: e.target.value });
  };
console.log (projectInput)

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!projectInput.title){
      NotificationManager.warning('please enter a title for your project')
    }
   else if(!projectInput.description){
    NotificationManager.warning('please enter a description for your project')
    }
   else if(!projectInput.startDate){
    NotificationManager.warning('please enter a start date  for your project')
    }
   else if(!projectInput.deadLine){
    NotificationManager.warning('please enter a deadline for your project')
    }
    else{
      dispatch(postNewProject(projectInput));
      history.push('listProject')
    }
   

   
  };
  useEffect(() => {
  

      
    dispatch(getUsers())
    
    


}, [])
  
    return (
        
       <body>

<div class="main-container">

  <BarreNavigationHome/>
  <NotificationContainer/>
  <div class="middle-container container">
 

<div class="block "> 

	<form class="registration-form">
  <div class="mytitular"><h3> ADD PROJECT</h3></div><br/>
  <div class="input-container">
			<label >Title</label> <br/>
			<input type="text" name="title" placeholder='Title' onChange= {handleChange} />
		</div>
    <div class="input-container">
			<label > Description</label><br/>
			<input type="text"  name="description" placeholder='Description' onChange= {handleChange} />
		</div>
    <div class="input-container">
			<label > Start Date</label><br/>
	
    <input type="date"  name="startDate" min="2021-01-01" max="2021-12-31" onChange= {handleChange} />
       </div> 
       <div class="input-container">
			<label > Deadline</label><br/>
	
    <input type="date"  name="deadLine" min="2021-01-01" max="2021-12-31" onChange= {handleChange} />
       </div> <br/><br/>
	
		
    <div class="text-center">
    <Link to={'/listProject'}>  <a style={{backgroundColor:'grey'}} class="sign-in button" >Cancel</a></Link>
     <Link to={'/listProject'}>  <a class="sign-in button" onClick={handleSubmit}>Add Project</a></Link>
     
       </div>  
	</form>
</div>
<h1 style={{color:'white'}}>{project.projectErrors && project.projectErrors._message }</h1>
 
 


</div>
</div>
   </body>     
    )
}

export default FormProject
