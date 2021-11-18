import React from 'react'
import '../testCoponent/project.scss'

import "../styleCss/HomePage.css"
import {afficheTask}from '../redux/taskSlice'
import { useDispatch,useSelector } from 'react-redux'
import { afficheProject } from '../redux/projectSlice';
import {useState,useEffect} from 'react';
import {logout,getUsers} from '../redux/userSlice';
import { Link } from "react-router-dom";
import ReactLoading from 'react-loading';





const ProjectHome = ({history}) => {

var maintenant=new Date();
var jour=maintenant.getDate();
var mois=maintenant.getMonth()+1;
var an=maintenant.getFullYear();

    const dispatch = useDispatch();
    const project = useSelector(state => state.project)
    const user = useSelector(state => state.user)
    const task = useSelector(state => state.task)
    useEffect(() => {
      dispatch(getUsers())

      if(user.isAuth){
      
          dispatch(afficheProject())
          
          
      }else{
          history.push('/login')
      }
  }, [user.isAuth])

  useEffect(() => {
    dispatch(afficheTask())


}, [])







    return (
        <div>

<div>
            

            <div class="app-container">
  <div class="app-header">
   
    <div class="projects-section">
      <div class="projects-section-header">
        <p style={{color:'white'}}>Projects</p>
        <p  style={{color:'white'}} class="time">{jour+"/"+mois+"/"+an}</p>
      </div>
      <div class="projects-section-line">
        <div class="projects-status">
       
          <div class="item-status">
            <span class="status-number" style={{color:'white'}} >{project.projects &&  project.projects.filter(elm=>elm.owner._id=== user.userInfo._id && elm.state==='In progress').length}</span>
            <span class="status-type" style={{color:'white'}} >In Progress</span>
          </div>
          <div class="item-status">
            <span class="status-number" style={{color:'white'}} >{project.projects && project.projects.filter(elm=>elm.owner._id=== user.userInfo._id && elm.state==='ended').length}</span>
            <span class="status-type" style={{color:'white'}} > Ended</span>
          </div>

          <div class="item-status">
            <span class="status-number" style={{color:'white'}} >{project.projects && project.projects.filter(elm=>elm.owner._id=== user.userInfo._id && elm.state==='valid').length}</span>
            <span class="status-type" style={{color:'white'}} > Valid</span>
          </div>
          <div class="item-status">
            <span class="status-number" style={{color:'white'}} >{project.projects && project.projects.filter(elm=>elm.owner._id=== user.userInfo._id).length}</span>
            <span class="status-type" style={{color:'white'}} >Total Projects</span>
          </div>
        </div>
     {/*    <div class="view-actions">
          <button class="view-btn list-view" title="List View">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" /></svg>
          </button>
          <button class="view-btn grid-view active" title="Grid View">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" /></svg>
          </button>
        </div> */}
      </div>
      <div class="project-boxes jsGridView">
      {project.projects && 
      project.loading?<ReactLoading type="bubbles" color="white" height={100} width={100} />:project.projects.filter(elm=>elm.owner._id === user.userInfo._id).slice(-3, project.projects.length).map((project) => {

          

          return project.state === 'ended'?

        <div class="project-box-wrapper01">
          <div class="project-box" style= {{backgroundColor: "#fee4cb"}} >
            <div class="project-box-header">
            <span>{new Date (project.startDate).getDate() + '/'+ parseInt(new Date (project.startDate).getMonth()+1) + '/'+new Date (project.startDate).getFullYear()}</span>
              <div class="more-wrapper">
                <button class="project-btn-more">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" /></svg>
                </button>
          </div>
        </div>
        <div class="project-box-content-header">
          <p class="box-content-header" style={{color:'gray'}}>{project.title}</p>
    {/*       <p class="box-content-subheader" style={{color:'gray'}}> {project.description} </p> */}
        </div>
        <div class="box-progress-wrapper">
          <p class="box-progress-header" style={{color:'gray'}}>Progress</p>
          <div class="box-progress-bar">
            <span class="box-progress" style=  {{ width:  (task.tasks.filter(task=>task.project._id === project._id && (task.state === 'ended'||task.state === 'valid')).length*100/task.tasks.filter(task=>task.project._id === project._id  ).length)*3.2 , backgroundColor: "#ff942e"}}   ></span>
          </div>
          <p class="box-progress-percentage"  style={{color:'gray'}} >{ parseInt(task.tasks.filter(task=>task.project._id === project._id && (task.state === 'ended'||task.state === 'valid') ).length*100/task.tasks.filter(task=>task.project._id === project._id  ).length)}%</p>
        </div>
        <div class="project-box-footer">
        {/*   <div class="participants">
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80" alt="participant"/>
            <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="participant"/>
            <button class="add-participant" style=  {{color: "#ff942e"}}  >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div> */}
          <div class="days-left" style=  {{color: "#ff942e"}} >
          {new Date (project.deadLine).getDate() + '/'+ parseInt(new Date (project.deadLine).getMonth()+1) + '/'+new Date (project.deadLine).getFullYear()}
          </div>
        </div>
      </div>
    </div> : project.state ==='valid'?
 

<div class="project-box-wrapper01">
      <div class="project-box" style= {{backgroundColor: "#c8f7dc"}}  >
        <div class="project-box-header">
        <span>{new Date (project.startDate).getDate() + '/'+ parseInt(new Date (project.startDate).getMonth()+1) + '/'+new Date (project.startDate).getFullYear()}</span>
          <div class="more-wrapper">
            <button class="project-btn-more">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical">
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" /></svg>
            </button>
          </div>
        </div>
        <div class="project-box-content-header">
          <p class="box-content-header" style={{color:'gray'}}>
              {project.title}
          </p>
         {/*  <p class="box-content-subheader" style={{color:'gray'}}> {project.description} </p> */}
        </div>
        <div class="box-progress-wrapper">
          <p class="box-progress-header" style={{color:'gray'}}>Progress</p>
          <div class="box-progress-bar">
            <span class="box-progress" style=  {{width:   (task.tasks.filter(task=>task.project._id === project._id && (task.state === 'ended'||task.state === 'valid')).length*100/task.tasks.filter(task=>task.project._id === project._id  ).length)*3.2 , backgroundColor: "#34c471"}}  ></span>
          </div>
          <p class="box-progress-percentage"  style={{color:'gray'}}>{ parseInt(task.tasks.filter(task=>task.project._id === project._id && (task.state === 'ended'||task.state === 'valid') ).length*100/task.tasks.filter(task=>task.project._id === project._id  ).length)}%</p>
        </div>
        <div class="project-box-footer">
      {/*     <div class="participants">
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80" alt="participant"/>
            <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="participant"/>
            <button class="add-participant" style= {{color: "#34c471"}} >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div> */}
          <div class="days-left" style=   {{color: "#34c471"}} >
          {new Date (project.deadLine).getDate() + '/'+ parseInt(new Date (project.deadLine).getMonth()+1) + '/'+new Date (project.deadLine).getFullYear()}
          </div>
        </div>
      </div>
    </div>

    :

    <div class="project-box-wrapper01">
    <div class="project-box" style=  {{backgroundColor: "#e9e7fd"}} >
      <div class="project-box-header">
      <span>{new Date (project.startDate).getDate() + '/'+ parseInt(new Date (project.startDate).getMonth()+1) + '/'+new Date (project.startDate).getFullYear()}</span>
        <div class="more-wrapper">
          <button class="project-btn-more">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" /></svg>
          </button>
        </div>
      </div>
      <div class="project-box-content-header">
        <p class="box-content-header" style={{color:'gray'}}>{project.title}</p>
   {/*      <p class="box-content-subheader" style={{color:'gray'}}> {project.description} </p> */}
      </div>
      <div class="box-progress-wrapper">
        <p class="box-progress-header" style={{color:'gray'}}>Progress</p>
        <div class="box-progress-bar">
          <span class="box-progress" style=  {{width: task.tasks ? (task.tasks.filter(task=>task.project._id === project._id && (task.state === 'ended'||task.state === 'valid')).length*100/task.tasks.filter(task=>task.project._id === project._id  ).length)*1.5: 0 ,backgroundColor:"#4f3ff0"}}  ></span>
          </div>
        <p class="box-progress-percentage"  style={{color:'gray'}} >{task.tasks.filter(task=>task.project._id === project._id && (task.state === 'ended'||task.state === 'valid') ).length>0? parseInt(task.tasks.filter(task=>task.project._id === project._id && (task.state === 'ended'||task.state === 'valid') ).length*100/task.tasks.filter(task=>task.project._id === project._id  ).length):0}%</p>
      </div>
      <div class="project-box-footer">
     {/*    <div class="participants">
          <img src="https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1215&q=80" alt="participant"/>
          <img src="https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2555&q=80" alt="participant"/>
          <button class="add-participant" style= {{color: "#4f3ff0"}} >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">
              <path d="M12 5v14M5 12h14" />
            </svg> 
          </button>
        </div> */}
        <div class="days-left" style= {{color: "#4f3ff0"}} >
        {new Date (project.deadLine).getDate() + '/'+ parseInt(new Date (project.deadLine).getMonth()+1) + '/'+new Date (project.deadLine).getFullYear()}
        </div>
      </div>
    </div>
  </div>

    })}
 
  </div> 
</div>

</div> 
</div>


        </div>



        </div>
    )
}

export default ProjectHome
