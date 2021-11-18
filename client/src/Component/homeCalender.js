import React from "react";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getreservationsbyId} from "../redux/reservationSlice";
import useCalendar from "./newHook";
import "../styleCss/HomePage.css";
import {useHistory} from "react-router-dom"
import dateFnsFormat from "date-fns/format";


const Calendar = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const FORMAT = "dd/MM/yyyy";
 
  const {
    calendarRows,
    selectedDate,
    todayFormatted,
    daysShort,
    monthNames,
    getNextMonth,
    getPrevMonth,
  } = useCalendar();
  const reservation = useSelector((state) => state.reservation);
  const user = useSelector((state) => state.user)
  
  useEffect(() => {
    dispatch(getreservationsbyId(user.userInfo._id));
  }, [dispatch,user.userInfo._id]);
  
  
  const dateClickHandler = (date) => {
    let day = date.toString().split('-')
    const mydate = new Date(day[2],day[1]-1,day[0])
    
    history.push("/salles")
  };
  console.log(calendarRows)


  return (

       <div className="calendar-month block " onClick={()=> history.push("/salles")}> 
      <div className="arrow-btn-container">
                <a className="arrow-btn left" onClick={getPrevMonth}  ><span className="icon fontawesome-angle-left"></span></a>
                <h4 className="titular">
        {" "}
        {`${
          monthNames[selectedDate.getMonth()]
        } - ${selectedDate.getFullYear()}`}
      </h4>
                <a className="arrow-btn right" onClick={getNextMonth} ><span className="icon fontawesome-angle-right"></span></a>
            </div>
            <br/>
            <div className="calnder-container-1">
            <table className="calendar">
        <thead className="days-week" >
          <tr  style={{"color":"#4fc4f6"}} >
                        
                        <th>M</th>
                        <th>T</th>
                        <th>W</th>
                        <th>T</th>
                        <th>F</th>
                        <th>S</th>
                        <th>S</th>
            
          </tr>
        </thead>
        <tbody>

          {Object.values(calendarRows).map((cols) => {
            return (
              <tr class="scnd-font-color" key={cols[0].date}>
                       
                {cols.map((col) =>
                  col.date === todayFormatted ? (
                    
                    <td style={{"backgroundColor":"#DC143C","color":"white"}}
                      key={col.date}
                      onClick={() => dateClickHandler(col.date)}
                    >
                      {col.value}
                    </td>
                     
                  ) : (
                    <td 
                      key={col.date}
                      onClick={() => dateClickHandler(col.date)}
                      
                    >
                      {reservation.reservationbyId.filter(
    (elm) =>(
      dateFnsFormat(new Date(elm.dateOfreservation), FORMAT) ===
        dateFnsFormat(new Date(col.date.split('-')[2],Number(col.date.split('-')[1])-1,col.date.split('-')[0]), FORMAT)
  )).length?<div id="dot-container-home">
  <div id="dot-home">
    <div id="dot-pulse-home"></div>
  </div>
</div>
 : null}
                      {col.value}
                    </td>
                  )
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      
</div>
      </div>
  );
};

export default Calendar;
