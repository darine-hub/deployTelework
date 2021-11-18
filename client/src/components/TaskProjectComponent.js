import React from "react";
/* import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component'; */
import {
  afficheTask,
  postNewTask,
  updateStateTask,
  updateFinishTask,
  deleteTask,
  deleteManyTask
} from "../redux/taskSlice";
import { getUsers } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { afficheProject, updateStateProject ,finishProject, deleteProject,updateProgreeProject} from "../redux/projectSlice";
import {postNewNotification} from '../redux/notificationSlice'
import { useState, useEffect } from "react";
import detail from "../images/detail.png";
import img from "../images/icon-delete-16.jpg";
import img1 from "../images/update-icon-17.jpg";
import img2 from "../images/validate.jpg";
import { Link } from "react-router-dom";
import "../styleCss/taskProject.css";
import TaskProjectManager from "./TaskProjectManager";
import TaskProjectEmployee from "./TaskProjectEmployee";
import BarreNavigationHome from "./BarreNavigationHome";

import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const TaskProjectComponent = ({match,history}) => {




  const dispatch = useDispatch();


  const project = useSelector((state) => state.project);
  const user = useSelector((state) => state.user);
  const task = useSelector((state) => state.task);
 const [notification, setNotification] = useState()
 

  useEffect(() => {
    dispatch(afficheProject());
    dispatch(getUsers());
    if (user.isAuth) {
      dispatch(afficheTask());
    } else {
      history.push("/login");
    }
  }, [user.isAuth]);

  
  const handleStateUpdate = (idTask) => {
    setNotification(idTask)
    dispatch(updateStateTask(idTask));
    let tasNotification = task.tasks.filter(elm=>elm._id===idTask)
  /*   console.log(tasNotification)
    setNotification({'title' :'valdation task',message:'your manger valid your task',owner:tasNotification[0].owner._id,receiver:tasNotification[0].employee._id}) */

dispatch(postNewNotification({title :'your manager valid your task',message:tasNotification[0].name,receiver:tasNotification[0].employee._id}))

/* if((!task.loading)&&(!task.userErrors)){NotificationManager.success('task valided!')}
else if(task.taskErrors){NotificationManager.error('tray again ! task not valided !')}  */
  };

  const handleFinishUpdate = (idTask) => {
    setNotification(idTask)
    dispatch(updateFinishTask(idTask));
    let tasNotification = task.tasks.filter(elm=>elm._id===idTask)
    let isuser=user.users.filter(elm=>elm._id===user.userInfo._id)
    console.log(isuser)
    if(isuser[0].role === 'Manager'){
      dispatch(postNewNotification({title :'your manager ended your task',message:tasNotification[0].name,receiver:tasNotification[0].employee._id}))
    }else{
      dispatch(postNewNotification({title :'your employee ended task',message:tasNotification[0].name,receiver:tasNotification[0].owner._id}))
    }
     
    //NotificationManager.success('Success message', 'Title here');
    /*  if((!task.loading)&&(!task.userErrors)){NotificationManager.success('task ended!')}
      else if(task.taskErrors){NotificationManager.error('tray again ! task not ended !')}  */
   
  /*  history.push(`/singleProject/${match.params.id}`) */
  };

  const handleDeleteTask = (idTask) => {
    setNotification(idTask)
    if (window.confirm( "you want to delete this task!" ) ) {
      dispatch(deleteTask(idTask));
      let tasNotification = task.tasks.filter(elm=>elm._id===idTask)
      dispatch(postNewNotification({title :'your manager delete your task',message:tasNotification[0].name,receiver:tasNotification[0].employee._id}))
      /* if((!task.loading)&&(!task.taskErrors)){NotificationManager.success('task deleted!')}
      else if(task.taskErrors){NotificationManager.error('tray again ! task not deleted !')} */
    } else {
    alert = "You pressed Cancel!";
  }
 /*  history.push(`/singleProject/${match.params.id}`) */
  }
  const handleDeleteProject = (idProject) => {

    if (window.confirm( "you want to delete this project!" ) ) {
      dispatch(deleteProject(idProject));
      dispatch(deleteManyTask(idProject));
/*       if((!project.loading)&&(!project.projectErrors)){NotificationManager.success('project deleted !')}
      else if(project.projectErrors){NotificationManager.error('tray again ! project not deleted !')}  */
  } else {
    alert = "You pressed Cancel!";
  }
  history.push(`/singleProject/${match.params.id}`)
   
  };

  const handleStateProjectUpdate = (idProject) => {
    let filtredTasks = task.tasks.filter(task=>task.project._id===idProject).map(elm=>elm.state)
    let exist = filtredTasks.includes('ended')

    if (exist=== true) {
      NotificationManager.warning('you do not validate this projects there are still invalid tasks!')
    }
    else{
    dispatch(updateStateProject(idProject));
    /* if((!project.loading)&&(!project.projectErrors)){NotificationManager.success('project valided!')}
    else if(project.projectErrors){NotificationManager.error('tray again ! project not valided !')} */
    }
   
   
  };

  const handleFinishProject = (idProject) => {
    let filtredTasks = task.tasks.filter(task=>task.project._id===idProject).map(elm=>elm.state)
     let exist = filtredTasks.includes('In progress')
  
     if (exist=== true) {
      NotificationManager.warning(' you do not finish this project there are still unfinished tasks!')
     }
     else{
      dispatch(finishProject(idProject));
     /*  if((!project.loading)&&(!project.projectErrors)){NotificationManager.success('project ended!')}
      else if(project.projectErrors){NotificationManager.error('tray again ! project not ended !')} */
     }
   
    
  };

  /* const [notificationInput, setNotificationInput] = useState({});
  const handleChange = (e) => {
    setProjectInput({ ...notificationInput, [e.target.name]: e.target.value });
  };
console.log (projectInput)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postNewProjt(projectInput));
   
  }; */
/*   const handleClickDefault=()=>{
      
    store.addNotification({
       //content:MyNotify,
       title:'titre1',
       message:project.successMessage, 
        type:'info',
        container:'center',
        insert:'top',
        animationIn:['animated','fadeIn'],
        animationOut:['animated','fadeout'], 
         dismiss:{
             duration:80000,
          showIcon:true
        }, 
        width:600
    })
}
 */



  
  return (
    <body>
     {/*  <ReactNotification /> */}
     


     
      <div class="main-container">
       <NotificationContainer/> 
      <center>      <h4 style={{color:'green'}}> {project && project.successMessage&&  project.successMessage}  </h4>  </center> 	
<center>	<h4 style={{color:'red'}}>{project.projectErrors && project.projectErrors }</h4></center>  


<center>      <h4 style={{color:'green'}}> {task && task.successMessage&&  task.successMessage}  </h4>  </center> 	
<center>	<h4 style={{color:'red'}}>{task.taskErrors && task.taskErrors }</h4></center>





<BarreNavigationHome notif={notification}/>
        
 <div class="listProject">
 {user.users &&
                user.users.filter(elId => elId._id === user.userInfo._id).map((elm)=>{
return elm.role==='Manager'?
<div>


{project.projects &&
  project.projects
    .filter((elm) => elm._id == match.params.id )
    .map((proj) => {
      return proj.state === "valid" ? (
        <div class="">
          <div class="row">
            <div class="col-md-offset-1 col-md-10">
              <div
                class="panel"
                style={{ backgroundColor: "rgb(233, 231, 253)" }}
              >
                <div class="panel-heading">
                  <div class="row">
                    <div class="col col-sm-3 col-xs-12">
                      <h4 class="title">
                        Data <span  >Project</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="panel-body table-responsive">
                  <table class="table">
                    <thead style={{ backgroundColor: "#50597b" }}>
                      <tr>
                        <th style={{ color: "white" }}>Manager</th>
                        <th style={{ color: "white" }}>Titre</th>
                        <th style={{ color: "white" }}>
                          Description
                        </th>
                        <th style={{ color: "white" }}>Start-Date</th>
                        <th style={{ color: "white" }}>Deadline</th>
                        <th style={{ color: "white" }}>state</th>
                      </tr>
                    </thead>

                    {project.projects &&
                      project.projects
                        .filter(
                          (project) => project._id == match.params.id
                        )
                        .map((elm) => (
                          <tbody style={{ backgroundColor: "rgb(200, 247, 220)" }}>
                            <tr>
                              <td>
                                <img
                                  className="image"
                                  src={elm.owner.image}
                                />{" "}
                                {elm.owner.firstName}{" "}
                                {elm.owner.lastName}
                              </td>
                              <td>{elm.title}</td>
                              <td>{elm.description}</td>
                              <td>{new Date (elm.startDate).getDate() + '/'+ parseInt(new Date (elm.startDate).getMonth()+1) + '/'+new Date (elm.startDate).getFullYear()}</td>
                              <td>{new Date (elm.deadLine).getDate() + '/'+ parseInt(new Date (elm.deadLine).getMonth()+1) + '/'+new Date (elm.deadLine).getFullYear()}</td>
                              <td>{elm.state}</td>
                              <td>
                                <ul class="action-list">
                                 <Link to={`/updateProject/${elm._id}`}> <li class="tool">
                                 <span class="toolti">Edit</span>
                                 <i class="icon entypo-pencil scnd-font-color"></i>{" "}
                                   
                                  </li></Link>
                                  
   
                                 

                                 <Link to={`/task/${elm._id}`}> <li class="tool">
                                 <span class="toolti">Add</span>
                                      <i class="icon entypo-plus-squared scnd-font-color"></i>{" "}
                                   
                                  </li></Link>
                                  <Link to={'/listProject'}> <li class="tool"
                                  onClick={() =>
                                    handleDeleteProject(elm._id)
                                  }
                                >
                                  <span class="toolti">Delete</span>
                                  <i class="icon entypo-trash scnd-font-color"></i>
                                 
                                </li></Link>
                                </ul>
                              </td>
                            </tr>
                          </tbody>
                        ))}
                  </table>
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />

          <div class="row">
            <div class="col-md-offset-1 col-md-10">
              <div
                class="panel"
                style={{ backgroundColor: "rgb(233, 231, 253)" }}
              >
                <div class="panel-heading">
                  <div class="row">
                    <div class="col col-sm-3 col-xs-12">
                      <h4 class="title">
                        Data <span >Task</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="panel-body table-responsive">
                  <table class="table">
                    <thead style={{ backgroundColor: "#50597b" }}>
                      <tr>
                        <th style={{ color: "white" }}>Employee</th>
                        <th style={{ color: "white" }}>Title</th>
                        <th style={{ color: "white" }}>
                          Description
                        </th>
                        <th style={{ color: "white" }}>Start-Date</th>
                        <th style={{ color: "white" }}>Deadline</th>
                        <th style={{ color: "white" }}>State</th>
                      </tr>
                    </thead>
                    {task.tasks &&
                      task.tasks
                        .filter(
                          (elId) =>
                            elId.project._id === match.params.id
                        )
                        .map((el) => (
                  
                          <tbody style={{ backgroundColor: "rgb(200, 247, 220)" }}>
                          <tr>
                            <td>
                              <img
                                className="image"
                                src={el.employee.image}
                              />{" "}
                              {el.employee.firstName}{" "}
                              {el.employee.lastName}{" "}
                            </td>
                            <td>{el.name}</td>
                            <td> {el.description} </td>
                            <td>{new Date (el.startDate).getDate() + '/'+ parseInt(new Date (el.startDate).getMonth()+1) + '/'+new Date (el.startDate).getFullYear()}</td>
                            <td>{new Date (el.deadLine).getDate() + '/'+ parseInt(new Date (el.deadLine).getMonth()+1) + '/'+new Date (el.deadLine).getFullYear()}</td>
                            <td> {el.state}</td>
                            <td>
                              <ul class="action-list">
                               <Link to={`/updateTask/${el._id}`}><li class="tool">
                               <span class="toolti">Edit</span>
                               <i class="icon entypo-pencil scnd-font-color"></i>{" "}
                                
                                </li></Link>
                                 <li class="tool"
                                  onClick={() =>
                                    handleDeleteTask(el._id)
                                  }
                                >
                                 <span class="toolti">Delete</span>
                                  <i class="icon entypo-trash scnd-font-color"></i>
                                
                                </li> 
                               
                              </ul>
                            </td>
                          </tr>
                        </tbody>
                         ) )}




                        
                         
                       
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : proj.state === "ended" ? (
        <div class="">
          <div class="row">
            <div class="col-md-offset-1 col-md-10">
              <div
                class="panel"  style={{ backgroundColor: "rgb(233, 231, 253)" }}
              
              >
                <div class="panel-heading">
                  <div class="row">
                    <div class="col col-sm-3 col-xs-12">
                      <h4 class="title">
                        Data <span >Project</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="panel-body table-responsive">
                  <table class="table">
                    <thead style={{ backgroundColor: "#50597b" }}>
                      <tr>
                        <th style={{ color: "white" }}>Manager</th>
                        <th style={{ color: "white" }}>Titre</th>
                        <th style={{ color: "white" }}>
                          Description
                        </th>
                        <th style={{ color: "white" }}>Start-Date</th>
                        <th style={{ color: "white" }}>Deadline</th>
                        <th style={{ color: "white" }}>state</th>
                      </tr>
                    </thead>

                    {project.projects &&
                      project.projects
                        .filter(
                          (project) => project._id == match.params.id
                        )
                        .map((elm) => (
                          <tbody   style={{ backgroundColor: "rgb(254, 228, 203)" }}>
                            <tr>
                              <td>
                                <img
                                  className="image"
                                  src={elm.owner.image}
                                />{" "}
                                {elm.owner.firstName}{" "}
                                {elm.owner.lastName}
                              </td>
                              <td>{elm.title}</td>
                              <td>{elm.description}</td>
                              <td>{new Date (elm.startDate).getDate() + '/'+ parseInt(new Date (elm.startDate).getMonth()+1) + '/'+new Date (elm.startDate).getFullYear()}</td>
                              <td>{new Date (elm.deadLine).getDate() + '/'+ parseInt(new Date (elm.deadLine).getMonth()+1) + '/'+new Date (elm.deadLine).getFullYear()}</td>
                              <td>{elm.state}</td>
                              <td>
                                <ul class="action-list">
                                <Link to={`/updateProject/${elm._id}`}> 
                                  <li class="tool">
                                   
                                  <span class="toolti">Edit</span>
                                  <i class="icon entypo-pencil scnd-font-color"></i>{" "}
                                 
                                  </li></Link>
                               
                                  
                                
                                  <li class="tool"
                                    onClick={() =>
                                      handleStateProjectUpdate (elm._id)
                                    }
                                  >
                                     <span class="toolti">Valid</span>
                                    <i  style={{ color: "green" }} class="icon entypo-check scnd-font-color"></i>{" "}
                                
                                   
                                  </li>

                                 <Link to={`/task/${elm._id}`}> <li class="tool">
                                  
                                 <span class="toolti">Add</span>
                                      <i class="icon entypo-plus-squared scnd-font-color"></i>{" "}
                                   
                                  </li></Link>
                                  <Link to={'/listProject'}>  <li class="tool"
                                  onClick={() =>
                                    handleDeleteProject(elm._id)
                                  }
                                >
                                <span class="toolti">Delete</span>
                                  <i class="icon entypo-trash scnd-font-color"></i>
                                 
                                </li></Link>
                                </ul>
                              </td>
                              
                            </tr>
                          </tbody>
                        ))}
                  </table>
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />

          <div class="row">
            <div class="col-md-offset-1 col-md-10">
              <div
                class="panel"
                style={{ backgroundColor: "rgb(233, 231, 253)" }}
              >
                <div class="panel-heading">
                  <div class="row">
                    <div class="col col-sm-3 col-xs-12">
                      <h4 class="title">
                        Data <span >Task</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="panel-body table-responsive">
                  <table class="table">
                    <thead style={{ backgroundColor: "#50597b" }}>
                      <tr>
                        <th style={{ color: "white" }}>Employee</th>
                        <th style={{ color: "white" }}>Title</th>
                        <th style={{ color: "white" }}>
                          Description
                        </th>
                        <th style={{ color: "white" }}>Start-Date</th>
                        <th style={{ color: "white" }}>Deadline</th>
                        <th style={{ color: "white" }}>State</th>
                      </tr>
                    </thead>
                    {task.tasks &&
                      task.tasks
                        .filter(
                          (elId) =>
                          elId.project._id === match.params.id
                        )
                        .map((el) => {
                         
                          return  el.state==='ended'?

<tbody  style={{ backgroundColor: "rgb(254, 228, 203)" }}>
                            <tr>
                              <td>
                              <img
                                  className="image"
                                  src={el.employee.image}
                                />{" "}
                                {el.employee.firstName}{" "}
                                {el.employee.lastName}{" "}
                              </td>
                              <td>{el.name}</td>
                              <td> {el.description} </td>
                              <td>{new Date (el.startDate).getDate() + '/'+ parseInt(new Date (el.startDate).getMonth()+1) + '/'+new Date (el.startDate).getFullYear()}</td>
                              <td>{new Date (el.deadLine).getDate() + '/'+ parseInt(new Date (el.deadLine).getMonth()+1) + '/'+new Date (el.deadLine).getFullYear()}</td>
                              <td> {el.state}</td>
                              <td>
         <ul class="action-list">
   <li class="tool"
                                    onClick={() =>
                                      handleStateUpdate (el._id)
                                    }
                                  >
                                    <span class="toolti">Valid</span>
                                  
                                   <i  style={{ color: "green" }} class="icon entypo-check scnd-font-color"></i>{" "}
                                
                                  </li>
         <Link to={`/updateTask/${el._id}`}>  <li class="tool">
         <span class="toolti">Edit</span>
         <i class="icon entypo-pencil scnd-font-color"></i>{" "}
          
           </li></Link>
          <li class="tool"
             onClick={() =>
               handleDeleteTask(el._id)
             }
           >
             <span class="toolti">Delete</span>
             <i class="icon entypo-trash scnd-font-color"></i>
           
           </li>
         
         
     
         </ul>
       </td>
                             
                            </tr>
                          </tbody>:



<tbody  style={{ backgroundColor: "rgb(200, 247, 220)" }}>
                            <tr>
                              <td>
                              <img
                                  className="image"
                                  src={el.employee.image}
                                />{" "}
                                {el.employee.firstName}{" "}
                                {el.employee.lastName}{" "}
                              </td>
                              <td>{el.name}</td>
                              <td> {el.description} </td>
                              <td>{new Date (el.startDate).getDate() + '/'+ parseInt(new Date (el.startDate).getMonth()+1) + '/'+new Date (el.startDate).getFullYear()}</td>
                              <td>{new Date (el.deadLine).getDate() + '/'+ parseInt(new Date (el.deadLine).getMonth()+1) + '/'+new Date (el.deadLine).getFullYear()}</td>
                              <td> {el.state}</td>
                              <td>
         <ul class="action-list">
         <Link to={`/updateTask/${el._id}`} > <li class="tool">
         <span class="toolti">Edit</span>
         <i class="icon entypo-pencil scnd-font-color"></i>{" "}
            
           </li></Link>
           <li class="tool"
             onClick={() =>
               handleDeleteTask(el._id)
             }
           >
             <span class="toolti">Delete</span>
             <i class="icon entypo-trash scnd-font-color"></i>
           
           </li>
         
         
     
         </ul>
       </td>
                             
                            </tr>
                          </tbody>


                        }


                        )}
       

                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div class="">
          <div class="row">
            <div class="col-md-offset-1 col-md-10">
              <div
                class="panel"
                style={{ backgroundColor: "rgb(233, 231, 253)" }}
              >
                <div class="panel-heading">
                  <div class="row">
                    <div class="col col-sm-3 col-xs-12">
                      <h4 class="title">
                        Data <span>Project</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="panel-body table-responsive">
                  <table class="table">
                    <thead style={{ backgroundColor: "#50597b" }}>
                      <tr>
                        <th style={{ color: "white" }}> Manager</th>
                        <th style={{ color: "white" }}>Titre</th>
                        <th style={{ color: "white" }}>
                          Description
                        </th>
                        <th style={{ color: "white" }}>Start-Date</th>
                        <th style={{ color: "white" }}>Deadline</th>
                        <th style={{ color: "white" }}>state</th>
                      </tr>
                    </thead>

                    {project.projects &&
                      project.projects
                        .filter(
                          (project) => project._id == match.params.id
                        )
                        .map((elm) => (
                          <tbody>
                            <tr>
                              <td>
                                <img
                                  className="image"
                                  src={elm.owner.image}
                                />{" "}
                                {elm.owner.firstName}{" "}
                                {elm.owner.lastName}
                              </td>
                              <td>{elm.title}</td>
                              <td>{elm.description}</td>
                              <td>{new Date (elm.startDate).getDate() + '/'+ parseInt(new Date (elm.startDate).getMonth()+1) + '/'+new Date (elm.startDate).getFullYear()}</td>
                              <td>{new Date (elm.deadLine).getDate() + '/'+ parseInt(new Date (elm.deadLine).getMonth()+1) + '/'+new Date (elm.deadLine).getFullYear()}</td>
                              <td>{elm.state}</td>
                              <td>
                                <ul class="action-list">
                                <Link to={`/updateProject/${elm._id}`}>  <li class="tool">
                                <span class="toolti">Edit</span>
                                <i class="icon entypo-pencil scnd-font-color"></i>{" "}
                                  
                                  </li></Link>
                                 
                                  
                                
                                  <li class="tool"
                                    onClick={() =>handleFinishProject(elm._id)
                                    }
                                  >
                                    <span class="toolti">Finish</span>
                                   <i class="icon entypo-flag scnd-font-color"></i>{" "}
                                 
                                  </li>

                                <Link to={`/task/${elm._id}`} > <li class="tool">
                                   
                                <span class="toolti">Add</span>
                                    
                                      <i class="icon entypo-plus-squared scnd-font-color"></i>{" "}
                                   
                                   
                                  </li></Link>
                                  <Link to={'/listProject'}>  <li class="tool"
                                  onClick={() =>
                                    handleDeleteProject(elm._id)
                                  }
                                >
                                  <span class="toolti">Delete</span>
                                  <i class="icon entypo-trash scnd-font-color"></i>
                               
                                </li></Link>
                                </ul>
                              </td>
                            </tr>
                          </tbody>
                        ))}
                  </table>
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />

          <div class="row">
            <div class="col-md-offset-1 col-md-10">
              <div
                class="panel"
                style={{ backgroundColor: "rgb(233, 231, 253)" }}
              >
                <div class="panel-heading">
                  <div class="row">
                    <div class="col col-sm-3 col-xs-12">
                      <h4 class="title">
                        Data <span>Task</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="panel-body table-responsive">
                  <table class="table">
                    <thead style={{ backgroundColor: "#50597b" }}>
                      <tr>
                        <th style={{ color: "white" }}>Employee</th>
                        <th style={{ color: "white" }}>Title</th>
                        <th style={{ color: "white" }}>
                          Description
                        </th>
                        <th style={{ color: "white" }}>Start-Date</th>
                        <th style={{ color: "white" }}>Deadline</th>
                        <th style={{ color: "white" }}>State</th>
                      </tr>
                    </thead>
                    {task.tasks &&
                      task.tasks
                        .filter(
                          (elId) =>
                            elId.project._id === match.params.id
                        )
                        .map((el) => {   
     return el.state==='valid'?
     <tbody style={{ backgroundColor: "rgb(200, 247, 220)" }}> 
     <tr>
       <td>
         <img
           className="image"
           src={el.employee.image}
         />{" "}
         {el.employee.firstName}{" "}
         {el.employee.lastName}{" "}
       </td>
       <td>{el.name}</td>
       <td> {el.description} </td>
       <td>{new Date (el.startDate).getDate() + '/'+ parseInt(new Date (el.startDate).getMonth()+1) + '/'+new Date (el.startDate).getFullYear()}</td>
                              <td>{new Date (el.deadLine).getDate() + '/'+ parseInt(new Date (el.deadLine).getMonth()+1) + '/'+new Date (el.deadLine).getFullYear()}</td>
       <td> {el.state}</td>
       <td>
         <ul class="action-list">
         <Link to={`/updateTask/${el._id}`} > <li class="tool">
         <span class="toolti">Edit</span>
         <i class="icon entypo-pencil scnd-font-color"></i>{" "}
            
           </li></Link>
           <li class="tool"
             onClick={() =>
               handleDeleteTask(el._id)
             }
           >
             <span class="toolti">Delete</span>
             <i class="icon entypo-trash scnd-font-color"></i>
          
           </li>
         
         
     
         </ul>
       </td>
     </tr>
   </tbody>
                         :el.state==='ended'?
                         <tbody style={{ backgroundColor: "rgb(254, 228, 203)" }}> 
                            <tr>
                              <td>
                                <img
                                  className="image"
                                  src={el.employee.image}
                                />{" "}
                                {el.employee.firstName}{" "}
                                {el.employee.lastName}{" "}
                              </td>
                              <td>{el.name}</td>
                              <td> {el.description} </td>
                              <td>{new Date (el.startDate).getDate() + '/'+ parseInt(new Date (el.startDate).getMonth()+1) + '/'+new Date (el.startDate).getFullYear()}</td>
                              <td>{new Date (el.deadLine).getDate() + '/'+ parseInt(new Date (el.deadLine).getMonth()+1) + '/'+new Date (el.deadLine).getFullYear()}</td>
                              <td> {el.state}</td>
                              <td>
                                <ul class="action-list">
                                 <Link to={`/updateTask/${el._id}`} ><li class="tool">
                                 <span class="toolti">Edit</span>
                                 <i class="icon entypo-pencil scnd-font-color"></i>{" "}
                                  
                                  </li></Link>
                               <li class="tool"
                                    onClick={() =>
                                      handleStateUpdate (el._id)
                                    }
                                  >
                                    <span class="toolti">Valid</span>
                                   <i  style={{ color: "green" }} class="icon entypo-check scnd-font-color"></i>{" "}
                                 
                                  </li>
                                 <li class="tool"
                                    onClick={() =>
                                      handleDeleteTask(el._id)
                                    }
                                  >
                                   <span class="toolti">Delete</span>
                                    <i class="icon entypo-trash scnd-font-color"></i>
                                  
                                  </li>
                            {/*       <li
                                    onClick={() =>
                                      handleFinishUpdate(el._id)
                                    }
                                  >
                                    <a href="" data-tip="finish">
                                      {" "}
                                      <i class="fa fa-check-square-o"></i>
                                    </a>
                                  </li> */}
                      
                                </ul>
                              </td>
                            </tr>
                          </tbody>
                         
                         
                        : <tbody> 
                            <tr>
                              <td>
                                <img
                                  className="image"
                                  src={el.employee.image}
                                />{" "}
                                {el.employee.firstName}{" "}
                                {el.employee.lastName}{" "}
                              </td>
                              <td>{el.name}</td>
                              <td> {el.description} </td>
                              <td>{new Date (el.startDate).getDate() + '/'+ parseInt(new Date (el.startDate).getMonth()+1) + '/'+new Date (el.startDate).getFullYear()}</td>
                              <td>{new Date (el.deadLine).getDate() + '/'+ parseInt(new Date (el.deadLine).getMonth()+1) + '/'+new Date (el.deadLine).getFullYear()}</td>
                              <td> {el.state}</td>
                              <td>
                                <ul class="action-list">
                                 <Link to={`/updateTask/${el._id}`}> <li class="tool">
                                 <span class="toolti">Edit</span>
                                 <i class="icon entypo-pencil scnd-font-color"></i>{" "}
                                  
                                  </li></Link>
                           
                                  <li class="tool"
                                    onClick={() =>
                                      handleFinishUpdate(el._id)
                                    }
                                  >
                                
                                <span class="toolti">Finish</span>
                                      <i class="icon entypo-flag scnd-font-color"></i>{" "}
                                  
                                  </li> 
                                       <li class="tool"
                                    onClick={() =>
                                      handleDeleteTask(el._id)
                                    }
                                  >
                                    <span class="toolti">Delete</span>
                                    <i class="icon entypo-trash scnd-font-color"></i>
                                  
                                  </li>
                         
                                </ul>
                              </td>
                            </tr>
                          </tbody>

                        }
                          
                        )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })}
</div>

/****************************************************************** */


:

<div>


{project.projects &&
  project.projects
    .filter((elm) => elm._id == match.params.id)
    .map((proj) => {
      return proj.state === "valid" ? (
        <div class="">
          <div class="row">
            <div class="col-md-offset-1 col-md-10">
            <div
                class="panel"
                style={{ backgroundColor: "rgb(233, 231, 253)" }}
              >
                <div class="panel-heading">
                  <div class="row">
                    <div class="col col-sm-3 col-xs-12">
                      <h4 class="title">
                        Data <span  >Project</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="panel-body table-responsive">
                  <table class="table">
                    <thead style={{ backgroundColor: "#50597b" }}>
                      <tr>
                        <th style={{ color: "white" }}>Manager</th>
                        <th style={{ color: "white" }}>Titre</th>
                        <th style={{ color: "white" }}>
                          Description
                        </th>
                        <th style={{ color: "white" }}>Start-Date</th>
                        <th style={{ color: "white" }}>Deadline</th>
                        <th style={{ color: "white" }}>state</th>
                      </tr>
                    </thead>

                    {project.projects &&
                      project.projects
                        .filter(
                          (project) => project._id == match.params.id
                        )
                        .map((elm) => (
                          <tbody style={{ backgroundColor: "rgb(200, 247, 220)" }}>
                            <tr>
                              <td>
                                <img
                                  className="image"
                                  src={elm.owner.image}
                                />{" "}
                                {elm.owner.firstName}{" "}
                                {elm.owner.lastName}
                              </td>
                              <td>{elm.title}</td>
                              <td>{elm.description}</td>
                              <td>{new Date (elm.startDate).getDate() + '/'+ parseInt(new Date (elm.startDate).getMonth()+1) + '/'+new Date (elm.startDate).getFullYear()}</td>
                              <td>{new Date (elm.deadLine).getDate() + '/'+ parseInt(new Date (elm.deadLine).getMonth()+1) + '/'+new Date (elm.deadLine).getFullYear()}</td>
                              <td>{elm.state}</td>
                             
                            </tr>
                          </tbody>
                        ))}
                  </table>
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />

          <div class="row">
            <div class="col-md-offset-1 col-md-10">
            <div
                class="panel"
                style={{ backgroundColor: "rgb(233, 231, 253)" }}
              >
                <div class="panel-heading">
                  <div class="row">
                    <div class="col col-sm-3 col-xs-12">
                      <h4 class="title">
                        Data <span >Task</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="panel-body table-responsive">
                  <table class="table">
                    <thead style={{ backgroundColor: "#50597b" }}>
                      <tr>
                        <th style={{ color: "white" }}>Employee</th>
                        <th style={{ color: "white" }}>Title</th>
                        <th style={{ color: "white" }}>
                          Description
                        </th>
                        <th style={{ color: "white" }}>Start-Date</th>
                        <th style={{ color: "white" }}>Deadline</th>
                        <th style={{ color: "white" }}>State</th>
                      </tr>
                    </thead>
                    {task.tasks &&
                      task.tasks
                        .filter(
                          (elId) =>
                            elId.project._id === match.params.id 
                        )
                        .map((el) => (
                          <tbody style={{ backgroundColor: "rgb(200, 247, 220)" }}>
                            <tr>

                            <td>
                                <img
                                  className="image"
                                  src={el.employee.image}
                                />{" "}
                                {el.employee.firstName}{" "}
                                {el.employee.lastName}{" "}
                              </td>                              
                             
                             
                              <td>{el.name}</td>
                              <td> {el.description} </td>
                              <td>{new Date (el.startDate).getDate() + '/'+ parseInt(new Date (el.startDate).getMonth()+1) + '/'+new Date (el.startDate).getFullYear()}</td>
                              <td>{new Date (el.deadLine).getDate() + '/'+ parseInt(new Date (el.deadLine).getMonth()+1) + '/'+new Date (el.deadLine).getFullYear()}</td>
                              <td> {el.state}</td>
                              
                            </tr>
                          </tbody>
                        ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : proj.state === "ended" ? (
        <div class="">
          <div class="row">
            <div class="col-md-offset-1 col-md-10">
            <div
                class="panel"
                style={{ backgroundColor: "rgb(233, 231, 253)" }}
              >
                <div class="panel-heading">
                  <div class="row">
                    <div class="col col-sm-3 col-xs-12">
                      <h4 class="title">
                        Data <span  >Project</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="panel-body table-responsive">
                  <table class="table">
                    <thead style={{ backgroundColor: "#50597b" }}>
                      <tr>
                        <th style={{ color: "white" }}>Manager</th>
                        <th style={{ color: "white" }}>Titre</th>
                        <th style={{ color: "white" }}>
                          Description
                        </th>
                        <th style={{ color: "white" }}>Start-Date</th>
                        <th style={{ color: "white" }}>Deadline</th>
                        <th style={{ color: "white" }}>state</th>
                      </tr>
                    </thead>

                    {project.projects &&
                      project.projects
                        .filter(
                          (project) => project._id == match.params.id
                        )
                        .map((elm) => (
                          <tbody   style={{ backgroundColor: "rgb(254, 228, 203)" }}>
                            <tr>
                              <td>
                                <img
                                  className="image"
                                  src={elm.owner.image}
                                />{" "}
                                {elm.owner.firstName}{" "}
                                {elm.owner.lastName}
                              </td>
                              <td>{elm.title}</td>
                              <td>{elm.description}</td>
                              <td>{new Date (elm.startDate).getDate() + '/'+ parseInt(new Date (elm.startDate).getMonth()+1) + '/'+new Date (elm.startDate).getFullYear()}</td>
                              <td>{new Date (elm.deadLine).getDate() + '/'+ parseInt(new Date (elm.deadLine).getMonth()+1) + '/'+new Date (elm.deadLine).getFullYear()}</td>
                              <td>{elm.state}</td>
                              
                            </tr>
                          </tbody>
                        ))}
                  </table>
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />

          <div class="row">
            <div class="col-md-offset-1 col-md-10">
            <div
                class="panel"
                style={{ backgroundColor: "rgb(233, 231, 253)" }}
              >
                <div class="panel-heading">
                  <div class="row">
                    <div class="col col-sm-3 col-xs-12">
                      <h4 class="title">
                        Data <span >Task</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="panel-body table-responsive">
                  <table class="table">
                    <thead style={{ backgroundColor: "#50597b" }}>
                      <tr>
                        <th style={{ color: "white" }}>Employee</th>
                        <th style={{ color: "white" }}>Title</th>
                        <th style={{ color: "white" }}>
                          Description
                        </th>
                        <th style={{ color: "white" }}>Start-Date</th>
                        <th style={{ color: "white" }}>Deadline</th>
                        <th style={{ color: "white" }}>State</th>
                      </tr>
                    </thead>
                    {task.tasks &&
                      task.tasks
                        .filter(
                          (elId) =>
                          elId.project._id === match.params.id 
                        )
                        .map((el) => {


                          return el.state ==='valid'?
                        
                        <tbody  style={{ backgroundColor: "rgb(200, 247, 220)" }}>
                            <tr>
                            <td>
                                <img
                                  className="image"
                                  src={el.employee.image}
                                />{" "}
                                {el.employee.firstName}{" "}
                                {el.employee.lastName}{" "}
                              </td>  
                              <td>{el.name}</td>
                              <td> {el.description} </td>
                              <td>{new Date (el.startDate).getDate() + '/'+ parseInt(new Date (el.startDate).getMonth()+1) + '/'+new Date (el.startDate).getFullYear()}</td>
                              <td>{new Date (el.deadLine).getDate() + '/'+ parseInt(new Date (el.deadLine).getMonth()+1) + '/'+new Date (el.deadLine).getFullYear()}</td>
                              <td> {el.state}</td>
                             
                            </tr>
                          </tbody>

                         :el.state==='ended'?

<tbody  style={{ backgroundColor: "rgb(254, 228, 203)" }}>
                            <tr>
                            <td>
                                <img
                                  className="image"
                                  src={el.employee.image}
                                />{" "}
                                {el.employee.firstName}{" "}
                                {el.employee.lastName}{" "}
                              </td>  
                              <td>{el.name}</td>
                              <td> {el.description} </td>
                              <td>{new Date (el.startDate).getDate() + '/'+ parseInt(new Date (el.startDate).getMonth()+1) + '/'+new Date (el.startDate).getFullYear()}</td>
                              <td>{new Date (el.deadLine).getDate() + '/'+ parseInt(new Date (el.deadLine).getMonth()+1) + '/'+new Date (el.deadLine).getFullYear()}</td>
                              <td> {el.state}</td>
                              
                            </tr>
                          </tbody>
                         :<tbody></tbody>
                         
                         
                         })}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div class="">
          <div class="row">
            <div class="col-md-offset-1 col-md-10">
            <div
                class="panel"  style={{ backgroundColor: "rgb(233, 231, 253)" }}
              
              >
                <div class="panel-heading">
                  <div class="row">
                    <div class="col col-sm-3 col-xs-12">
                      <h4 class="title">
                        Data <span >Project</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="panel-body table-responsive">
                  <table class="table">
                    <thead style={{ backgroundColor: "#50597b" }}>
                      <tr>
                        <th style={{ color: "white" }}>Manager</th>
                        <th style={{ color: "white" }}>Titre</th>
                        <th style={{ color: "white" }}>
                          Description
                        </th>
                        <th style={{ color: "white" }}>Start-Date</th>
                        <th style={{ color: "white" }}>Deadline</th>
                        <th style={{ color: "white" }}>state</th>
                      </tr>
                    </thead>

                    {project.projects &&
                      project.projects
                        .filter(
                          (project) => project._id == match.params.id
                        )
                        .map((elm) => (
                          <tbody>
                            <tr>
                              <td>
                                <img
                                  className="image"
                                  src={elm.owner.image}
                                />{" "}
                                {elm.owner.firstName}{" "}
                                {elm.owner.lastName}
                              </td>
                              <td>{elm.title}</td>
                              <td>{elm.description}</td>
                              <td>{new Date (elm.startDate).getDate() + '/'+ parseInt(new Date (elm.startDate).getMonth()+1) + '/'+new Date (elm.startDate).getFullYear()}</td>
                              <td>{new Date (elm.deadLine).getDate() + '/'+ parseInt(new Date (elm.deadLine).getMonth()+1) + '/'+new Date (elm.deadLine).getFullYear()}</td>
                              <td>{elm.state}</td>
                             
                            </tr>
                          </tbody>
                        ))}
                  </table>
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />

          <div class="row">
            <div class="col-md-offset-1 col-md-10">
            <div
                class="panel"
                style={{ backgroundColor: "rgb(233, 231, 253)" }}
              >
                <div class="panel-heading">
                  <div class="row">
                    <div class="col col-sm-3 col-xs-12">
                      <h4 class="title">
                        Data <span >Task</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="panel-body table-responsive">
                  <table class="table">
                    <thead style={{ backgroundColor: "#50597b" }}>
                      <tr>
                        <th style={{ color: "white" }}>Employee</th>
                        <th style={{ color: "white" }}>Title</th>
                        <th style={{ color: "white" }}>
                          Description
                        </th>
                        <th style={{ color: "white" }}>Start-Date</th>
                        <th style={{ color: "white" }}>Deadline</th>
                        <th style={{ color: "white" }}>State</th>
                      </tr>
                    </thead>
                    {task.tasks &&
                      task.tasks
                        .filter(
                          (elId) =>
                          elId.project._id === match.params.id 
                        )
                        .map((el) => {


                          return el.state ==='valid'?
                        
                        <tbody  style={{ backgroundColor: "rgb(200, 247, 220)" }}>
                            <tr>
                            <td>
                                <img
                                  className="image"
                                  src={el.employee.image}
                                />{" "}
                                {el.employee.firstName}{" "}
                                {el.employee.lastName}{" "}
                              </td>  
                              <td>{el.name}</td>
                              <td> {el.description} </td>
                              <td>{new Date (el.startDate).getDate() + '/'+ parseInt(new Date (el.startDate).getMonth()+1) + '/'+new Date (el.startDate).getFullYear()}</td>
                              <td>{new Date (el.deadLine).getDate() + '/'+ parseInt(new Date (el.deadLine).getMonth()+1) + '/'+new Date (el.deadLine).getFullYear()}</td>
                              <td> {el.state}</td>
                             
                            </tr>
                          </tbody>

                         :el.state==='ended'?

<tbody  style={{ backgroundColor: "rgb(254, 228, 203)" }}>
                            <tr>
                            <td>
                                <img
                                  className="image"
                                  src={el.employee.image}
                                />{" "}
                                {el.employee.firstName}{" "}
                                {el.employee.lastName}{" "}
                              </td>  
                              <td>{el.name}</td>
                              <td> {el.description} </td>
                              <td>{new Date (el.startDate).getDate() + '/'+ parseInt(new Date (el.startDate).getMonth()+1) + '/'+new Date (el.startDate).getFullYear()}</td>
                              <td>{new Date (el.deadLine).getDate() + '/'+ parseInt(new Date (el.deadLine).getMonth()+1) + '/'+new Date (el.deadLine).getFullYear()}</td>
                              <td> {el.state}</td>
                              
                            </tr>
                          </tbody>
                         :
                          <tbody>
                            <tr>
                            <td>
                                <img
                                  className="image"
                                  src={el.employee.image}
                                />{" "}
                                {el.employee.firstName}{" "}
                                {el.employee.lastName}{" "}
                              </td>  
                              <td>{el.name}</td>
                              <td> {el.description} </td>
                              <td>{new Date (el.startDate).getDate() + '/'+ parseInt(new Date (el.startDate).getMonth()+1) + '/'+new Date (el.startDate).getFullYear()}</td>
                              <td>{new Date (el.deadLine).getDate() + '/'+ parseInt(new Date (el.deadLine).getMonth()+1) + '/'+new Date (el.deadLine).getFullYear()}</td>
                              <td> {el.state}</td>
                              <td>
                                {el.employee._id===user.userInfo._id?
                              <ul class="action-list">
                             
                            
                              <li class="tool"
                                  onClick={() =>
                                    handleFinishUpdate(el._id)
                                  }
                                >
                                  <span class="toolti">Finish</span>
                                 <i class="icon entypo-flag scnd-font-color"></i>{" "}
                                
                                </li> 
                                
                              </ul> :
                              <ul></ul> 
                              
                              
                              }
                               
                              </td>
                            </tr>
                          </tbody>
})}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })}
</div>


{/* <TaskProjectEmployee/> */}



                })}
        </div>

       
      </div>
    </body>
  );
};

export default TaskProjectComponent;
