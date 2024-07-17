

import axios from "axios";
import PlsConnect from "../FldrFunctions/ClsGetConnection";
import { useState, useRef, useEffect } from "react"; 
function UpdateProjectNameModal(props){ 
 
    const [txtProjName, settxtProjName] = useState('');
    const closebtnref = useRef(null);  

//required
const [txtrequired1, settxtrequired1] = useState(''); 
 
const requiredClear=()=>{
  settxtrequired1('');
}

    async function btnSave(){
      requiredClear();
    if (!txtProjName || txtProjName.trim() === ""){
      settxtrequired1(' required *');
    }else{

      const Mdl1 = { 
        ProjName: txtProjName,   
        UserCode: props.varuserSession.userCode,
        ProjCode: props.varProjName.projCode
      }; 
      try { 
      requiredClear(''); 
        const response = await axios.put(`${PlsConnect()}/API/CLRSMSWEBAPI/UpdateModeltblProjects`, Mdl1, {
          headers: {
            'Content-Type': 'application/json',
          },
        });  
        if (response.status === 200) {
          console.log("Success: Data posted successfully!"); 
          closebtnref.current.click();
          props.onSaveComplete();
          settxtProjName('');
        } else {
          alert("Error: Something went wrong."); 
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
        
    } 
    
  useEffect(() => {
    if(props.varProjName || props.varProjName !==undefined){
        
       if(props.varProjName.projName){
        settxtProjName(props.varProjName.projName);
       } 
    }
    
  }, [props.varProjName]);

    return (
      <>
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="UpdateProjectnNamelabel">
              Modify Document Category
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
                value={txtProjName}
                onChange={(e) => settxtProjName(e.target.value)}
              />
              <label htmlFor="lblPN">Category Name <span className="text-danger">* {txtrequired1}</span></label>
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
              Update
            </button>
          </div>
        </div>
      </>
    );
}

export default UpdateProjectNameModal;