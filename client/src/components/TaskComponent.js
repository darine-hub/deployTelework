
import {getUsers} from '../redux/userSlice'
import {useState,useEffect} from 'react';
import { useDispatch ,useSelector} from "react-redux";
import { afficheTask, postNewTask } from "../redux/taskSlice";
import '../styleCss/HomePage.css'
import { Link } from '@material-ui/core';
import BarreNavigationHome from './BarreNavigationHome';
import {postNewNotification} from '../redux/notificationSlice'
import { updateProgreeProject } from '../redux/projectSlice';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
const TaskComponent = ({match,history}) => {

  
  const user = useSelector(state => state.user);

  const task = useSelector(state => state.task);

  const project = useSelector(state => state.project);

  const [step, setStep] = useState(1);
  const [notification, setNotification] = useState()

  const nextStep = () => {
    
    if(!taskInput.name){
      NotificationManager.warning('please enter a title for your task!!!')
    }
    else if(!taskInput.description){
      NotificationManager.warning('please enter a description for your task!!!')
    }
    else if(!taskInput.startDate){
      NotificationManager.warning('please enter a start date for your task!!!')
    }
    else if(!taskInput.deadLine){
      NotificationManager.warning('please enter a deadline for your task!!!')
    }
    else{
      setStep(Number(step + 1));
    }
  };

  const prevStep = () => {
    setStep(Number(step - 1));
  };

    const dispatch = useDispatch();
  const [taskInput, setTaskInput] = useState({});

  
  useEffect(() => {
    
    dispatch(afficheTask())
    if(user.isAuth){
        
        dispatch(getUsers())
        
        
    }else{
        history.push('/login')
    }
}, [user.isAuth])

  

  const projectId = match.params.id;


  const handleChange = (e) => {
    setTaskInput({ ...taskInput, [e.target.name]: e.target.value ,"project": projectId});
  };

  const handleSubmit = (e) => {
    const tproj= project.projects.filter(elm=>elm._id === projectId)
    if(tproj[0].state==='ended'||tproj[0].state==='valid'){
dispatch(updateProgreeProject(projectId))

e.preventDefault();
 
     if(!taskInput.employee){
      NotificationManager.warning('please enter a employee for your task!!!')
    }
    else{
      dispatch(postNewTask(taskInput));
      console.log(taskInput)
      setNotification(taskInput._id)
  
      dispatch(postNewNotification({title :'your manager add you in task',message:taskInput.name,receiver:taskInput.employee}))
      history.push(`/singleProject/${projectId}`)
    }
    }
    else{
    e.preventDefault();
 
     if(!taskInput.employee){
      NotificationManager.warning('please enter a employee for your task!!!')
    }
    else{
      dispatch(postNewTask(taskInput));
      console.log(taskInput)
      setNotification(taskInput._id)
  
      dispatch(postNewNotification({title :'your manager add you in task',message:taskInput.name,receiver:taskInput.employee}))
      history.push(`/singleProject/${projectId}`)
    }
  }
   
  };





    return (
      <body>

      <div class="main-container">
        <BarreNavigationHome />
        <NotificationContainer/>
        <div class="middle-container container">

    
<div class="task block">    
<h2 class="mytitular"> ADD TASK</h2><br/>
	<form class="registration-form">
    {step ===1 ? (  <div>
	

    <div class="input-container">
    <label className='label'> Title</label> <br/>
                <input type="text" name="name" placeholder="TITLE" class="password text-input" onChange= {handleChange} />
               
            </div>

            <div class="input-container">
            <label className='label'> Description</label> <br/>
                <input type="text" name="description"  placeholder="DESCRIPTION" class="password text-input" onChange= {handleChange} />
               
            </div>


           
  
 

            <div class="input-container">
            <label className='label'> Start-Date</label> <br/>
                <input   type="date"  name="startDate"  min="2021-01-01" max="2021-12-31"   placeholder="START DATE" class="password text-input" onChange= {handleChange} />
               
            </div>
           
            <div class="input-container">
             <label className='label'> Deadline</label>  <br/>
                <input type="date"  name="deadLine" min="2021-01-01" max="2021-12-31"  placeholder="DEADLINE" class="password text-input" onChange= {handleChange} />
               
            </div>



       <div class="text-center">
       <a class="sign-in button" onClick= {nextStep}>Next</a>
       </div>  
     
    </div>):
    
    ( <div>          
      <div className="employee01"> 
     
      {user.users && user.users.map((el) => (
                   
      <div>

        <img className='task-img' src={el.image}/>
      <input type="radio" value={el._id} name="employee"  onChange={handleChange}/>   {el.firstName} {el.lastName}
      </div>
))} 
        </div>           




       <br/>

		<div class="text-center">
  	<a  style={{backgroundColor:'grey'}} class="sign-in button"  >Cancel</a> 
    <a class="sign-in button" onClick= {prevStep}> Previous</a>
    
		<Link to={`/singleProject/${projectId}`}>	<a class="sign-in button"   onClick={handleSubmit}>Add Task</a></Link>
		</div>
    </div> )}
  
     
	</form>
  </div>
  
  <h1 style={{color:'white'}}>{task.taskErrors && task.taskErrors._message }</h1>

   </div>
</div>
 </body> 
    )
}

export default TaskComponent
