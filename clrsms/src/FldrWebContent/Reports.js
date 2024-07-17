

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";  
import React from "react";
import { GetModelViewArchived, GetModeltblUserForMessage, GetModeltblProjectsList, GetModeltblDocumentTypeList, } from "../FldrFunctions/ClsGetList";
function Reports(){
    const [activeTab, setActiveTab] = useState('tab1');
    const [txtUserCode, settxtUserCode] = useState('');
    const [txtprojCode, settxtprojCode] = useState("");
    const [txtDoctypeCode, settxtDoctypeCode] = useState("");
    const [MdlViewArchived, setMdlViewArchived] = useState([]);
    const [MdlViewArchivedFilterUser, setMdlViewArchivedFilterUser] = useState([]);
    const [MdlViewArchivedFilterLegalType, setMdlViewArchivedFilterLegalType] = useState([]);
    const [tblUserList, settblUserList] = useState([]);
    const [tblProjectsList, settblProjectsList] = useState([]);
    const [tblDocumentTypeList, settblDocumentTypeList] = useState([]);
    //const [ReportToPrint, setReportToPrint] = useState([]); 
    

    const handleTabClick = (tab) => {
        setActiveTab(tab);
      };
 
      
  //Fetch
  const fetchModelViewArchivedList = async () => {
    try {
        setMdlViewArchived(await GetModelViewArchived());
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
  const fetchMdlProjectList = async () => {
    try {
      settblProjectsList(await GetModeltblProjectsList());
    } catch {
      console.log("Connection error!");
    }
  };
  const fetchMdlDocumentTypeList = async (vartxtprojCode) => {
    try {
      settblDocumentTypeList(await GetModeltblDocumentTypeList(vartxtprojCode));
    } catch {
      console.log("Connection error!");
    }
  };
  useEffect(()=>{
    fetchModelViewArchivedList();
    fetchMdltblUserList();
    fetchMdlProjectList();
  },[]);
//Filter
const FilterUser=(varUser)=>{
    const filteredMdlArchiveUser = (
        MdlViewArchived.map( (mdl1) => {
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
      setMdlViewArchivedFilterUser(varfilteredMdlArchiveUser);
}
const FilterLegalType=(varLegalType)=>{
    const filteredMdl = (
        MdlViewArchived.map( (mdl1) => {
          if (mdl1.docTypeCode === varLegalType) {
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
      setMdlViewArchivedFilterLegalType(varfilteredMdl);
}
//button 
function SelectProj(e) {
    if(e!=="NA"){ 
        const varproj = e.target.value;
        settxtprojCode(varproj);
        fetchMdlDocumentTypeList(varproj);
    }
  }
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
              <h5>ARCHIVES</h5>
            </div>
          </div>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link
                className={`nav-link ${activeTab === "tab1" ? "active" : ""}`}
                onClick={() => handleTabClick("tab1")}
              >
                All Archives
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${activeTab === "tab2" ? "active" : ""}`}
                onClick={() => handleTabClick("tab2")}
              >
                By Users Archives
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${activeTab === "tab3" ? "active" : ""}`}
                onClick={() => handleTabClick("tab3")}
              >
                By Legal Types Archives
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
                  onClick={() => btnPrint(MdlViewArchived)}
                >
                  <i className="fa-solid fa-print fs-4"></i>
                </button>
              </div>

              <div className="printable-content">
              <table className="table table-hover table-borderless table-sm text-start">
                <thead className="ms-2">
                  <tr className="justify-content-center">
                    <th scope="col" className="bg-light">
                      Document Category
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
                      File Name
                    </th>
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
                      File Size
                    </th>
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
                      Archived Date
                    </th>
                  </tr>
                </thead>
                <tbody className="ms-2 user-select-none">
                  {MdlViewArchived
                    ? MdlViewArchived.map((varlist, index) => (
                        <tr key={index}>
                          <td>{varlist.projName}</td>
                          <td>{varlist.docTypeName}</td>
                          <td>{varlist.fileName}</td>
                          <td>{varlist.fileSize}</td>
                          <td>{varlist.archivedDate.replace("T", " ")}</td>
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
                  onClick={() => btnPrint(MdlViewArchivedFilterUser)}
                >
                  <i className="fa-solid fa-print fs-4"></i>
                </button>
              </div>
              <div className="printable-contentUser">
              <table className="table table-hover table-borderless table-sm text-start">
                <thead className="ms-2">
                  <tr className="justify-content-center">
                    <th scope="col" className="bg-light">
                      Document Category
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
                      File Name
                    </th>
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
                      File Size
                    </th>
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
                      Archived Date
                    </th>
                  </tr>
                </thead>
                <tbody className="ms-2 user-select-none">
                  {MdlViewArchivedFilterUser
                    ? MdlViewArchivedFilterUser.map((varlist, index) => (
                        <tr key={index}>
                          <td>{varlist.projName}</td>
                          <td>{varlist.docTypeName}</td>
                          <td>{varlist.fileName}</td>
                          <td>{varlist.fileSize}</td>
                          <td>{varlist.archivedDate.replace("T", " ")}</td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
            </div>

            {/* BY LEGAL TYPES */}
            <div
              className={`tab-pane fade ${
                activeTab === "tab3" ? "show active" : ""
              }`}
            >
              <div
                className="d-flex align-items-center p-2 gap-3"
                style={{
                  background: "rgba(13, 202, 240, 0.1)",
                  fontFamily: "Times New Roman",
                }}
              >
                <div className="form-floating col-lg-4 col-sm-12 mb-2">
                  <select
                    className={`form-control form-control-sm`}
                    id="SAptType"
                    value={txtprojCode}
                    onChange={(e) => SelectProj(e)}
                  >
                    <option value="NA"></option>
                    {tblProjectsList
                      ? tblProjectsList.map((varlist, index) => (
                          <option key={index} value={varlist.projCode}>
                            {varlist.projName}
                          </option>
                        ))
                      : ""}
                  </select>
                  <label htmlFor="SAptType">Filter Document Category :</label>
                </div>

                <div className="form-floating col-lg-4 col-sm-12 mb-2">
                  <select
                    className={`form-control form-control-sm`}
                    id="SAptType"
                    value={txtDoctypeCode}
                    onChange={(e) => {
                      settxtDoctypeCode(e.target.value);
                      FilterLegalType(e.target.value);
                    }}
                  >
                    <option></option>
                    {tblDocumentTypeList
                      ? tblDocumentTypeList.map((varlist, index) => (
                          <option key={index} value={varlist.docTypeCode}>
                            {varlist.docTypeName}
                          </option>
                        ))
                      : ""}
                  </select>
                  <label htmlFor="SAptType">Filter Legal Type :</label>
                </div>
                <button
                  className="btn btn-md btn-outlined-info ms-auto"
                  onClick={() => btnPrint(MdlViewArchivedFilterLegalType)}
                >
                  <i className="fa-solid fa-print fs-4"></i>
                </button>
              </div>
              <div className="printable-contentLegalType">
              <table className="table table-hover table-borderless table-sm text-start">
                <thead className="ms-2">
                  <tr className="justify-content-center">
                    <th scope="col" className="bg-light">
                      Document Category
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
                      File Name
                    </th>
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
                      File Size
                    </th>
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
                      Archived Date
                    </th>
                  </tr>
                </thead>
                <tbody className="ms-2 user-select-none">
                  {MdlViewArchivedFilterLegalType
                    ? MdlViewArchivedFilterLegalType.map((varlist, index) => (
                        <tr key={index}>
                          <td>{varlist.projName}</td>
                          <td>{varlist.docTypeName}</td>
                          <td>{varlist.fileName}</td>
                          <td>{varlist.fileSize}</td>
                          <td>{varlist.archivedDate.replace("T", " ")}</td>
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

export default Reports;