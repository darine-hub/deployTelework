import { useState } from "react";
import {
  deleteReservation,
  getreservationsbyId,
  updateReservation,
} from "../redux/reservationSlice";
import { useDispatch, useSelector } from "react-redux";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { DateUtils } from "react-day-picker";
import dateFnsFormat from "date-fns/format";
import dateFnsParse from "date-fns/parse";
import { format } from "date-fns";
import ReactLoading from "react-loading";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

import "./card.scss";
const Menu = () => {
  const [show, setShow] = useState(false);
  const [displaydel, setDisplaydel] = useState("none");
  const [displayedit, setDisplayedit] = useState("none");
  const [deleteres, setDeleteres] = useState("");
  const [editres, setEditres] = useState("");
  const user = useSelector((state) => state.user);
  const reservation = useSelector((state) => state.reservation);
  const salle = useSelector((state) => state.salle);
  const [date, setDate] = useState(null);
  const [shift, setShift] = useState(null);
  const [dateEdit, setDateEdit] = useState(null);
  const [salles, setSalle] = useState(null);
  const dispatch = useDispatch();

  const userRes = user.users.filter(elm=>elm._id===user.userInfo._id)


  const handleClick = (elm) => {
    setDeleteres(elm);
    setDisplaydel("block");
  };
  const handleClickEdit = (elm) => {
    setShow(!show);
    setDisplayedit("block");
    setEditres(elm._id);
    setSalle(elm.salleId._id);
    setDateEdit(elm.dateOfreservation);
    setShift(elm.shift);
  };
  const handleClose = () => {
    setShow(false);

    user.userInfo &&
      dispatch(deleteReservation({ id: deleteres, user: user.userInfo._id }));
    setDisplaydel("none");
  };
  const handleCloseEdit = () => {
    if (new Date().getTime() >= new Date(dateEdit).getTime()) {
      NotificationManager.warning("choose valid date");
    } else if (
      reservation.reservationbyId.filter(
        (elm) =>
          elm.shift === shift &&
          format(new Date(elm.dateOfreservation), "dd/MM/yyy") ===
            format(new Date(dateEdit), "dd/MM/yyy") &&
          elm.salleId._id === salles
      ).length>0
    ) {
      NotificationManager.warning("you already have a reservation!");
    } else if (
      reservation.reservations.filter(
        (elm) =>
          elm.salleId === salles &&
          dateFnsFormat(new Date(elm.dateOfreservation), FORMAT) ===
            dateFnsFormat(new Date(dateEdit), FORMAT) &&
          shift === elm.shift
      ).length >=
      salle.salles.filter((elm) => elm._id === salles).pop().capacity
    ) {
      NotificationManager.warning("Room Full!");
    } else if (
      salle.salles.filter((elm) => elm.inUse === "no" && elm._id === salles)
        .length
    ) {
      NotificationManager.warning("Room not in Use");
    } else {
      dispatch(
        updateReservation({
          id: editres,
          userId:user.userInfo._id,
          data: { salleId: salles, dateOfreservation: dateEdit, shift: shift },
        })
      );
      setDisplayedit("none");
      NotificationManager.success("reservation updated");
    }
  };
  console.log(salles)
  const FORMAT = "dd/MM/yyyy";
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
    <>
      <NotificationContainer />
      <div className="container right-container-001 container">
        <div class="menu-box-001 block">
          <h2 className="titular-001" style={{ padding: "16px" }}>
            My Reservations
          </h2>

          <div class="projects-section-line" style={{ padding: "15px" }}>
            <div class="projects-status">
              <div class="item-status">
                <span class="status-number" style={{ color: "white" }}>
                  {
                    reservation.reservationbyId.filter(
                      (elm) =>
                        new Date(elm.dateOfreservation).getTime() >=
                        new Date(
                          dateFnsFormat(new Date(), "yyyy-MM-dd")
                        ).getTime()
                    ).length
                  }
                </span>
                <span class="status-type" style={{ color: "white" }}>
                  Upcoming
                </span>
              </div>
              <div class="item-status">
                <span class="status-number" style={{ color: "white" }}>
                  {
                    reservation.reservationbyId.filter(
                      (elm) =>
                        new Date(elm.dateOfreservation).getMonth() ===
                          new Date(
                            dateFnsFormat(new Date(), "yyyy-MM-dd")
                          ).getMonth() &&
                        new Date(elm.dateOfreservation).getFullYear() ===
                          new Date(
                            dateFnsFormat(new Date(), "yyyy-MM-dd")
                          ).getFullYear()
                    ).length
                  }
                </span>
                <span class="status-type" style={{ color: "white" }}>
                  {format(new Date(), "MMMM")} Reservations
                </span>
              </div>

              <div class="item-status">
                <span class="status-number" style={{ color: "white" }}>
                  {reservation.reservationbyId.length}
                </span>
                <span class="status-type" style={{ color: "white" }}>
                  {" "}
                  Total
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="join-newslette-001 block">
          <div
            className="titular-001"
            style={{ borderBottom: "1px solid black" }}
          >
            <i class="fa fa-search" aria-hidden="true"></i>

            <DayPickerInput
              formatDate={formatDate}
              format={FORMAT}
              value={date}
              parseDate={parseDate}
              placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
              onDayChange={(date) => setDate(date)}
              style={{ color: "black" }}
            />

            <i
              class="fa fa-refresh reload"
              aria-hidden="true"
              onClick={() => setDate(null)}
            ></i>
          </div>
          <ul
            className="menu-box-menu-001"
            style={{
              overflowY: "scroll",
              height: "430px",
              borderBottom: "1px solid black",
            }}
          >
            {reservation.loading ? (
              <ReactLoading
                type="bubbles"
                color="white"
                height={100}
                width={100}
              />
            ) : (
              reservation.reservationbyId
                .filter((elm) =>
                  date
                    ? dateFnsFormat(new Date(elm.dateOfreservation), FORMAT) ===
                      dateFnsFormat(new Date(date), FORMAT)
                    : true
                )
                .map((elm) => (
                  <li class="menu-box-tab-001">
                    <div class="project-box-header">
                      <span>
                        <i
                          class="fa fa-edit"
                          style={{ color: "white" }}
                          onClick={() => handleClickEdit(elm)}
                        ></i>
                        <p
                          style={{ color: "white", paddingBottom: "60px" }}
                          onClick={() => handleClick(elm._id)}
                        >
                          x
                        </p>
                      </span>

                      <div class="project-box-content-header">
                        <p
                          style={{ color: "white", paddingBottom: "5px" }}
                          class="box-content-subheader"
                        >
                          {" "}
                          Room : {elm.salleId.number} |{" "}
                          {
                  userRes.map((elm)=>
                  elm.departement
                    )
                }
                        </p>

                        <div class="projects-status">
                          <div class="item-status">
                            <span
                              class="status-type"
                              style={{ color: "white", padding: "3px" }}
                            >
                              <i class="fa fa-calendar" aria-hidden="true"></i>
                            </span>
                            <span
                              class="status-number"
                              style={{ color: "white", padding: "3px" }}
                            >
                              <p style={{ color: "white" }}>
                                {" "}
                                {`${new Date(
                                  elm.dateOfreservation
                                ).getDate()} - ${
                                  new Date(elm.dateOfreservation).getMonth() + 1
                                } - ${new Date(
                                  elm.dateOfreservation
                                ).getFullYear()}`}
                              </p>
                            </span>
                          </div>
                          <div class="item-status">
                            <span
                              class="status-type"
                              style={{ color: "white", padding: "3px" }}
                            >
                              <i class="fa fa-clock-o" aria-hidden="true"></i>
                            </span>
                            <span
                              class="status-number"
                              style={{ color: "white", padding: "3px" }}
                            >
                              <p style={{ color: "white" }}>{elm.shift}</p>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="more-wrapper">
                        {/**********************modal delete************************************* */}
                        <div
                          id="id01"
                          style={{ display: `${displaydel}` }}
                          className="w3-modal "
                        >
                          <div
                            className="w3-modal-content-001"
                            style={{
                              backgroundColor: "#394264",
                              border: "2px solid black",
                            }}
                          >
                            <div
                              className="titular-001 modal-title"
                              style={{
                                backgroundColor: "#11a8ab",
                                padding: "0px",
                              }}
                            >
                              Delete
                            </div>

                            <div className="w3-container">
                              <div>
                                <h2 style={{ padding: "10px" }}>
                                  {" "}
                                  delete reservation for{" "}
                                  {dateFnsFormat(
                                    new Date(elm.dateOfreservation),
                                    FORMAT
                                  )}{" "}
                                  ?
                                </h2>
                                <div style={{ margin: "5px 35%" }}>
                                  <button
                                    variant="primary"
                                    onClick={handleClose}
                                  >
                                    YES
                                  </button>
                                  <button onClick={() => setDisplaydel("none")}>
                                    NO
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/**********************modal edit******************************** */}
                      <div
                        id="id01"
                        style={{ display: `${displayedit}` }}
                        className="w3-modal"
                      >
                        <div
                          className="w3-modal-content-001"
                          style={{
                            backgroundColor: "#394264",
                            border: "1px solid black",
                          }}
                        >
                          <div
                            className="titular-001 modal-title"
                            style={{
                              backgroundColor: "#11a8ab",
                              padding: "0px",
                            }}
                          >
                            EDIT
                          </div>

                          <div className="w3-container">
                            <div
                              class="time__container-002"
                              style={{ paddingTop: "0px" }}
                            >
                              <form action="" class="form__time-002">
                                <div class="date-002">
                                  <label
                                    for="date-002"
                                    style={{ marginBottom: "10px" }}
                                  >
                                    Date
                                  </label>
                                  <div>
                                    <DayPickerInput
                                      style={{ lineHeight: "20px" }}
                                      value={`${dateFnsFormat(
                                        new Date(dateEdit),
                                        FORMAT
                                      )}`}
                                      formatDate={formatDate}
                                      format={FORMAT}
                                      parseDate={parseDate}
                                      placeholder={`${dateFnsFormat(
                                        new Date(),
                                        FORMAT
                                      )}`}
                                      onDayChange={(date) => setDateEdit(date)}
                                    />
                                  </div>
                                </div>
                                <div
                                  class="time-002"
                                  style={{ marginLeft: "20px" }}
                                >
                                  <label
                                    for="time-002"
                                    style={{ marginBottom: "10px" }}
                                  >
                                    Room
                                  </label>
                                  <select
                                    className="salle-01"
                                    onChange={(e) => setSalle(e.target.value)}
                                    style={{
                                      padding: "10px",
                                      height: "36px",
                                      width: "200px",
                                      margin: "0px",
                                      overFlowY: "scroll",
                                    }}
                                  >
                                    <option name="" value="salles._id">
                                      {` ${
                                        salles && salles.number
                                          ? "Room Number " + salles.number
                                          : "choose a Room"
                                      }`}
                                    </option>
                                    {salle.salles.map((elm) =>
                                      elm ? (
                                        <option name="salleId" value={elm._id}>
                                          Room Number {elm.number}/
                                          {elm.departement.name}
                                        </option>
                                      ) : null
                                    )}
                                  </select>
                                </div>
                                <div
                                  class="time-002"
                                  style={{ marginLeft: "0" }}
                                >
                                  <label
                                    for="time-002"
                                    style={{ marginBottom: "10px" }}
                                  >
                                    Shift
                                  </label>
                                  <select
                                    className="salle-01"
                                    onChange={(e) => setShift(e.target.value)}
                                    style={{
                                      padding: "10px",
                                      height: "36px",
                                      width: "200px",
                                      margin: "0px",
                                    }}
                                  >
                                    <option name="" value={shift}>
                                      {shift}
                                    </option>
                                    <option value="morning">Morning</option>
                                    <option value="evening">Evening</option>
                                  </select>
                                </div>
                              </form>
                            </div>
                            <div style={{ margin: "5px 30%" }}>
                              <button
                                variant="primary"
                                onClick={handleCloseEdit}
                              >
                                Save Changes
                              </button>
                              <button onClick={() => setDisplayedit("none")}>
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
};
export default Menu;
