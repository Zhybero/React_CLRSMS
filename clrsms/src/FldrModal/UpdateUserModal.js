



import {useState, useEffect, useRef } from "react"; 
import axios from "axios";
import PlsConnect from "../FldrFunctions/ClsGetConnection";
function UpdateUserModal(props){

  const [txtFName, settxtFName] = useState("");
  const [txtMName, settxtMName] = useState("");
  const [txtLName, settxtLName] = useState("");
  const [txtXName, settxtXName] = useState("");
  const [txtAddress, settxtAddress] = useState("");
  const [txtUName, settxtUName] = useState("");
  const [txtEmail, settxtEmail] = useState("");
  const [txtContact, settxtContact] = useState("");
  const [txtPassword, settxtPassword] = useState("");
  const [txtConfirmPassword, settxtConfirmPassword] = useState("");
    const closebtnref = useRef(null);  


    useEffect(()=>{
      if(props.varvarlist){ 
        settxtFName(props.varvarlist.fName);
        settxtLName(props.varvarlist.lName); 
        settxtXName(props.varvarlist.xName); 
        settxtUName(props.varvarlist.userName); 
        settxtPassword('props.varvarlist.pWord');
        settxtConfirmPassword(props.varvarlist.pWord);
        settxtMName(props.varvarlist.mName);
        settxtAddress(props.varvarlist.address);
        settxtEmail(props.varvarlist.email);
        settxtContact(props.varvarlist.contact);
      } 
    },[props.varvarlist]);
//validation
const [valid, setvalid] = useState()

//Clear
function ClearData(){
  settxtFName("");
  settxtMName("");
  settxtLName("");
  settxtXName("");
  settxtUName("");
  settxtPassword("");
  settxtConfirmPassword("");
  settxtAddress("");
  settxtEmail("");
  settxtContact("");
  }

   async function btnSave(){
      setvalid(0);
      if (!txtFName || txtFName.trim() === ""){ 
          setvalid(1);
        }
        else if(!txtLName || txtLName.trim() === ""){  
          setvalid(2);
        }
        else if(!txtXName || txtXName.trim() === ""){  
          setvalid(3);
        }
        else if(!txtUName || txtUName.trim() === ""){  
          setvalid(4);
        }
        else if(!txtPassword || txtPassword.trim() === ""){  
          setvalid(9);
        }
        else if(txtPassword !== txtConfirmPassword){    
          setvalid(9); 
          alert("Incorrect password! \nPlease type or change your password!");
        }
        else if(txtConfirmPassword !== txtPassword){     
          setvalid(9); 
          alert("Incorrect password!");
        }
        else{
            const Mdl1 = { 
              PWord: txtPassword,   
              GroupCode: '03',
              UserName: txtUName,
              FName: txtFName,
              LName: txtLName,
              XName: txtXName,
              MName: txtMName,
              Address: txtAddress,
              Email: txtEmail,
              Contact: txtContact,
              UserCode:props.varvarlist.userCode
              }; 
              try {
                  setvalid(0);
                const response = await axios.put(`${PlsConnect()}/API/CLRSMSWEBAPI/UpdateModeltblUserUpdate`, Mdl1, {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });  
                if (response.status === 200) {
                  console.log("Success: Data posted successfully!"); 
                  closebtnref.current.click();
                  props.onSaveComplete(props.varvarlist.userCode); 
                  ClearData();
                } else {
                  alert("Error: Something went wrong."); 
                }
              } catch (error) {
                console.error('Error:', error);
              }
              }
    }

    return(<>
    <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="AddProjectnNamelabel">
              Update Profile
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
                      valid === 2 ? "is-invalid" : ""
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
                      valid === 3 ? "is-invalid" : ""
                    }`}
                    id="lblLname"
                    placeholder="Project Name"
                    value={txtLName}
                    onChange={(e) => {
                      settxtLName(e.target.value);
                      setvalid(0);
                    }}
                  />
                  <label htmlFor="lblLname">Last Name</label>
                </div>

                <div className="col-6 form-floating mb-2">
                  <input
                    type="text"
                    className={`form-control ${
                      valid === 4 ? "is-invalid" : ""
                    }`}
                    id="lblxName"
                    placeholder="Project Name"
                    value={txtXName}
                    onChange={(e) => {
                      settxtXName(e.target.value);
                      setvalid(0);
                    }}
                  />
                  <label htmlFor="lblxName">Extension Name</label>
                </div>
              </div>

              <div className="d-flex gap-2 align-items-center justify-content-center">
                <div className="col-6 form-floating mb-2">
                  <input
                    type="text"
                    className={`form-control ${
                      valid === 5 ? "is-invalid" : ""
                    }`}
                    id="lblemail"
                    placeholder="Project Name"
                    value={txtEmail}
                    onChange={(e) => {
                      settxtEmail(e.target.value);
                      setvalid(0);
                    }}
                  />
                  <label htmlFor="lblemail">Email</label>
                </div>

                <div className="col-6 form-floating mb-2">
                  <input
                    type="text"
                    className={`form-control ${
                      valid === 6 ? "is-invalid" : ""
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
                      valid === 7 ? "is-invalid" : ""
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
                <div className="col-4 form-floating mb-2">
                  <input
                    type="text"
                    className={`form-control ${
                      valid === 8 ? "is-invalid" : ""
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

                <div className="col-4 form-floating mb-2">
                  <input
                    type="password"
                    className={`form-control ${
                      valid === 9 ? "is-invalid" : ""
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

                <div className="col-4 form-floating mb-2">
                  <input
                    type="password"
                    className={`form-control ${
                      valid === 9 ? "is-invalid" : ""
                    }`}
                    id="lblpw"
                    placeholder="Project Name"
                    value={txtConfirmPassword}
                    onChange={(e) => {
                      settxtConfirmPassword(e.target.value);
                      setvalid(0);
                    }}
                  />
                  <label htmlFor="lblpw">Confirm Password</label>
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
              Update
            </button>
          </div>
        </div>
    </>);
}
export default UpdateUserModal;