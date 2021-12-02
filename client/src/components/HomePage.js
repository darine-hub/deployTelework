import React from "react";
import "../styleCss/HomePage.css";
/* import '../../node_modules/font-awesome/css/font-awesome.min.css';  */
import { afficheTask } from "../redux/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { afficheProject } from "../redux/projectSlice";
import { useState, useEffect } from "react";
import { logout, getUsers } from "../redux/userSlice";
import { Link } from "react-router-dom";
import ProjectHome from "./ProjectHome";
import ProjetHomeEmployee from "./ProjetHomeEmployee";
import Calendar from "../Component/homeCalender";
import BarreNavigationHome from "./BarreNavigationHome";
import ListUserAdminHome from "./ListUserAdminHome";
import Announcement from "../postComponents/Announcement";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = ({ history }) => {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  const user = useSelector((state) => state.user);
  const task = useSelector((state) => state.task);
 /*  useEffect(() => {
    if (!user.isAuth) {
      history.push('/login');
    } 
    
  }, [user.isAuth,history]); */
  useEffect(() => {
    dispatch(getUsers());

    if (user.isAuth) {
      history.push("/");
      dispatch(afficheProject());
    } else {
      history.push("/login");
    }
  }, [user.isAuth]);

  useEffect(() => {
    dispatch(afficheTask());
  }, []);

  const handleLogout = (e) => {
    dispatch(logout());
  };

  const notify = () => toast("Wow so easy!");

  return (
    <body>
      <div class="main-container">
     { user.isAuth && <div >
        <BarreNavigationHome />

        <div class="middle-container container">
          <div class="profile block">
            {user.isAuth &&
              user.users/* .filter((elId) => elId._id === user.userInfo._id) */
                .map((elm) => (
                  <div>
                    <a class="add-button" href={`/profile`}>
                      <span class="icon entypo-plus scnd-font-color"></span>
                    </a>
                    <div class="profile-picture big-profile-picture clear">
                      <img
                        className="imgProfile"
                        alt="Anne Hathaway picture"
                        src={elm.image}
                      />
                    </div>
                    <h1 class="user-name">
                      {elm.firstName} {elm.lastName}{" "}
                    </h1>
                    <div class="profile-description">
                      <p class="scnd-font-color">{elm.role}</p>
                    </div>
                    <ul class="profile-options horizontal-list" style={{marginLeft:'40px'}}>
                      <li>
                        <a class="comments" href="#40">
                        {/*   <p>
                            <span class="icon fontawesome-comment-alt scnd-font-color"></span>
                            23
                          </p> */}
                        </a>
                      </li>
                      <li>
                        <a class="views" href="#41">
                        {/*   <p>
                            <span class="icon fontawesome-eye-open scnd-font-color"></span>
                            841
                          </p> */}
                        </a> 
                      </li>
                      <li>
                        <a class="likes" href="#42">
                         {/*  <p>
                            <span class="icon fontawesome-heart-empty scnd-font-color"></span>
                            49
                          </p> */}
                        </a>
                      </li>
                      <li>
                        <a class="comments" href="#40">
                        {/*   <p>
                            <span class="icon fontawesome-comment-alt scnd-font-color"></span>
                            23
                          </p> */}
                        </a>
                      </li>
                      <li>
                        <a class="views" href="#41">
                        {/*   <p>
                            <span class="icon fontawesome-eye-open scnd-font-color"></span>
                            841
                          </p> */}
                        </a> 
                      </li>
                      <li>
                        <a class="likes" href="#42">
                         {/*  <p>
                            <span class="icon fontawesome-heart-empty scnd-font-color"></span>
                            49
                          </p> */}
                        </a>
                      </li>
                      
                    </ul>
                  </div>
                ))}
          </div>

          <div class="weather block clear">
            {
           user.isAuth &&
              user.users.filter(elId => elId._id === user.userInfo._id).map((elm) => {
                  return elm.role === "Admin" ? (
                    <Link to={"/listUsers"}>
                      {" "}
                      <a class="add-button" href="">
                        <span class="icon entypo-plus scnd-font-color"></span>
                      </a>
                    </Link>
                  ) : (
                    <Link to={"/listProject"}>
                      {" "}
                      <a class="add-button" href="">
                        <span class="icon entypo-plus scnd-font-color"></span>
                      </a>
                    </Link>
                  );
                })}
            {user.isAuth &&
              user.users
                .filter((elId) => elId._id === user.userInfo._id)
                .map((elm) => {
                  return elm.role === "Manager" ? (
                    <Link to={"/listProject"}>  <ProjectHome /></Link>
                  ) : elm.role === "Admin" ? (
                    <Link to={"/listUsers"}><ListUserAdminHome /></Link>
                  ) : (
                    <Link to={"/listProject"}>  <ProjetHomeEmployee /></Link>
                  );
                })}
          </div> 

          {/*     <div class="tweets block">
       
       
       
    
        </div>  */}

          {/* <ul class="social block">
            <li>
              <a href="#50">
                <div class="facebook icon">
                  <span class="zocial-facebook"></span>
                </div>
                <h2 class="facebook titular">SHARE TO FACEBOOK</h2>
              </a>
            </li>
            <li>
              <a href="#51">
                <div class="twitter icon">
                  <span class="zocial-twitter"></span>
                </div>
                <h2 class="twitter titular">SHARE TO TWITTER</h2>
              </a>
            </li>
            <li>
              <a href="#52">
                <div class="googleplus icon">
                  <span class="zocial-googleplus"></span>
                </div>
                <h2 class="googleplus titular">SHARE TO GOOGLE+</h2>
              </a>
            </li>
          </ul> */}
        </div>

        <div class="right-container container">

     
       {/*    <div class="join-newsletter block">
            <h2 class="titular">JOIN THE NEWSLETTER</h2>
 */}
      {/*       <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
      </div> */}

            {/* <div class="input-container">
              <input
                type="text"
                placeholder="yourname@gmail.com"
                class="email text-input"
              />
             
              <div class="input-icon envelope-icon-newsletter">
                <span class="fontawesome-envelope scnd-font-color"></span>
              </div>
            </div>
            <a class="sign-in button" href="#21">
              SUBSCRIBE
            </a>
          </div> */}
          <div class="account block">
            {/*            <h2 class="titular">SIGN IN TO YOUR ACCOUNT</h2>
            <div class="input-container">
                <input type="text" placeholder="yourname@gmail.com" class="email text-input"/>
                <div class="input-icon envelope-icon-acount"><span class="fontawesome-envelope scnd-font-color"></span></div>
            </div>
            <div class="input-container">
                <input type="text" placeholder="Password" class="password text-input"/>
                <div class="input-icon password-icon"><span class="fontawesome-lock scnd-font-color"></span></div>
            </div>
            <a class="sign-in button" href="#22">SIGN IN</a>
            <p class="scnd-font-color">Forgot Password?</p>
            <a class="fb-sign-in" href="58">
                <p><span class="fb-border"><span class="icon zocial-facebook"></span></span>Sign in with Facebook</p>
            </a> */}
            <div className="tweets block"  >
              <Announcement />
            </div>
         
          </div>
         
          {/*        <div class="calendar-day block"> 
            <div class="arrow-btn-container">
                <a class="arrow-btn left" href="#200"><span class="icon fontawesome-angle-left"></span></a>
                <h2 class="titular">WEDNESDAY</h2>
                <a class="arrow-btn right" href="#201"><span class="icon fontawesome-angle-right"></span></a>
            </div>
                <p class="the-day">26</p>
                <a class="add-event button" href="#27">ADD EVENT</a>
        </div>
        <div class="calendar-month block"> 
       <Calendar/>
               
        </div>  */}
        </div>
      </div>}
      </div>
    </body>
  );
};

export default HomePage;
