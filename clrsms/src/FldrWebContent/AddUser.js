

import AddUserModal from "../FldrModal/AddUserModal";
import { GetModeltblUser } from "../FldrFunctions/ClsGetList";
import { useState, useEffect } from "react";
import MessageModal from "../FldrModal/MessageModal";
import axios from "axios";
import PlsConnect from "../FldrFunctions/ClsGetConnection";
import UpdateUserModal from "../FldrModal/UpdateUserModal";
function AddUser(){

    const [tblUsersList, settblUsersList] = useState([]);
    const [MessageConfirm, setMessageConfirm] = useState(false); 
    const [mdlvarlist, setmdlvarlist] = useState({});
    const [paramVarlistCode, setparamVarlistCode] = useState(''); 
//fetch
const fetchMdlUsers = async () => {
    try {
        settblUsersList(await GetModeltblUser());
    } catch {
      console.log("Connection error!");
    }
  };
  //btn
 //edit
 async function btnEdit(varlist){
    setmdlvarlist(varlist); 
   } 
 //Delete
 async function btnDelete(varlist){
    setmdlvarlist(varlist);
    setMessageConfirm(true); 
    setparamVarlistCode(varlist.fName +
        " " +
        varlist.lName +
        " " +
        varlist.xName); 
   }
   const handleConfirmRemove = async () => {  
      const Mdl1 = {  
        UserCode: mdlvarlist.userCode
      }; 
        const response = await axios.post(`${PlsConnect()}/API/WEBAPI/WEBAPIDelete/DeleteClsDeleteModeltblUser`, Mdl1, {
          headers: {
            'Content-Type': 'application/json',
          },
        });  
        if (response.status === 200) {
          console.log("Success: Data posted successfully!"); 
          fetchMdlUsers();
          setMessageConfirm(false); 
        } else {
          alert("Error: Something went wrong."); 
        }
        }
const handleCancelRemove = () => {
    setMessageConfirm(false); 
  };

  useEffect(()=>{
    fetchMdlUsers();
  },[]);

    return (
      <>
        <div className="d-flex gap-1 align-items-center p-2 shadow">
          <p className="m-1 user-select-none" style={{ fontSize: "12px" }}></p>
        </div>
        {/* Content */}
        <div
          className="container-lg container-md-fluid rounded p-1 shadow mt-2"
          style={{ background: "#3BAFDA" }}
        >
          <div
            className="d-flex align-items-center"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              fontFamily: "Cooper Black",
            }}
          >
            <div className="col-2 text-start">
              <button className="btn btn-lg">
                <i className="fa-solid fa-circle-left"></i>{" "}
              </button>
            </div>
            <div className="col-8 text-center">
              <h5>USERS (Secretary)</h5>
            </div>
          </div>

          <div className="d-flex align-items-center m-2">
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#AddUser"
              className="btn btn-sm text-white"
              style={{ background: "#303030" }}
            >
              <i className="fa-solid fa-user-plus me-1"></i>Add User
            </button>
            <div className="col-lg-4 col-sm-12 ms-auto d-flex align-items-center justify-content-end">
              <div className="input-group rounded">
                <div className="input-group-text bg-white">
                  <i className="fa-solid fa-search"></i>
                </div>
                <input
                  type="search"
                  className="form-control form-control-sm"
                  placeholder="Search types..."
                />
              </div>
            </div>
          </div>

          <div
            className="container overflow-y-auto tbldiv rounded-4"
            style={{ background: "rgba(10, 10, 10, 0.1)" }}
          >
            <table
              className="table table-hover table-borderless table-sm text-start mt-3"
            >
              <thead className="ms-2">
                <tr className="justify-content-start">
                  <th scope="col" className="bg-light">
                    Name
                  </th>
                  <th scope="col" className="bg-light">
                    Username
                  </th> 
                  <th className="bg-light" />
                  <th className="bg-light" />
                </tr>
              </thead>
              <tbody className="ms-2 user-select-none">
                {tblUsersList?(
                tblUsersList.map((varlist, index)=>(
                <tr className="mb-2" key={index}>
                  <td>
                  <i className="fa-solid fa-user me-1"></i>{' '}
                    {varlist.fName +
                          " " +
                          varlist.lName +
                          " " +
                          varlist.xName}
                  </td>
                  <td>{varlist.userName}</td>
                  <td id="edit">
                    <button
                      className="btn btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#UpdateUser"
                      onClick={()=>btnEdit(varlist)}
                    >
                      <i className="fa-solid fa-pen" />
                    </button>
                  </td>
                  <td id="delete">
                    <button className="btn btn-sm" onClick={()=>btnDelete(varlist)}>
                      <i className="fa-solid fa-trash-can" />
                    </button>
                  </td>
                </tr>
                ))):''}
              </tbody>
            </table>
          </div>
        </div>


        
      <div
        className="modal fade"
        id="AddUser"
        aria-labelledby="AddDocTypelabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <AddUserModal onSaveComplete={fetchMdlUsers}
          />
          {/* <AddDocTypeModal
            onSaveComplete={fetchMdlProjectListParam}
            varProjCode={paramProjCode}
          /> */}
        </div>
      </div>
        
      <div
        className="modal fade"
        id="UpdateUser"
        aria-labelledby="AddDocTypelabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <UpdateUserModal varvarlist={mdlvarlist} onSaveComplete={fetchMdlUsers}
          />
          {/* <AddDocTypeModal
            onSaveComplete={fetchMdlProjectListParam}
            varProjCode={paramProjCode}
          /> */}
        </div>
      </div>
      
      {/* Message */}
      <div
        className={`modal fade ${MessageConfirm ? "show" : ""}`}
        tabIndex="-1"
        style={{
          display: MessageConfirm ? "flex" : "none",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="modal-dialog">
          <MessageModal
            message={`Are you sure you want to remove `} 
            onConfirm={handleConfirmRemove}
            onCancel={handleCancelRemove}
            varlistCode={paramVarlistCode}
          />
        </div>
      </div>
      </>
    );
}
export default AddUser;