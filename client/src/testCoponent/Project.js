import React from 'react'
import './project.scss'

import "../styleCss/HomePage.css"
import {afficheTask}from '../redux/taskSlice'
import { useDispatch,useSelector } from 'react-redux'
import { afficheProject } from '../redux/projectSlice';
import {useState,useEffect} from 'react';
import {logout,getUsers} from '../redux/userSlice';
import { Link } from "react-router-dom";
import ReactLoading from 'react-loading';


const Project = ({history }) => {
  const [search,setSearch]= useState('') 

console.log(search)
var maintenant=new Date();
var jour=maintenant.getDate();
var mois=maintenant.getMonth()+1;
var an=maintenant.getFullYear();
/* document.write("Nous sommes le ",jour,"/",mois,"/",an,"."); */

    const dispatch = useDispatch();
    const project = useSelector(state => state.project)
    const user = useSelector(state => state.user)
    const task = useSelector(state => state.task)
    const [state,setState] = useState()
    console.log(state)

    

 
    
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

const endedProject=()=>{

project.projects.filter(elm=>elm.state==='ended')

}


    return (
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
            <span class="status-number" style={{color:'white'}} >{project.projects.filter(elm=>elm.owner._id=== user.userInfo._id && elm.state==='In progress').length}</span>
            <span class="status-type" style={{color:'white'}} onClick={()=>setState('progress')}>In Progress</span>
          </div>
          <div class="item-status">
            <span class="status-number" style={{color:'white'}} >{project.projects.filter(elm=>elm.owner._id=== user.userInfo._id && elm.state==='ended').length}</span>
            <span class="status-type" style={{color:'white'}} onClick={()=>setState('ended')}> Ended</span>
          </div>

          <div class="item-status">
            <span class="status-number" style={{color:'white'}} >{project.projects.filter(elm=>elm.owner._id=== user.userInfo._id && elm.state==='valid').length}</span>
            <span class="status-type" style={{color:'white'}} onClick={()=>setState('valid')}> Valid</span>
          </div>
          <div class="item-status">
            <span class="status-number" style={{color:'white'}} >{project.projects.filter(elm=>elm.owner._id=== user.userInfo._id).length}</span>
            <span class="status-type" style={{color:'white'}}onClick={()=>setState('all')} >Total Projects</span>
          </div>
          <div class="item-status">
                <input style={{marginLeft:'0px'}} type="text" placeholder="search project" class="email text-input" onChange={(e)=>setSearch(e.target.value)}/> 
               {/*  <div class="input-icon envelope-icon-newsletter"><span class=" icon entypo-search scnd-font-color"></span></div> */}
            </div>
        </div>
 {/*        <div class="view-actions">
          <button class="view-btn list-view " title="List View">
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

       
       
      { ( search || !state || state==='all' ) ? 
      
    
        project.projects && 
        project.loading?<ReactLoading type="bubbles" color="white" height={100} width={100} />:project.projects.filter(elm=>elm.owner._id === user.userInfo._id &&  elm.title
          .toLowerCase().match(search.toLowerCase().trim())).map((project) => {
       
            return  project.state === 'ended'?

        <div class="project-box-wrapper">
          <div class="project-box" style= {{backgroundColor: "#fee4cb"}} >
            <div class="project-box-header">
              <span>{new Date (project.startDate).getDate() + '/'+ parseInt(new Date (project.startDate).getMonth()+1) + '/'+new Date (project.startDate).getFullYear()}</span>
              <div class="more-wrapper">
             
              <div className='dropdown'>
                <button class="project-btn-more">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" /></svg>
                </button>
                
                <div class="dropdown-content">
   <Link to={`/singleProject/${project._id}`} ><a href=''>List Tasks</a></Link>
   <Link to={`/project-members/${project._id}`} ><a href="">List Disponibilites</a></Link>
    
  </div>
</div>

{/* <div class="dropdown">
  <button class="dropbtn">Dropdown</button>
  <div class="dropdown-content">
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
  </div>
</div> */}

          </div>
        </div>
        <div class="project-box-content-header">
          <p class="box-content-header" style={{color:'gray'}}>{project.title}</p>
        {/*   <p class="box-content-subheader" style={{color:'gray'}}> {project.description} </p> */}
        </div>
        <div class="box-progress-wrapper">
          <p class="box-progress-header" style={{color:'gray'}}>Progress</p>
          <div class="box-progress-bar">
            <span class="box-progress" style=  {{ width:  (task.tasks.filter(task=>task.project._id === project._id && (task.state === 'ended'||task.state === 'valid')).length*100/task.tasks.filter(task=>task.project._id === project._id  ).length)*3.2 , backgroundColor: "#ff942e"}}   ></span>
          </div>
          <p class="box-progress-percentage"  style={{color:'gray'}} >{ parseInt(task.tasks.filter(task=>task.project._id === project._id && (task.state === 'ended'||task.state === 'valid') ).length*100/task.tasks.filter(task=>task.project._id === project._id  ).length)}%</p>
        </div>
        <div class="project-box-footer">

          <div class="days-left" style=  {{color: "#ff942e"}} >
          {new Date (project.deadLine).getDate() + '/'+ parseInt(new Date (project.deadLine).getMonth()+1) + '/'+new Date (project.deadLine).getFullYear()}
          </div>
        </div>
      </div>
    </div> : project.state ==='valid'?
 

<div class="project-box-wrapper">
      <div class="project-box" style= {{backgroundColor: "#c8f7dc"}}  >
        <div class="project-box-header">
        <span>{new Date (project.startDate).getDate() + '/'+ parseInt(new Date (project.startDate).getMonth()+1) + '/'+new Date (project.startDate).getFullYear()}</span>
          <div class="more-wrapper">

          <div className='dropdown'>
                <button class="project-btn-more">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" /></svg>
                </button>
                <div class="dropdown-content">
   <Link to={`/singleProject/${project._id}`} ><a href=''>List Tasks</a></Link>
   <Link to={`/project-members/${project._id}`} ><a href="">List Disponibilites</a></Link>
    
  </div>
</div>
          </div>
        </div>
        <div class="project-box-content-header">
          <p class="box-content-header" style={{color:'gray'}}>
              {project.title}
          </p>
        {/*   <p class="box-content-subheader" style={{color:'gray'}}> {project.description} </p> */}
        </div>
        <div class="box-progress-wrapper">
          <p class="box-progress-header" style={{color:'gray'}}>Progress</p>
          <div class="box-progress-bar">
            <span class="box-progress" style=  {{width:   (task.tasks.filter(task=>task.project._id === project._id && (task.state === 'ended'||task.state === 'valid')).length*100/task.tasks.filter(task=>task.project._id === project._id  ).length)*3.2 , backgroundColor: "#34c471"}}  ></span>
          </div>
          <p class="box-progress-percentage"  style={{color:'gray'}}>{ parseInt(task.tasks.filter(task=>task.project._id === project._id && (task.state === 'ended'||task.state === 'valid') ).length*100/task.tasks.filter(task=>task.project._id === project._id  ).length)}%</p>
        </div>
        <div class="project-box-footer">
   
          <div class="days-left" style=   {{color: "#34c471"}} >
          {new Date (project.deadLine).getDate() + '/'+ parseInt(new Date (project.deadLine).getMonth()+1) + '/'+new Date (project.deadLine).getFullYear()}
          </div>
        </div>
      </div>
    </div>

    :

    <div class="project-box-wrapper">
    <div class="project-box" style=  {{backgroundColor: "#e9e7fd"}} >
      <div class="project-box-header">
      <span>{new Date (project.startDate).getDate() + '/'+ parseInt(new Date (project.startDate).getMonth()+1) + '/'+new Date (project.startDate).getFullYear()}</span>
        <div class="more-wrapper">

        <div className='dropdown'>
                <button class="project-btn-more">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" /></svg>
                </button>
                <div class="dropdown-content">
   <Link to={`/singleProject/${project._id}`} ><a href=''>List Tasks</a></Link>
   <Link to={`/project-members/${project._id}`} > <a href=''>List Disponibilites</a></Link>
    
  </div>
</div>
        </div>
      </div>
      <div class="project-box-content-header">
        <p class="box-content-header" style={{color:'gray'}}>{project.title}</p>
       {/*  <p class="box-content-subheader" style={{color:'gray'}}> {project.description} </p> */}
      </div>
      <div class="box-progress-wrapper">
        <p class="box-progress-header" style={{color:'gray'}}>Progress</p>
        <div class="box-progress-bar">
          <span class="box-progress" style=  {{width: task.tasks.length>0 ? (task.tasks.filter(task=>task.project._id === project._id && (task.state === 'ended'||task.state === 'valid')).length*100/task.tasks.filter(task=>task.project._id === project._id  ).length)*2.1 : 0 ,backgroundColor:"#4f3ff0"}}  ></span>
          </div>
        <p class="box-progress-percentage"  style={{color:'gray'}} >{task.tasks.filter(task=>task.project._id === project._id && (task.state === 'ended'||task.state === 'valid') ).length>0? parseInt(task.tasks.filter(task=>task.project._id === project._id && (task.state === 'ended'||task.state === 'valid') ).length*100/task.tasks.filter(task=>task.project._id === project._id  ).length):0}%</p>
      </div>
      <div class="project-box-footer">
 
        <div class="days-left" style= {{color: "#4f3ff0"}} >
        {new Date (project.deadLine).getDate() + '/'+ parseInt(new Date (project.deadLine).getMonth()+1) + '/'+new Date (project.deadLine).getFullYear()}
        </div>
      </div>
    </div>
  </div>

    }):<div></div>}





















   

    




