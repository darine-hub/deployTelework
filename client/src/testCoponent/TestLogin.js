import React from 'react'

//import './style.scss';
import image from "../images/logo-horizontal.png"

const TestLogin = () => {
    return (
        <div class='container0'>
            
            <div class="container">
    <div class="container-close">&times;</div>
    <img src={image} alt="image"/>
    <div class="container-text">
      <h2>Ideas and UI components in your <br/>inbox</h2>
      <p>Sign up to receive ideas, free <br/> components and free resources plus 15% on all of our <br/> pro UI kits.</p>
      <input type="email" placeholder="Email address"/>
      <button type="submit">Subscribe</button>
      <span>No spams included</span>
    </div>
  </div>
        </div>
    )
}

export default TestLogin
