
//import '../styleCss/project.css'

import { afficheProject, updateProject } from "../redux/projectSlice";
import {getUsers} from '../redux/userSlice'
import {useState,useEffect} from 'react';
import { useDispatch ,useSelector} from "react-redux";
import BarreNavigationHome from "./BarreNavigationHome";
import { Link } from "react-router-dom";



import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const UpdateProject = ({match,history}) => {

    const [step, setStep] = useState(1);

    const nextStep = () => {
      setStep(Number(step + 1));
    };
  
    const prevStep = () => {
      setStep(Number(step - 1));
    };
  
      const dispatch = useDispatch();
   
  
    
    const user = useSelector(state => state.user)
    useEffect(() => {
        dispatch(getUsers())
  
        if(user.isAuth){
            
            dispatch(afficheProject())
            
            
        }else{
            history.push('/login')
        }
    }, [user.isAuth])

  const project = useSelector(state => state.project)
  const [updatedInfo, setUpdatedInfo] = useState({});
    const handleUpdate = (e) => {
        setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value });
      };
      const handleUpdateSubmit = (e, projectId) => {
        e.preventDefault();
        dispatch(updateProject({ id: projectId, data: updatedInfo }));
  /*       if({updatedInfo}){NotificationManager.success('project updated!')}
    else {NotificationManager.error('tray again ! project not valided !')} */
        history.push(`/singleProject/${projectId}`)

    };
   


    return (
      <body>
{/*  <NotificationContainer/> */}
      <div class="main-container">
        <BarreNavigationHome/>
        <div class="middle-container container">
      
        { project.projects && project.projects.filter(project=>project._id===match.params.id).map((el)=> (
    
    <div class="task block"> 

  
         
        
	<form class="registration-form">
  <h2 class="mytitular"> UPDATE PROJECT</h2><br/>
		<div class="input-container">
			<label >Title</label> <br/>
			<input type="text" name="title" placeholder={el.title} onChange= {handleUpdate} />
		</div>
    <div class="input-container">
			<label > Description</label><br/>
			<input type="text"  name="description" placeholder={el.description}   onChange= {handleUpdate} />
		</div>
    <div class="input-container">
			<label> Start Date</label><br/>
	
    <input type="date"  name="startDate" min="2021-01-01" max="2021-12-31"  placeholder={el.startDate} onChange= {handleUpdate} />
       </div> 
       <div class="input-container">
			<label> Deadline</label><br/>
	
    <input type="date"  name="deadLine" min="2021-01-01" max="2021-12-31" placeholder={el.deadLine} onChange= {handleUpdate} />
       </div> 
       <div class="input-container">
			<label > State</label>   <br/> 
       <select id="options" name="state" placeholder={el.state} onChange={handleUpdate}>
                      <option value='state'>state</option>
                      <option value='ended'>ended </option>
                      <option value='valid'>valid</option>
                      <option value='In progress'>In progress</option>
                   
                    </select>
                    </div> 
       
       <br/><br/>
	
	
    <div class="text-center">
    <Link to={`/singleProject/${el._id}`}> <a style={{backgroundColor:'grey'}} class="sign-in button" >Cancel</a></Link>
      <Link to={`/singleProject/${match.params._id}`}> <a class="sign-in button" onClick={(e)=>handleUpdateSubmit(e,el._id)}>Update Project</a></Link>
       </div> 
		
	
	</form>

  <h1 style={{color:'white'}}>{project.projectErrors && project.projectErrors._message }</h1>
{/* <Link to={`/singleProject/${el._id}`}>back</Link> */}
</div>  
))}






        </div></div></body>

    )
}

export default UpdateProject
