

import axios from "axios";
import PlsConnect from "../FldrFunctions/ClsGetConnection";
import { useState, useRef } from "react"; 
function AddUserGroupModal({onSaveComplete}){ 
 
    const [txtGroupName, settxtGroupName] = useState('');
    const closebtnref = useRef(null);  

//required
const [txtrequired1, settxtrequired1] = useState(''); 
 
const requiredClear=()=>{
  settxtrequired1('');
}

    async function btnSave(){
      requiredClear();
    if (!txtGroupName || txtGroupName.trim() === ""){
      settxtrequired1(' required *');
    }else{

      const Mdl1 = { 
        GroupName: txtGroupName,    
      }; 
      try { 
      requiredClear(''); 
        const response = await axios.post(`${PlsConnect()}/API/CLRSMSWEBAPI/InsertModeltblGroup`, Mdl1, {
          headers: {
            'Content-Type': 'application/json',
          },
        });  
        if (response.status === 200) {
          console.log("Success: Data posted successfully!"); 
          closebtnref.current.click();
          onSaveComplete();
          settxtGroupName('');
        } else {
          alert("Error: Something went wrong."); 
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
        
    }

    return (
      <>
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="AddUserGrouplabel">
              Add User Group
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
                placeholder="Project Name"
                value={txtGroupName}
                onChange={(e) => settxtGroupName(e.target.value)}
              />
              <label htmlFor="lblPN">Group Name <span className="text-danger">* {txtrequired1}</span></label>
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

export default AddUserGroupModal;