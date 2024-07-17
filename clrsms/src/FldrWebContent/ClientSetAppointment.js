


import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { GetModeltblAPSchedule, GetModeltblAPScheduleSpecific, GetModeltblAPMatter, GetCountAppointmentByDate, GetModeltblAPSchedTime } from "../FldrFunctions/ClsGetList";
import axios from "axios";
import PlsConnect from "../FldrFunctions/ClsGetConnection"; 
import NotifyMessage from "../FldrModal/NotifyMessage";
import { useState, useEffect } from "react";
function ClientSetAppointment(){
 
  
  
  const [tblAPSchedTime, settblAPSchedTime] = useState([]);
const [tblAPScheduleList, settblAPScheduleList] = useState([]);
const [tblAPMatterList, settblAPMatterList] = useState([]);
const [tblAPScheduleSpecific, settblAPScheduleSpecific] = useState({});
const [txtCalendar, settxtCalendar] = useState();
const [txtTime, settxtTime] = useState('');
const [txtAPMatter, settxtAPMatter] = useState('');
const [txtAPDesc, settxtAPDesc] = useState('');  
const [apCount, setapCount] = useState(0);
const [MessageConfirm, setMessageConfirm] = useState(false); 

const [userSession, setuserSession] = useState({});
useEffect(()=>{ 
setuserSession(JSON.parse(sessionStorage.getItem("UserSession")))
},[]);
//validation
const [valid, setvalid] = useState()

//Clear
function ClearData(){
  settxtTime('');
  settxtAPMatter('');
  settxtAPDesc(''); 
}

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
      const varApSched=await GetModeltblAPScheduleSpecific(varFilterDate);  
      settblAPScheduleSpecific(varApSched);  
      fetchMdlAPTimeList(varApSched.code);
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
  const fetchMdlAPTimeList = async (varCode) => {
    try {
      settblAPSchedTime(await GetModeltblAPSchedTime(varCode)); 
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
  
//Calendar
const OCCalendar = (edate) =>{ 
  if(edate){ 
    const strtxtCalendar = new Date(edate).toLocaleDateString();
    alert(strtxtCalendar);
    settxtCalendar(strtxtCalendar);
    fetchMdlSpecificDate(strtxtCalendar);
    fetchMdlCountAP(strtxtCalendar);
    setvalid(0);
  }
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
  }

    return (
      <>
        <div className="container-lg container-md-fluid rounded p-3 shadow bg-light mt-5">
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
                              {tblAPScheduleSpecific.slots
                                ? tblAPScheduleSpecific.slots - apCount
                                : 0}
                            </span>
                          </b>
                        </div>
                        <div className="text-start p-1">
                          <b>
                            Description :{" "}
                            <span className="text-primary">
                              {tblAPScheduleSpecific.slots
                                ? tblAPScheduleSpecific.slots - apCount > 0
                                  ? "Available"
                                  : "Not Available"
                                : "Not Available"}
                            </span>
                          </b>
                        </div>
                        <div className="col-12 text-start container-fluid mt-2">
                    <div className="row gap-2 justify-content-center align-items-center"> 
                    <b className={tblAPSchedTime.length>0?"text-center text-success":"text-center text-danger"}>{tblAPSchedTime.length>0?"Time Available":"No Time Available"} </b>
                        {tblAPSchedTime? tblAPSchedTime.map((varlist, index)=>(
                        <small key={index} className={`btn btn-sm btn-outline-dark col-5 text-center p-2 border ${txtTime === varlist.tTime ? 'active' : ''}`} onClick={()=>settxtTime(varlist.tTime)} >
                          <b>{new Date(`2024-02-14T${varlist.tTime}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</b> 
                        </small>
                        )):""} 
                    </div>
                  </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="col-lg-8 col-sm-12">
                  <div className="d-lg-flex d-sm-grid mb-2 gap-1 justify-content-center">
                    {/* <div className="form-floating col-lg-4 col-sm-12 mb-2">
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
                    </div> */}
                    <div className="form-floating col-lg-12 col-sm-12">
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
                    <label htmlFor="description">Appointment Description</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="container mt-2 col-lg-2">
              <button
                className="btn btn-primary btn-sm w-75 p-2 rounded-5 shadow"
                onClick={() => btnSave()}
              >
                Done
              </button>
            </div>
          </div>
        </div>

        
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
      </>
    );
}

export default ClientSetAppointment;