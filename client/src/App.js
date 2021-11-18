/* import LoginComponent from './components/loginComponent';
 */
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
/* import homeComponent from './components/homeComponent';
import test from './testCoponent/TestLogin'



import TestLogin from './testCoponent/TestLogin';
import ListTask from './components/ListTask';


import VerticalNavBar from './components/VerticalNavBar';
import HomeComponent from './components/homeComponent'; */

import TaskComponent from "./components/TaskComponent";
import UserComponent from "./components/UserComponent";
import BigCalendar from "./Component/bigCalendar";
import projectComponent from "./components/FormProject";
/* import LoginComponent from './Component/login'; */
import LoginComponent from "./Component/login";
import ForgetPassword from "./Component/ForgetPassword";
import AddSalle from "./Component/addNewsalle"
import UpdateTask from "./components/UpdateTask";
import UpdateProject from "./components/UpdateProject";
import HomePage from "./components/HomePage";
import TaskProjectComponent from "./components/TaskProjectComponent";
import ListProject from "./componentReserve/ListProject";
import NewListProject from "./components/NewListProject";
import ProfileUser from "./components/ProfileUser";
import ListUser from "./components/ListUser";
import Salles from "./Component/salles";
import ProfileUserAdmin from "./components/ProfileUserAdmin";
import Notification from "./components/Notification";
import BlogPage from "./postComponents/BlogPage/BlogPage";
import CreatePage from "./postComponents/BlogPage/Section/CreatePage";
import PostPage from "./postComponents/PostPage";
import Chat from "./chat/chatPage";
import Managerdisp from "./Component/managerReservation";
import  changePassword  from "./components/ChangePassword";
import  resetPassword  from "./Component/ResetPassword";
import  Departement  from "./Component/Departement";
function App() {
  return (
    <Router>
      <Switch>
        {/* 
   <Route path='/listTasks' component={ListTask} />
   <Route path='/updateTask/:id' component={UpdateTask} />
   <Route path='/updateProject/:id' component={UpdateProject} />
   
  
 
     <Route path='/login' component={LoginComponent} />*/}
        <Route exact path="/salles" component={Salles} />
        <Route exact path="/departement" component={Departement} />
        <Route exact path="/listUsers" component={ListUser} />
        <Route exact path="/profile" component={ProfileUser} />
        <Route exact path="/task/:id" component={TaskComponent} />
        <Route exact path="/register" component={UserComponent} />
        <Route exact path="/project" component={projectComponent} />
        <Route exact path="/login" component={LoginComponent} />
        <Route exact path="/forgetPassword" component={ForgetPassword} />
        <Route exact path="/updateTask/:id" component={UpdateTask} />
        <Route exact path="/updateProject/:id" component={UpdateProject} />
        <Route exact path="/updatePassword" component={changePassword} />
        <Route
          exact
          path="/singleProject/:id"
          component={TaskProjectComponent}
        />
        <Route exact path="/listProject" component={NewListProject} />
        <Route exact path="/login" component={LoginComponent} />
        <Route exact path="/reset/:token" component={resetPassword} />
        <Route
          exact
          path="/profileUserAdmin/:id"
          component={ProfileUserAdmin}
        />
              <Route
          exact
          path="/project-members/:id"
          component={Managerdisp}
        />
        <Route exact path="/notification" component={Notification} />
        <Route exact path="/bigcalendar" component={BigCalendar} />
        <Route exact path="/blog" component={BlogPage} />
        <Route exact path="/blog/create" component={CreatePage} />
        <Route exact path="/blog/post/:postId" component={PostPage} />
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/addsalle" component={AddSalle} />
        <Route
          exact
          path="/project-members-disponibility"
          component={Managerdisp}
        />
        <Route path='/' component={HomePage} />
  

      </Switch>
    </Router>
  );
}

export default App;
