import "./schedulingForm.scss";
import OneSalle from "./oneSalle";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getsalles, getsallesbydept } from "../redux/salleSlice";
import { getUsers } from "../redux/userSlice";
import Menu from "./card";
import ReactLoading from 'react-loading';
import {
  getreservations,
  getreservationsbyId,
  addNewreservation,
} from "../redux/reservationSlice";
import { useState } from "react";
import BarreNavigationHome from "../components/BarreNavigationHome";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { DateUtils } from "react-day-picker";
import dateFnsFormat from "date-fns/format";
import dateFnsParse from "date-fns/parse";
import { format } from "date-fns";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
const Schedule = ({ history }) => {
  const [pickedDate, setPickedDate] = useState(new Date());
  const [shift, setShift] = useState();
  const [dep, setDep] = useState(true);
  const FORMAT = "dd/MM/yyyy";
  const [pickedSalle, setPickedSalle] = useState("");
  const salle = useSelector((state) => state.salle);
  const user = useSelector((state) => state.user);
  const reservations = useSelector((state) => state.reservation);
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    dispatch(getUsers());

    if (!user.isAuth) {
      history.push("/login");
      
    }
    else if(user.userInfo&&((user.userInfo.role!=="Manager")&&(user.userInfo.role!=="Employee"))){
      history.push("/");
  }
  }, [user.isAuth]);
  const checksalle = (e) => {
    setDep(e.target.value);
    e.target.value === "all"
      ? dispatch(getsalles())
      : dispatch(getsallesbydept(e.target.value));
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getsalles());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getreservations());
  }, [dispatch]);
  useEffect(() => {
    if (user.userInfo) {
      dispatch(getreservationsbyId(user.userInfo._id));
    }
  }, [dispatch]);
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
  const handleClose = () => {
    if (!reservations.clickedSalle._id) {
      NotificationManager.warning("choose room first!");
    } else if (pickedDate.getTime()<new Date().getTime()) {
      NotificationManager.warning("choose valid date!");
    } 
    else if (!pickedDate) {
      NotificationManager.warning("choose date first!");}
    else if (!shift) {
      NotificationManager.warning("choose shift first!");
    } else if (reservations.clickedSalle.inUse==="no") {
      NotificationManager.warning("Room not in use");
    } else if (
      reservations.reservationbyId.filter(
        (elm) =>
          elm.shift === shift &&
          format(new Date(elm.dateOfreservation), "dd/MM/yyy") ===
            format(new Date(pickedDate), "dd/MM/yyy")
      ).length
    ) {
      NotificationManager.warning("you already have a reservation!");
    } else {
      dispatch(
        addNewreservation({
          salleId: reservations.clickedSalle._id,
          userId: user.userInfo._id,
          dateOfreservation: pickedDate,
          shift: shift,
        })
      );
      if((!reservations.loading)&&(!reservations.reservationErrors)){NotificationManager.success('reservation created!')
      }
      else if(reservations.reservationErrors){NotificationManager.error(reservations.reservationErrors)}
    }
    
  };
 
const userRes = user.users.filter(elm=>elm._id===user.userInfo._id)

