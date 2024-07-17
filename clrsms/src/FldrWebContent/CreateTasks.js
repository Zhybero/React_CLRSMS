


import CreateTasksModal from "../FldrModal/CreateTasksModal";
import { GetModeltblAPScheduleTasks } from "../FldrFunctions/ClsGetList";
import { useState,useEffect } from "react";
import Calendar from "react-calendar";
function CreateTasks(){

    const [txtFilterDate, settxtFilterDate] = useState('');
    const [tblAPScheduleList, settblAPScheduleList] = useState([]);
    
  const [userSession, setuserSession] = useState({});
  useEffect(()=>{
    const varUsers = JSON.parse(sessionStorage.getItem("UserSession"));
    setuserSession(varUsers); 
    
  },[]);

  //Fetch
  const fetchMdlProjectList = async (varFilterDate) => {
    try {
      settblAPScheduleList(await GetModeltblAPScheduleTasks(varFilterDate));
    } catch {
      console.log("Connection error!");
    }
  };


//Others
const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
   
  const strDateToday = new Date().toISOString().split('T')[0]; 
  useEffect(() => {
    settxtFilterDate(strDateToday);
    fetchMdlProjectList(strDateToday);  
  }, [strDateToday]);
  
  const OCfilterDate = (varDateToday) =>{
    fetchMdlProjectList(varDateToday);
  } 
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

  // Function to render specific styling for the highlighted dates
  const tileContent = ({ date: dateToCheck, view }) => {
    if (view === "month" && isHighlightedDate(dateToCheck)) {
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
            <h5>CREATE TASKS</h5>
          </div>
        </div>

        <div className="d-flex align-items-center m-2">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#AddAPSchedule"
            className="btn btn-sm text-white"
            style={{ background: "#303030" }}
          >
            <i className="fa-solid fa-calendar-plus me-1"></i>Add Tasks
          </button>
        </div>

        <div
          className="container overflow-y-auto tbldiv"
          style={{ background: "#3BAFDA" }}
        >
          <div className="col-8">
            <div className="col-lg-4 col-sm-12 ms-auto d-flex align-items-center justify-content-end">
              <label className="">
                <b>Filter Date :</b>
              </label>
              <div className="form-floating ms-2">
                <input
                  type="date"
                  className="rounded border-0 shadow p-1"
                  placeholder="Apointment Date" 
                  value={txtFilterDate}
                  onChange={(e) => {
                    settxtFilterDate(e.target.value);
                    OCfilterDate(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div className="container m-0 p-0 mt-3 col-8">
              <div className="row user-select-none "> 
              
              {tblAPScheduleList?(tblAPScheduleList.map((item, index) => (
                  <div className="col-lg-4 mb-4" key={index}>
                    <div
                      className="p-2 shadow rounded border-top border-dark border-2 text-start bg-light"
                      style={{ height: "130px", overflowX: "auto" }} 
                    >
                      <small>
                        <i className="fa-solid fa-calendar-day"></i> Task
                      </small>

                      <div className="p-2">
                        <div className="col-12 text-star">
                          <small>
                            <b>Date: </b>
                            {new Date(
                              item.apDate.split("T")[0]
                            ).toLocaleDateString("en-US", options)}
                          </small>
                        </div>
                        <div className="col-4 text-start">
                          <small>
                            <b>Slots: </b> 
                          </small>
                        </div>
                        <div className="col-12 text-start">
                          <small>  
                          {item.description}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>  
                ))):''}
              </div>
            </div>
            <div
              className="border-start col-1 m-5"
              style={{ width: "2px", height: "auto", background: "black" }}
            ></div>

            <div className="calendar-container justify-content-center col-3 pb-5">
              <Calendar
                className={"shadow rounded-4"}
                tileContent={tileContent}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="AddAPSchedule"
        aria-labelledby="AddAPSchedulelabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <CreateTasksModal 
            varuserSession={userSession}
            onSaveComplete={fetchMdlProjectList}
            vartileContent={tileContent}
            vartxtFilterDate={txtFilterDate} 
          />
          {/* <AddAPScheduleModal
            onSaveComplete={fetchMdlProjectList}
            vartileContent={tileContent}
            vartxtFilterDate={txtFilterDate} 
            varuserSession={userSession}
          /> */}
        </div>
      </div>
    </>);
}
export default CreateTasks;