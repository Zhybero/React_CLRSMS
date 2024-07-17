import axios from "axios";
import PlsConnect from "../FldrFunctions/ClsGetConnection";
import { useState, useRef } from "react";
import { v4 } from "uuid";
import { downloadFile, getFile, GetModeltblAPEvidencesList, GetModeltblAPEvidences1 } from "../FldrFunctions/ClsGetList";

function EvidenceModal(props) {
  const closebtnref = useRef(null);
  let inputFileRef = useRef(null);
  
  // const [tblAPEvidences, settblAPEvidences] = useState({}); 
  const [tblAPEvidences1, settblAPEvidences1] = useState([]); 
  const [files, setFiles] = useState([]); 
  const [isFilesOpen, setisFilesOpen] = useState(true); 

  async function btnOK() {
    try {  
        const formData = new FormData();

        const saveSubtbl1 = () => {
          const list = [];
          files.forEach((file) => {
            if (file.name.length > 100) {
              file.name.slice(0, 100);
            }
            const strFileName = v4() + "_" + file.name;
            list.push({
              FileName: file.name,
              FileNameGUID: strFileName,
              FileSize: file.size / 1024 / 1024,
              FileType: file.name.split(".").pop(),
            });

            formData.append("files", file, strFileName);
          });
          return list;
        };

        const Mdl1 = {
          APCode: props.varvarlist.apCode,
          Type: props.varType,
          SubModeltblAPEvidences1: saveSubtbl1(),
        };   
        formData.append("ModeltblAPEvidences", JSON.stringify(Mdl1)); 
        const response = await axios.post(
          `${PlsConnect()}/API/CLRSMSWEBAPI/InsertModeltblAPEvidence`,
          formData, 
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          console.log("Success: Data posted successfully!");
          closebtnref.current.click();  
          inputFileRef.current.value = "";
          fetchMdltblAPEvidencesListSpecific();
        } else {
          alert("Error: Something went wrong.");
        } 
    } catch {
      console.log('error');
    } 
  }

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


const fetchMdltblAPEvidencesListSpecific = async () => { 
  try {
    let mdlListItems = [];
    const settblAPEvidences = await GetModeltblAPEvidencesList(props.varvarlist.apCode, props.varType); 
    await Promise.all(settblAPEvidences.map(async (varlist) => {
      const mdlList = await GetModeltblAPEvidences1(varlist.fileIC);
      mdlList.forEach((varList1)=>{
        // console.log(varList1);
        mdlListItems.push(varList1)});
    })); 
    // await Promise.all(promises);
    settblAPEvidences1(mdlListItems);   
  } catch {
    console.log("Connection error!");
  }
}; 



  return (
    <>
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="AddProjectnNamelabel">
            Attach Evidence
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div
          className="modal-body"
          style={{ background: "#3BAFDA" }}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 col-sm-12 p-0 m-0 text-start">
                <label htmlFor="lblFile">Attach Evidence: </label>
                <input
                  type="file"
                  multiple
                  className="form-control mb-1"
                  id="lblFile"
                  placeholder="Insert File"
                  onChange={(e) => setFiles([...e.target.files])}
                  ref={inputFileRef}
                />
              </div>
            </div>
          </div>
          {!isFilesOpen?
          <div className="row mt-3 overflowY-auto">
            <table className="table table-hover table-borderless">
              <thead className="ms-2">
                <tr className="justify-content-start">
                  <th scope="col" className="bg-light">
                    File Name
                  </th>
                  <th scope="col" className="border-start border-dark bg-light">
                    File Size
                  </th>
                  <th className="bg-light" />
                  <th className="bg-light" />
                </tr>
              </thead>
              <tbody className="ms-2 user-select-none">
                {tblAPEvidences1?tblAPEvidences1.map((varlist, index) => (
                  <tr id="tbody2" key={index}>
                    <td className="text-start">
                      {FileImageExt.includes(varlist.fileType.toLowerCase()) ? (
                        <i className="fa-solid fa-file-image me-2"></i>
                      ) : FileWordExt.includes(
                          varlist.fileType.toLowerCase()
                        ) ? (
                        <i className="fa-solid fa-file-word me-2"></i>
                      ) : FileExcellExt.includes(
                          varlist.fileType.toLowerCase()
                        ) ? (
                        <i className="fa-solid fa-file-excel me-2"></i>
                      ) : FilePPExt.includes(varlist.fileType.toLowerCase()) ? (
                        <i className="fa-solid fa-file-powerpoint me-2"></i>
                      ) : varlist.fileType.toLowerCase() === "pdf" ? (
                        <i className="fa-solid fa-file-pdf me-2"></i>
                      ) : (
                        <i className="fa-solid fa-file me-2"></i>
                      )}{" "}
                      {varlist.fileName.length > 15
                        ? `${varlist.fileName.substring(0, 15)}...`
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
                )):""}
              </tbody>
            </table>
          </div>
          :""}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-dark me-auto"
            // style={{ background: "#387B40" }}
            onClick={()=>{fetchMdltblAPEvidencesListSpecific();setisFilesOpen(!isFilesOpen)}}
          >
            <i className="fa-solid fa-eye"></i>
          </button>

          <button
            type="button"
            className="btn text-white"
            data-bs-toggle="modal"
            data-bs-target={
              props.varType === "Pending"
                ? "#ApproveClient"
                : props.varType === "Approved"
                ? "#ApproveClientView"
                : props.varType === "On-Process"
                ? "#ClientInformationModalHearing"
                : ""
            }
            style={{ background: "#387B40" }}
          >
            Back
          </button>

          <button
            type="button"
            className="btn text-white"
            style={{ background: "#004AAD" }}
            onClick={() => btnOK()}
          >
            Save
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

export default EvidenceModal;
