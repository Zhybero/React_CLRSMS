

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";  
import React from "react"; 
import { GetModeltblAppointmentsforUser } from "../FldrFunctions/ClsGetList"; 
import ClientSetAppointmentModal from "../FldrModal/ClientSetAppointmentModal";
function ClientCases(){
    const [activeTab, setActiveTab] = useState('tab0');
    //const [txtUserCode, settxtUserCode] = useState(''); 
    const [MdlUserAP, setMdlUserAP] = useState([]);
    const [MdlAPFilterPending, setMdlAPFilterPending] = useState([]);  
    const [MdlAPFilterApprove, setMdlAPFilterApprove] = useState([]);  
    const [MdlAPFilterUpcoming, setMdlAPFilterUpcoming] = useState([]);  
    const [MdlAPFilterFinished, setMdlAPFilterFinished] = useState([]);  
    const [MdlAPFilterDecline, setMdlAPFilterDecline] = useState([]);  
    const [APObj, setAPObj] = useState({});  
    //const [ReportToPrint, setReportToPrint] = useState([]); 
    
    const [userSession, setuserSession] = useState({});
  useEffect(()=>{
    const varUsers = JSON.parse(sessionStorage.getItem("UserSession"));
    setuserSession(varUsers);   
    fetchModelMdlApprovedList(varUsers.userCode); 
  },[]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if(tab==='tab0'){
          fetchModelMdlApprovedList(userSession.userCode);
        }
        else if(tab==='tab1'){
          FilterPending();
        }
        else if(tab==='tab2'){
          FilterApprove();
        }
        else if(tab==='tab3'){
          FilterUpcoming();
        }
        else if(tab==='tab4'){
          FilterFinished();
        }
        else if(tab==='tab5'){
          FilterDecline();
        }
      };
 
      
  //Fetch
  const fetchModelMdlApprovedList = async (varuserCode) => {
    try {
      setMdlUserAP(await GetModeltblAppointmentsforUser(varuserCode));  
    } catch {
      console.log("Connection error!"); 
    }
  }; 
  
const fetchAPrObj = async (varlist) => { 
  setAPObj(varlist);
};
//Filter
const FilterPending= async()=>{
  const mdlAP = await GetModeltblAppointmentsforUser(userSession.userCode);
    const filteredMdl = (
      mdlAP.map( (mdl1) => {
          if (mdl1.approve===false && mdl1.active===true) {
            try { 
              return mdl1;
            } catch (error) {
              console.error("Error fetching image:", error);
              return null;
            }
          }
          return null;
        })
      );
      const varfilteredMdl = filteredMdl.filter(
        (mdl1) => mdl1 !== null
      );
      setMdlAPFilterPending(varfilteredMdl);
} 
const FilterApprove= async()=>{
  const mdlAP = await GetModeltblAppointmentsforUser(userSession.userCode);
    const filteredMdl = (
      mdlAP.map( (mdl1) => {
          if (mdl1.approve===true && mdl1.active===true && mdl1.hDate<=new Date().toISOString()) {
            try { 
              return mdl1;
            } catch (error) {
              console.error("Error fetching image:", error);
              return null;
            }
          }
          return null;
        })
      );
      const varfilteredMdl = filteredMdl.filter(
        (mdl1) => mdl1 !== null
      );
      setMdlAPFilterApprove(varfilteredMdl);
} 
const FilterUpcoming= async()=>{
  const mdlAP = await GetModeltblAppointmentsforUser(userSession.userCode);
    const filteredMdl = (
      mdlAP.map( (mdl1) => {
          if (mdl1.approve===true && mdl1.active===true && mdl1.hDate>new Date().toISOString()) {
            try { 
              return mdl1;
            } catch (error) {
              console.error("Error fetching image:", error);
              return null;
            }
          }
          return null;
        })
      );
      const varfilteredMdl = filteredMdl.filter(
        (mdl1) => mdl1 !== null
      );
      setMdlAPFilterUpcoming(varfilteredMdl);
} 
const FilterFinished= async()=>{
  const mdlAP = await GetModeltblAppointmentsforUser(userSession.userCode);
    const filteredMdl = (
      mdlAP.map( (mdl1) => {
          if (mdl1.approve===false && mdl1.active===false) {
            try { 
              return mdl1;
            } catch (error) {
              console.error("Error fetching image:", error);
              return null;
            }
          }
          return null;
        })
      );
      const varfilteredMdl = filteredMdl.filter(
        (mdl1) => mdl1 !== null
      );
      setMdlAPFilterFinished(varfilteredMdl);
}  
const FilterDecline= async()=>{
  const mdlAP = await GetModeltblAppointmentsforUser(userSession.userCode);
    const filteredMdl = (
      mdlAP.map( (mdl1) => {
          if (mdl1.decline===true) {
            try { 
              return mdl1;
            } catch (error) {
              console.error("Error fetching image:", error);
              return null;
            }
          }
          return null;
        })
      );
      const varfilteredMdl = filteredMdl.filter(
        (mdl1) => mdl1 !== null
      );
      setMdlAPFilterDecline(varfilteredMdl);
} 

//button  
  async function btnPrint(){   
  window.print();
  }
    return (
      <>
        <div className="container border border-3 border-warning p-3">
          <div
            className="d-flex align-items-center p-2"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              fontFamily: "Cooper Black",
            }}
          >
            <div className="col-12 text-center">
              <h5>APPOINTMENTS</h5>
            </div>
          </div>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link
                className={`nav-link ${activeTab === "tab0" ? "active" : ""}`}
                onClick={() => handleTabClick("tab0")}
              >
                All Appointments
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${activeTab === "tab1" ? "active" : ""}`}
                onClick={() => handleTabClick("tab1")}
              >
                Pending 
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${activeTab === "tab2" ? "active" : ""}`}
                onClick={() => handleTabClick("tab2")}
              >
                Approved
              </Link>
            </li> 
            <li className="nav-item">
              <Link
                className={`nav-link ${activeTab === "tab3" ? "active" : ""}`}
                onClick={() => handleTabClick("tab3")}
              >
                On-going
              </Link>
            </li> 
            <li className="nav-item">
              <Link
                className={`nav-link ${activeTab === "tab4" ? "active" : ""}`}
                onClick={() => handleTabClick("tab4")}
              >
                Finished
              </Link>
            </li> 
            <li className="nav-item">
              <Link
                className={`nav-link ${activeTab === "tab5" ? "active" : ""}`}
                onClick={() => handleTabClick("tab5")}
              >
                Declined
              </Link>
            </li> 
          </ul>

          <div className="tab-content mt-2">
            {/* ALL */}
            <div
              className={`tab-pane fade ${
                activeTab === "tab0" ? "show active" : ""
              }`}
            >
              <div
                className="d-flex align-items-center p-2"
                style={{
                  background: "rgba(13, 202, 240, 0.1)",
                  fontFamily: "Times New Roman",
                }}
              >
                <button
                  className="btn btn-md btn-outlined-info ms-auto"
                  onClick={() => btnPrint(MdlUserAP)}
                >
                  <i className="fa-solid fa-print fs-4"></i>
                </button>
              </div>

              <div className="printable-content">
              <table className="table table-hover table-borderless table-sm text-start">
                <thead className="ms-2">
                  <tr className="justify-content-center">
                    <th scope="col" className="bg-light">
                    Description
                    </th> 
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
                      Legal Type
                    </th>
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="ms-2 user-select-none">
                  {MdlUserAP
                    ? MdlUserAP.map((varlist, index) => (
                        <tr key={index}>
                          <td>{varlist.apDesc}</td>
                          <td>{varlist.apmTitle}</td>
                          <td>{varlist.hDate.replace("T", " ")}</td>
                          {varlist.approve===false && varlist.active===true && varlist.decline===false?(<td className="bg-warning rounded text-center">Pending</td>):varlist.approve===true && varlist.active===true && varlist.hDate<=new Date().toISOString() && varlist.decline===false?(<td className="bg-primary rounded text-center">Approved</td>):varlist.approve===true && varlist.active===true && varlist.hDate>new Date().toISOString() && varlist.decline===false?(<td className="bg-info rounded text-center">Active</td>):varlist.approve===false && varlist.active===false && varlist.decline===false?(<td className="bg-success rounded text-center">Finished</td>):varlist.decline===true?(<td className="bg-danger rounded text-center">Declined</td>):(<td className="bg-danger rounded text-center">Declined</td>)}
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
            </div>

            {/* Pending */}
            <div
              className={`tab-pane fade ${
                activeTab === "tab1" ? "show active" : ""
              }`}
            >
              <div
                className="d-flex align-items-center p-2"
                style={{
                  background: "rgba(13, 202, 240, 0.1)",
                  fontFamily: "Times New Roman",
                }}
              >
                <button
                  className="btn btn-md btn-outlined-info ms-auto"
                  onClick={() => btnPrint(MdlAPFilterPending)}
                >
                  <i className="fa-solid fa-print fs-4"></i>
                </button>
              </div>

              <div className="printable-content">
              <table className="table table-hover table-borderless table-sm text-start">
                <thead className="ms-2">
                  <tr className="justify-content-center">
                    <th scope="col" className="bg-light">
                    Description
                    </th> 
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
                      Legal Type
                    </th>
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="ms-2 user-select-none">
                  {MdlAPFilterPending
                    ? MdlAPFilterPending.map((varlist, index) => (
                        <tr key={index}
                        data-bs-toggle="modal"
                        data-bs-target="#SetAppointment"
                        onClick={()=>fetchAPrObj(varlist)}> 
                          <td>{varlist.apDesc}</td>
                          <td>{varlist.apmTitle}</td>
                          <td>{varlist.hDate.replace("T", " ")}</td>
                          {varlist.approve===false && varlist.active===true ?(<td className="bg-warning rounded text-center">Pending</td>):varlist.approve===true && varlist.active===true && varlist.hDate<=new Date().toISOString()?(<td className="bg-primary rounded text-center">Approved</td>):varlist.approve===true && varlist.active===true && varlist.hDate>new Date().toISOString()?(<td className="bg-info rounded text-center">Active</td>):varlist.approve===false && varlist.active===false ?(<td className="bg-success rounded text-center">Finished</td>):(<td className="bg-danger rounded text-center">Declined</td>)}
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
            </div>

            {/* Approved */}
            <div
              className={`tab-pane fade ${
                activeTab === "tab2" ? "show active" : ""
              }`}
            >
              <div
                className="d-flex align-items-center p-2"
                style={{
                  background: "rgba(13, 202, 240, 0.1)",
                  fontFamily: "Times New Roman",
                }}
              >
                {/* <div className="form-floating col-lg-4 col-sm-12 mb-2">
                  <select
                    className={`form-control`}
                    id="SAptType"
                    value={txtUserCode}
                    onChange={(e) => {
                      settxtUserCode(e.target.value);
                      FilterUser(e.target.value);
                    }}
                  >
                    <option></option>
                    {tblUserList
                      ? tblUserList.map((varlist, index) => (
                          <option key={index} value={varlist.userCode}>
                            {`${varlist.fName} ${varlist.mName} ${varlist.lName} ${varlist.xName}`}
                          </option>
                        ))
                      : ""}
                  </select>
                  <label htmlFor="SAptType">Filter By User :</label>
                </div> */}

                <button
                  className="btn btn-md btn-outlined-info ms-auto"
                  onClick={() => btnPrint()}
                >
                  <i className="fa-solid fa-print fs-4"></i>
                </button>
              </div>
              <div className="printable-content">
              <table className="table table-hover table-borderless table-sm text-start">
                <thead className="ms-2">
                  <tr className="justify-content-center">
                    <th scope="col" className="bg-light">
                    Description
                    </th> 
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
                      Legal Type
                    </th>
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="ms-2 user-select-none">
                  {MdlAPFilterApprove
                    ? MdlAPFilterApprove.map((varlist, index) => (
                        <tr key={index}> 
                          <td>{varlist.apDesc}</td>
                          <td>{varlist.apmTitle}</td>
                          <td>{varlist.hDate.replace("T", " ")}</td>
                          {varlist.approve===false && varlist.active===true ?(<td className="bg-warning rounded text-center">Pending</td>):varlist.approve===true && varlist.active===true && varlist.hDate<=new Date().toISOString()?(<td className="bg-primary rounded text-center">Approved</td>):varlist.approve===true && varlist.active===true && varlist.hDate>new Date().toISOString()?(<td className="bg-info rounded text-center">Active</td>):varlist.approve===false && varlist.active===false ?(<td className="bg-success rounded text-center">Finished</td>):(<td className="bg-danger rounded text-center">Declined</td>)}
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
            </div>

            {/* Active */}
            <div
              className={`tab-pane fade ${
                activeTab === "tab3" ? "show active" : ""
              }`}
            >
              <div
                className="d-flex align-items-center p-2"
                style={{
                  background: "rgba(13, 202, 240, 0.1)",
                  fontFamily: "Times New Roman",
                }}
              >
                  
                <button
                  className="btn btn-md btn-outlined-info ms-auto"
                  onClick={() => btnPrint()}
                >
                  <i className="fa-solid fa-print fs-4"></i>
                </button>
              </div>
              <div className="printable-content">
              <table className="table table-hover table-borderless table-sm text-start">
                <thead className="ms-2">
                  <tr className="justify-content-center">
                    <th scope="col" className="bg-light">
                    Description
                    </th> 
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
                      Legal Type
                    </th>
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="ms-2 user-select-none">
                  {MdlAPFilterUpcoming
                    ? MdlAPFilterUpcoming.map((varlist, index) => (
                        <tr key={index}> 
                          <td>{varlist.apDesc}</td>
                          <td>{varlist.apmTitle}</td>
                          <td>{varlist.hDate.replace("T", " ")}</td>
                          {varlist.approve===false && varlist.active===true ?(<td className="bg-warning rounded text-center">Pending</td>):varlist.approve===true && varlist.active===true && varlist.hDate<=new Date().toISOString()?(<td className="bg-primary rounded text-center">Approved</td>):varlist.approve===true && varlist.active===true && varlist.hDate>new Date().toISOString()?(<td className="bg-info rounded text-center">Active</td>):varlist.approve===false && varlist.active===false ?(<td className="bg-success rounded text-center">Finished</td>):(<td className="bg-danger rounded text-center">Declined</td>)}
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
            </div>

            {/* Finished */}
            <div
              className={`tab-pane fade ${
                activeTab === "tab4" ? "show active" : ""
              }`}
            >
              <div
                className="d-flex align-items-center p-2"
                style={{
                  background: "rgba(13, 202, 240, 0.1)",
                  fontFamily: "Times New Roman",
                }}
              >
                  
                <button
                  className="btn btn-md btn-outlined-info ms-auto"
                  onClick={() => btnPrint()}
                >
                  <i className="fa-solid fa-print fs-4"></i>
                </button>
              </div>
              <div className="printable-content">
              <table className="table table-hover table-borderless table-sm text-start">
                <thead className="ms-2">
                  <tr className="justify-content-center">
                    <th scope="col" className="bg-light">
                    Description
                    </th> 
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
                      Legal Type
                    </th>
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="ms-2 user-select-none">
                  {MdlAPFilterFinished
                    ? MdlAPFilterFinished.map((varlist, index) => (
                        <tr key={index}> 
                          <td>{varlist.apDesc}</td>
                          <td>{varlist.apmTitle}</td>
                          <td>{varlist.hDate.replace("T", " ")}</td>
                          {varlist.approve===false && varlist.active===true ?(<td className="bg-warning rounded text-center">Pending</td>):varlist.approve===true && varlist.active===true && varlist.hDate<=new Date().toISOString()?(<td className="bg-primary rounded text-center">Approved</td>):varlist.approve===true && varlist.active===true && varlist.hDate>new Date().toISOString()?(<td className="bg-info rounded text-center">Active</td>):varlist.approve===false && varlist.active===false ?(<td className="bg-success rounded text-center">Finished</td>):(<td className="bg-danger rounded text-center">Declined</td>)}
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
            </div>


            {/* Declined */}
            <div
              className={`tab-pane fade ${
                activeTab === "tab5" ? "show active" : ""
              }`}
            >
              <div
                className="d-flex align-items-center p-2"
                style={{
                  background: "rgba(13, 202, 240, 0.1)",
                  fontFamily: "Times New Roman",
                }}
              >
                  
                <button
                  className="btn btn-md btn-outlined-info ms-auto"
                  onClick={() => btnPrint()}
                >
                  <i className="fa-solid fa-print fs-4"></i>
                </button>
              </div>
              <div className="printable-content">
              <table className="table table-hover table-borderless table-sm text-start">
                <thead className="ms-2">
                  <tr className="justify-content-center">
                    <th scope="col" className="bg-light">
                    Description
                    </th> 
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
                      Legal Type
                    </th>
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="ms-2 user-select-none">
                  {MdlAPFilterDecline
                    ? MdlAPFilterDecline.map((varlist, index) => (
                        <tr key={index}> 
                          <td>{varlist.apDesc}</td>
                          <td>{varlist.apmTitle}</td>
                          <td>{varlist.hDate.replace("T", " ")}</td>
                          {varlist.approve===false && varlist.active===true && varlist.decline===false?(<td className="bg-warning rounded text-center">Pending</td>):varlist.approve===true && varlist.active===true && varlist.hDate<=new Date().toISOString() && varlist.decline===false?(<td className="bg-primary rounded text-center">Approved</td>):varlist.approve===true && varlist.active===true && varlist.hDate>new Date().toISOString() && varlist.decline===false?(<td className="bg-info rounded text-center">Active</td>):varlist.approve===false && varlist.active===false && varlist.decline===false?(<td className="bg-success rounded text-center">Finished</td>):varlist.decline===true?(<td className="bg-danger rounded text-center">Declined</td>):(<td className="bg-danger rounded text-center">Declined</td>)}
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
            </div>

              
          </div>
        </div>  

        {/* Modal */} 
      <div
        className="modal fade"
        id="SetAppointment"
        aria-labelledby="AddDocTypelabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
          <ClientSetAppointmentModal varAPObj={APObj} varfetchModelMdlApprovedList={fetchModelMdlApprovedList}
          /> 
        </div>
      </div>
      </>
    );
}

export default ClientCases;