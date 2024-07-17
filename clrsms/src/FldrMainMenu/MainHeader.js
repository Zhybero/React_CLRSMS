

import { userSessionCredentials } from "../FldrSessionsComponents/sessionComponent";
import { ExpireComponentToken } from "../FldrSessionsComponents/ExpireComponent";
import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { GetCountNotif, GetModelViewNotification, GetModeltblMessage1List1, GetCountNotifAppointments, GetModeltblAppointmentsforNotifications } from "../FldrFunctions/ClsGetList";
import axios from "axios";
import PlsConnect from "../FldrFunctions/ClsGetConnection";
import ViewMailNotificationModal from "../FldrModal/ViewMailNotificationModal";
import ReplyMessageModal from "../FldrModal/ReplyMessageModal";
import ClientNotificationAPModal from "../FldrModal/ClientNotificationAPModal";
function MainHeader({onSidebarItemClick}) {

const history = useNavigate();

const [varObjMdlUserAP, setvarObjMdlUserAP] = useState({});
const [MdlUserAP, setMdlUserAP] = useState([]);
const [notifications, setNotifications] = useState(0);
const [notifMessage, setnotifMessage] = useState([]);
const [paramvarViewMailobj, setparamvarViewMailobj] = useState(""); 
const [tblMessageList1, settblMessageList1] = useState([]); 
const [paramvarViewMailobjCredential, setparamvarViewMailobjCredential] = useState({}); 

const btnNavClick = (component) => {
  onSidebarItemClick(component);
};
  async function btnLogout(){
    userSessionCredentials(null);
    if ((await ExpireComponentToken()) === null) {
      history("/");
    }
  }
   
  //Fetch
  const fetchModelMdlApprovedList = async (varuserCode) => {
    try {
      setMdlUserAP(await GetModeltblAppointmentsforNotifications(varuserCode));  
    } catch {
      console.log("Connection error!"); 
    }
  }; 
  const fetchMdltblMessage1List = async (varfileIC) => { 
    try {
      settblMessageList1(await GetModeltblMessage1List1(varfileIC));  
    } catch {
      console.log("Connection error!");
    }
  }; 
  const fetchCounNotif = async (strUserCode) => {
    try { 
      const varAP = await GetCountNotifAppointments(strUserCode);
    const varmsg = await GetCountNotif(strUserCode);  
    setNotifications(varAP+varmsg);
    } catch {
      console.log("Connection error!");
    }
  }; 
  const fetchNotifMessage = async (strUserCode) => {
    try { 
    setnotifMessage(await GetModelViewNotification(strUserCode));
    } catch {
      console.log("Connection error!");
    }
  };
  const [userSession, setuserSession] = useState({});
  useEffect(()=>{
    const varUsers = JSON.parse(sessionStorage.getItem("UserSession"));
    setuserSession(varUsers); 
    const interval = setInterval(()=>{fetchModelMdlApprovedList(varUsers.userCode);
      fetchCounNotif(varUsers.userCode);
      fetchNotifMessage(varUsers.userCode); }, 500); 
    return () => clearInterval(interval); 
  },[]);

  //button
  function btnViewMail(varlistmsg){
    setparamvarViewMailobj(varlistmsg);
    fetchMdltblMessage1List(varlistmsg.fileIC);
    setparamvarViewMailobjCredential(varlistmsg);
  }
  async function updateNotif(varlist,filter){ 
    if(filter==="Messages"){
    if (!varlist) {
      console.log("Nothing to save!");
    } else {
      const Mdl1 = { 
        FileIC: varlist.fileIC,
        UserCode: varlist.userCode
      }; 
      try { 
        const response = await axios.put(
          `${PlsConnect()}/API/CLRSMSWEBAPI/UpdateModeltblMessageNotifUpdate`,
          Mdl1,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          console.log("Success: Data posted successfully!"); 
    fetchCounNotif(userSession.userCode);
    fetchNotifMessage(userSession.userCode); 
        } else {
          alert("Error: Something went wrong.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }else if(filter==="Appointments"){
    setvarObjMdlUserAP(varlist);
    if (!varlist) {
      console.log("Nothing to save!");
    } else {
      const Mdl1 = { 
        APCode: varlist.apCode, 
      }; 
      try { 
        const response = await axios.put(
          `${PlsConnect()}/API/CLRSMSWEBAPI/UpdateModeltblAppointmentsNotifications`,
          Mdl1,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          console.log("Success: Data posted successfully!");  
        } else {
          alert("Error: Something went wrong.");
        }
      } catch (error) {
        console.error("Error:", error);
      } 
      } 
      } 
  }

  return (
    <>
      {userSession ? (
        userSession.groupCode === "04" ? (
          <Link
            className="navbar-brand text-secondary d-lg-grid d-md-grid d-none"
            to={"/"}
          >
            Candari Law & Realty Services Management System
          </Link>
        ) : (
          <Link
            className="navbar-brand text-secondary d-lg-grid d-md-grid d-none"
            onClick={() => btnNavClick("Home")}
          >
            Candari Law & Realty Services Management System
          </Link>
        )
      ) : (
        <Link
          className="navbar-brand text-secondary d-lg-grid d-md-grid d-none"
          onClick={() => btnNavClick("Home")}
        >
          Candari Law & Realty Services Management System
        </Link>
      )}

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
        data-bs-auto-close="true"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item me-2 dropdown">
            <Link
              data-bs-toggle="dropdown"
              role="button"
              aria-expanded="false"
              className="nav-link dropdown-toggle"
              id="collapseNotification"
              data-bs-auto-close="true"
            >
              {" "}
              <i
                className="fa-solid fa-bell"
                style={{ fontSize: "1.2rem", cursor: "pointer" }}
              ></i>
              {notifications > 0 && (
                <span className="position-absolute top-1 translate-middle badge rounded-pill bg-danger">
                  {notifications}
                </span>
              )}
            </Link>
            <ul
              className="dropdown-menu dropdown-menu-lg-end animated flipInX"
              aria-labelledby="collapseNotification"
            >
              <small className="ms-2">Messages</small>
              {notifMessage
                ? notifMessage.map((varlist, index) => (
                    <li
                      className="nav-item"
                      key={index}
                      style={{
                        background: varlist.notif
                          ? "rgba(129, 160, 255, 0.2)"
                          : "",
                      }}
                    >
                      <Link
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#ViewMailModal"
                        onClick={() => {
                          updateNotif(varlist, "Messages");
                          btnViewMail(varlist);
                        }}
                      >
                        <b>{`${varlist.fName} ${varlist.mName} ${varlist.lName}`}</b>{" "}
                        <small>
                          {" "}
                          {varlist.message.length > 30
                            ? `${varlist.message.substring(0, 30)}...`
                            : varlist.message}
                        </small>
                      </Link>
                    </li>
                  ))
                : ""}

              {userSession ? (
                userSession.groupCode === "04" ? (
                  <>
                    <small className="ms-2">Appointments</small>
                    {MdlUserAP
                      ? MdlUserAP.map((varlist, index) => (
                          <li
                            className="nav-item"
                            key={index}
                            style={{
                              background: varlist.notif
                                ? "rgba(129, 160, 255, 0.2)"
                                : "",
                            }}
                          >
                            <Link
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#ClientNotificationAPModal"
                              onClick={() =>
                                updateNotif(varlist, "Appointments")
                              }
                            >
                              {varlist.decline === true ? (
                                <small
                                >
                                  Your Appointment has been <b>Declined</b>
                                </small>
                              ) : varlist.approve === false &&
                                varlist.active === true ? (
                                <small>
                                  Your Appointment has been <b>Delivered</b>
                                </small>
                              ) : varlist.approve === true &&
                                varlist.active === true &&
                                varlist.hDate <= new Date().toISOString() ? (
                                <small>
                                  Your Appointment has been <b>Approved</b>
                                </small>
                              ) : varlist.approve === true &&
                                varlist.active === true &&
                                varlist.hDate > new Date().toISOString() ? (
                                <small>
                                  Your Appointment has been <b>Rescheduled</b>
                                </small>
                              ) : varlist.approve === false &&
                                varlist.active === false ? (
                                <small>
                                  Your Appointment is now <b>Finish</b>
                                </small>
                              ) : (
                                ""
                              )}
                            </Link>
                          </li>
                        ))
                      : ""}
                  </>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </ul>
          </li>

          <li className="nav-item me-2 dropdown">
            <Link
              data-bs-toggle="dropdown"
              role="button"
              aria-expanded="false"
              className="nav-link dropdown-toggle"
              id="collapseProfile"
              data-bs-auto-close="true"
            >
              <i className="fa-solid fa-user"></i>
            </Link>
            <ul
              className="dropdown-menu dropdown-menu-lg-end animated flipInX"
              aria-labelledby="collapseProfile"
            >
              <li className="nav-item">
                <Link className="dropdown-item">
                  <span className="adminpro-icon adminpro-user-rounded author-log-ic me-2"></span>
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="dropdown-item" onClick={() => btnLogout()}>
                  <span className="adminpro-icon adminpro-locked author-log-ic me-2"></span>
                  Log Out
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="ViewMailModal"
        aria-labelledby="AddDocTypelabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <ViewMailNotificationModal
            varuserSession={userSession}
            varparamvarViewMailobj={paramvarViewMailobj}
            vartblMessageList1={tblMessageList1}
            varparamvarViewMailobjCredential={paramvarViewMailobjCredential}
          />
          {/* <AddDocTypeModal
            onSaveComplete={fetchMdlProjectListParam}
            varProjCode={paramProjCode}
          /> */}
        </div>
      </div>

      <div
        className="modal fade"
        id="ClientNotificationAPModal"
        aria-labelledby="AddDocTypelabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <ClientNotificationAPModal 
          varvarObjMdlUserAP={varObjMdlUserAP}
          /> 
        </div>
      </div>

      <div
        className="modal fade"
        id="ReplyMessageModal"
        aria-labelledby="AddDocTypelabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <ReplyMessageModal
            varparamvarViewMailobjCredential={paramvarViewMailobjCredential}
            varuserSession={userSession}
          />
          {/* <AddDocTypeModal
            onSaveComplete={fetchMdlProjectListParam}
            varProjCode={paramProjCode}
          /> */}
        </div>
      </div>
    </>
  );
}
export default MainHeader;
