import { useState, useRef } from "react";
import axios from "axios";
import PlsConnect from "../FldrFunctions/ClsGetConnection";
function AddUserModal(props) {
  const [txtFName, settxtFName] = useState("");
  const [txtMName, settxtMName] = useState("");
  const [txtLName, settxtLName] = useState("");
  const [txtXName, settxtXName] = useState("");
  const [txtAddress, settxtAddress] = useState("");
  const [txtUName, settxtUName] = useState("");
  const [txtEmail, settxtEmail] = useState("");
  const [txtContact, settxtContact] = useState("");
  const [txtPassword, settxtPassword] = useState("");
  const closebtnref = useRef(null);

  //validation
  const [valid, setvalid] = useState();

  //Clear
  function ClearData() {
    settxtFName("");
    settxtMName("");
    settxtLName("");
    settxtXName("");
    settxtUName("");
    settxtPassword("");
    settxtAddress("");
    settxtEmail("");
    settxtContact("");
  }

  async function btnSave() {
    setvalid(0);
    if (!txtFName || txtFName.trim() === "") {
      setvalid(1);
    } else if (!txtLName || txtLName.trim() === "") {
      setvalid(2);
    } else if (!txtXName || txtXName.trim() === "") {
      setvalid(3);
    } else if (!txtUName || txtUName.trim() === "") {
      setvalid(4);
    } else if (!txtPassword || txtPassword.trim() === "") {
      setvalid(5);
    } else {
      const Mdl1 = {
        PWord: txtPassword,
        GroupCode: "03",
        UserName: txtUName,
        FName: txtFName,
        LName: txtLName,
        XName: txtXName,
        MName: txtMName,
        Address: txtAddress,
        Email: txtEmail,
        Contact: txtContact,
      };
      try {
        setvalid(0);
        const response = await axios.post(
          `${PlsConnect()}/API/CLRSMSWEBAPI/InsertModeltblUser`,
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
          ClearData();
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
            Add User
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body text-center">
          <div className="container-fluid">
            <div className="row">
              <div className="d-flex gap-2 align-items-center justify-content-center">
                <div className="col-6 form-floating mb-2">
                  <input
                    type="text"
                    className={`form-control ${
                      valid === 1 ? "is-invalid" : ""
                    }`}
                    id="lblFname"
                    placeholder="Project Name"
                    value={txtFName}
                    onChange={(e) => {
                      settxtFName(e.target.value);
                      setvalid(0);
                    }}
                  />
                  <label htmlFor="lblFname">First Name</label>
                </div>
                <div className="col-6 form-floating mb-2">
                  <input
                    type="text"
                    className={`form-control ${
                      valid === 1 ? "is-invalid" : ""
                    }`}
                    id="lblMName"
                    placeholder="Project Name"
                    value={txtMName}
                    onChange={(e) => {
                      settxtMName(e.target.value);
                      setvalid(0);
                    }}
                  />
                  <label htmlFor="lblMName">Middle Name</label>
                </div>
              </div>

              <div className="d-flex gap-2 align-items-center justify-content-center">
                <div className="col-6 form-floating mb-2">
                  <input
                    type="text"
                    className={`form-control ${
                      valid === 2 ? "is-invalid" : ""
                    }`}
                    id="lblLName"
                    placeholder="Project Name"
                    value={txtLName}
                    onChange={(e) => {
                      settxtLName(e.target.value);
                      setvalid(0);
                    }}
                  />
                  <label htmlFor="lblLName">Last Name</label>
                </div>

                <div className="col-6 form-floating mb-2">
                  <input
                    type="text"
                    className={`form-control ${
                      valid === 3 ? "is-invalid" : ""
                    }`}
                    id="lblXName"
                    placeholder="Project Name"
                    value={txtXName}
                    onChange={(e) => {
                      settxtXName(e.target.value);
                      setvalid(0);
                    }}
                  />
                  <label htmlFor="lblXName">Extension Name</label>
                </div>
              </div>

              <div className="d-flex gap-2 align-items-center justify-content-center">
                <div className="col-6 form-floating mb-2">
                  <input
                    type="text"
                    className={`form-control ${
                      valid === 4 ? "is-invalid" : ""
                    }`}
                    id="lblEmail"
                    placeholder="Project Name"
                    value={txtEmail}
                    onChange={(e) => {
                      settxtEmail(e.target.value);
                      setvalid(0);
                    }}
                  />
                  <label htmlFor="lblEmail">Email</label>
                </div>

                <div className="col-6 form-floating mb-2">
                  <input
                    type="text"
                    className={`form-control ${
                      valid === 5 ? "is-invalid" : ""
                    }`}
                    id="lblContact"
                    placeholder="Project Name"
                    value={txtContact}
                    onChange={(e) => {
                      settxtContact(e.target.value);
                      setvalid(0);
                    }}
                  />
                  <label htmlFor="lblContact">Contact Number</label>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <div className="col-12 form-floating mb-2">
                  <input
                    type="text"
                    className={`form-control ${
                      valid === 4 ? "is-invalid" : ""
                    }`}
                    id="lbladdrss"
                    placeholder="Project Name"
                    value={txtAddress}
                    onChange={(e) => {
                      settxtAddress(e.target.value);
                      setvalid(0);
                    }}
                  />
                  <label htmlFor="lbladdrss">Address</label>
                </div> 
              </div>
              
              <div className="d-flex gap-2 align-items-center justify-content-center">
                <div className="col-6 form-floating mb-2">
                  <input
                    type="text"
                    className={`form-control ${
                      valid === 4 ? "is-invalid" : ""
                    }`}
                    id="lblUname"
                    placeholder="Project Name"
                    value={txtUName}
                    onChange={(e) => {
                      settxtUName(e.target.value);
                      setvalid(0);
                    }}
                  />
                  <label htmlFor="lblUname">User Name</label>
                </div>

                <div className="col-6 form-floating mb-2">
                  <input
                    type="password"
                    className={`form-control ${
                      valid === 5 ? "is-invalid" : ""
                    }`}
                    id="lblpw"
                    placeholder="Project Name"
                    value={txtPassword}
                    onChange={(e) => {
                      settxtPassword(e.target.value);
                      setvalid(0);
                    }}
                  />
                  <label htmlFor="lblpw">Password</label>
                </div>
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
export default AddUserModal;
