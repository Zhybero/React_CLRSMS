

import { v4 } from "uuid";
import axios from "axios";
import PlsConnect from "../FldrFunctions/ClsGetConnection";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { GetImg, GetModeltblUserSpecific, GetModeltblAPSchedule, GetModeltblAPScheduleTasks, GetModeltblUserCredSpecific } from "../FldrFunctions/ClsGetList";
import { useState, useEffect, useRef } from "react";
import UpdateUserModal from "../FldrModal/UpdateUserModal";
function ProfileManagement(){

    const [imageSrc, setImageSrc] = useState('');
    const [tblUser, settblUser] = useState({});
    const [tblUserCred, settblUserCred] = useState({});
    const [tblAPScheduleList, settblAPScheduleList] = useState([]);
    const [tblAPScheduleListTasks, settblAPScheduleListTasks] = useState([]); 
    const openfile = useRef(null); 

    //Button
    function btnOpenFile(){
        openfile.current.click();
    }

    const handleFileChange = async (event) => { 
    const selectedFile = event.target.files[0];
        const formData = new FormData();
 
            const strFileName = v4() + "_" + selectedFile.name; 

            formData.append("files", selectedFile, strFileName);  

        const Mdl1 = { 
            UserCode: tblUser.userCode,
            FileName: selectedFile.name,
            FileNameGUID: strFileName,
            FileSize: selectedFile.size / 1024 / 1024,
            FileType: selectedFile.name.split(".").pop(),
        };  
        formData.append("ModeltblUserCred", JSON.stringify(Mdl1));

        let response = '';
        if(tblUserCred && tblUserCred.fileNameGUID){
            response = await axios.put(
                `${PlsConnect()}/API/CLRSMSWEBAPI/UpdateModeltblUserCred`,
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
        }
        else{
            response = await axios.post(
                `${PlsConnect()}/API/CLRSMSWEBAPI/InsertModeltblUserCred`,
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
        }
        if (response.status === 200) {
          console.log("Success: Data posted successfully!"); 
          fetchtblUserCredObj(tblUser.userCode);
        } else {
          alert("Error: Something went wrong.");
        }
    }


      //const [userSession, setuserSession] = useState({});
  useEffect(()=>{
    const varUsers = JSON.parse(sessionStorage.getItem("UserSession"));
    //setuserSession(varUsers);  
    fetchtblUserObj(varUsers.userCode);
    fetchtblUserCredObj(varUsers.userCode); 
  },[]);

  const fetchtblUserObj = async (varUserCode) => { 
    try {
        settblUser(await GetModeltblUserSpecific(varUserCode)); 
    } catch {
      console.log("Connection error!");
    }
  };
  const fetchtblUserCredObj = async (varUserCode) => { 
    try {
        const varUserCred = await GetModeltblUserCredSpecific(varUserCode);
        settblUserCred(varUserCred); 
        fetchuserIMG(varUserCred.fileNameGUID);
    } catch {
      console.log("Connection error!");
    }
  };
  
  const fetchuserIMG = async (fileName) => { 
    try {  
        GetImg(fileName)
          .then(imageUrl => setImageSrc(imageUrl))
          .catch(error => console.error(error));
    } catch {
      console.log("Connection error!");
    }
  }; 
  
const strDateToday = new Date().toISOString().split('T')[0]; 
useEffect(() => { 
  fetchMdlProjectList(strDateToday);  
}, [strDateToday]);

 
//Fetch
const fetchMdlProjectList = async (varFilterDate) => {
    try {
      settblAPScheduleList(await GetModeltblAPSchedule(varFilterDate));
      settblAPScheduleListTasks(await GetModeltblAPScheduleTasks(varFilterDate));
    } catch {
      console.log("Connection error!");
    }
  }; 

  // Function to check if the given date is in the list of highlighted dates
  const isHighlightedDate = (dateToCheck) => {
    return tblAPScheduleList.some((item) => {
      const highlightedDate = new Date(item.apDate);
      return (
        dateToCheck.getDate() === highlightedDate.getDate() &&
        dateToCheck.getMonth() === highlightedDate.getMonth() &&
        dateToCheck.getFullYear() === highlightedDate.getFullYear()
      );
    });
  };
  const isHighlightedDateTasks = (dateToCheck) => {
    return tblAPScheduleListTasks.some((item) => {
      const highlightedDate = new Date(item.apDate);
      return (
        dateToCheck.getDate() === highlightedDate.getDate() &&
        dateToCheck.getMonth() === highlightedDate.getMonth() &&
        dateToCheck.getFullYear() === highlightedDate.getFullYear()
      );
    });
  };
  const tileContent = ({ date: dateToCheck, view }) => {
    if (view === "month" && isHighlightedDate(dateToCheck)) {
      return (
        <div
          style={{
            backgroundColor: "#3BAFDA",
            borderRadius: "10%",
            height: "20%",
            width: "100%",
            margin: "auto",
          }}
        />
      );
    }
    if (view === "month" && isHighlightedDateTasks(dateToCheck)) {
      return (
        <div
          style={{
            backgroundColor: "#9CC837",
            borderRadius: "10%",
            height: "20%",
            width: "100%",
            margin: "auto",
          }}
        />
      );
    }
    return null;
  };
    return (
      <>
        <div
          className="container-lg container-md-fluid rounded p-4 shadow mt-2"
          style={{ background: "#3BAFDA" }}
        >
          <div className="row">
            <div className="col-12">
              <div className="profile-container mx-auto shadow" onClick={()=>btnOpenFile()}>
                {imageSrc && (
                  <img
                    className="profile-image"
                    src={imageSrc}
                    alt="Uploaded"
                  />
                )}
              </div>
              <div className="mx-auto mt-3 d-flex gap-4 align-items-center justify-content-center">
                <h3 className="fs-2 fw-bold">
                  {tblUser
                    ? `${tblUser.fName} ${tblUser.mName} ${tblUser.lName} ${tblUser.xName}`
                    : ""}
                </h3>
                <button className="btn btn-sm btn-outline-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#UpdateUser"><i className="fa-solid fa-pen fs-4" /></button>
              </div>
            </div>
          </div>
          <div className="row mt-3 bg-white rounded shadow">
            <hr />
            <h4 className="fw-bold mb-3 bg-warning">PERSONAL INFORMATION</h4>
            <div className="container-fluid d-lg-flex d-sm-grid p-2">
              <div className="col-lg-6 col-sm-12 p-5 ms-auto border-start border-2 border-primary rounded">
                <div className="col-lg-12 col-sm-12 mb-2 text-start mx-auto">
                  <h4>
                    <label className="fw-bold">User Name :</label>{" "}
                    <small>{tblUser ? tblUser.userName : ""}</small>
                  </h4>
                </div>
                <div className="col-lg-12 col-sm-12 mb-2 text-start mx-auto">
                  <h4>
                    <label className="fw-bold">Address :</label>{" "}
                    <small>{tblUser ? tblUser.address : ""}</small>
                  </h4>
                </div>
                <div className="col-lg-12 col-sm-12 mb-2 text-start mx-auto">
                  <h4>
                    <label className="fw-bold">Email :</label>{" "}
                    <small>{tblUser ? tblUser.email : ""}</small>
                  </h4>
                </div>
                <div className="col-lg-12 col-sm-12 mb-2 text-start mx-auto">
                  <h4>
                    <label className="fw-bold">Contact :</label>{" "}
                    <small>{tblUser ? tblUser.contact : ""}</small>
                  </h4>
                </div>
              </div>
              <div className="col-lg-6 col-sm-12 border-start border-2">
                <div className="calendar-container justify-content-center col-12 pb-5">
                  <Calendar
                    className={"shadow rounded-4 mx-auto"}
                    tileContent={tileContent}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={openfile}
        onChange={handleFileChange}
      />
        <div
        className="modal fade"
        id="UpdateUser"
        aria-labelledby="AddDocTypelabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <UpdateUserModal varvarlist={tblUser} onSaveComplete={fetchtblUserObj}
          />
          {/* <AddDocTypeModal
            onSaveComplete={fetchMdlProjectListParam}
            varProjCode={paramProjCode}
          /> */}
        </div>
      </div>
      </>
    );
}

export default ProfileManagement;