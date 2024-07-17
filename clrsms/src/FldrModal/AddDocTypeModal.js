

import axios from "axios";
import PlsConnect from "../FldrFunctions/ClsGetConnection";
import { useState, useRef } from "react";
function AddDocTypeModal({onSaveComplete, varProjCode, varuserSession}){


    const [txtDoctypeName, settxtDoctypeName] = useState('');
    const closebtnref = useRef(null);  

//required
const [txtrequired1, settxtrequired1] = useState(''); 
 
const requiredClear=()=>{
  settxtrequired1('');
}
    async function btnSave(){
      requiredClear();
    if (!txtDoctypeName || txtDoctypeName.trim() === ""){
      settxtrequired1(' required *');
    }else{
        const Mdl1 = { 
            DocTypeName: txtDoctypeName,   
            UserCode: varuserSession.userCode,
            ProjCode: varProjCode
          }; 
          try {
            requiredClear(''); 
            const response = await axios.post(`${PlsConnect()}/API/CLRSMSWEBAPI/InsertModeltblDocumentType`, Mdl1, {
              headers: {
                'Content-Type': 'application/json',
              },
            });  
            if (response.status === 200) {
              console.log("Success: Data posted successfully!"); 
              closebtnref.current.click();
              onSaveComplete(varProjCode);
              settxtDoctypeName('');
            } else {
              alert("Error: Something went wrong."); 
            }
          } catch (error) {
            console.error('Error:', error);
          }
          }
    }

    return( 
        <>
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="AddDocTypelabel">
              Add Legal Document Type
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="form-floating w-100">
              <input
                type="text"
                className="form-control"
                id="lblPN"
                placeholder="Legal Type Name"
                value={txtDoctypeName}
                onChange={(e) => settxtDoctypeName(e.target.value)}
              />
              <label htmlFor="lblPN">Legal Type Name<span className="text-danger">* {txtrequired1}</span></label>
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
            >
              Save
            </button>
          </div>
        </div>
        </>
    );
}
export default AddDocTypeModal;