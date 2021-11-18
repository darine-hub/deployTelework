import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSalle,
  getsalles,
  updateSalle,
} from "../redux/salleSlice";
import { getreservations } from "../redux/reservationSlice";
import { postNewDepartement,getDepartement,updateDepartement,deleteDepartement} from "../redux/departementSlice";
import { getUsers } from "../redux/userSlice";
import BarreNavigationHome from "../components/BarreNavigationHome";
import ReactLoading from 'react-loading';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const Departement = ({ history }) => {

  const [dep, setDep] = useState("");
  const [displaydel, setDisplaydel] = useState("none");
  const [counter, setCounter] = useState(0);
  const [counterEdit, setCounterEdit] = useState(0);
  const [varEdit, setVarEdit] = useState();
  const [inUseEdit, setInuseEdit] = useState();
  const [display, setDisplay] = useState(false);
  const [inUse, setinUse] = useState("");
  const [depEdit, setdepEdit] = useState();
  const [departementInput, setDepartementInput] = useState({});
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const salles = useSelector((state) => state.salle);
  const departement = useSelector((state) => state.departement);

  useEffect(() => {
    dispatch(getDepartement());
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
    if(!counter){NotificationManager.warning("add capacity!")}
    else if (!dep){NotificationManager.warning("add department!")}
    else if (!inUse){NotificationManager.warning("add room availability!")}
    else if (salles.salles) {
      dispatch(
        addSalle({
          capacity: counter,
          departement: dep,
          number: salles.salles.filter(elm=>elm.departement===dep).length + 1,
          inUse: inUse,
        })
      );
      NotificationManager.success("Room created!")
      setDep("")
      setCounter(0)
      setinUse("")
      setDisplay(!display);
    dispatch(getsalles());
    }
    
  };
  const handleEdit = () => {
    dispatch(
      updateSalle({
        id: varEdit._id,
        data: {
          capacity: counterEdit?counterEdit:varEdit.capacity,
          number: varEdit.number,
          departement: depEdit?depEdit:varEdit.departement,
          inUse: inUseEdit?inUseEdit:varEdit.inUse,
        },
      })
    );
    setDisplaydel("none");
    dispatch(getsalles());
    NotificationManager.success("Room updated!")
  };
  const handleEdit1 = (elm) => {
    setDisplaydel("block");
    setVarEdit(elm);
  };
  const handleplus = () => {
    setDisplay(!display)
    setCounter(0)


  }

 console.log(varEdit)

    const handleChange = (e) => {
      setDepartementInput({ ...departementInput, [e.target.name]: e.target.value });
    };


    const handleDepSubmit = (e) => {
      e.preventDefault();
      if(!departementInput.name){
        NotificationManager.warning('please enter a name for your departement')
      }
     else if(!departementInput.address){
      NotificationManager.warning('please enter an address for your departement')
      }
 
      else{
        dispatch(postNewDepartement(departementInput));
       
      }
     
      dispatch(getDepartement());
      NotificationManager.success('departement added!')
     
    };

console.log(departementInput)


    const handleUpdateSubmit = (e) => {
      e.preventDefault();
      dispatch(updateDepartement({ id:varEdit._id, data:departementInput}));
      if({departementInput}){NotificationManager.success('departement updated!')}
  else {NotificationManager.error('tray again ! departement not updated !')}
      
  dispatch(getDepartement());
  setDisplaydel("none");
  };
  const handleDelete=(did)=>{
dispatch(deleteDepartement(did))
NotificationManager.success('departement deleted!')
  }
 
 
  return (
    <div className="main-container">
      <BarreNavigationHome />
      <NotificationContainer/>
      <div
        className="middle-container container block"
        style={{ height: "auto", width: "65%" }}
      >
        <div>
          <div class="titular" >
            <h1>Departements List{" "}<span
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
          {/*       <th
                    style={{
                      color: "white",
                      width: "150px",
                      padding: "15px",
                      borderBottom: "1px solid white",
                    }}
                  >
                    Number
                  </th> */}
       
                  <th
                    style={{
                      color: "white",
                      width: "300px",
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
                    address
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
                 </tr>
              </thead>

              {departement.departements &&
                departement.departements.map((elm) => (
                  <tbody style={{ backgroundColor: "#50597b" }}>
                    <tr>
                   {/*  <td  style={{ width: "150px",padding:"10px" }}>{departement.departements.length + 1}</td> */}
                      <td
                        style={{
                          color: "white",
                          width: "150px",
                          padding: "15px",
                          
                        }}
                      >
                        {elm.name}
                      </td>
                      <td
                        style={{
                          color: "white",
                          width: "150px",
                          padding: "15px",
                        }}
                      >
                        {elm.address}
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
                   {/*  <td  style={{ width: "150px",padding:"10px" }}>{departement.departements.length + 1}</td> */}
                   
                    <td style={{display:"flex",width: "150px",padding:"10px"}}>
                     
                      <input
                        style={{width: "220px",height:"50px",margin:"0px",backgroundColor:'#394264'}}
                        type='text'
                        name='name'
                        placeholder='name departement'
                        onChange={handleChange}
                      />
                    
                    </td>
                    <td   style={{ width: "200px",padding:"10px" }}>
                    <input
                        style={{width: "220px",height:"50px",margin:"0px",backgroundColor:'#394264'}}
                        type='text'
                        name='address'
                        placeholder='address departement'
                        onChange={handleChange}
                      />
                    </td>

                    <td  style={{ width: "200px",padding:"10px" }}>
                      <select
                        style={{ width: "180px",height:"50px",margin:"0px",backgroundColor:'#394264'}}
                        name='inUse'
                        onChange={handleChange}
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
                    <td style={{padding:"10px"}}> <span
                    
              class="icon entypo-plus scnd-font-color"
              onClick={(e) => handleDepSubmit(e)}
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
            <div style={{ display: "flex",padding:"20px" }}>
              <div>
            <label style={{marginBottom:"10px",marginLeft:'10px'}}>name</label>
            <input
                        style={{width: "150px",height:"50px",margin:"0px",backgroundColor:'#394264'}}
                        type='text'
                        name='name'
                        placeholder={varEdit? varEdit.name :''}
                        onChange={handleChange}
                      />
             
              </div>   
               <div>
            <label style={{marginBottom:"10px",marginLeft:'10px'}}>address</label>
            <input
                        style={{width: "150px",height:"50px",marginLeft:'0px',backgroundColor:'#394264'}}
                        type='text'
                        name='address'
                        placeholder={varEdit? varEdit.address :''}
                        onChange={handleChange}
                      />
             
              </div>

              <div>
            <label style={{marginBottom:"10px",marginLeft:'10px'}}>in use ?</label>
              <select
                style={{ width: "150px",padding:"10px",height:"50px" ,marginLeft:'0px',backgroundColor:'#394264'}}
                name='inUse'
                onChange={handleChange}
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

              
             
              </div>
              <div style={{ margin: "5px 35%" }}>
                <button variant="primary" onClick={(e)=>handleUpdateSubmit(e)}>
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
export default Departement;
