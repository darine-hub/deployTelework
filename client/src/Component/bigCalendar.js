import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import BarreNavigationHome from "../components/BarreNavigationHome"
import { getUsers } from "../redux/userSlice";
import {useSelector, useDispatch} from 'react-redux'
import {getreservationsbyId} from '../redux/reservationSlice'
import {useEffect} from 'react'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'
const MyCalendar = ({history}) => {

const dispatch=useDispatch()
const reservation = useSelector(state=>state.reservation)
console.log(reservation)
const user = useSelector(state=>state.user)
useEffect(() => {
  if (!user.isAuth) {
    history.push('/login');
  } 
  
}, [user.isAuth,history]);
useEffect(() => {
  if(user.userInfo)
  {  dispatch(getreservationsbyId(user.userInfo._id));}
  }, []);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  
const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})
const myEventsList = []
if(reservation){reservation.reservationbyId.map(elm=>(
    myEventsList.push(
        {
            title: "reservation",
            start:new Date(elm.dateOfreservation),
            end: new Date(elm.dateOfreservation),
            allDay: true,
            resource: "yes",
          }
    )

))}

return(
  <body>

  <div class="main-container">
        <BarreNavigationHome />
     <div style={{'marginLeft':'100px'}}>   
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 700 ,'marginLeft':'300px','backgroundColor':'white','color':'black','borderRadius':'5px'}}
    />
    </div>
    </div>
    </body>
)}
export default MyCalendar