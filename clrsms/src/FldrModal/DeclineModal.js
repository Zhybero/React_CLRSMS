import axios from "axios";
import PlsConnect from "../FldrFunctions/ClsGetConnection";
import { useState, useRef } from "react";

function DeclineModal(props) {
  const closebtnref = useRef(null);
  const [txtDesc, settxtDesc] = useState("");

  async function btnOK() {
    const Mdl1 = {
      APCode: props.varvarlist.apCode,
      Description: txtDesc,
      Type: "DC",
    };
    try {
      const response = await axios.post(
        `${PlsConnect()}/API/CLRSMSWEBAPI/InsertModeltblAPDecline`,
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
        settxtDesc('');
      } else {
        alert("Error: Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <>
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="AddProjectnNamelabel">
            DECLINE APPOINTMENT
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div
          className="modal-body text-center"
          style={{ background: "#3BAFDA" }}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="form-floating col-lg-12 col-sm-12 p-0 m-0">
                <textarea
                  className={`form-control`}
                  placeholder="Description"
                  id="Description"
                  style={{ height: "230px" }}
                  value={txtDesc}
                  onChange={(e) => settxtDesc(e.target.value)}
                ></textarea>
                <label htmlFor="Description">Description :</label>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn text-white"
            data-bs-toggle="modal"
            data-bs-target="#ApproveClient"
            style={{ background: "#387B40" }}
          >
            Back
          </button>

          <button
            type="button"
            className="btn text-white"
            style={{ background: "#004AAD" }}
            onClick={() => btnOK()}
          >
            Ok
          </button>

          <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              ref={closebtnref}
            >
              Close
            </button>
        </div>
      </div>
    </>
  );
}

export default DeclineModal;
