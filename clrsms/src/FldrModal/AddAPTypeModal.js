

import { useState, useRef } from "react";
import axios from "axios";
import PlsConnect from "../FldrFunctions/ClsGetConnection";
function AddAPTypeModal(props){

    const closebtnref = useRef(null); 
    const [txtTitle, settxtTitle] = useState('');
    const [txtDesc, settxtDesc] = useState('');


//validation
const [valid, setvalid] = useState()

//Clear
function ClearData(){
    settxtTitle('');
    settxtDesc(''); 
  }
//button
    async function btnSave(){
        setvalid(0);
        if (!txtTitle || txtTitle.trim() === ""){ 
            setvalid(1);
          }else if(!txtDesc || txtDesc.trim() === ""){  
            setvalid(2);
          }else{
              const Mdl1 = { 
                APMTitle: txtTitle,   
                APMDesc: txtDesc
                }; 
                try {
                    setvalid(0);
                  const response = await axios.post(`${PlsConnect()}/API/CLRSMSWEBAPI/InsertModeltblAPMatter`, Mdl1, {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  });  
                  if (response.status === 200) {
                    console.log("Success: Data posted successfully!"); 
                    closebtnref.current.click();
                    props.onSaveComplete(); 
                    ClearData();
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
            <h1 className="modal-title fs-5">Add Appointment Type</h1>
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
                  type="text"
                  className={`form-control ${valid===1?"is-invalid":""}`}
                  placeholder="Apointment title"
                  value={txtTitle}
                  onChange={(e)=>{settxtTitle(e.target.value);setvalid(0)}}
                />
                <label>Apointment Title</label>
              </div>
            </div>
            <div className="form-floating w-100 mb-2">
              <textarea
                className={`form-control ${valid===2?"is-invalid":""}`}
                placeholder="Package Description"
                id="description"
                style={{ height: "230px" }}
                value={txtDesc}
                onChange={(e)=>{settxtDesc(e.target.value);setvalid(0)}}
              ></textarea>
              <label htmlFor="description">Appointment Description</label>
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

export default AddAPTypeModal;