{state==='ended' && 
      
      project.projects && project.projects.filter(elm=>elm.owner._id === user.userInfo._id).map((project) => {

          

          return project.state === 'ended'?

        <div class="project-box-wrapper">
          <div class="project-box" style= {{backgroundColor: "#fee4cb"}} >
            <div class="project-box-header">
              <span>{new Date (project.startDate).getDate() + '/'+ parseInt(new Date (project.startDate).getMonth()+1) + '/'+new Date (project.startDate).getFullYear()}</span>
              <div class="more-wrapper">
              <div className='dropdown'>
                <button class="project-btn-more">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" /></svg>
                </button>
                <div class="dropdown-content">
   <Link to={`/singleProject/${project._id}`} ><a href=''>List Tasks</a></Link>
   <Link to={`/project-members/${project._id}`} > <a href="">List Disponibilites</a></Link>
    
  </div>
</div>
          </div>
        </div>
        <div class="project-box-content-header">
          <p class="box-content-header" style={{color:'gray'}}>{project.title}</p>
         {/*  <p class="box-content-subheader" style={{color:'gray'}}> {project.description} </p> */}
        </div>
        <div class="box-progress-wrapper">
          <p class="box-progress-header" style={{color:'gray'}}>Progress</p>
          <div class="box-progress-bar">
            <span class="box-progress" style=  {{ width:  (task.tasks.filter(task=>task.project._id === project._id && (task.state === 'ended'||task.state === 'valid')).length*100/task.tasks.filter(task=>task.project._id === project._id  ).length)*3.2 , backgroundColor: "#ff942e"}}   ></span>
          </div>
          <p class="box-progress-percentage"  style={{color:'gray'}} >{ parseInt(task.tasks.filter(task=>task.project._id === project._id && (task.state === 'ended'||task.state === 'valid') ).length*100/task.tasks.filter(task=>task.project._id === project._id  ).length)}%</p>
        </div>
        <div class="project-box-footer">

          <div class="days-left" style=  {{color: "#ff942e"}} >
          {new Date (project.deadLine).getDate() + '/'+ parseInt(new Date (project.deadLine).getMonth()+1) + '/'+new Date (project.deadLine).getFullYear()}
          </div>
        </div>
      </div>
    </div> : <div></div>
  

    })}
{state==='valid' && 
      
      project.projects && project.projects.filter(elm=>elm.owner._id === user.userInfo._id).map((project) => {

          

          return project.state === 'valid'?
<div class="project-box-wrapper">
      <div class="project-box" style= {{backgroundColor: "#c8f7dc"}}  >
        <div class="project-box-header">
        <span>{new Date (project.startDate).getDate() + '/'+ parseInt(new Date (project.startDate).getMonth()+1) + '/'+new Date (project.startDate).getFullYear()}</span>
          <div class="more-wrapper">

          <div className='dropdown'>
                <button class="project-btn-more">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" /></svg>
                </button>
                <div class="dropdown-content">
   <Link to={`/singleProject/${project._id}`} ><a href=''>List Tasks</a></Link>
   <Link to={`/project-members/${project._id}`} > <a href="">List Disponibilites</a></Link>
    
  </div>
</div>
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
   
          <div class="days-left" style=   {{color: "#34c471"}} >
          {new Date (project.deadLine).getDate() + '/'+ parseInt(new Date (project.deadLine).getMonth()+1) + '/'+new Date (project.deadLine).getFullYear()}
          </div>
        </div>
      </div>
    </div>:<div></div>

        })}




