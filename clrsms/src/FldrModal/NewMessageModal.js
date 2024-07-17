

import { useState, useRef } from "react";
import { v4 } from "uuid";
import axios from "axios";
import PlsConnect from "../FldrFunctions/ClsGetConnection";
function NewMessageModal(props){

    const [files, setFiles] = useState([]);
    const [txtEmail, settxtEmail] = useState("");
    const [txtSubject, settxtSubject] = useState("");
    const [txtMessage, settxtMessage] = useState("");
    const closebtnref = useRef(null);
    let inputFileRef = useRef(null);


  //validation
  const [valid, setvalid] = useState();

  //Clear
  function ClearData() {
    setFiles([]);
    settxtEmail("");
    settxtSubject("");
    settxtMessage(""); 
  }
    //Button
    async function btnSend(){
        setvalid(0);
        try {
          if (!txtEmail || txtEmail.trim() === "") {
            setvalid(1);
          } else if (!txtMessage || txtMessage.trim() === "") {
            setvalid(2);
          } else {
            setvalid(0);
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
                ToUserEmail: txtEmail,
                UserCode: props.varuserSession.userCode,
                Subject: txtSubject,
                Message: txtMessage, 
                SubModeltblMessage1: saveSubtbl1(),
            }; 
            /*for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
            } 
            files.forEach((file) => { 
            }); */
            formData.append("ModeltblMessage", JSON.stringify(Mdl1)); 
            const response = await axios.post(
              `${PlsConnect()}/API/CLRSMSWEBAPI/InsertModeltblMessage`,
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
              ClearData();
              inputFileRef.current.value = "";
            } else {
              alert("Error: Something went wrong.");
            }
          }
        } catch {
          console.log('error');
        } 
    }
    return(<>
    <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="AddProjectnNamelabel">
            New Message
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body text-center" style={{background:"#3BAFDA"}}>
           <div className="row  mb-1">
                <div className="col-lg-12 col-sm-12 mx-auto">
                  <div className="form-floating col-lg-6 col-sm-12 mb-3  text-start">
                    <div className="input-group">
                      <span className="input-group-text" id="userToLabel">
                        To:
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        list="dloTo"
                        id="userTo"
                        placeholder="Type name or email..."
                        aria-describedby="userToLabel"
                        value={txtEmail}
                        onChange={(e)=>settxtEmail(e.target.value)} 
                        autoComplete="off"
                      />
                      <datalist id="dloTo">
                        {props.vartblUserList?props.vartblUserList.map((varlist, index)=>( 
                            <option key={index} value={varlist.email}></option> 
                        )):(<option value=""></option>)}
                        <option value=""></option>
                      </datalist>
                    </div>
                  </div>

                  <div className="form-floating col-lg-6 col-sm-12 mb-3">
                    <input
                      type="text"
                      className="form-control mb-2"
                      id="lblCaseNum"
                      placeholder="Enter text"
                      value={txtSubject}
                      onChange={(e)=>settxtSubject(e.target.value)}
                    />
                    <label htmlFor="lblCaseNum">Subject:</label>
                  </div>

                  <div className="col-md-6 mb-3 text-start">
                    <label htmlFor="lblFile">Requesting File: </label>
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
                  <div className="form-floating col-lg-12 col-sm-12 mb-3">
                    <textarea
                      className={`form-control`}
                      placeholder="Message"
                      id="Message"
                      style={{ height: "230px" }}
                      value={txtMessage}
                      onChange={(e)=>settxtMessage(e.target.value)}
                    ></textarea>
                    <label htmlFor="Message">Message :</label>
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
            onClick={() => btnSend()}
            style={{ background: "#004AAD" }}
          >
            Send
          </button>
        </div>
      </div>
    </>);
}

export default NewMessageModal;