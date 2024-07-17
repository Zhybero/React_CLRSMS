


import { downloadFile, getFile } from "../FldrFunctions/ClsGetList";
import { useRef } from "react"; 
import axios from "axios";
import PlsConnect from "../FldrFunctions/ClsGetConnection";
function ViewMailModalReadOnly(props){
    
    const closebtnref = useRef(null); 

  //Extensions
  const FileImageExt = ["jpg", "png", "jpeg", "gif", "bmp", "svg", "webp"];
  const FileWordExt = ["doc", "docx", "rtf", "odt"];
  const FileExcellExt = ["xls", "xlsx", "csv", "ods"];
  const FilePPExt = ["ppt", "pptx", "pps", "ppsx"];
    
//Download
async function downloadFileGUID(varFileList){
  await downloadFile(varFileList);
}
//Print
async function btnprint(varlistList){
  getFile(varlistList.fileNameGUID);
}

async function btnDelete(varcontent){
  const Mdl1 = {  
    FileIC: varcontent.fileIC
  }; 
    const response = await axios.post(`${PlsConnect()}/API/WEBAPI/WEBAPIDelete/DeleteClsDeleteModeltblMessage`, Mdl1, {
      headers: {
        'Content-Type': 'application/json',
      },
    });  
    if (response.status === 200) {
      console.log("Success: Data posted successfully!"); 
      props.varfetchMdlViewSentboxNameList(props.varuserSession.userCode); 
    } else {
      alert("Error: Something went wrong."); 
    }
}
  

    return (
      <>
        <div className="modal-content">
          <div className="modal-header"> 
            <h1 className="modal-title fs-5" id="AddProjectnNamelabel"> 
              {`${props.varparamvarViewMailobjCredential.fName} ${props.varparamvarViewMailobjCredential.mName} ${props.varparamvarViewMailobjCredential.lName} `}
            </h1>
            <h1 className="ms-2">|</h1>
            <small className="ms-2">
              @{props.varparamvarViewMailobjCredential.email}
            </small>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div
            className="modal-body text-center"
            style={{ background: "#3BAFDA" }}
          >
            <div className="text-start border border-3 w-100">
              <div className="container">
                <div className="row p-2">
                  <div className="col-8 bg-white rounded">
                    <div className="ps-2">
                      <p className="mt-2">
                        {" "}
                        <b className="fs-5 me-2">Subject : </b>{" "}
                        {props.varparamvarViewMailobj.subject}
                      </p>
                    </div>
                  </div>
                  <div className="col-12 mt-4 bg-white rounded">
                    <div className="p-2 m-0">
                      <b className="fs-5 me-2">Message : </b>
                      <p>{props.varparamvarViewMailobj.message}</p>
                    </div>
                  </div>
                  <div className="container col-12 mt-4 bg-white rounded">
                    <div className="row">
                      <div className="col-4">
                        <b className="fs-5 me-2">Attachments </b>
                      </div>
                    </div>
                    <div className="row">
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
                          {props.vartblMessageList1.map((varlist) => (
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
                                ) : varlist.fileType.toLowerCase() === "pdf" ? (
                                  <i className="fa-solid fa-file-pdf me-2"></i>
                                ) : (
                                  <i className="fa-solid fa-file me-2"></i>
                                )}{" "}
                                {varlist.fileName.length > 15
                                  ? `${varlist.fileName.substring(0, 100)}...`
                                  : varlist.fileName}
                              </td>
                              <td>
                                {varlist.fileSize}
                                {" MB"}
                              </td>
                              <td id="edit">
                                <button
                                  className="btn btn-sm"
                                  onClick={() => downloadFileGUID(varlist)}
                                >
                                  <i className="fa-solid fa-download"></i>
                                </button>
                              </td>
                              <td id="edit">
                                <button
                                  className="btn btn-sm"
                                  onClick={() => btnprint(varlist)}
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
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn bg-danger border rounded-3 me-auto"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref={closebtnref}
              onClick={() => btnDelete(props.varparamvarViewMailobj)}
            >
              <i className="fa-solid fa-trash-can" /> <b>Delete</b>
            </button>

            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              ref={closebtnref}
            >
              Close
            </button>
          </div>
        </div>
      </>
    );
}

export default ViewMailModalReadOnly;