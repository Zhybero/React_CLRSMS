import AddUserGroupModal from "../FldrModal/AddUserGroupModal";
import {
  GetModeltblGroup,
  GetModeltblObjects,
  GetModeltblPermission,
} from "../FldrFunctions/ClsGetList";
import { useState, useEffect } from "react";
import MessageModal from "../FldrModal/MessageModal";
import axios from "axios";
import PlsConnect from "../FldrFunctions/ClsGetConnection";
function SettingsUserGroup() {
  const [MessageConfirm, setMessageConfirm] = useState(false);
  const [tblGroupList, settblGroupList] = useState([]);
  const [tblObjectsList, settblObjectsList] = useState([]);
  const [tblPermissionList, settblPermissionList] = useState([]);
  const [MdlbtnPassdataObj, setMdlbtnPassdataObj] = useState({});
  const [btnprev, setbtnprev] = useState(1);

  //Fetch
  const fetchMdlGroupList = async () => {
    try {
      settblGroupList(await GetModeltblGroup());
    } catch {
      console.log("Connection error!");
    }
  };
  /*const fetchMdlObjectsList = async () => {
    try {
      settblObjectsList(await GetModeltblObjects());
    } catch {
      console.log("Connection error!");
    }
  };
  const fetchMdlPermissionList = async (varGroupCode) => {
    try {
      settblPermissionList(await GetModeltblPermission(varGroupCode));
    } catch {
      console.log("Connection error!");
    }
  };*/

  //Filter
  const filterObjects = async (varGroupCode) => {
    const list1 = await GetModeltblObjects();
    const list2 = await GetModeltblPermission(varGroupCode);
    const namesInList2 = list2.map((item) => item.objectName);
    const filteredList1 = list1.filter(
      (item) => !namesInList2.includes(item.objectName)
    );
    settblObjectsList(filteredList1);
    settblPermissionList(list2);
  };

  useEffect(() => {
    fetchMdlGroupList();
  }, []);

  //buttons
  function btndbClickProject(varMdlObj) {
    setbtnprev(2);
    setMdlbtnPassdataObj(varMdlObj);
    /*fetchMdlObjectsList();
    fetchMdlPermissionList(varMdlObj.groupCode);*/
    filterObjects(varMdlObj.groupCode);
  }
  async function btnMoveObjects(varObjectName){
    const Mdl1 = { 
      ObjectName: varObjectName,    
      GroupCode: MdlbtnPassdataObj.groupCode
    };  
      const response = await axios.post(`${PlsConnect()}/API/CLRSMSWEBAPI/InsertModeltblPermission`, Mdl1, {
        headers: {
          'Content-Type': 'application/json',
        },
      });  
      if (response.status === 200) {
        btndbClickProject(MdlbtnPassdataObj);
        console.log("Success: Data posted successfully!");  
      } else {
        alert("Error: Something went wrong."); 
      }
  }
  async function btnDeletePermissions(varObjectName){
    const Mdl1 = { 
      ObjectName: varObjectName,    
      GroupCode: MdlbtnPassdataObj.groupCode
    };  
      const response = await axios.post(`${PlsConnect()}/API/WEBAPI/WEBAPIDelete/DeleteModeltblPermission`, Mdl1, {
        headers: {
          'Content-Type': 'application/json',
        },
      });  
      if (response.status === 200) {
        btndbClickProject(MdlbtnPassdataObj);
        console.log("Success: Data posted successfully!");  
      } else {
        alert("Error: Something went wrong."); 
      }
  }

  function btnPrevious() {
    if (btnprev === 2) {
      setbtnprev(1);
      fetchMdlGroupList();
    }
  }

  //Edit
  async function btnEditGroupName(varFileDocList) {}
  //Delete
  async function btnDelete(varMdlDoctype, vartbl, varName) {}
  const handleConfirmRemove = async () => {
    /*try {  
    if(deletetbl==='tblFileDocuments'){ 
      const Mdl1 = {  
        DocNum: varDeleteFileDoc1Obj.docNum,
        DocTypeCode: varDeleteFileDoc1Obj.docTypeCode,
        FileIC: varDeleteFileDoc1Obj.fileIC
      }; 
        const response = await axios.post(`${PlsConnect()}/API/WEBAPI/WEBAPIDelete/DeleteModeltblFileDocuments`, Mdl1, {
          headers: {
            'Content-Type': 'application/json',
          },
        });  
        if (response.status === 200) {
          console.log("Success: Data posted successfully!"); 
          fetchMdlFileDocument(paramDocType);
        } else {
          alert("Error: Something went wrong."); 
        }
    }else if(deletetbl==='tblDocumentType'){
      const Mdl1 = {   
        DocTypeCode: varDeleteFileDoc1Obj.docTypeCode,
        ProjCode: varDeleteFileDoc1Obj.projCode
      };  
        const response = await axios.post(`${PlsConnect()}/API/WEBAPI/WEBAPIDelete/DeleteModeltblDocumentType`, Mdl1, {
          headers: {
            'Content-Type': 'application/json',
          },
        });  
        if (response.status === 200) {
          console.log("Success: Data posted successfully!"); 
          fetchMdlProjectListParam(paramProjCode);
        } else {
          alert("Error: Something went wrong."); 
        }
    }else if(deletetbl==='tblProjects'){
      const Mdl1 = {    
        ProjCode: varDeleteFileDoc1Obj.projCode
      };  
        const response = await axios.post(`${PlsConnect()}/API/WEBAPI/WEBAPIDelete/DeleteModeltblProjects`, Mdl1, {
          headers: {
            'Content-Type': 'application/json',
          },
        });  
        if (response.status === 200) {
          console.log("Success: Data posted successfully!"); 
          fetchMdlProjectList();
        } else {
          alert("Error: Something went wrong."); 
        }
    }else{
      console.log('Nothing to Delete!');
    }
    } catch (error) {
      console.error('Error:', error);
    }finally{
      setMessageConfirm(false); 
      
    }*/
  };

  const handleCancelRemove = () => {
    setMessageConfirm(false);
  };
  return (
    <>
      <div className="d-flex gap-1 align-items-center p-2 shadow">
        <p className="m-1 user-select-none" style={{ fontSize: "12px" }}>
          {btnprev === 1 ? (
            "/User Goup"
          ) : btnprev === 2 ? (
            <>/User Goup/Permissions</>
          ) : (
            ""
          )}
        </p>
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
            <button className="btn btn-lg" onClick={() => btnPrevious()}>
              <i className="fa-solid fa-circle-left"></i>{" "}
            </button>
          </div>
          <div className="col-8 text-center">
            {btnprev === 1 ? (
              <h5>USER GROUP</h5>
            ) : btnprev === 2 ? (
              <h5>PERMISSIONS</h5>
            ) : (
              ""
            )}
          </div>
        </div>

        {btnprev === 1 ? (
          <>
            <div className="d-flex align-items-center m-2">
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#AddUserGroup"
                className="btn btn-sm text-white"
                style={{ background: "#303030" }}
              >
                <i className="fa-solid fa-user-plus me-1"></i>Add User Group
              </button>
            </div>
            <div
              className="container overflow-y-auto tbldiv"
              style={{ background: "#3BAFDA" }}
            >
              <table className="table table-hover table-borderless table-sm text-start">
                <thead className="ms-2">
                  <tr className="justify-content-start">
                    <th scope="col" className="bg-light">
                      Group Name
                    </th>

                    <th className="bg-light" />
                    <th className="bg-light" />
                  </tr>
                </thead>
                <tbody className="ms-2 user-select-none">
                  {tblGroupList.map((varlist, index) => (
                    <tr
                      key={index}
                      onDoubleClick={() => btndbClickProject(varlist)}
                      onTouchStart={() => btndbClickProject(varlist)}
                    >
                      <td>
                        <i className="fa-solid fa-user-group me-2"></i>{" "}
                        {varlist.groupName}
                      </td>  
                      <td id="edit">
                        <button
                          className="btn btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#UpdateProjectnName"
                          onClick={() => btnEditGroupName(varlist)}
                        >
                          <i className="fa-solid fa-pen" />
                        </button>
                      </td>
                      <td id="delete">
                        <button
                          className="btn btn-sm"
                          onClick={() =>
                            btnDelete(varlist, "tblGroup", varlist.groupName)
                          }
                        >
                          <i className="fa-solid fa-trash-can" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : btnprev === 2 ? (
          <>
            <div className="d-flex justify-content-center align-items-center m-2">
              <b>{MdlbtnPassdataObj.groupName}</b>
            </div>
            <div
              className="container d-flex overflow-y-auto tbldiv"
              style={{ background: "#3BAFDA" }}
            >
              <div className="col-5">
                <table className="table table-hover table-borderless table-sm text-start">
                  <thead className="ms-2">
                    <tr className="justify-content-center text-center">
                      <th scope="col" className="bg-light">
                        Objects
                      </th>
                    </tr>
                  </thead>
                  <tbody className="ms-2 user-select-none">
                    {tblObjectsList.map((varlist, index) => (
                      <tr key={index}
                      onDoubleClick={()=>btnMoveObjects(varlist.objectName)}>
                        <td>
                          <i className="fa-solid fa-lock-open me-2"></i>{" "}
                          {varlist.objectName}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="col-5 ms-auto">
                <table className="table table-hover table-borderless table-sm text-start">
                  <thead className="ms-2">
                    <tr className="justify-content-start">
                      <th scope="col" className="bg-light text-center">
                        Permitted
                      </th>
                    </tr>
                  </thead>
                  <tbody className="ms-2 user-select-none">
                    {tblPermissionList.map((varlist, index) => (
                      <tr key={index}
                      onDoubleClick={()=>btnDeletePermissions(varlist.objectName)}>
                        <td>
                          <i className="fa-solid fa-lock me-2"></i>{" "}
                          {varlist.objectName}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className="container overflow-y-auto tbldiv"
              style={{ background: "#3BAFDA" }}
            ></div>
          </>
        )}
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="AddUserGroup"
        aria-labelledby="AddUserGrouplabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <AddUserGroupModal onSaveComplete={fetchMdlGroupList} />
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
            message={`Are you sure you want to remove`}
            e
            onConfirm={handleConfirmRemove}
            onCancel={handleCancelRemove}
          />
        </div>
      </div>
    </>
  );
}
export default SettingsUserGroup;
