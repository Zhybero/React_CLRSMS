

import { useState, useEffect } from "react";
import { GetCountAppointmentPendingUser, GetCountAppointmentApprovedUser, GetCountAppointmentOngoingUser, GetCountAppointmentFinishUser, GetCountAppointmentDeclineUser } from "../FldrFunctions/ClsGetList";

function ClientHome(){ 
const [countpending, setcountpending] = useState(0);
const [countapproved, setcountapproved] = useState(0);
const [countongoing, setcountongoing] = useState(0); 
const [countfinish, setcountfinish] = useState(0); 
const [countdecline, setcountdecline] = useState(0); 

//const [userSession, setuserSession] = useState({});
useEffect(()=>{
  const varUsers = JSON.parse(sessionStorage.getItem("UserSession"));
  //setuserSession(varUsers);  
  fetchcountfiles(varUsers.userCode);
},[]);
//fetch 
const fetchcountfiles = async (varUser) => {
    try {  
      setcountpending(await GetCountAppointmentPendingUser(varUser)); 
      setcountapproved(await GetCountAppointmentApprovedUser(varUser)); 
      setcountongoing(await GetCountAppointmentOngoingUser(varUser));  
      setcountfinish(await GetCountAppointmentFinishUser(varUser));  
      setcountdecline(await GetCountAppointmentDeclineUser(varUser));  
    } catch {
      console.log("Connection error!");
    }
  };
 

    return (
      <>
        <div
          className="container-fluid container-xxl shadow p-3 rounded my-5 "
          style={{ height: "75vh" }}
        >
          <div className="mb-4 text-success">
            <h2>Workspace Overview</h2>
          </div>
          <div className="row justify-content-center gap-2">
            <div className="col-lg-3 col-md-3 col-sm-6 mb-3">
              <div
                className="p-3 shadow rounded-5 border border-info border-2"
                style={{ height: "20vh", background: "#FCCFD4" }}
              >
                <h3
                  className="rounded-5"
                  style={{
                    fontfamily: "'Anton', sans-serif",
                    background: "#F77080",
                  }}
                >
                  <b>Pending</b>
                </h3>

                <div className="col-12 d-flex align-items-center justify-content-center p-4">
                  <div className="p-2 col-4">
                    <h4 className="fs-3">
                      <b>{countpending}</b>
                    </h4>
                    {/* <h4>Today</h4> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 mb-3">
              <div
                className="p-3 shadow rounded-5 border border-info border-2"
                style={{ height: "20vh", background: "#BDDA79" }}
              >
                <h3
                  className="rounded-5"
                  style={{
                    fontfamily: "'Anton', sans-serif",
                    background: "#9CC837",
                  }}
                >
                  <b>Approved</b>
                </h3>

                <div className="col-12 d-flex align-items-center justify-content-center p-4">
                  <div className="p-2 col-4">
                    <h4 className="fs-3">
                      <b>{countapproved}</b>
                    </h4>
                    {/* <h4>Today</h4> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 mb-3">
              <div
                className="p-3 shadow rounded-5 border border-info border-2"
                style={{ height: "20vh", background: "#ABDFDD" }}
              >
                <h3
                  className="rounded-5"
                  style={{
                    fontfamily: "'Anton', sans-serif",
                    background: "#81D0CD",
                  }}
                >
                  <b>Ongoing</b>
                </h3>

                <div className="col-12 d-flex align-items-center justify-content-center p-4">
                  <div className="p-2 col-4">
                    <h4 className="fs-3">
                      <b>{countongoing}</b>
                    </h4>
                    {/* <h4>Today</h4> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 mb-3">
              <div
                className="p-3 shadow rounded-5 border border-info border-2"
                style={{ height: "20vh", background: "#FDECB1" }}
              >
                <h3
                  className="rounded-5"
                  style={{
                    fontfamily: "'Anton', sans-serif",
                    background: "#FCE38A",
                  }}
                >
                  <b>Finished</b>
                </h3>

                <div className="col-12 d-flex align-items-center justify-content-center p-4">
                  <div className="p-2 col-4">
                    <h4 className="fs-3">
                      <b>{countfinish}</b>
                    </h4>
                    {/* <h4>Today</h4> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 mb-3">
              <div
                className="p-3 shadow rounded-5 border border-info border-2"
                style={{ height: "20vh", background: "#B3C0F5" }}
              >
                <h3
                  className="rounded-5"
                  style={{
                    fontfamily: "'Anton', sans-serif",
                    background: "#8EA1F0",
                  }}
                >
                  <b>Declined</b>
                </h3>

                <div className="col-12 d-flex align-items-center justify-content-center p-4">
                  <div className="p-2 col-4">
                    <h4 className="fs-3">
                      <b>{countdecline}</b>
                    </h4>
                    {/* <h4>Today</h4> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default ClientHome;