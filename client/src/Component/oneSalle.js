import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clicksalle,
} from "../redux/reservationSlice";
import dateFnsFormat from "date-fns/format";
import "./salle.css";
import "react-day-picker/lib/style.css";


const OneSalle = (props) => {
  const reservation = useSelector((state) => state.reservation);
  const FORMAT = "dd/MM/yyyy";
  const dispatch = useDispatch();
  const filtered = reservation.reservations.filter(
    (elm) =>
      elm.salleId === props.salle._id &&
      dateFnsFormat(new Date(elm.dateOfreservation), FORMAT) ===
        dateFnsFormat(new Date(props.date), FORMAT)&&elm.shift===props.shift
  );
 const handleClick=()=>{
  if((!reservation.reservationbyId.filter(
    (elm) =>
      elm.shift === props.shift &&
      dateFnsFormat(new Date(elm.dateOfreservation), FORMAT) ===
        dateFnsFormat(new Date(props.date), FORMAT) && elm.salleId._id===props.salle._id
  ).length)&&(!reservation.reservationbyId.filter(
    (elm) =>
      elm.shift === props.shift &&
      dateFnsFormat(new Date(elm.dateOfreservation), FORMAT) ===
        dateFnsFormat(new Date(props.date), FORMAT) 
  ).length)&&(!(filtered.length >= props.salle.capacity))&&(!(props.salle.inUse==="no"))){dispatch(clicksalle(props.salle))}
 
 }
 
 

  return (
    <>
   
      <div
        className={`salle ${
          reservation.reservationbyId.filter(
            (elm) =>
              elm.shift === props.shift &&
              dateFnsFormat(new Date(elm.dateOfreservation), FORMAT) ===
                dateFnsFormat(new Date(props.date), FORMAT) && elm.salleId._id===props.salle._id
          ).length?"red":reservation.reservationbyId.filter(
            (elm) =>
              elm.shift === props.shift &&
              dateFnsFormat(new Date(elm.dateOfreservation), FORMAT) ===
                dateFnsFormat(new Date(props.date), FORMAT) 
          ).length? "na" :(filtered.length >= props.salle.capacity)?"na":props.salle.inUse==="no"?"na":(reservation.clickedSalle?reservation.clickedSalle._id===props.salle._id:null)?"darkblue":"blue"
        }`}
        onClick={handleClick}
      >
        <p>{props.salle.number} </p>
        <hr/>
       <h6 style={{padding:"10px"}}> remaining spots : {props.salle.capacity - reservation.reservations.filter(
    (elm) =>(
      elm.salleId === props.salle._id &&
      dateFnsFormat(new Date(elm.dateOfreservation), FORMAT) ===
        dateFnsFormat(new Date(props.date), FORMAT)&&elm.shift===props.shift
        )).length}</h6>
        <br/>
      
       
      </div>

     
    </>
  );
};

export default OneSalle;
