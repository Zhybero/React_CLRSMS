


import { useState, useRef } from "react";
import axios from "axios";
import PlsConnect from "../FldrFunctions/ClsGetConnection";
function CreateTasksModal(props){
 
    const [txtAPDate, settxtAPDate] = useState(''); 
    const [txtDesc, settxtDesc] = useState('');
    const closebtnref = useRef(null);  

    //validation
    const [valid, setvalid] = useState()
    
//Clear
function ClearData(){
    settxtAPDate('');
    settxtDesc('');  
    }

    async function btnSave(){
        setvalid(0);
        if (!txtAPDate || txtAPDate.trim() === ""){ 
            setvalid(1);
          }
          else if(!txtDesc || txtDesc.trim() === ""){  
            setvalid(2);
          } 
          else{
              const Mdl1 = { 
                APDate: txtAPDate,   
            UserCode: props.varuserSession.userCode,
            Slots: 0,
            Description: txtDesc,
            Type:'APT'
                }; 
                try {
                    setvalid(0);
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
                    ClearData();
                  } else {
                    alert("Error: Something went wrong."); 
                  }
                } catch (error) {
                  console.error('Error:', error);
                }
                }

    }

    return (<>
    <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="AddAPSchedulelabel">
              Add Tasks
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
                className={`form-control ${valid===1?"is-invalid":""}`}
                placeholder="Apointment Date"
                value={txtAPDate}
                onChange={(e) => settxtAPDate(e.target.value)}
              />
              <label>Apointment Date</label>
            </div>
             
            </div>

            <div className="form-floating w-100 mb-2">
              <input
                type="text"
                className={`form-control ${valid===2?"is-invalid":""}`}
                placeholder="Description"
                value={txtDesc}
                onChange={(e) => settxtDesc(e.target.value)}
              /> 
              <label>Description</label>
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
    </>);
}
export default CreateTasksModal;