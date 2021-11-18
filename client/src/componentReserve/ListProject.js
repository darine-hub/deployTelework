import React from 'react'
import {afficheTask}from '../redux/taskSlice'
import { useDispatch,useSelector } from 'react-redux'
import { afficheProject } from '../redux/projectSlice';
import {useState,useEffect} from 'react';
import image from "../images/plus.png";
import { Link } from "react-router-dom";
//import '../styleCss/listproject.css'


const ListProject = ({history}) => {
    const dispatch = useDispatch();
    const project = useSelector(state => state.project)
    const user = useSelector(state => state.user)
    const task = useSelector(state => state.task)
    useEffect(() => {
      dispatch(afficheProject())

      if(user.isAuth){
          history.push('/listProject')
          dispatch(afficheTask())
          
          
      }else{
          history.push('/login')
      }
  }, [user.isAuth])
    return (
        <div>
         
        
        
        

<div id="mainCoantiner">
 
  <div class="margin-body">
  
  <div>
    <div class="starsec"></div>
    <div class="starthird"></div>
    <div class="starfourth"></div>
    <div class="starfifth"></div>
  </div>
 

  <div class="row">
    <div class="col-sm-12 col-md-12">
      <div class="wpb_text_column wpb_content_element ">
          <div class="wpb_wrapper">
            <div class="title-h1 text-center"><span><span class="light">pricing </span> table</span></div>
          </div>
        </div>
    </div>
  </div>
  
  <div class="row">
  {project.projects && 
          project.projects.map((project) => (
    <div class="col-sm-3 col-md-3 pricing-column-wrapper">
         <div class="pricing-column">
              <div class="pricing-price-row">
                <div class="pricing-price-wrapper">
                  <div class="pricing-price">
                    <div class="pricing-cost"><img src={project.owner.image}/></div>
                    <div class="time"></div>
                  </div>
                </div>
              </div>
              <div class="pricing-row-title">
                <div class="pricing_row_title">{project.title}</div>
              </div>
              {task.tasks &&
         task.tasks.filter(elId => elId.project._id === project._id).map((elm)=>
          
              
               {return elm.state === "valid"?<figure class="pricing-row strike"><span style={{color:"#008000"}}>{elm.name}</span></figure>:
               elm.state === "ended"? <figure class="pricing-row strike"><span >{elm.name}</span></figure>:
              <figure class="pricing-row"><span style={{color: "#5f727f"}}>{elm.name}</span></figure>
              
              } )} 
              
              <div class="pricing-footer">
              <div class="gem-button-container gem-button-position-center"><Link to={`/singleProject/${project._id}`}class="gem-button gem-green"> View More</Link></div>
                <div class="gem-button-container gem-button-position-center"><Link to={`/task/${project._id}`}class="gem-button gem-green"> Add Task</Link></div>
              </div>
            </div>
    </div>
      ))}
  </div>

 </div>
</div>







      </div>
    )
}

export default ListProject
