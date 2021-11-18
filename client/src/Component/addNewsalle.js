import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSalle,
  getsalles,
  updateSalle,
} from "../redux/salleSlice";
import {
  getDepartement
} from "../redux/departementSlice";

import { getreservations } from "../redux/reservationSlice";
import { getUsers } from "../redux/userSlice";
import BarreNavigationHome from "../components/BarreNavigationHome";
import ReactLoading from 'react-loading';
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";


const AddSalle = ({ history }) => {
  const [dep, setDep] = useState("");
  const [displaydel, setDisplaydel] = useState("none");
  const [counter, setCounter] = useState(0);
  const [counterEdit, setCounterEdit] = useState(0);
  const [name,setName] = useState("")
  const [depEdit,setDepEdit] = useState("")
  const [varEdit, setVarEdit] = useState();
  const [inUseEdit, setInuseEdit] = useState();
  const [display, setDisplay] = useState(false);
  const [inUse, setinUse] = useState("");
  const [nameEdit, setnameEdit] = useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const salles = useSelector((state) => state.salle);
  const departement = useSelector((state) => state.departement);
  useEffect(()=>dispatch(getDepartement()),[])
  useEffect(() => {
    dispatch(getsalles());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getreservations());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getUsers());

    if (!user.isAuth) {
      history.push("/login");
    }
    else if(user.userInfo&&(user.userInfo.role!=="Admin")){
      history.push("/");
  }
  }, [user.isAuth]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!counter){alert("add capacity!")}
    else if (!dep){alert("add department!")}
    else if (!inUse){alert("add room availability!")}
    else if (salles.salles) {
      dispatch(
        addSalle({
          capacity: counter,
          departement: dep,
          number: name,
          inUse: inUse,
        })
      );
      if((!salles.loading)&&(!salles.sallesErrors)){NotificationManager.success('Room Created!')
      setDep("")
      setCounter(0)
      setinUse("")
      setDisplay(!display);
    dispatch(getsalles());}
      else if(salles.sallesErrors){NotificationManager.error(salles.sallesErrors)}
     
      
    }
    
  };
  const handleEdit = () => {
    dispatch(
      updateSalle({
        id: varEdit._id,
        data: {
          capacity: counterEdit?counterEdit:varEdit.capacity,
          number: nameEdit?nameEdit:varEdit.name,
          departement: depEdit?depEdit:varEdit.departement,
          inUse: inUseEdit?inUseEdit:varEdit.inUse,
        },
      })
    );
   
    
    if((!salles.loading)&&(!salles.sallesErrors)){NotificationManager.success('Room Updated!')
    
    setDisplaydel("none")
  setCounterEdit(0)
  setnameEdit("")
setInuseEdit("")}
      else if(salles.sallesErrors){NotificationManager.error(salles.sallesErrors)}
  };
  const handleEdit1 = (elm) => {
    setDisplaydel("block");
    setVarEdit(elm);
  };
  const handleplus = () => {
    setDisplay(!display)
    setCounter(0)


  }
 
  return (
    <div className="main-container">
      <BarreNavigationHome />

      <div
        className="middle-container container block"
        style={{ height: "auto", width: "65%" }}
      >
        <NotificationContainer/>
        <div>
          <div class="titular" >
            <h1>Rooms List{" "}<span
              class="icon entypo-plus scnd-font-color"
              onClick={handleplus}
            ></span></h1>
            
            {"  "}
          </div>
          {salles.loading?<ReactLoading type="bubbles" color="white" height={100} width={100} />:
          <div class="panel-body table-responsive" style={{ padding: "30px" }}>
            <table class="table">
              <thead style={{ backgroundColor: "#50597b" }}>
                <tr>
                  <th
                    style={{
                      color: "white",
                      width: "150px",
                      padding: "15px",
                      borderBottom: "1px solid white",
                    }}
                  >
                    Name
                  </th>
                  <th
                    style={{
                      color: "white",
                      width: "300px",
                      padding: "15px",
                      borderBottom: "1px solid white",
                    }}
                  >
                    in use
                  </th>
                  <th
                    style={{
                      color: "white",
                      width: "150px",
                      padding: "15px",
                      borderBottom: "1px solid white",
                    }}
                  >
                    Capacity
                  </th>
                  <th
                    style={{
                      color: "white",
                      width: "300px",
                      padding: "15px",
                      borderBottom: "1px solid white",
                    }}
                  >
                    Departement
                  </th>
                </tr>
              </thead>

              {salles.salles &&
                salles.salles.map((elm) => (
                  <tbody
                    style={{
                      color: `${elm.inUse !== "yes" ? "#FFCBA4" : "white"}`,
                      backgroundColor: "#50597b",
                    }}
                  >
                    <tr>
                      <td
                        style={{
                          color: "white",
                          width: "150px",
                          padding: "15px",
                        }}
                      >
                        {elm.number}
                      </td>
                      <td
                        style={{
                          color: "white",
                          width: "150px",
                          padding: "15px",
                        }}
                      >
                        {elm.inUse}
                      </td>
                      <td
                        style={{
                          color: "white",
                          width: "150px",
                          padding: "15px",
                        }}
                      >
                        {elm.capacity}
                      </td>
                      <td
                        style={{
                          color: "white",
                          width: "150px",
                          padding: "15px",
                        }}
                      >
                        {elm.departement?elm.departement.name:null}
                      </td>

                      <td
                        style={{
                          color: "white",
                          width: "150px",
                          padding: "15px",
                        }}
                      >
                        <ul class="action-list">
                          <li>
                            {" "}
                            <i
                              class="fa fa-edit"
                              onClick={() => handleEdit1(elm)}
                            ></i>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                ))}
              {display && (
                <tbody style={{ backgroundColor: "#50597b"}}>
                  <tr>
                    <td  style={{ width: "150px",padding:"10px" }}><input placeholder="Room name..." onChange={(e)=>setName(e.target.value)}/> </td>
                    <td  style={{ width: "200px",padding:"10px" }}>
                      <select
                        style={{ width: "180px",height:"50px",margin:"0px"}}
                        id="movie"
                        onChange={(e) => setinUse(e.target.value)}
                      >
                        <option name="" value="">
                          in use?
                        </option>
                        <option name="yes" value="yes">
                          yes
                        </option>
                        <option name="no" value="no">
                          no
                        </option>
                      </select>
                    </td>
                    <td style={{display:"flex",width: "150px",padding:"10px"}}>
                     
                      <input
                        style={{width: "120px",height:"50px",margin:"0px"}}
                        value={counter}
                        placeholder={counter}
                      />
                       <div style={{display:"flex",flexDirection:"column"}}>
                      
                      <i class="fa fa-plus-square-o" style={{padding:"10px 0px 2px 2px"}} aria-hidden="true" onClick={() => setCounter(counter + 1)}></i>
                      <i class="fa fa-minus-square-o" style={{padding:"0px 2px 2px 2px"}} aria-hidden="true" onClick={() => counter>0?setCounter(counter - 1):setCounter(counter)}></i>
             
                      </div>
                    </td>
                    <td   style={{ width: "200px",padding:"10px" }}>
                      <select
                        style={{ width: "180px",height:"50px",margin:"0px" }}
                        onChange={(e) => setDep(e.target.value)}
                      > 
                       <option name="all" value="all">
                          department
                        </option>
                      {departement.departements.map(elm=>(
                        <option name={elm.name} value={elm._id}>
                        {elm.name}
                        </option>
                      ))}
                       
                      </select>
                    </td>
                    <td style={{padding:"10px"}}> <span
                    
              class="icon entypo-plus scnd-font-color"
              onClick={(e) => handleSubmit(e)}
            ></span>
            
            </td>
<td style={{backgroundColor:"#394264"}}><span onClick={()=>setDisplay(!display)}>X</span></td>
                    
                  </tr>
                </tbody>
              )}
            </table>
          </div>}
        </div>
      </div>

      <div id="id01" style={{ display: `${displaydel}` }} className="w3-modal ">
        <div
          className="w3-modal-content-001"
          style={{ backgroundColor: "#394264", border: "2px solid black" }}
        >
          <div
            className="titular-001 modal-title"
            style={{ backgroundColor: "#11a8ab", padding: "10px" }}
          >
            Edit
          </div>

          <div className="w3-container">
            <div style={{ display: "flex",padding:"20px",flexDirection:"column"}}>
            <div>
              <label style={{marginBottom:"0.5em",PaddingLeft:"20%"}} >Room Name</label>
            
              <input
                 style={{ width: "60%",padding:"10px",height:"50px",margin:"5% 15%" }}
                onChange={(e) => setnameEdit(e.target.value)}
              />
               
              </div>
              <div>
            <label style={{marginBottom:"0.5em"}}>in use ?</label>
              <select
                style={{ width: "60%",padding:"10px",height:"50px",margin:"5% 15%" }}
                
                onChange={(e) => setInuseEdit(e.target.value)}
              >
                <option name="" value="">
                  in use?
                </option>
                <option name="yes" value="yes">
                  yes
                </option>
                <option name="no" value="no">
                  no
                </option>
              </select>
              </div>
              <div>
            <label style={{marginBottom:"0.5em"}}>Department</label>
              <select
                style={{ width: "60%",padding:"10px",height:"50px",margin:"5% 15%" }}
                
                onChange={(e) => setDepEdit(e.target.value)}
              >
                 <option name="all" value="all">
                          department
                        </option>
                      {departement.departements.map(elm=>(
                        <option name={elm.name} value={elm._id}>
                        {elm.name}
                        </option>
                      ))}
                       
              </select>
              </div>
              <div style={{display:"flex"}}>
               <div style={{width:"100%"}}>
                 
                <label style={{marginBottom:"0.5em"}} >capacity</label>
                <input
                 style={{ width: "60%",padding:"10px",height:"50px",margin:"5% 15%" }}
                  value={counterEdit}
                  placeholder={counterEdit}
                />
                
                </div>
                 <div style={{display:"flex","flexDirection":"column",marginLeft:"-22%"}}>
                 <i class="fa fa-plus-square-o" aria-hidden="true" style={{marginTop:"40px"}} onClick={() => setCounterEdit(counterEdit + 1)}></i>
                 <i class="fa fa-minus-square-o" aria-hidden="true"   onClick={() => counterEdit>0?setCounterEdit(counterEdit - 1):setCounterEdit(counterEdit)}></i>

              </div>
              </div>
             
              </div>

              <div style={{ margin: "5px 35%" }}>
                <button variant="primary" onClick={handleEdit}>
                  Submit
                </button>
                <button onClick={() => setDisplaydel("none")}>Exit</button>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddSalle;