{state==='progress' && 
      
      project.projects && project.projects.filter(elm=>elm.owner._id === user.userInfo._id).map((project) => {

          

          return project.state === 'In progress'?
<div class="project-box-wrapper">
    <div class="project-box" style=  {{backgroundColor: "#e9e7fd"}} >
      <div class="project-box-header">
      <span>{new Date (project.startDate).getDate() + '/'+ parseInt(new Date (project.startDate).getMonth()+1) + '/'+new Date (project.startDate).getFullYear()}</span>
        <div class="more-wrapper">

        <div className='dropdown'>
                <button class="project-btn-more">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" /></svg>
                </button>
                <div class="dropdown-content">
   <Link to={`/singleProject/${project._id}`} ><a href=''>List Tasks</a></Link>
   <Link to={`/project-members/${project._id}`} > <a href="">List Disponibilites</a></Link>
    
  </div>
</div>
        </div>
      </div>
      <div class="project-box-content-header">
        <p class="box-content-header" style={{color:'gray'}}>{project.title}</p>
       {/*  <p class="box-content-subheader" style={{color:'gray'}}> {project.description} </p> */}
      </div>
      <div class="box-progress-wrapper">
        <p class="box-progress-header" style={{color:'gray'}}>Progress</p>
        <div class="box-progress-bar">
          <span class="box-progress" style=  {{width: task.tasks.length>0 ? (task.tasks.filter(task=>task.project._id === project._id && (task.state === 'ended'||task.state === 'valid')).length*100/task.tasks.filter(task=>task.project._id === project._id  ).length)*2.1: 0 ,backgroundColor:"#4f3ff0"}}  ></span>
          </div>
        <p class="box-progress-percentage"  style={{color:'gray'}} >{task.tasks.filter(task=>task.project._id === project._id && (task.state === 'ended'||task.state === 'valid') ).length>0? parseInt(task.tasks.filter(task=>task.project._id === project._id && (task.state === 'ended'||task.state === 'valid') ).length*100/task.tasks.filter(task=>task.project._id === project._id  ).length):0}%</p>
      </div>
      <div class="project-box-footer">
 
        <div class="days-left" style= {{color: "#4f3ff0"}} >
        {new Date (project.deadLine).getDate() + '/'+ parseInt(new Date (project.deadLine).getMonth()+1) + '/'+new Date (project.deadLine).getFullYear()}
        </div>
      </div>
    </div>
  </div>:<div></div>

        })}



