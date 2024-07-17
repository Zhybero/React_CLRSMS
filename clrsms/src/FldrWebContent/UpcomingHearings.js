

import { GetModeltblAppointmentsApprovedforHearing, GetModelViewAPNameHearing, GetModeltblUserCredSpecific, GetImg, GetModeltblUserSpecific } from "../FldrFunctions/ClsGetList";
import { useState, useEffect } from "react";
import MessageModal from "../FldrModal/MessageModal";
import axios from "axios";
import PlsConnect from "../FldrFunctions/ClsGetConnection";
import UpdateAppointmentModal from "../FldrModal/UpdateAppointmentModal";
import ClientInformationModalHearing from "../FldrModal/ClientInformationModalHearing";
import EvidenceModal from "../FldrModal/EvidenceModal";
import ReplyMessageModal from "../FldrModal/ReplyMessageModal";

function UpcomingHearings(){

    const [tblAppointmentsList, settblAppointmentsList] = useState([]);
    const [viewNameHearing, setviewNameHearing] = useState([]);
    const [paramvarViewMailobjCredential, setparamvarViewMailobjCredential] = useState({}); 

    //Others
    const [MessageConfirm, setMessageConfirm] = useState(false);
    const [name, setname] = useState("");
    const [selectedbtn, setselectedbtn] = useState("");
    const [varlist, setvarlist] = useState({});
    const [vartblList, setvartblList] = useState({});
    const [imageSrc, setImageSrc] = useState('');
    const [tblUser, settblUser] = useState({}); 
    const [modalID, setmodalID] = useState('a');
  
  
    const [userSession, setuserSession] = useState({});
    useEffect(()=>{ 
    setuserSession(JSON.parse(sessionStorage.getItem("UserSession")))
    },[]);
const fetchtblUserObj = async (varlist) => { 
  try {
      // settblUser(await GetModeltblUserSpecific(varlist.userCode));  
    var vartblUserSpecific = await GetModeltblUserSpecific(varlist.userCode);
    settblUser(vartblUserSpecific); 
    setparamvarViewMailobjCredential(vartblUserSpecific);
      //setvarlist(varlist);
      fetchtblUserCredObj(varlist.userCode);
      fetchMdlAppointments(varlist.userCode);
  } catch {
    console.log("Connection error!");
  }
};
    //fetch
    const fetchMdlAppointments = async (varUserCode) => {
      try {
        settblAppointmentsList(await GetModeltblAppointmentsApprovedforHearing(varUserCode));
      } catch {
        console.log("Connection error!");
      }
    };
    const fetchMdlAppointmentsNameHearing = async () => {
      try {
        setviewNameHearing(await GetModelViewAPNameHearing()); 
      } catch {
        console.log("Connection error!");
      }
    };
    const fetchtblUserCredObj = async (varUserCode) => { 
      try {
          const varUserCred = await GetModeltblUserCredSpecific(varUserCode); 
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
  
    useEffect(() => {
      //fetchMdlAppointments();
      fetchMdlAppointmentsNameHearing();
    }, []);
  
    //button 
    function btnDelete(varAptList) {
      setname(varAptList.fName + " " + varAptList.mName + " " + varAptList.lName);
      setMessageConfirm(true);
      setvarlist(varAptList);
      setselectedbtn('Delete');
    }
    function btnRow(varlist){
      setvartblList(varlist);  
      setmodalID("#ClientInformationModalHearing")
    }
    function btnHandleDecline(props){
  setvarlist(props);
    }
    function btnFinish(varlist){ 
      setname(varlist.fName + " " + varlist.mName + " " + varlist.lName);
      setMessageConfirm(true);
      setvarlist(varlist);
      setselectedbtn('Finish');
    }
  
    //Others
    const handleConfirmRemove = async () => {
      fetchMdlAppointmentsNameHearing();setMessageConfirm(false);
      if(selectedbtn==='Approve'){
  
          const Mdl1 = {
              APCode: varlist.apCode,
            };
            console.log(Mdl1);
            const response = await axios.put(
              `${PlsConnect()}/API/CLRSMSWEBAPI/UpdateModeltblAppointments`,
              Mdl1,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.status === 200) {
              console.log("Success: Data posted successfully!");
              fetchMdlAppointmentsNameHearing();setMessageConfirm(false);
            } else {
              alert("Error: Something went wrong.");
            }
      }
      else if(selectedbtn==='Delete'){
  
          const Mdl1 = {
              APCode: varlist.apCode,
            };
            console.log(Mdl1);
            const response = await axios.post(
              `${PlsConnect()}/API/WEBAPI/WEBAPIDelete/DeleteModeltblAppointments`,
              Mdl1,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.status === 200) {
              console.log("Success: Data deleted successfully!");
              fetchMdlAppointmentsNameHearing();setMessageConfirm(false);
            } else {
              alert("Error: Something went wrong.");
            }
      }else if(selectedbtn==='Finish'){
        const Mdl1 = {
          HDate: varlist.hDate,
          Active: false, 
          APCode: varlist.apCode
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
            fetchMdlAppointmentsNameHearing();setMessageConfirm(false);
          } else {
            alert("Error: Something went wrong.");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }else{
          console.log("Nothing Happened!");
      }
    };
  
    const handleCancelRemove = () => {
      setMessageConfirm(false);
    };
  
  
    //Searched
    const [searchList, setsearchList] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 
    let listAPList = searchTerm?searchList:viewNameHearing;
     
    const handleChange = (event) => {
      fetchMdlAppointmentsNameHearing(); 
      setSearchTerm(event.target.value); 
      const results = viewNameHearing.filter(
        (item) =>
          item.fName.toLowerCase().includes(event.target.value.toLowerCase()) ||
          item.mName.toLowerCase().includes(event.target.value.toLowerCase()) ||
          item.lName.toLowerCase().includes(event.target.value.toLowerCase()) || 
          item.hDate.includes(event.target.value) ||
          item.apDate.includes(event.target.value)
      );
      setsearchList(results);
    };
  
  
    return(<>
    
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
            <h5>ON-PROCESS APPOINTMENTS</h5>
          </div>
        </div>

        <div className="d-flex align-items-center m-2">
          <div className="col-lg-4 col-sm-12 ms-auto d-flex align-items-center justify-content-end">
            <div className="input-group rounded">
              <div className="input-group-text bg-white">
                <i className="fa-solid fa-search"></i>
              </div>
              <input
                type="search"
                className="form-control form-control-sm"
                placeholder="Search types..."
                value={searchTerm}
                onChange={handleChange}
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
            id=""
          >
            <thead className="ms-2">
              <tr className="justify-content-start"> 
                <th scope="col" className="bg-light">
                  Name
                </th>   
                <th scope="col" className="border-start border-dark bg-light">
                  Address
                </th>
                <th scope="col" className="border-start border-dark bg-light">
                  Email
                </th>
                <th scope="col" className="border-start border-dark bg-light">
                  Contact
                </th>
              </tr>
            </thead>
            <tbody className="ms-2 user-select-none">
              {listAPList
                ? listAPList.map((varlist, index) => (
                    <tr className="mb-2" key={index} 
                    data-bs-toggle="modal"
                    data-bs-target="#ClientInformationModalHearing"
                    onClick={()=>fetchtblUserObj(varlist)}> 
                      <td>
                        {varlist.fName +
                          " " +
                          varlist.mName +
                          " " +
                          varlist.lName}
                      </td> 
                      <td>{varlist.address}</td>
                      <td>{varlist.email}</td>
                      <td>{varlist.contact}</td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */} 
      <div
        className="modal fade"
        id="ClientInformationModalHearing"
        aria-labelledby="AddDocTypelabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
          <ClientInformationModalHearing
          vartblUser={tblUser}
          onSaveComplete={fetchMdlAppointmentsNameHearing} 
          varbtnDelete={btnDelete} 
          varimageSrc = {imageSrc}
          varbtnrow = {btnRow}
          varvarlist={tblAppointmentsList} 
          varbtnFinish={btnFinish}
          varbtnDecline={btnHandleDecline}
          /> 
        </div>
      </div>

      <div
          className="modal fade"
          id="EvidenceModal"
          aria-labelledby="AddDocTypelabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md modal-dialog-centered">
            <EvidenceModal 
          varvarlist={varlist} 
          varType = {"On-Process"}
          onSaveComplete={fetchMdlAppointmentsNameHearing}
          /> 
          </div>
        </div>


{/* MODAL */}
<div
          className="modal fade"
          id="ReplyNewMessageModal"
          aria-labelledby="AddDocTypelabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <ReplyMessageModal
              varparamvarViewMailobjCredential={paramvarViewMailobjCredential}
              varuserSession={userSession} 
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
            message={`You're about to ${selectedbtn==='Approve'?'aprrove':selectedbtn==='Delete'?'delete':selectedbtn==='Finish'?'finish appointment from':'Nothing!'}`}
            onConfirm={handleConfirmRemove}
            onCancel={handleCancelRemove}
            varlistCode={name}
          />
        </div>
      </div>

      <div
        className="modal fade"
        id="UpdateAppointmentActive"
        aria-labelledby="AddDocTypelabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <UpdateAppointmentModal
          varvartblList={vartblList}
          onSaveComplete={fetchMdlAppointmentsNameHearing}
          varbtnDelete={btnDelete}
          varmodalID = {modalID}
          />
          {/* <AddDocTypeModal
            onSaveComplete={fetchMdlProjectListParam}
            varProjCode={paramProjCode}
            varuserSession={userSession}
          /> */}
        </div>
      </div>
    
    </>);
}

export default UpcomingHearings;