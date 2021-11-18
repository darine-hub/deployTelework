import React from 'react'
/* import '../styleCss/login.css' */
import {login} from '../redux/userSlice'
import {useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'

import image from "../images/img.jpg"

const LoginComponent = ({history}) => {

const dispatch = useDispatch();
 const [userInput,setUserInput]=useState({});
 const user = useSelector((state) => state.user);
 console.log(user)
 useEffect(() => {
     if(user.isAuth){
         history.push('/')
     }else{
         history.push('/login')
     }
 }, [user.isAuth])

const handleChange =(e)=>{
    setUserInput({...userInput,
        [e.target.name]:e.target.value
    })
}

const handleSubmit =(e)=>{
    e.preventDefault();
    dispatch(login(userInput))
}






    return (
        <div>
           <div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
    <div class="card card0 border-0">
        <div class="row d-flex">
            <div class="col-lg-6">
                <div class="card1 pb-5">
                   <div><h1>HAPPY@HOME</h1></div>
                    <div class="row px-3 justify-content-center mt-4 mb-5 border-line"> <img src={image} className='image'/> </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card2 card border-0 px-4 py-5">
                    
                    
                    <div class="row px-3"> <label class="mb-1">
                            <h6 class="mb-0 text-sm">Email Address</h6>
                        </label> <input class="mb-4" type="text" name="email" placeholder="Enter a valid email address" onChange= {handleChange} /> </div>
                    <div class="row px-3"> <label class="mb-1">
                            <h6 class="mb-0 text-sm">Password</h6>
                        </label> <input type="password" name="password" placeholder="Enter password" onChange={handleChange}      /> </div>
                    <div class="row px-3 mb-4">
                        <div class="custom-control custom-checkbox custom-control-inline">
                             <input id="chk1" type="checkbox" name="chk" class="custom-control-input"/>
                         <label for="chk1" class="custom-control-label text-sm">Remember me</label> 
                         </div> <a href="#" class="ml-auto mb-0 text-sm">Forgot Password?</a>
                    </div>
                    <div > <button type="submit" class="btn-blue " onClick={handleSubmit}  >Login</button> </div>
                    
                </div>
            </div>
        </div>
        <div class="bg-blue py-4">
            
        </div>
    </div>
</div> 
        </div>
    )
}

export default LoginComponent
