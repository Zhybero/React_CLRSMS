import { GetModeltblAppointments, GetModeltblUserSpecific, GetModeltblUserCredSpecific, GetImg, GetModelViewAPNamePending} from "../FldrFunctions/ClsGetList";
import { useState, useEffect } from "react";
import MessageModal from "../FldrModal/MessageModal";
import axios from "axios";
import PlsConnect from "../FldrFunctions/ClsGetConnection";
import ClientInformationModal from "../FldrModal/ClientInformationModal";
import DeclineModal from "../FldrModal/DeclineModal";
import ReScheduleModal from "../FldrModal/ReScheduleModal";
import EvidenceModal from "../FldrModal/EvidenceModal";
import ReplyMessageModal from "../FldrModal/ReplyMessageModal";
function ApproveAppointments() {
  const [tblAppointmentsList, settblAppointmentsList] = useState([]);
  const [viewNamePending, setviewNamePending] = useState([]);
  const [paramvarViewMailobjCredential, setparamvarViewMailobjCredential] = useState({}); 

  const [userSession, setuserSession] = useState({});
  useEffect(()=>{ 
  setuserSession(JSON.parse(sessionStorage.getItem("UserSession")))
  },[]);
  
  //Others
  const [MessageConfirm, setMessageConfirm] = useState(false);
  const [name, setname] = useState("");
  const [selectedbtn, setselectedbtn] = useState("");
  const [varlist, setvarlist] = useState({});
  const [tblUser, settblUser] = useState({}); 
  const [imageSrc, setImageSrc] = useState('');

const fetchtblUserObj = async (varlist) => { 
  try {
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

  //fetch
  const fetchMdlAppointments = async (varUserCode) => {
    try {
      settblAppointmentsList(await GetModeltblAppointments(varUserCode)); 
    } catch {
      console.log("Connection error!");
    }
  };
  const fetchMdlAppointmentsNamePending = async () => {
    try {
      setviewNamePending(await GetModelViewAPNamePending()); 
    } catch {
      console.log("Connection error!");
    }
  };

  useEffect(() => {
    //fetchMdlAppointments();
    fetchMdlAppointmentsNamePending();
  }, []);

  //button
  function btnApprove(varlist) {
    setname(varlist.fName + " " + varlist.mName + " " + varlist.lName);
    setMessageConfirm(true);
    setvarlist(varlist);
    setselectedbtn('Approve');
  }
  function btnDelete(varlist) {
    setname(varlist.fName + " " + varlist.mName + " " + varlist.lName);
    setMessageConfirm(true);
    setvarlist(varlist);
    setselectedbtn('Delete');
  }
  function btnHandleDecline(props){
setvarlist(props);
  }

  //Others
  const handleConfirmRemove = async () => {
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
            //fetchMdlAppointments();
    fetchMdlAppointmentsNamePending();
            setMessageConfirm(false);
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
            //fetchMdlAppointments();
    fetchMdlAppointmentsNamePending();
            setMessageConfirm(false);
          } else {
            alert("Error: Something went wrong.");
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
  let listAPList = searchTerm?searchList:viewNamePending;
   
  const handleChange = (event) => {
    fetchMdlAppointmentsNamePending();
    setSearchTerm(event.target.value); 
    const results = viewNamePending.filter(
      (item) =>
        item.fName.toLowerCase().includes(event.target.value.toLowerCase()) ||
        item.mName.toLowerCase().includes(event.target.value.toLowerCase()) ||
        item.lName.toLowerCase().includes(event.target.value.toLowerCase()) ||
        item.apDate.includes(event.target.value)
    );
    setsearchList(results);
    /*fetchMdlAppointments(); 
    setSearchTerm(event.target.value); 
    const results = blAppointmentsList.filter(
      (item) =>
        item.fName.toLowerCase().includes(event.target.value.toLowerCase()) ||
        item.mName.toLowerCase().includes(event.target.value.toLowerCase()) ||
        item.lName.toLowerCase().includes(event.target.value.toLowerCase()) ||
        item.apmTitle.toLowerCase().includes(event.target.value.toLowerCase()) ||
        item.apDate.includes(event.target.value)
    );
    setsearchList(results);*/
  };


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
            <h5>PENDING APPOINTMENTS</h5>
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
                    data-bs-target="#ApproveClient"
                    onClick={()=>fetchtblUserObj(varlist)}>
                      {/* <td className="text-warning text-center" style={{width:"5%"}}>
                        <button className="btn btn-sm bg-danger border rounded-5" 
                          onClick={() => btnDelete(varlist)}>
                          <i className="fa-solid fa-trash-can" /> <b>Delete</b>
                        </button>
                      </td>
                      <td className="text-info text-center border-end border-black" style={{width:"6%"}}>
                        <button
                          className="btn btn-sm bg-primary border rounded-5" 
                          onClick={() => btnApprove(varlist)}
                        >
                          <i className="fa-solid fa-thumbs-up"></i> <b>Approve</b>
                        </button>
                      </td> */}
                      <td>
                        {varlist.fName +
                          " " +
                          varlist.mName +
                          " " +
                          varlist.lName}
                      </td>
                      {/* <td>{varlist.apDate.replace("T", " ")}</td>  */}
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
        id="ApproveClient"
        aria-labelledby="AddDocTypelabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
          <ClientInformationModal
          vartblUser={tblUser}
          onSaveComplete={fetchMdlAppointmentsNamePending} 
          varbtnDelete={btnDelete}
          varbtnApprove={btnApprove}
          varbtnDecline={btnHandleDecline}
          varimageSrc = {imageSrc}
          varvarlist={tblAppointmentsList}
          /> 
        </div>
      </div>

      <div
          className="modal fade"
          id="DeclineModal"
          aria-labelledby="AddDocTypelabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md modal-dialog-centered">
            <DeclineModal 
          varvarlist={varlist}
          onSaveComplete={fetchMdlAppointmentsNamePending}
          /> 
          </div>
        </div>

      <div
          className="modal fade"
          id="ReScheduleModal"
          aria-labelledby="AddDocTypelabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md modal-dialog-centered">
            <ReScheduleModal 
          varvarlist={varlist}
          onSaveComplete={fetchMdlAppointmentsNamePending}
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
          varType = {"Pending"}
          onSaveComplete={fetchMdlAppointmentsNamePending}
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
            message={`You're about to ${selectedbtn==='Approve'?'aprrove':selectedbtn==='Delete'?'delete':'Nothing!'}`}
            onConfirm={handleConfirmRemove}
            onCancel={handleCancelRemove}
            varlistCode={name}
          />
        </div>
      </div>
    </>
  );
}

export default ApproveAppointments;
