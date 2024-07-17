import axios from "axios";
import PlsConnect from "../FldrFunctions/ClsGetConnection";
import { useState, useRef } from "react";
import { v4 } from "uuid";
function AddFileDocumentModal(props) {
  const [txtArchivedDate, settxtArchivedDate] = useState("");
  const [txtCaseNumber, settxtCaseNumber] = useState("");
  const [txtDescription, settxtDescription] = useState("");
  const [btnDisabled, setbtnDisabled] = useState(false);
  const [files, setFiles] = useState([]);

  const closebtnref = useRef(null);
  let inputFileRef = useRef(null);

  //required
  const [txtrequired1, settxtrequired1] = useState("");
  const [txtrequired2, settxtrequired2] = useState("");
  const [txtrequired3, settxtrequired3] = useState("");
  const [txtrequired4, settxtrequired4] = useState("");

  const requiredClear = () => {
    settxtrequired1("");
    settxtrequired2("");
    settxtrequired3("");
    settxtrequired4("");
  };

  async function btnSave() {
    setbtnDisabled(true);
    requiredClear();
    try {
      if (!files || files.length < 1) {
        settxtrequired1(" required *");
      } else if (!txtArchivedDate || txtArchivedDate.trim() === "") {
        settxtrequired2(" required *");
      } else if (!txtCaseNumber || txtCaseNumber.trim() === "") {
        settxtrequired3(" required *");
      } else if (!txtDescription || txtDescription.trim() === "") {
        settxtrequired4(" required *");
      } else {
        requiredClear("");
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
          CaseNum: txtCaseNumber,
          ArchivedDate: txtArchivedDate,
          UserCode: props.varuserSession.userCode,
          Description: txtDescription,
          DocTypeCode: props.varDocTypeCode,
          SubModeltblFileDocuments1: saveSubtbl1(),
        }; 
        /*for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
        } 
        files.forEach((file) => { 
        }); */
        formData.append("ModeltblFileDocuments", JSON.stringify(Mdl1));
        const response = await axios.post(
          `${PlsConnect()}/API/CLRSMSWEBAPI/InsertModeltblFileDocuments`,
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
          props.onSaveComplete(props.varDocTypeCode);
          settxtArchivedDate("");
          settxtCaseNumber("");
          settxtDescription("");
          setFiles([]);
          setbtnDisabled(false);
          inputFileRef.current.value = "";
        } else {
          alert("Error: Something went wrong.");
        }
      }
    } catch {
      console.log('error');
    } finally {
      setbtnDisabled(false);
    }
  }

  return (
    <>
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="AddFileDoclabel">
            Add Legal File Document
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <div className="container-fluid">
            <div className="row  mb-1">
              <div className="col-md-6">
                <div className="text-start">
                  <label htmlFor="lblFile">
                    Insert File:{" "}
                    <span className="text-danger">* {txtrequired1}</span>
                  </label>
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
              <div className="col-md-6">
                <div className="text-start">
                  <label htmlFor="lbldateArchived">
                    Archived Date:{" "}
                    <span className="text-danger">* {txtrequired2}</span>
                  </label>
                  <input
                    type="date"
                    className="form-control mb-1"
                    id="lbldateArchived"
                    placeholder="Archived Date"
                    value={txtArchivedDate}
                    onChange={(e) => settxtArchivedDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-1">
              <div className="col-md-4">
                <small>
                  <div className="form-floating text-start">
                    <input
                      type="text"
                      className="form-control mb-2"
                      id="lblCaseNum"
                      placeholder="Case Number"
                      value={txtCaseNumber}
                      onChange={(e) => settxtCaseNumber(e.target.value)}
                      required
                    />
                    <label htmlFor="lblCaseNum">
                      Case Number
                      <span className="text-danger">* {txtrequired3}</span>
                    </label>
                  </div>
                </small>
              </div>
              <div className="col-md-8">
                <small>
                  <div className="form-floating text-start">
                    <input
                      type="text"
                      className="form-control"
                      id="lblDescription"
                      placeholder="Description"
                      value={txtDescription}
                      onChange={(e) => settxtDescription(e.target.value)}
                    />
                    <label htmlFor="lblDescription">
                      Description
                      <span className="text-danger">* {txtrequired4}</span>
                    </label>
                  </div>
                </small>
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
            onClick={() => btnSave()}
            style={{ background: "#004AAD" }}
            disabled={btnDisabled}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default AddFileDocumentModal;