{/* {search && 
      
      project.projects && project.projects.filter(elm=>elm.owner._id === user.userInfo._id &&  elm.title
        .toLowerCase().match(search.toLowerCase().trim())).map((project) => {

          

          return  project.state === 'ended'?

        <div class="project-box-wrapper">
          <div class="project-box" style= {{backgroundColor: "#fee4cb"}} >
            <div class="project-box-header">
              <span>{new Date (project.startDate).getDate() + '/'+ parseInt(new Date (project.startDate).getMonth()+1) + '/'+new Date (project.startDate).getFullYear()}</span>
              <div class="more-wrapper">
              <Link to={`/singleProject/${project._id}`}> 
                <button class="project-btn-more">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" /></svg>
                </button>
                </Link>
          </div>
        </div>
        <div class="project-box-content-header">
          <p class="box-content-header" style={{color:'gray'}}>{project.title}</p>
          <p class="box-content-subheader" style={{color:'gray'}}> {project.description} </p>
        </div>
        <div class="box-progress-wrapper">
          <p class="box-progress-header" style={{color:'gray'}}>Progress</p>
          <div class="box-progress-bar">
            <span class="box-progress" style=  {{ width:  (task.tasks.filter(task=>task.project._id === project._id && (task.state === 'ended'||task.state === 'valid')).length*100/task.tasks.filter(task=>task.project._id === project._id  ).length)*3.2 , backgroundColor: "#ff942e"}}   ></span>
          </div>
          <p class="box-progress-percentage"  style={{color:'gray'}} >{ parseInt(task.tasks.filter(task=>task.project._id === project._id && (task.state === 'ended'||task.state === 'valid') ).length*100/task.tasks.filter(task=>task.project._id === project._id  ).length)}%</p>
        </div>
        <div class="project-box-footer">

          <div class="days-left" style=  {{color: "#ff942e"}} >
          {new Date (project.deadLine).getDate() + '/'+ parseInt(new Date (project.deadLine).getMonth()+1) + '/'+new Date (project.deadLine).getFullYear()}
          </div>
        </div>
      </div>
    </div> : project.state ==='valid'?
 

<div class="project-box-wrapper">
      <div class="project-box" style= {{backgroundColor: "#c8f7dc"}}  >
        <div class="project-box-header">
        <span>{new Date (project.startDate).getDate() + '/'+ parseInt(new Date (project.startDate).getMonth()+1) + '/'+new Date (project.startDate).getFullYear()}</span>
          <div class="more-wrapper">

          <Link to={`/singleProject/${project._id}`}> 
            <button class="project-btn-more">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical">
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" /></svg>
            </button>
            </Link>
          </div>
        </div>
        <div class="project-box-content-header">
          <p class="box-content-header" style={{color:'gray'}}>
              {project.title}
          </p>
          <p class="box-content-subheader" style={{color:'gray'}}> {project.description} </p>
        </div>
        <div class="box-progress-wrapper">
          <p class="box-progress-header" style={{color:'gray'}}>Progress</p>
          <div class="box-progress-bar">
            <span class="box-progress" style=  {{width:   (task.tasks.filter(task=>task.project._id === project._id && (task.state === 'ended'||task.state === 'valid')).length*100/task.tasks.filter(task=>task.project._id === project._id  ).length)*3.2 , backgroundColor: "#34c471"}}  ></span>
          </div>
          <p class="box-progress-percentage"  style={{color:'gray'}}>{ parseInt(task.tasks.filter(task=>task.project._id === project._id && (task.state === 'ended'||task.state === 'valid') ).length*100/task.tasks.filter(task=>task.project._id === project._id  ).length)}%</p>
        </div>
        <div class="project-box-footer">
   
          <div class="days-left" style=   {{color: "#34c471"}} >
          {new Date (project.deadLine).getDate() + '/'+ parseInt(new Date (project.deadLine).getMonth()+1) + '/'+new Date (project.deadLine).getFullYear()}
          </div>
        </div>
      </div>
    </div>

    :

    <div class="project-box-wrapper">
    <div class="project-box" style=  {{backgroundColor: "#e9e7fd"}} >
      <div class="project-box-header">
      <span>{new Date (project.startDate).getDate() + '/'+ parseInt(new Date (project.startDate).getMonth()+1) + '/'+new Date (project.startDate).getFullYear()}</span>
        <div class="more-wrapper">

        <Link to={`/singleProject/${project._id}`}> 
          <button class="project-btn-more">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" /></svg>
          </button>
          </Link>
        </div>
      </div>
      <div class="project-box-content-header">
        <p class="box-content-header" style={{color:'gray'}}>{project.title}</p>
        <p class="box-content-subheader" style={{color:'gray'}}> {project.description} </p>
      </div>
      <div class="box-progress-wrapper">
        <p class="box-progress-header" style={{color:'gray'}}>Progress</p>
        <div class="box-progress-bar">
          <span class="box-progress" style=  {{width:  (task.tasks.filter(task=>task.project._id === project._id && (task.state === 'ended'||task.state === 'valid')).length*100/task.tasks.filter(task=>task.project._id === project._id  ).length)*3.2, backgroundColor: "#4f3ff0"}}  ></span>
        </div>
        <p class="box-progress-percentage"  style={{color:'gray'}} >{ parseInt(task.tasks.filter(task=>task.project._id === project._id && (task.state === 'ended'||task.state === 'valid') ).length*100/task.tasks.filter(task=>task.project._id === project._id  ).length)}%</p>
      </div>
      <div class="project-box-footer">
 
        <div class="days-left" style= {{color: "#4f3ff0"}} >
        {new Date (project.deadLine).getDate() + '/'+ parseInt(new Date (project.deadLine).getMonth()+1) + '/'+new Date (project.deadLine).getFullYear()}
        </div>
      </div>
    </div>
  </div>

    })} */}
     



    
 
  </div> 
</div>

</div> 
</div>


        </div>
    )
}

export default Project
