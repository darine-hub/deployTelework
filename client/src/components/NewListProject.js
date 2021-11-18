import React from 'react'
import "../styleCss/HomePage.css"
import {afficheTask}from '../redux/taskSlice'
import { useDispatch,useSelector } from 'react-redux'
import { afficheProject } from '../redux/projectSlice';
import {useState,useEffect} from 'react';
import {logout,getUsers} from '../redux/userSlice';
import { Link } from "react-router-dom";
import Project from '../testCoponent/Project';
import ProjectEmployee from './ProjectEmployee';
import { Search } from '@material-ui/icons';
import BarreNavigationHome from './BarreNavigationHome';

const NewListProject = ({history}) => {

    const dispatch = useDispatch();
    const project = useSelector(state => state.project)
    const user = useSelector(state => state.user)
    const task = useSelector(state => state.task)
    const [search,setSearch]= useState('') 

console.log(search)


    useEffect(() => {
      dispatch(getUsers())

      if(user.isAuth){
          history.push('/listProject')
          dispatch(afficheProject())
          
          
      }else{
          history.push('/login')
      }
  }, [user.isAuth])

  useEffect(() => {
    dispatch(afficheTask())


}, [])

    return (
       
            
            <body>

<div class="main-container">

<center>      <h4 style={{color:'green'}}> {project && project.successMessage&&  project.successMessage}  </h4>  </center> 	
<center>	<h4 style={{color:'red'}}>{project.projectErrors && project.projectErrors }</h4></center>
  <BarreNavigationHome/>  

  
    

   
<div class="listProject">
   

{user.users &&
                user.users.filter(elId => elId._id === user.userInfo._id).map((elm)=>{
return elm.role==='Manager'?
<Project /> :
<ProjectEmployee />

                })}

     

    
        



        
   

</div>  
    </div>  

</body>




       
    )
}

export default NewListProject
