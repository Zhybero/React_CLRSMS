


import { useState,useRef } from "react";
import axios from "axios";
import PlsConnect from "../FldrFunctions/ClsGetConnection";
function AddAPSchedTimeModal(props){

    const [txtTime, settxtTime] = useState('');
    const closebtnref = useRef(null);  

    //button
    async function btnSave(){
        
          const Mdl1 = {  
              Code: props.varAPSchedlist.code,  
              TTime:txtTime
            }; 
            console.log(Mdl1);
            try { 
              const response = await axios.post(`${PlsConnect()}/API/CLRSMSWEBAPI/InsertModeltblAPSchedTime`, Mdl1, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });  
              if (response.status === 200) {
                console.log("Success: Data posted successfully!"); 
                closebtnref.current.click(); 
              } else {
                alert("Error: Something went wrong."); 
              }
            } catch (error) {
              console.error('Error:', error);
            }
            }
    return (
      <>
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="AddAPSchedulelabel">
              Add Appointment Time
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="form-floating col-12">
              <input
                type="time"
                className={`form-control form-control-sm`}
                id="Stime"
                placeholder="Select Time"
                value={txtTime}
                onChange={(e) => settxtTime(e.target.value)}
              />
              <label htmlFor="Stime">Select Time :</label>
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

export default AddAPSchedTimeModal;