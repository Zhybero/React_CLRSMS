import { useState, useEffect, useRef } from "react";
import {
  GetModeltblProjectsList,
  GetModeltblDocumentTypeList,
} from "../FldrFunctions/ClsGetList";
import axios from "axios";
import PlsConnect from "../FldrFunctions/ClsGetConnection";
function ArchiveModal(props) {
  const [tblProjectsList, settblProjectsList] = useState([]);
  const [tblDocumentTypeList, settblDocumentTypeList] = useState([]);
  const [txtprojCode, settxtprojCode] = useState("");
  const [txtDoctypeCode, settxtDoctypeCode] = useState("");
  const [txtCaseNumber, settxtCaseNumber] = useState("");
  const [txtDescription, settxtDescription] = useState("");
  const closebtnref = useRef(null);

  //validation
  const [valid, setvalid] = useState();
  //Fetch
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

  useEffect(() => {
    fetchMdlProjectList();
  }, []);

  //Button
  async function btnSave() {
    setvalid(0);
    if (!txtprojCode || txtprojCode.trim() === "") {
      setvalid(1);
    } else if (!txtDoctypeCode || txtDoctypeCode.trim() === "") {
      setvalid(2);
    } else if (!txtCaseNumber || txtCaseNumber.trim() === "") {
      setvalid(3);
    } else if (!txtDescription || txtDescription.trim() === "") {
      setvalid(4);
    } else {
      const saveSubtbl1 = () => {
        const list = [];
        props.vartblMessageList1.forEach((file) => {
          list.push({
            FileName: file.fileName,
            FileNameGUID: file.fileNameGUID,
            FileSize: file.fileSize,
            FileType: file.fileType,
          });
        });
        return list;
      };
      const Mdl1 = {
        CaseNum: txtCaseNumber,
        ArchivedDate: new Date().toISOString(),
        UserCode: props.varparamvarViewMailobj.userCode,
        Description: txtDescription,
        DocTypeCode: txtDoctypeCode,
        SubModeltblFileDocuments1: saveSubtbl1(),
      };
      try {
        setvalid(0); 
        const response = await axios.post(
          `${PlsConnect()}/API/CLRSMSWEBAPI/InsertModeltblFileDocumentsArchive`,
          Mdl1,
          {
            headers: {
              "Content-Type": "application/json",
            },
          } 
        );
        if (response.status === 200) {
          console.log("Success: Data posted successfully!");
          closebtnref.current.click();
          //props.onSaveComplete();
          //ClearData();
        } else {
          alert("Error: Something went wrong.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }
  function SelectProj(e) {
    if(e!=="NA"){ 
        const varproj = e.target.value;
        settxtprojCode(varproj);
        fetchMdlDocumentTypeList(varproj);
    }
  }
  return (
    <>
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="AddProjectnNamelabel">
            Archive
          </h1>
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
          <div className="row  mb-1">
            <div className="col-lg-12 col-sm-12">
              <div className="d-lg-flex d-sm-grid gap-2 align-items-center justify-content-center mb-2">
                <div className="form-floating col-lg-6 col-sm-12 mb-2">
                  <select
                    className={`form-control form-control-sm ${
                      valid === 1 ? "is-invalid" : ""
                    }`}
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
                  <label htmlFor="SAptType">Select Document Category :</label>
                </div>

                <div className="form-floating col-lg-6 col-sm-12 mb-2">
                  <select
                    className={`form-control form-control-sm ${
                      valid === 2 ? "is-invalid" : ""
                    }`}
                    id="SAptType"
                    value={txtDoctypeCode}
                    onChange={(e) => settxtDoctypeCode(e.target.value)}
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
                  <label htmlFor="SAptType">Select Legal Type :</label>
                </div>
              </div>

              <div className="d-lg-flex d-sm-grid gap-2 align-items-center justify-content-center mb-3">
                <div className="form-floating col-lg-6 col-sm-12 mb-2">
                  <input
                    type="text"
                    className={`form-control form-control-sm ${
                      valid === 3 ? "is-invalid" : ""
                    }`}
                    id="lblCaseNum"
                    placeholder="Case Number"
                    value={txtCaseNumber}
                    onChange={(e) => settxtCaseNumber(e.target.value)}
                    required
                  />
                  <label htmlFor="lblCaseNum">Case Number</label>
                </div>
                <div className="form-floating col-lg-6 col-sm-12 mb-2">
                  <input
                    type="text"
                    className={`form-control form-control-sm ${
                      valid === 4 ? "is-invalid" : ""
                    }`}
                    id="lblDescription"
                    placeholder="Description"
                    value={txtDescription}
                    onChange={(e) => settxtDescription(e.target.value)}
                  />
                  <label htmlFor="lblDescription">Description</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-danger"
            data-bs-dismiss="modal"
            ref={closebtnref}
          >
            Close
          </button>
          <button
            type="button"
            className="btn text-white"
            data-bs-toggle="modal"
            data-bs-target="#ViewMailModal" 
            style={{ background: "#387B40" }}
          >
            Back
          </button>

          <button
            type="button"
            className="btn text-white"
            onClick={() => btnSave()}
            style={{ background: "#004AAD" }}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default ArchiveModal;
