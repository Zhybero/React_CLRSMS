

import axios from "axios";
import PlsConnect from "../FldrFunctions/ClsGetConnection";
import { useState, useRef } from "react";
function AddAPScheduleModal(props){


    const [txtAPDate, settxtAPDate] = useState('');
    const [txtSlots, settxtSlots] = useState(''); 
    const closebtnref = useRef(null);   

//required
const [txtrequired1, settxtrequired1] = useState(''); 
const [txtrequired2, settxtrequired2] = useState('');  
 
const requiredClear=()=>{
  settxtrequired1('');
  settxtrequired2(''); 
}
    async function btnSave(){
      requiredClear();
    if (!txtAPDate || txtAPDate.trim() === ""){
      settxtrequired1(' required *');
    }else if(!txtSlots || txtSlots.trim() === ""){ 
      settxtrequired2(' required *');  
    }else{
        const Mdl1 = { 
          APDate: txtAPDate,   
            UserCode: props.varuserSession.userCode,
            Slots: txtSlots,
            Description: 'NA',
            Type:'APS'
          }; 
          try {
            requiredClear(''); 
            const response = await axios.post(`${PlsConnect()}/API/CLRSMSWEBAPI/InsertModeltblAPSchedule`, Mdl1, {
              headers: {
                'Content-Type': 'application/json',
              },
            });  
            if (response.status === 200) {
              console.log("Success: Data posted successfully!"); 
              closebtnref.current.click();
              props.onSaveComplete(props.vartxtFilterDate);
              props.vartileContent();
              settxtAPDate('');
              settxtSlots('');
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
            <h1 className="modal-title fs-5" id="AddAPSchedulelabel">
              Add Appointment Schedule
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">

            <div className="d-flex mb-2">
            <div className="form-floating w-100 me-1">
              <input
                type="date"
                className="form-control" 
                placeholder="Apointment Date"
                value={txtAPDate}
                onChange={(e) => settxtAPDate(e.target.value)}
              />
              <label>Apointment Date<span className="text-danger">* {txtrequired1}</span></label>
            </div>
            
            <div className="form-floating w-100 ms-1">
              <input
                type="number"
                className="form-control" 
                placeholder="SLots"
                value={txtSlots}
                onChange={(e) => settxtSlots(e.target.value)}
              /> 
              <label>Number of Slots<span className="text-danger">* {txtrequired2}</span></label>
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
            >
              Save
            </button>
          </div>
        </div>
        </>
    );
}
export default AddAPScheduleModal;