const salleRes = salle.salles.filter(elm=>elm.departement.name === userRes[0].departement)
console.log(userRes)
console.log(salleRes)
  return (
    <div className="main-container">
      <BarreNavigationHome />

      <div class="card-002 middle-container container">
        <div className="titular-001" style={{ backgroundColor: "#15A4FA",padding:"19px" }}>
          Scheduling Form
        </div>
        <div class="time__container-002">
          <br/>
          <div class="section-002">
            <div class="box-002">1</div>
            <span className="span002">Select Date &amp; Time</span>
          </div>
        
          <form action="" class="form__time-002">
            <div class="date-002">
              <label for="date-002" style={{marginLeft:"-40px"}}>Date</label>
              <DayPickerInput
                formatDate={formatDate}
                format={FORMAT}
                parseDate={parseDate}
                placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
                onDayChange={(date) => setPickedDate(date)}
                disabledDays={{ before: new Date() }}
              />
            </div>
            <div class="time-002"
                style={{
                  marginLeft:"-30px"
                 
                }}>
              <label for="time-002">Shift</label>{" "}
              <select
                style={{
                  paddingTop: 0,
                  paddingBottom: 0,
                  height: "37.4px",
                  width: "200px",
                 
                }}
                name="timezone"
                onChange={(e) => setShift(e.target.value)}
              >
                <option name="" value="">
                  choose a shift...
                </option>
                <option value="morning">Morning</option>
                <option value="evening">Evening</option>
              </select>
            </div>
          </form>
          <div className="showcase">
            {" "}
            <h6 style={{ color: "rgb(146, 145, 145)" }}>
              date selected :{" "}
              {` ${new Date(pickedDate).getDate()} - ${
                new Date(pickedDate).getMonth() + 1
              } - ${new Date(pickedDate).getFullYear()}`}
            </h6>
            <h6 style={{ color: "rgb(146, 145, 145)" }}>
              shift selected : {`${shift ? shift : "....."}`}
            </h6>{" "}
          </div>
        </div>
        
        <div class="message__container-002">
          <div class="section-002">
            <div class="box-002">2</div>

            <span className="span002">Select Room</span>
          </div>
          <div>
            
            <div className="showcase">
           {/*    <form action="" class="form__time-002 ">
                <div class="time-002" style={{ display: "flex",marginLeft:"0" }}>
                  <i
                    class="fa fa-search"
                    aria-hidden="true"
                    style={{
                      marginLeft: "0px",
                      color: "white",
                      paddingTop: "10px",
                      marginRight: "5px",
                    }}
                  ></i>{" "}
                  <select
                    style={{
                      paddingTop: 0,
                      paddingBottom: 0,
                      height: "35px",
                      width: "200px",
                      margin: "0",
                    }}
                    name="timezone"
                    onChange={(e) => checksalle(e)}
                  >
                    <option name="all" value="all">
                      filter by department...
                    </option>
                    <option name="departement 1" value="departement1">
                      Departement 1
                    </option>
                    <option name="departement 2" value="departement2">
                      Departement 2
                    </option>
                    <option name="departement 3 " value="departement3">
                      Departement 3
                    </option>
                  </select>
                </div>
              </form> */}
              <ul>
                <li>
                  <div
                    className="salle selected"
                    style={{ height: "10px", width: "10px" }}
                  ></div>
                  <small>Available</small>
                </li>
                <li>
                  <div
                    className="salle na"
                    style={{ height: "10px", width: "10px" }}
                  ></div>
                  <small>{`N/A`}</small>
                </li>
                <li>
                  <div
                    className="salle occupied"
                    style={{ height: "10px", width: "10px" }}
                  ></div>
                  <small>Reserved</small>
                </li>
              </ul>
            </div>
            <br />
            <div className="row01">
              {salle.loading?<ReactLoading type="bubbles" color="white" height={100} width={100} />:
                salleRes.map((elm) => (
                    <OneSalle
                      salle={elm}
                      date={pickedDate}
                      shift={shift}
                    ></OneSalle>
                  ))
                }
            </div>
            <br />
            <div className="showcase">
              {" "}
              <h6 style={{ color: "rgb(146, 145, 145)" }}>
                Room selected :{" "}
                {` ${
                  reservations.clickedSalle
                    ? " Room " + reservations.clickedSalle.number
                    : "....."
                }`}
              </h6>
              <h6 style={{ color: "rgb(146, 145, 145)" }}>
                departement :{" "}
                {
                  userRes.map((elm)=>
                  elm.departement
                    )
                }
              </h6>{" "}
            </div>
          </div>
        </div>
        <div style={{ padding: "10px 38%" }}>
          {reservations.clickedSalle &&
          user.userInfo._id &&
          pickedDate &&
          shift ? (
            <button disabled={false} onClick={handleClose}>
              Confirm Reservation
            </button>
          ) : (
            <button
              disabled={true}
              onClick={handleClose}
              style={{ backgroundColor: "gray" }}
            >
              Confirm Reservation
            </button>
          )}
        </div>
      </div>

      <Menu />
      
      <NotificationContainer/>
      
    </div>
  );
};
export default Schedule;
