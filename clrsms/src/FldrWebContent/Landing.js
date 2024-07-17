import Header from "../FldrMainMenu/Header";
import { Link } from "react-router-dom";
import UserLogin from "../FldrMainMenu/UserLogin";
import { useState, useEffect } from "react";
import { ExpireComponentToken } from "../FldrSessionsComponents/ExpireComponent";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { GetModeltblAPSchedule, GetModeltblAPScheduleSpecific, GetModeltblAPMatter, GetCountAppointmentByDate } from "../FldrFunctions/ClsGetList";
import axios from "axios";
import PlsConnect from "../FldrFunctions/ClsGetConnection"; 
import NotifyMessage from "../FldrModal/NotifyMessage";
function Landing() {
const [token, settoken] = useState('');
const [userSession, setuserSession] = useState({});

const [tblAPScheduleList, settblAPScheduleList] = useState([]);
const [tblAPMatterList, settblAPMatterList] = useState([]);
const [tblAPScheduleSpecific, settblAPScheduleSpecific] = useState({});
const [txtCalendar, settxtCalendar] = useState();
const [txtTime, settxtTime] = useState('');
const [txtAPMatter, settxtAPMatter] = useState('');
const [txtAPDesc, settxtAPDesc] = useState('');
//const [txtFname, settxtFname] = useState('');
const [txtMname, settxtMname] = useState('');
//const [txtLname, settxtLname] = useState('');
const [txtAddress, settxtAddress] = useState("");
const [txtEmail, settxtEmail] = useState('');
const [txtContact, settxtContact] = useState('');
const [apCount, setapCount] = useState(0);


const [MessageConfirm, setMessageConfirm] = useState(false); 
const [MessageConfirmSU, setMessageConfirmSU] = useState(false); 

useEffect(()=>{
settoken(ExpireComponentToken()); 
setuserSession(JSON.parse(sessionStorage.getItem("UserSession")))
},[]);

 

  // Function to check if the given date is in the list of highlighted dates
  const isHighlightedDate = (dateToCheck) => {
    return tblAPScheduleList.some((item) => {
      const highlightedDate = new Date(item.apDate);
      return (
        dateToCheck.getDate() === highlightedDate.getDate() &&
        dateToCheck.getMonth() === highlightedDate.getMonth() &&
        dateToCheck.getFullYear() === highlightedDate.getFullYear()
      );
    });
  };

  // Function to render specific styling for the highlighted dates
  const tileContent = ({ date: dateToCheck, view }) => {
    if (view === "month" && isHighlightedDate(dateToCheck)) {
      return (
        <div
          style={{
            backgroundColor: "#3BAFDA",
            borderRadius: "10%",
            height: "20%",
            width: "100%",
            margin: "auto",
          }}
        />
      );
    }
    return null;
  };

  //Fetch
  const fetchMdlProjectList = async (varFilterDate) => {
    try {
      settblAPScheduleList(await GetModeltblAPSchedule(varFilterDate));
    } catch {
      console.log("Connection error!");
    }
  };
  const fetchMdlSpecificDate = async (varFilterDate) => {
    try {
      settblAPScheduleSpecific(await GetModeltblAPScheduleSpecific(varFilterDate));  
    } catch {
      console.log("Connection error!");
    }
  };
  const fetchMdlAPMatter = async () => {
    try {
      settblAPMatterList(await GetModeltblAPMatter());  
    } catch {
      console.log("Connection error!");
    }
  };
  const fetchMdlCountAP = async (varapDate) => {
    try {
        setapCount(await GetCountAppointmentByDate(varapDate));  
    } catch {
      console.log("Connection error!");
    }
  };


//useEffects
  const strDateToday = new Date().toISOString().split('T')[0]; 
  useEffect(() => { 
    fetchMdlProjectList(strDateToday);  
    fetchMdlAPMatter();
  }, [strDateToday]);
  
//validation
const [valid, setvalid] = useState()

//Clear
function ClearData(){
  settxtTime('');
  settxtAPMatter('');
  settxtAPDesc(''); 
}
//buttons================== 
async function btnSave(){  
setvalid(0);
  if (!txtCalendar || tblAPScheduleSpecific.slots<=0){
    setvalid(1);
  }
  //else if(new Date(tblAPScheduleSpecific.apDate).toLocaleDateString() === new Date(txtCalendar).toLocaleDateString()){
  else if(!txtTime || txtTime.trim() === ""){
    setvalid(2);
  }
  else if(!txtAPMatter || txtAPMatter.trim() === ""){
    setvalid(3);
  }
  else if(!txtAPDesc || txtAPDesc.trim() === ""){
    setvalid(4);
  }  
  else{

    const Mdl1 = {  
      TxtCalendar:txtCalendar,  
      TxtTime:txtTime,  
      APDesc: txtAPDesc,   
      UserCode: userSession.userCode,   
      APMCode: txtAPMatter,    
      SchedCode: tblAPScheduleSpecific.code
    }; 
    try { 
    setvalid(0); 
    const response = await axios.post(`${PlsConnect()}/API/CLRSMSWEBAPI/InsertModeltblAppointments`, Mdl1, {
      headers: {
        'Content-Type': 'application/json',
      },
    });  
    if (response.status === 200) {
      setMessageConfirm(true);
      ClearData();
      console.log("Success: Data posted successfully!");  
    } else {
      alert("Error: Something went wrong."); 
    }
      
    } catch (error) {
      console.error('Error:', error);
    }
  }

}

function handleOkayNotif(){ 
  setMessageConfirm(false);
  setMessageConfirmSU(false);
}

//Calendar
const OCCalendar = (edate) =>{ 
  if(edate){ 
    const strtxtCalendar = new Date(edate).toLocaleDateString();
    settxtCalendar(strtxtCalendar);
    fetchMdlSpecificDate(strtxtCalendar);
    fetchMdlCountAP(strtxtCalendar);
    setvalid(0);
  }
}


//UserSignup
const [txtFName, settxtFName] = useState('');
const [txtLName, settxtLName] = useState('');
const [txtXName, settxtXName] = useState('');
const [txtUName, settxtUName] = useState('');
const [txtPassword, settxtPassword] = useState('');

//validation
const [Uvalid, setUvalid] = useState()

//Clear
function UClearData(){
  settxtFName('');
  settxtMname('');
  settxtLName(''); 
  settxtXName(''); 
  settxtUName(''); 
  settxtPassword(''); 
  settxtEmail('');
  settxtContact('');
  settxtAddress('');
  }
//button
async function btnSaveUser(){
  setUvalid(0);
      if (!txtFName || txtFName.trim() === ""){ 
        setUvalid(1);
        }
        /*else if(!txtMname || txtMname.trim() === ""){  
          setUvalid(2);
        }*/
        else if(!txtLName || txtLName.trim() === ""){  
          setUvalid(3);
        }
        else if(!txtXName || txtXName.trim() === ""){  
          setUvalid(4);
        }
        else if(!txtEmail || txtEmail.trim() === ""){  
          setUvalid(5);
        }
        else if(!txtContact || txtContact.trim() === ""){  
          setUvalid(6);
        }
        else if(!txtAddress || txtAddress.trim() === ""){  
          setUvalid(7);
        }
        else if(!txtUName || txtUName.trim() === ""){  
          setUvalid(8);
        }
        else if(!txtPassword || txtPassword.trim() === ""){  
          setUvalid(9);
        }
        else{
            const Mdl1 = { 
              PWord: txtPassword,   
              GroupCode: '04',
              UserName: txtUName,
              FName: txtFName,
              MName: txtMname,
              LName: txtLName,
              XName: txtXName,
              Address: txtAddress,
              Email: txtEmail,
              Contact: txtContact
              }; 
              try {
                setUvalid(0);
                const response = await axios.post(`${PlsConnect()}/API/CLRSMSWEBAPI/InsertModeltblUser`, Mdl1, {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });  
                if (response.status === 200) {
                  console.log("Success: Data posted successfully!"); 
                  UClearData();
                  setMessageConfirmSU(true);
                } else {
                  alert("Error: Something went wrong."); 
                }
              } catch (error) {
                console.error('Error:', error);
              }
              }
}
  return (
    <>
      <div className="container-fluid HeadContainerLanding">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <div className="logo-wrap-pro">
              <Link>
              <img src="img/lg01.jpg" alt=""></img>
              </Link>
            </div>
            <Header />
          </div>
        </nav>
      </div>
      <div id="landing">
        <div className="container">
          <div className="row h-100 justify-content-end">
            <div className="col-12 my-auto">
              <h1
                className="text-end display-3"
                style={{
                  color: "#8BD6FF",
                  fontFamily: "'Times New Roman', cursive",
                  marginTop: "150px",
                }}
              >
                Candari Law & Realty Services
              </h1>

              
            </div>
          </div>
        </div>

        <div className="container-lg container-md-fluid rounded p-3 shadow bg-light lbody">
          <h2 style={{ fontFamily: "'Anton', sans-serif", color: "#0275d8" }}>
            Set Appointment?
          </h2>
          <div className="container-fluid">
            <div className="aptBody">
              <div className="col-lg-4 col-sm-12 mb-2">
                <div className="calendar-container me-lg-2 justify-content-center">
                  <Calendar
                    className={`shadow rounded-4 form-control ${
                      valid === 1 ? "is-invalid" : ""
                    }`}
                    id={"icalendar"}
                    tileContent={tileContent}
                    value={txtCalendar}
                    onChange={(value) => OCCalendar(value)}
                  />
                </div>
              </div>
              <div className="col-lg-8 col-sm-12 aptBody gap-2">
                <div className="col-lg-4 col-sm-12 mb-2">
                  <div className="border text-center p-1 h-100">
                    <b>STATUS</b>
                    {tblAPScheduleSpecific && (
                      <>
                        <div className="text-start p-1">
                          <b>
                            Available Slots :{" "}
                            <span className="text-primary">
                              {tblAPScheduleSpecific.slots? tblAPScheduleSpecific.slots-apCount:0}
                            </span>
                          </b>
                        </div>
                        <div className="text-start p-1">
                          <b>
                            Description :{" "}
                            <span className="text-primary">
                              {tblAPScheduleSpecific.slots? tblAPScheduleSpecific.slots-apCount > 0?"Available":"Not Available":"Not Available"}
                            </span>
                          </b>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {token ? (
                  <>
                    <div className="col-lg-8 col-sm-12">
                      <div className="d-lg-flex d-sm-grid mb-2 gap-1 justify-content-center">
                        <div className="form-floating col-lg-4 col-sm-12 mb-2">
                          <input
                            type="time"
                            className={`form-control form-control-sm ${
                              valid === 2 ? "is-invalid" : ""
                            }`}
                            id="Stime"
                            placeholder="Select Time"
                            value={txtTime}
                            onChange={(e) => {
                              settxtTime(e.target.value);
                              setvalid(0);
                            }}
                          />
                          <label htmlFor="Stime">Select Time :</label>
                        </div>
                        <div className="form-floating col-lg-8 col-sm-12">
                          <select
                            className={`form-control form-control-sm ${
                              valid === 3 ? "is-invalid" : ""
                            }`}
                            id="SAptType"
                            value={txtAPMatter}
                            onChange={(e) => {
                              settxtAPMatter(e.target.value);
                              setvalid(0);
                            }}
                          >
                            <option></option>
                            {tblAPMatterList ? (
                              tblAPMatterList.map((varlist, index) => (
                                <option key={index} value={varlist.apmCode}>
                                  {varlist.apmTitle}
                                </option>
                              ))
                            ) : (
                              <option>NA</option>
                            )}
                          </select>
                          <label htmlFor="SAptType">Appointment Type :</label>
                        </div>
                      </div>

                      <div className="form-floating">
                        <textarea
                          className={`form-control ${
                            valid === 4 ? "is-invalid" : ""
                          }`}
                          placeholder="Package Description"
                          id="description"
                          style={{ height: "230px" }}
                          value={txtAPDesc}
                          onChange={(e) => {
                            settxtAPDesc(e.target.value);
                            setvalid(0);
                          }}
                        ></textarea>
                        <label htmlFor="description">
                          Appointment Description
                        </label>
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>

            {token ? (
              <>
                {/* <div className="aptBody mt-2">
                  <div className="col-lg-12 col-sm-12 aptBody gap-2 justify-content-center">
                    <div className="col-lg-4 col-sm-12">
                      <div className="form-floating m-2">
                        <input
                          type="text"
                          className={`form-control form-control-sm rounded-5 ${
                            valid === 5 ? "is-invalid" : ""
                          }`}
                          id="FName"
                          placeholder="First Name"
                          value={txtFname}
                          onChange={(e) => {
                            settxtFname(e.target.value);
                            setvalid(0);
                          }}
                        />
                        <label htmlFor="FName">First Name</label>
                      </div>
                      <div className="form-floating m-2">
                        <input
                          type="text"
                          className={`form-control form-control-sm rounded-5 ${
                            valid === 6 ? "is-invalid" : ""
                          }`}
                          id="MName"
                          placeholder="Middle Name"
                          value={txtMname}
                          onChange={(e) => {
                            settxtMname(e.target.value);
                            setvalid(0);
                          }}
                        />
                        <label htmlFor="MName">Middle Name</label>
                      </div>
                      <div className="form-floating m-2">
                        <input
                          type="text"
                          className={`form-control form-control-sm rounded-5 ${
                            valid === 7 ? "is-invalid" : ""
                          }`}
                          id="LName"
                          placeholder="Last Name"
                          value={txtLname}
                          onChange={(e) => {
                            settxtLname(e.target.value);
                            setvalid(0);
                          }}
                        />
                        <label htmlFor="LName">Last Name</label>
                      </div>
                    </div>
                    <div className="col-lg-4 col-sm-12">
                      <div className="form-floating m-2">
                        <input
                          type="text"
                          className={`form-control form-control-sm rounded-5 ${
                            valid === 8 ? "is-invalid" : ""
                          }`}
                          id="adrss"
                          placeholder="Address"
                          value={txtAddrss}
                          onChange={(e) => {
                            settxtAddrss(e.target.value);
                            setvalid(0);
                          }}
                        />
                        <label htmlFor="adrss">Address</label>
                      </div>
                      <div className="form-floating m-2">
                        <input
                          type="text"
                          className={`form-control form-control-sm rounded-5 ${
                            valid === 9 ? "is-invalid" : ""
                          }`}
                          id="email"
                          placeholder="Email"
                          value={txtEmail}
                          onChange={(e) => {
                            settxtEmail(e.target.value);
                            setvalid(0);
                          }}
                        />
                        <label htmlFor="email">Email</label>
                      </div>
                      <div className="form-floating m-2">
                        <input
                          type="text"
                          className={`form-control form-control-sm rounded-5 ${
                            valid === 10 ? "is-invalid" : ""
                          }`}
                          id="contact"
                          placeholder="Contact"
                          value={txtContact}
                          onChange={(e) => {
                            settxtContact(e.target.value);
                            setvalid(0);
                          }}
                        />
                        <label htmlFor="contact">Contact #</label>
                      </div>
                    </div>
                  </div>
                </div> */}

                <div className="container mt-2 col-lg-2">
                  <button
                    className="btn btn-primary btn-sm w-75 p-2 rounded-5 shadow"
                    onClick={() => btnSave()}
                  >
                    Done
                  </button>
                </div>
              </>
            ) : (
              <div className="container mt-2 col-lg-2">
                <button
                  className="btn btn-outline-primary btn-sm w-75 p-2 rounded-5 shadow"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  sign in
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="container-fluid container-xxl rounded my-5"> 

          <div className="row">
            {tblAPMatterList
              ? tblAPMatterList.map((varlist, index) => (
                  <div className="col-lg-4 col-md-4 col-sm-6 mb-3" key={index}>
                    <div
                      className="ps-2 pe-2 shadow rounded border-top border-info border-2"
                      style={{ height: "400px" }}
                    >
                      <img alt="" className="img-fluid rounded" />

                      <h6 style={{ fontfamily: "'Anton', sans-serif" }}>
                        {varlist.apmTitle}
                      </h6>

                      <div
                        className="p-3 overflow-auto text-start"
                        style={{ maxHeight: "35vh" }}
                      >
                        <small>
                          <p>{varlist.apmDesc}</p>
                        </small>
                      </div>
  
                    </div>
                  </div>
                ))
              : ""}

            <div className="container text-center my-4">
              <Link to="/Services" className="btn btn-outline-primary">
                View all Services
              </Link>
            </div>
          </div>
        </div>
        

        <div className="footer-copyright-area divFooter">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="footer-copy-right">
                  <p>
                    Copyright &#169; 2023
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <UserLogin />
        </div>
      </div>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5
            className="modal-title"
            style={{ color: "'#87CEEB', !important" }}
            id="staticBackdropLabel"
          >
            Create account
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body">
          <div className="container text-center">
            <img src="Images/QCA LOGO.png" height="100" alt="" />

            <div className="form-floating w-100 mb-2">
              <input
                type="text"
                className={`form-control ${Uvalid===1?"is-invalid":""}`}
                id="lblFname"
                placeholder="Project Name" 
                value={txtFName}
                onChange={(e)=>{settxtFName(e.target.value);
                  setUvalid(0);}}
              />
              <label htmlFor="lblFname">First Name</label>
            </div>
            
            <div className="form-floating w-100 mb-2">
              <input
                type="text"
                className={`form-control ${Uvalid===2?"is-invalid":""}`}
                id="lblMName"
                placeholder="Project Name" 
                value={txtMname}
                onChange={(e)=>{settxtMname(e.target.value);
                  setUvalid(0);}}
              />
              <label htmlFor="lblMName">Middle Name</label>
            </div>

            <div className="form-floating w-100 mb-2">
              <input
                type="text"
                className={`form-control ${Uvalid===3?"is-invalid":""}`}
                id="lblLName"
                placeholder="Project Name" 
                value={txtLName}
                onChange={(e)=>{settxtLName(e.target.value);
                  setUvalid(0);}}
              />
              <label htmlFor="lblLName">Last Name</label>
            </div>
            
            <div className="form-floating w-100 mb-2">
              <input
                type="text"
                className={`form-control ${Uvalid===4?"is-invalid":""}`}
                id="lblextName"
                placeholder="Project Name" 
                value={txtXName}
                onChange={(e)=>{settxtXName(e.target.value);
                  setUvalid(0);}}
              />
              <label htmlFor="lblextName">Extension Name</label>
            </div>
            
                <div className="form-floating w-100 mb-2">
                  <input
                    type="text"
                    className={`form-control ${
                      Uvalid === 5 ? "is-invalid" : ""
                    }`}
                    id="lblemail"
                    placeholder="Project Name"
                    value={txtEmail}
                    onChange={(e) => {
                      settxtEmail(e.target.value);
                      setvalid(0);
                    }}
                  />
                  <label htmlFor="lblemail">Email</label>
                </div>

                <div className="form-floating w-100 mb-2">
                  <input
                    type="text"
                    className={`form-control ${
                      Uvalid === 6 ? "is-invalid" : ""
                    }`}
                    id="lblContact"
                    placeholder="Project Name"
                    value={txtContact}
                    onChange={(e) => {
                      settxtContact(e.target.value);
                      setvalid(0);
                    }}
                  />
                  <label htmlFor="lblContact">Contact Number</label>
                </div>
              <div className="d-flex align-items-center justify-content-center">
                <div className="col-12 form-floating mb-2">
                  <input
                    type="text"
                    className={`form-control ${
                      Uvalid === 7 ? "is-invalid" : ""
                    }`}
                    id="lbladdrss"
                    placeholder="Project Name"
                    value={txtAddress}
                    onChange={(e) => {
                      settxtAddress(e.target.value);
                      setvalid(0);
                    }}
                  />
                  <label htmlFor="lbladdrss">Address</label>
                </div> 
              </div>

            <div className="form-floating w-100 mb-2">
              <input
                type="text"
                className={`form-control ${Uvalid===8?"is-invalid":""}`}
                id="lbluname"
                placeholder="Project Name" 
                value={txtUName}
                onChange={(e)=>{settxtUName(e.target.value);
                  setUvalid(0);}}
              />
              <label htmlFor="lbluname">User Name</label>
            </div>
            
            <div className="form-floating w-100 mb-2">
              <input
                type="password"
                className={`form-control ${Uvalid===9?"is-invalid":""}`}
                id="lblPw"
                placeholder="Project Name" 
                value={txtPassword}
                onChange={(e)=>{settxtPassword(e.target.value);
                  setUvalid(0);}}
              />
              <label htmlFor="lblPw">Password</label>
            </div>

            <div className="d-grid">
            <button className="btn btn-primary w-50 rounded-5 mx-auto m-3" onClick={()=>btnSaveUser()}>Save</button>
            <button
            type="button"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              data-bs-dismiss="offcanvas"
              className="btn btn-outline-warning w-50 mx-auto"
            >
              Go to Log-in
            </button>
          </div>
          </div>
        </div>

        <div className="offcanvas-footer p-2 text-end">
          <button
            type="button"
            className="btn btn-danger"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            Cancel
          </button>
        </div>
      </div>
      {/* Modal */}
      
      {/* Message */}
      <div
        className={`modal fade ${MessageConfirm ? "show" : ""}`}
        tabIndex="-1"
        style={{
          display: MessageConfirm ? "flex" : "none",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="modal-dialog">
          <NotifyMessage
            message={`Appointment Successful!`} 
            onCancel={handleOkayNotif} 
          />
        </div>
      </div>
      <div
        className={`modal fade ${MessageConfirmSU ? "show" : ""}`}
        tabIndex="-1"
        style={{
          display: MessageConfirmSU ? "flex" : "none",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="modal-dialog">
          <NotifyMessage
            message={`Successful!`} 
            onCancel={handleOkayNotif} 
          />
        </div>
      </div>
    </>
  );
}
export default Landing;
