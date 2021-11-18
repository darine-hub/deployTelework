import React from 'react'
import {afficheTask}from '../redux/taskSlice'
import { afficheProject } from '../redux/projectSlice';
import { useDispatch,useSelector } from 'react-redux'
import {useState,useEffect} from 'react';
const ListTask = ({history}) => {
    const dispatch = useDispatch();
    const task = useSelector(state => state.task)
    const user = useSelector(state => state.user)
    const project = useSelector(state => state.project)



   
    useEffect(() => {
        dispatch(afficheProject())

        if(user.isAuth){
            history.push('/listProjet')
            dispatch(afficheTask())
            
            
        }else{
            history.push('/login')
        }
    }, [user.isAuth])





    return (
        <div>
  
{project.projects &&
project.projects.map((project)=>(
<div>
<h1> {project.title} </h1>

{task.tasks &&
task.tasks.filter(elId => elId.project._id === project._id).map((elm)=>(

    <h3> {elm.name} </h3> 
))

} 
</div>
))
}
</div>
    )
}

export default ListTask
