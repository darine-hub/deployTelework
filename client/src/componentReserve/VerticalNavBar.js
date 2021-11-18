
import React from 'react';
import '../styleCss/vertical.css'
import {useState} from 'react'

const VerticalNavBar = () => {

    const [show, setShow] = useState(false);
    const toggleVisibility= ()=>{
    
          setShow(true)
        
     
       
        }

        console.log()

    return (
        <div>
        
 <ul  class="menu" >

      <li title="home" onClick={toggleVisibility}><a href="#" class="menu-button home"  >menu</a></li>
      
      <li title="search"><a href="#" class="search">search</a></li>
      <li title="pencil"><a href="#" class="pencil">pencil</a></li>
      <li title="about"><a href="#" class="active about">about</a></li>
      <li title="archive"><a href="#" class="archive">archive</a></li>
      <li title="contact"><a href="#" class="contact">contact</a></li>
    </ul>
    
 <ul  class="menu-bar" >
        <li><a href="#" class="menu-button" >Menu</a></li>
        <li><a href="#">Home</a></li>
        <li><a href="#">Profile</a></li>
        <li><a href="#">Editorial</a></li>
        <li><a href="#">About</a></li>
    </ul>
    



        </div>
    )
}

export default VerticalNavBar
