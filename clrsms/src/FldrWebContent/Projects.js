


import ProjectNameModal from "../FldrModal/ProjectNameModal";
import { useState, useEffect } from "react"; 
import { GetModeltblProjectsList, GetModeltblDocumentTypeList, GetModeltblFileDocumentsList, GetModeltblFileDocumentsList1, downloadFile, getFile } from "../FldrFunctions/ClsGetList";
import AddDocTypeModal from "../FldrModal/AddDocTypeModal";
import AddFileDocumentModal from "../FldrModal/AddFileDocumentModal"; 
import UpdateFileDocumentModal from "../FldrModal/UpdateFileDocumentModal";
import UpdateDocTypeModal from "../FldrModal/UpdateDocTypeModal";
import UpdateProjectNameModal from "../FldrModal/UpdateProjectNameModal";
import SearchCanvas from "../FldrIncludes/SearchCanvas";
import axios from "axios";
import PlsConnect from "../FldrFunctions/ClsGetConnection";
import MessageModal from "../FldrModal/MessageModal";
function Projects() {
//Others
const [MessageConfirm, setMessageConfirm] = useState(false); 
const [deletetbl, setdeletetbl] = useState(''); 
const [paramVarlistCode, setparamVarlistCode] = useState(''); 
const [paramVarFileIC, setparamVarFileIC] = useState(''); 
const [varDeleteFileDoc1Obj, setvarDeleteFileDoc1Obj] = useState({});
const [paramFileDocList, setparamFileDocList] = useState({});
const [paramDocTypeList, setparamDocTypeList] = useState({});
const [paramProjList, setparamProjList] = useState({});

  const [paramProjCode, setparamProjCode] = useState();
  const [paramDocType, setparamDocType] = useState(); 
  const [paramProjName, setparamProjName] = useState();
  const [paramDocTypeName, setparamDocTypeName] = useState();
  const [paramFileDocName, setparamFileDocName] = useState();
 // const [dnone, setdnone] = useState(false);
  const [btnprev, setbtnprev] = useState(1);
  const [btnprevForFile, setbtnprevForFile] = useState(0);
  const [tblProjectsList, settblProjectsList] = useState([]);
  const [tblDocumentTypeList, settblDocumentTypeList] = useState([]);
  const [tblFileDocumentList, settblFileDocumentList] = useState([]);
  const [tblFileDocumentList1, settblFileDocumentList1] = useState([]);

  //Extensions
  const FileImageExt = ["jpg", "png", "jpeg", "gif", "bmp", "svg", "webp"];
  const FileWordExt = ["doc", "docx", "rtf", "odt"];
  const FileExcellExt = ["xls", "xlsx", "csv", "ods"];
  const FilePPExt = ["ppt", "pptx", "pps", "ppsx"];

  const [userSession, setuserSession] = useState({});
  useEffect(()=>{
    const varUsers = JSON.parse(sessionStorage.getItem("UserSession"));
    setuserSession(varUsers); 
    
  },[]);
//Fetch  
    const fetchMdlProjectList = async () => {
      try {
        setbtnprev(0);
        settblProjectsList(await GetModeltblProjectsList());
      } catch {
        console.log("Connection error!");
      }finally{
        setbtnprev(1);
      }
    }; 
    const fetchMdlProjectListParam = async (varProjCode) => {
      try {
        setbtnprev(0);
        settblDocumentTypeList(await GetModeltblDocumentTypeList(varProjCode));
      } catch {
        console.log("Connection error!");
      }finally{
        setbtnprev(2);
      }
    };
    const fetchMdlFileDocument = async (varDocTypeCode) => {
      try {
        setbtnprev(0);
        settblFileDocumentList(await GetModeltblFileDocumentsList(varDocTypeCode));
      } catch {
        console.log("Connection error!");
      }finally{
        setbtnprev(3);
      }
    };
    const fetchMdlFileDocument1 = async (varFileIC) => { 
      try {
        settblFileDocumentList1(await GetModeltblFileDocumentsList1(varFileIC));
      } catch {
        console.log("Connection error!");
      }
    };
  
  useEffect(() => {
    fetchMdlProjectList();
  }, []);

//buttons
 function btndbClickProject(varMdlProject){
  setbtnprev(2);
  fetchMdlProjectListParam(varMdlProject.projCode);
  setparamProjCode(varMdlProject.projCode);
  setparamProjName(varMdlProject.projName);
  //setdnone(true);
 }
 function btndbClickDocType(varMdlDocType){
  fetchMdlFileDocument(varMdlDocType.docTypeCode);
  setparamDocType(varMdlDocType.docTypeCode);
  setparamDocTypeName(varMdlDocType.docTypeName);
  //setdnone(true);
 }
 function btnClickFileDoc(varMdlFileDoc){
  //setbtnprev(4);
  setparamVarFileIC('');
  setbtnprevForFile(1);
  fetchMdlFileDocument1(varMdlFileDoc.fileIC); 
  //setparamDocType(varMdlDocType.docTypeCode);
  setparamFileDocName(varMdlFileDoc.caseNum);
  //setdnone(true);
 } 
 function btnClickFileDocCanvas(varMdlFileDoc){
  setbtnprev(3);
  setbtnprevForFile(1);
  setparamProjCode(varMdlFileDoc.projCode);
  setparamProjName(varMdlFileDoc.projName);
  fetchMdlFileDocument(varMdlFileDoc.docTypeCode);
  fetchMdlFileDocument1(varMdlFileDoc.fileIC); 
  setparamVarFileIC(varMdlFileDoc.fileIC); 
  setparamDocType(varMdlFileDoc.docTypeCode);
  setparamDocTypeName(varMdlFileDoc.docTypeName); 
  setparamFileDocName(varMdlFileDoc.caseNum);
  //setdnone(true);
 }
 function btnPrevious(){
  if(btnprev===2){
    setbtnprev(1);
    fetchMdlProjectList();
    settblDocumentTypeList([]);
    //setdnone(false);
  }else if(btnprev===3){
    fetchMdlProjectListParam(paramProjCode);
    settblDocumentTypeList([]);
    settblFileDocumentList([])
  }else if(btnprev===4){
    setbtnprev(3);
    fetchMdlProjectListParam(paramProjCode);
    settblDocumentTypeList([]);
  }
 }
 function btnPreviousLocator(varPrev){
  if(varPrev===2){
    setbtnprev(1);
    fetchMdlProjectList();
    settblDocumentTypeList([]);
    //setdnone(false);
  }else if(varPrev===3){
    fetchMdlProjectListParam(paramProjCode);
    settblDocumentTypeList([]);
    settblFileDocumentList([])
  }
 }
 //Edit
 async function btnEdit(varFileDocList){
  setparamFileDocList(varFileDocList);
 }
 async function btnEditDoctype(varDocTypeList){
  setparamDocTypeList(varDocTypeList)
 }
 async function btnEditProjName(varProjList){
  setparamProjList(varProjList);
 }
 //Delete
 async function btnDelete(varMdlDoctype,vartbl,varCode){
  setvarDeleteFileDoc1Obj(varMdlDoctype);
  setMessageConfirm(true); 
  setdeletetbl(vartbl);
  setparamVarlistCode(varCode);
 }
//Download
async function downloadFileGUID(varFileList){
  await downloadFile(varFileList);
}
//Print
async function btnprint(varlistList){
  getFile(varlistList.fileNameGUID);
}
 //Others
 const handleConfirmRemove = async () => {  
  try {  
  if(deletetbl==='tblFileDocuments'){ 
    const Mdl1 = {  
      DocNum: varDeleteFileDoc1Obj.docNum,
      DocTypeCode: varDeleteFileDoc1Obj.docTypeCode,
      FileIC: varDeleteFileDoc1Obj.fileIC
    }; 
      const response = await axios.post(`${PlsConnect()}/API/WEBAPI/WEBAPIDelete/DeleteModeltblFileDocuments`, Mdl1, {
        headers: {
          'Content-Type': 'application/json',
        },
      });  
      if (response.status === 200) {
        console.log("Success: Data posted successfully!"); 
        fetchMdlFileDocument(paramDocType);
      } else {
        alert("Error: Something went wrong."); 
      }
  }else if(deletetbl==='tblDocumentType'){
    const Mdl1 = {   
      DocTypeCode: varDeleteFileDoc1Obj.docTypeCode,
      ProjCode: varDeleteFileDoc1Obj.projCode
    };  
      const response = await axios.post(`${PlsConnect()}/API/WEBAPI/WEBAPIDelete/DeleteModeltblDocumentType`, Mdl1, {
        headers: {
          'Content-Type': 'application/json',
        },
      });  
      if (response.status === 200) {
        console.log("Success: Data posted successfully!"); 
        fetchMdlProjectListParam(paramProjCode);
      } else {
        alert("Error: Something went wrong."); 
      }
  }else if(deletetbl==='tblProjects'){
    const Mdl1 = {    
      ProjCode: varDeleteFileDoc1Obj.projCode
    };  
      const response = await axios.post(`${PlsConnect()}/API/WEBAPI/WEBAPIDelete/DeleteModeltblProjects`, Mdl1, {
        headers: {
          'Content-Type': 'application/json',
        },
      });  
      if (response.status === 200) {
        console.log("Success: Data posted successfully!"); 
        fetchMdlProjectList();
      } else {
        alert("Error: Something went wrong."); 
      }
  }else{
    console.log('Nothing to Delete!');
  }
  } catch (error) {
    console.error('Error:', error);
  }finally{
    setMessageConfirm(false); 
    
  }
};

const handleCancelRemove = () => {
  setMessageConfirm(false); 
};

  return (
    <>
      <div className="d-flex gap-1 align-items-center p-2 shadow">
        <p className="m-1 user-select-none" style={{ fontSize: "12px" }}>
          {btnprev === 1
            ? "/Document Category"
            : btnprev === 2
            ? (<>/<span onClick={()=>btnPreviousLocator(2)}>Document Category</span>/<span onClick={()=>btnPreviousLocator(3)}>{paramProjName}</span>/</>)
            : btnprev === 3
            ? (<>/<span onClick={()=>btnPreviousLocator(2)}>Document Category</span>/<span onClick={()=>btnPreviousLocator(3)}>{paramProjName}</span>/{paramDocTypeName}</>)
            : btnprev === 3 && btnprevForFile === 1
            ? (<>/<span onClick={()=>btnPreviousLocator(2)}>Document Category</span>/<span onClick={()=>btnPreviousLocator(3)}>{paramProjName}</span>/{paramDocTypeName}/{paramFileDocName}</>)
            : ""}
        </p>

        <div className="d-flex w-20 ms-auto">
          <button
            className="btn btn-light"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offCanvasSearch"
            aria-controls="offCanvasSearch"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        className="container-lg container-md-fluid rounded p-1 shadow mt-2"
        style={{ background: "#3BAFDA" }}
      >
        <div
          className="d-flex align-items-center"
          style={{ background: "rgba(255, 255, 255, 0.1)", fontFamily:"Cooper Black" }}
        >
          <div className="col-2 text-start">
            <button className="btn btn-lg" onClick={() => btnPrevious()}>
              <i className="fa-solid fa-circle-left"></i>{" "}
            </button>
          </div>
          <div className="col-10 text-center">
            <h5 className="col-10 m-0">ARCHIVE</h5>
          </div>
        </div>
        {btnprev === 1 ? (
          <>
            <div className="d-flex align-items-center m-2">
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#AddProjectnName"
                className="btn btn-sm text-white"
                style={{ background: "#303030" }}
              >
                <i className="fa-solid fa-folder-plus me-1"></i>Add Document
                Category
              </button>
            </div>
            <div
              className="container overflow-y-auto tbldiv"
              style={{ background: "#3BAFDA" }}
            >
              <table className="table table-hover table-borderless table-sm text-start">
                <thead className="ms-2">
                  <tr className="justify-content-start">
                    <th scope="col" className="bg-light">
                      Name
                    </th>
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
                      Date Modified
                    </th>
                    <th className="bg-light" />
                    <th className="bg-light" />
                  </tr>
                </thead>
                <tbody className="ms-2 user-select-none">
                  {tblProjectsList.map((varlist) => (
                    <tr
                      key={varlist.projCode}
                      onDoubleClick={() => btndbClickProject(varlist)}
                      onTouchStart={() => btndbClickProject(varlist)}
                    >
                      <td>
                        <i className="fa-solid fa-folder-open me-2"></i>{" "}
                        {varlist.projName}
                      </td>
                      <td>{varlist.projDate.replace("T", " ")}</td>
                      <td id="edit">
                        <button
                          className="btn btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#UpdateProjectnName"
                          onClick={() => btnEditProjName(varlist)}
                        >
                          <i className="fa-solid fa-pen" />
                        </button>
                      </td>
                      <td id="delete">
                        <button
                          className="btn btn-sm"
                          onClick={() =>
                            btnDelete(varlist, "tblProjects", varlist.projName)
                          }
                        >
                          <i className="fa-solid fa-trash-can" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : btnprev === 2 ? (
          <>
            <div className="d-flex align-items-center m-2">
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#AddDocType"
                className="btn btn-sm text-white"
                style={{ background: "#303030" }}
              >
                <i className="fa-solid fa-folder-plus me-2"></i>Add Legal Type
              </button>
            </div>
            <div
              className="container overflow-y-auto tbldiv"
              style={{ background: "#3BAFDA" }}
            >
              <table className="table table-hover table-borderless table-sm text-start">
                <thead className="ms-2">
                  <tr className="justify-content-start">
                    <th scope="col" className="bg-light">
                      Name
                    </th>
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
                      Date Modified
                    </th>
                    <th className="bg-light" />
                    <th className="bg-light" />
                  </tr>
                </thead>
                <tbody className="ms-2 user-select-none">
                  {tblDocumentTypeList.map((varlist) => (
                    <tr
                      key={varlist.docTypeCode}
                      onDoubleClick={() => btndbClickDocType(varlist)}
                      onTouchStart={() => btndbClickDocType(varlist)}
                    >
                      <td>
                        <i className="fa-regular fa-folder-open me-2"></i>{" "}
                        {varlist.docTypeName}
                      </td>
                      <td>{varlist.docTypeDate.replace("T", " ")}</td>
                      <td id="edit">
                        <button
                          className="btn btn-sm"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#UpdateDocType"
                          onClick={() => btnEditDoctype(varlist)}
                        >
                          <i className="fa-solid fa-pen" />
                        </button>
                      </td>
                      <td id="delete">
                        <button
                          className="btn btn-sm"
                          onClick={() =>
                            btnDelete(
                              varlist,
                              "tblDocumentType",
                              varlist.docTypeName
                            )
                          }
                        >
                          <i className="fa-solid fa-trash-can" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : btnprev === 3 ? (
          <>
            <div className="d-flex align-items-center m-2">
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#AddFileDoc"
                className="btn btn-sm text-white"
                style={{ background: "#303030" }}
              >
                <i className="fa-solid fa-paperclip me-2"></i>Attach File
              </button>
            </div>

            <div
              className="container overflow-y-auto tbldiv"
              style={{ background: "#3BAFDA" }}
            >
              <table
                className="table table-hover table-borderless table-sm text-start accordion accordion-flush"
                id="accordiondDiv"
              >
                <thead className="ms-2 theadSticky">
                  <tr className="justify-content-center">
                    <th scope="col" className="bg-light">
                      Document No.
                    </th>
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
                      Case Number
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
                      Date Archived
                    </th>
                    <th
                      scope="col"
                      className="border-start border-dark bg-light"
                    >
                      Date Modified
                    </th>
                    <th className="bg-light" />
                    <th className="bg-light" />
                  </tr>
                </thead>
                {tblFileDocumentList.map((varlist) => (
                  <tbody className="ms-2 user-select-none" key={varlist.fileIC}>
                    <>
                      <tr
                        key={varlist.docNum}
                        data-bs-toggle="collapse"
                        data-bs-target={`#coll${varlist.docNum}apse`}
                        aria-expanded="true"
                        aria-controls={`coll${varlist.docNum}apse`}
                        onClick={() => btnClickFileDoc(varlist)}
                      >
                        <td>
                          <i className="fa-solid fa-folder me-2 p-0"></i>{" "}
                          {varlist.docNum}
                        </td>
                        <td>{varlist.caseNum}</td>
                        <td>{varlist.description}</td>
                        <td>{varlist.archivedDate.replace("T", " ")}</td>
                        <td>{varlist.dEncoded.replace("T", " ")}</td>
                        <td id="edit">
                          <button
                            className="btn btn-sm"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#UpdateFileDoc"
                            onClick={() => btnEdit(varlist)}
                          >
                            <i className="fa-solid fa-pen" />
                          </button>
                        </td>
                        <td id="delete">
                          <button
                            className="btn btn-sm"
                            onClick={() =>
                              btnDelete(
                                varlist,
                                "tblFileDocuments",
                                varlist.docNum
                              )
                            }
                          >
                            <i className="fa-solid fa-trash-can" />
                          </button>
                        </td>
                      </tr>
                      <tr key={varlist.docNum + ".1"}>
                        <td colSpan={7} id="tdActive">
                          <div className="accordion-item shadow acdmtop">
                            <div
                              id={`coll${varlist.docNum}apse`}
                              className={`accordion-collapse ${
                                paramVarFileIC === varlist.fileIC
                                  ? "show"
                                  : "collapse"
                              }`}
                              data-bs-parent="#accordiondDiv"
                            >
                              <div className="accordion-body">
                                <table className="table table-hover table-borderless">
                                  <thead className="ms-2">
                                    <tr className="justify-content-start">
                                      <th scope="col" className="bg-light">
                                        File Name
                                      </th>
                                      <th
                                        scope="col"
                                        className="border-start border-dark bg-light"
                                      >
                                        File Size
                                      </th>
                                      <th className="bg-light" />
                                      <th className="bg-light" />
                                    </tr>
                                  </thead>
                                  <tbody className="ms-2 user-select-none">
                                    {tblFileDocumentList1.map((varlist) => (
                                      <tr id="tbody2" key={varlist.rowNum}>
                                        <td>
                                          {FileImageExt.includes(
                                            varlist.fileType.toLowerCase()
                                          ) ? (
                                            <i className="fa-solid fa-file-image me-2"></i>
                                          ) : FileWordExt.includes(
                                              varlist.fileType.toLowerCase()
                                            ) ? (
                                            <i className="fa-solid fa-file-word me-2"></i>
                                          ) : FileExcellExt.includes(
                                              varlist.fileType.toLowerCase()
                                            ) ? (
                                            <i className="fa-solid fa-file-excel me-2"></i>
                                          ) : FilePPExt.includes(
                                              varlist.fileType.toLowerCase()
                                            ) ? (
                                            <i className="fa-solid fa-file-powerpoint me-2"></i>
                                          ) : varlist.fileType.toLowerCase() ===
                                            "pdf" ? (
                                            <i className="fa-solid fa-file-pdf me-2"></i>
                                          ) : (
                                            <i className="fa-solid fa-file me-2"></i>
                                          )}{" "}
                                          {varlist.fileName.length > 15
                                            ? `${varlist.fileName.substring(
                                                0,
                                                100
                                              )}...`
                                            : varlist.fileName}
                                        </td>
                                        <td>
                                          {varlist.fileSize}
                                          {" MB"}
                                        </td>
                                        <td id="edit">
                                          <button
                                            className="btn btn-sm"
                                            onClick={() =>
                                              downloadFileGUID(varlist)
                                            }
                                          >
                                            <i className="fa-solid fa-download"></i>
                                          </button>
                                        </td>
                                        <td id="edit">
                                          <button
                                            className="btn btn-sm"
                                            onClick={() =>
                                              btnprint(varlist)
                                            }
                                          >
                                            <i className="fa-solid fa-print"></i>
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </>
                  </tbody>
                ))}
              </table>
            </div>
          </>
        ) : (
          <>
            <div
              className="container overflow-y-auto tbldiv"
              style={{ background: "#3BAFDA" }}
            ></div>
          </>
        )}
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="AddProjectnName"
        aria-labelledby="AddProjectnNamelabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <ProjectNameModal onSaveComplete={fetchMdlProjectList} 
            varuserSession={userSession}/>
        </div>
      </div>

      <div
        className="modal fade"
        id="AddDocType"
        aria-labelledby="AddDocTypelabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <AddDocTypeModal
            onSaveComplete={fetchMdlProjectListParam}
            varProjCode={paramProjCode}
            varuserSession={userSession}
          />
        </div>
      </div>

      <div
        className="modal fade"
        id="AddFileDoc"
        aria-labelledby="AddFileDoclabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
          <AddFileDocumentModal
            onSaveComplete={fetchMdlFileDocument}
            varDocTypeCode={paramDocType}
            varuserSession={userSession}
          />
        </div>
      </div>

      {/* Update */}
      <div
        className="modal fade"
        id="UpdateFileDoc"
        aria-labelledby="UpdateFileDoclabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
          <UpdateFileDocumentModal
            onSaveComplete={fetchMdlFileDocument}
            varDocTypeCode={paramDocType}
            varFileDocList={paramFileDocList}
            varuserSession={userSession}
          />
        </div>
      </div>

      <div
        className="modal fade"
        id="UpdateDocType"
        aria-labelledby="UpdateDocTypelabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <UpdateDocTypeModal
            onSaveComplete={fetchMdlProjectListParam}
            varProjCode={paramProjCode}
            varDoctypeList={paramDocTypeList}
            varuserSession={userSession}
          />
        </div>
      </div>

      <div
        className="modal fade"
        id="UpdateProjectnName"
        aria-labelledby="UpdateProjectnNamelabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <UpdateProjectNameModal
            onSaveComplete={fetchMdlProjectList}
            varProjName={paramProjList}
            varuserSession={userSession}
          />
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
          <MessageModal
            message={`Are you sure you want to remove ${
              deletetbl === "tblFileDocuments" ? "document number" : ""
            }`}
            e
            onConfirm={handleConfirmRemove}
            onCancel={handleCancelRemove}
            varlistCode={paramVarlistCode}
          />
        </div>
      </div>

      {/* Canvas */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offCanvasSearch"
        aria-labelledby="offCanvasSearchLabel"
      >
        <SearchCanvas varbtnClickFileDoc={btnClickFileDocCanvas} />
      </div>
    </>
  ); 
}
export default Projects;
