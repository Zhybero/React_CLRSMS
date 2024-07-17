

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";  
import React from "react"; 
import { GetModeltblAppointmentsAll, GetModeltblUserForMessage } from "../FldrFunctions/ClsGetList"; 

function ReportsCases(){
    const [activeTab, setActiveTab] = useState('tab1');
    const [txtUserCode, settxtUserCode] = useState(''); 
    const [MdlApproved, setMdlApproved] = useState([]);
    const [MdlApprovedFilterUser, setMdlApprovedFilterUser] = useState([]); 
    const [tblUserList, settblUserList] = useState([]); 
    //const [ReportToPrint, setReportToPrint] = useState([]); 
    

    const handleTabClick = (tab) => {
        setActiveTab(tab);
      };
 
      
  //Fetch
  const fetchModelMdlApprovedList = async () => {
    try {
        setMdlApproved(await GetModeltblAppointmentsAll()); 
    } catch {
      console.log("Connection error!"); 
    }
  };
  const fetchMdltblUserList = async () => {
    try {
        settblUserList(await GetModeltblUserForMessage("01")); 
    } catch {
      console.log("Connection error!");
    }
  };  
  useEffect(()=>{
    fetchModelMdlApprovedList();
    fetchMdltblUserList(); 
  },[]);
//Filter
const FilterUser=(varUser)=>{
    const filteredMdlArchiveUser = (
      MdlApproved.map( (mdl1) => {
          if (mdl1.userCode === varUser) {
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
      const varfilteredMdlArchiveUser = filteredMdlArchiveUser.filter(
        (mdl1) => mdl1 !== null
      );
      setMdlApprovedFilterUser(varfilteredMdlArchiveUser);
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
              <h5>CASES</h5>
            </div>
          </div>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link
                className={`nav-link ${activeTab === "tab1" ? "active" : ""}`}
                onClick={() => handleTabClick("tab1")}
              >
                All Cases
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${activeTab === "tab2" ? "active" : ""}`}
                onClick={() => handleTabClick("tab2")}
              >
                Cases By Users
              </Link>
            </li> 
          </ul>

          <div className="tab-content mt-2">
            {/* ALL */}
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
                  onClick={() => btnPrint(MdlApproved)}
                >
                  <i className="fa-solid fa-print fs-4"></i>
                </button>
              </div>

              <div className="printable-content">
              <table className="table table-hover table-borderless table-sm text-start">
                <thead className="ms-2">
                  <tr className="justify-content-center">
                    <th scope="col" className="bg-light">
                      Name
                    </th>
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
                      Address
                    </th>
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
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
                  {MdlApproved
                    ? MdlApproved.map((varlist, index) => (
                        <tr key={index}>
                          <td style={{width:"15%"}}>{`${varlist.fName} ${varlist.mName} ${varlist.lName}`}</td>
                          <td style={{width:"15%"}}>{varlist.address}</td>
                          <td style={{width:"15%"}}>{varlist.apDesc}</td>
                          <td>{varlist.apmTitle}</td>
                          <td style={{width:"8%"}}>{varlist.hDate.split("T")[0]}</td>
                          {varlist.active===true?(<td className="bg-primary rounded text-center">Active</td>):(<td className="bg-warning rounded text-center">Finished</td>)}
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
            </div>

            {/* BY USERS */}
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
                <div className="form-floating col-lg-4 col-sm-12 mb-2">
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
                </div>

                <button
                  className="btn btn-md btn-outlined-info ms-auto"
                  onClick={() => btnPrint(MdlApprovedFilterUser)}
                >
                  <i className="fa-solid fa-print fs-4"></i>
                </button>
              </div>
              <div className="printable-contentUser">
              <table className="table table-hover table-borderless table-sm text-start">
                <thead className="ms-2">
                  <tr className="justify-content-center">
                    <th scope="col" className="bg-light">
                      Name
                    </th>
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
                      Address
                    </th>
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
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
                  {MdlApprovedFilterUser
                    ? MdlApprovedFilterUser.map((varlist, index) => (
                        <tr key={index}>
                          <td style={{width:"15%"}}>{`${varlist.fName} ${varlist.mName} ${varlist.lName}`}</td>
                          <td style={{width:"15%"}}>{varlist.address}</td>
                          <td style={{width:"15%"}}>{varlist.apDesc}</td>
                          <td>{varlist.apmTitle}</td>
                          <td style={{width:"8%"}}>{varlist.hDate.split('T')[0]}</td>
                          {varlist.active===true?(<td className="bg-primary rounded text-center">Active</td>):(<td className="bg-warning rounded text-center">Finished</td>)}
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
            </div>

              
          </div>
        </div>  
      </>
    );
}

export default ReportsCases;