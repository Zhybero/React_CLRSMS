import { useState, useRef, useEffect } from "react";
import axios from "axios";
import PlsConnect from "../FldrFunctions/ClsGetConnection";
function UpdateAppointmentModal(props) {
  const closebtnref = useRef(null);
  const [txtHdate, settxtHdate] = useState("");
  const [cbAPFinish, setcbAPFinish] = useState(null);


  useEffect(()=>{
    if(props.varvartblList){
      setcbAPFinish(props.varvartblList.active);  
     }
    if(props.varvartblList.hDate){ 
      settxtHdate(props.varvartblList.hDate.split('T')[0]);
     }
  },[props.varvartblList]);

  const selectStatus = (event) => {
    const value = event.target.value === 'true';
    setcbAPFinish(value);
    console.log(value);
  };

  async function btnSave() { 
    if (!txtHdate && !cbAPFinish) {
      console.log("Nothing to save!");
    } else {
      const Mdl1 = {
        HDate: txtHdate,
        Active: cbAPFinish, 
        APCode: props.varvartblList.apCode
      }; 
      try { 
        const response = await axios.put(
          `${PlsConnect()}/API/CLRSMSWEBAPI/UpdateModeltblAppointmentsApprove`,
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
          props.onSaveComplete();
          settxtHdate(new Date().toISOString().split('T')[0]);
        } else {
          alert("Error: Something went wrong.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }

  return (
    <>
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="AddProjectnNamelabel">
            Set Hearing for{" "}
            <span className="text-primary">
              {props.varvartblList.fName +
                " " +
                props.varvartblList.mName +
                " " +
                props.varvartblList.lName}
            </span>
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <div className="form-floating w-100 mb-2">
            <input
              type="date"
              className="form-control"
              id="lblPN"
              placeholder="Hearing Date:"
              value={txtHdate}
              onChange={(e) => settxtHdate(e.target.value)}
            />
            <label htmlFor="lblPN">Hearing Date:</label>
          </div>
          <div className="form-floating w-100">
            <select
              type="date"
              className="form-control"
              id="lblPN"
              placeholder="Hearing Date:"
              value={cbAPFinish}
              onChange={(e) => selectStatus(e)}
            > 
              <option value="true">Active</option>
              <option value="false">Finish</option>
              </select>
            <label htmlFor="lblPN">Status:</label>
          </div>
          {/* <div className="form-floating w-100 text-start mt-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                checked={cbAPFinish}
                onChange={(e) => setcbAPFinish(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Active
              </label>
            </div>
          </div> */}
        </div>
        <div className="modal-footer">
        <button className="btn bg-danger border rounded-3 me-auto"
            data-bs-dismiss="modal"
            aria-label="Close" 
                          onClick={() => props.varbtnDelete(props.varvartblList)}>
                          <i className="fa-solid fa-trash-can" /> <b>Delete</b>
                        </button>
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
            data-bs-target={`${props.varmodalID}`}
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

export default UpdateAppointmentModal;
