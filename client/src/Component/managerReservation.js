import "../styleCss/manager-disp.css";
import { getTask } from "../redux/taskSlice";
import { getreservations } from "../redux/reservationSlice";
import { getprojectbyid } from "../redux/projectSlice";
import { useEffect, useState } from "react";
import { getUsers } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import BarreNavigationHome from "../components/BarreNavigationHome"
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import {Link} from 'react-router-dom'
const Managerdisp = ({history,match}) => {
  const [project, setProject] = useState("all");
  const [date, setDate] = useState(new Date());
  const task = useSelector((state) => state.task);
  const projects = useSelector((state) => state.project);
  const user = useSelector((state) => state.user);
  const reservation = useSelector((state) => state.reservation);
  
 
  useEffect(() => {
    if (!user.isAuth) {
      history.push('/login');
      setTimeout(() => {  console.log("World!"); }, 2000);
    } 
    
  }, [user.isAuth]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  useEffect(() => {
    if (user.userInfo){
    dispatch(getTask(user.userInfo._id));}
  }, [dispatch,user.userInfo]);
  useEffect(() => {
    if (user.userInfo){
    dispatch(getprojectbyid(user.userInfo._id));
  }}, [dispatch,user.userInfo]);
  useEffect(() => {
    dispatch(getreservations());
  }, [dispatch,user.userInfo]);

  const FORMAT = 'dd/MM/yyyy';
  function parseDate(str, format, locale) {
    const parsed = dateFnsParse(str, format, new Date(), { locale });
    if (DateUtils.isDate(parsed)) {
      return parsed;
    }
    return undefined;
  }
  
  function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
  }
  

  return (
    <div className="main-container">
      
      
      <BarreNavigationHome/>

        <div style={{'color':'black', 'marginLeft':'460px'}}>
        <h2>Filter by date</h2>
           <DayPickerInput
      formatDate={formatDate}
      format={FORMAT}
      parseDate={parseDate}
      placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
      onDayChange={date=>setDate(date)}
    />
         
         
        </div>
   <br/><br/>
        <div class="listProject">
        {task.taskbyId
          .filter((elm) =>
           elm.project._id === match.params.id
          )
          .map((elm) =>
            elm.employee ? (
              <div className='listProfile01'>

              <Link to ={`/task/${match.params.id}`}><a class="add-button" href=""><span class="icon entypo-plus scnd-font-color"></span></a></Link>
              <div class="profile-picture big-profile-picture clear">
                  <img  className='imgProfile' alt="Anne Hathaway picture" src={elm.employee.image} />
              </div>
              <h1 class="user-name"> {elm.employee.firstName} {elm.employee.lastName}</h1>
              <div class="profile-description">
              <p>
                 {/*  availability: */}
                  {reservation.reservations.filter(
                    (el) =>
                      el.userId === elm.employee._id && dateFnsFormat(new Date(el.dateOfreservation), FORMAT) === dateFnsFormat(new Date(date), FORMAT)
                  ).length===0 ? (
                    <h1 style={{'color':'red'}}>not available</h1>
                  ) : (
                    
                    <h1 style={{'color':'green'}}>available</h1>
                  )}
                </p>
               {/*  <p>Task: {elm.name}</p> */}
                  
              </div>
              
  
                  </div>  
              
            ):null
          )}
     </div>
    </div>
  );
};
export default Managerdisp;
