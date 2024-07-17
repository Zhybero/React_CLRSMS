import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState, useEffect } from "react";
import AddAPScheduleModal from "../FldrModal/AddAPScheduleModal";
import { GetModeltblAPSchedule } from "../FldrFunctions/ClsGetList";
import ViewSlotsModal from "../FldrModal/ViewSlotsModal";
import {
  GetCountAppointment,
  GetModeltblAPScheduleTasks,
  GetModeltblAPSchedTime,
} from "../FldrFunctions/ClsGetList";
import AddAPSchedTimeModal from "../FldrModal/AddAPSchedTimeModal";
import MessageModal from "../FldrModal/MessageModal";
import axios from "axios";
import PlsConnect from "../FldrFunctions/ClsGetConnection";
function AppointmentSchedule() {
  //delete
  const [varlist, setvarlist] = useState({});
  const [MessageConfirm, setMessageConfirm] = useState(false);
  const [name, setname] = useState("");
  const [varParam, setvarParam] = useState("");
  //
  const [txtFilterDate, settxtFilterDate] = useState("");
  const [tblAPScheduleList, settblAPScheduleList] = useState([]);
  const [tblAPScheduleListTasks, settblAPScheduleListTasks] = useState([]);
  const [tblAPSchedTime, settblAPSchedTime] = useState([]);
  const [Mdlvarlist, setMdlvarlist] = useState({});
  const [apCount, setapCount] = useState(0);

  const [APSchedlist, setAPSchedlist] = useState({});

  const [userSession, setuserSession] = useState({});
  useEffect(() => {
    const varUsers = JSON.parse(sessionStorage.getItem("UserSession"));
    setuserSession(varUsers);
  }, []);

  //Others
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const strDateToday = new Date().toISOString().split("T")[0];
  useEffect(() => {
    settxtFilterDate(strDateToday);
    fetchMdlProjectList(strDateToday);
  }, [strDateToday]);

  const OCfilterDate = (varDateToday) => {
    fetchMdlProjectList(varDateToday);
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

  // Function to render specific styling for the highlighted dates
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

  //Fetch
  const fetchMdlProjectList = async (varFilterDate) => {
    try {
      settblAPScheduleList(await GetModeltblAPSchedule(varFilterDate));
      settblAPScheduleListTasks(
        await GetModeltblAPScheduleTasks(varFilterDate)
      );
    } catch {
      console.log("Connection error!");
    }
  };
  const fetchMdlAPTimeList = async (varCode) => {
    try {
      settblAPSchedTime(await GetModeltblAPSchedTime(varCode));
    } catch {
      console.log("Connection error!");
    }
  };
  const fetchMdlCountAP = async (props) => {
    try {
      setapCount(await GetCountAppointment(props.code));
    } catch {
      console.log("Connection error!");
    }
  };
  //button
  function clickCountAp(item) {
    fetchMdlCountAP(item);
    setMdlvarlist(item);
  }
  function btnAPItemList(item) {
    setAPSchedlist(item);
  }

  function btnDelete(varList) {
    setname("Schedule Date: " + new Date(varList.apDate).toLocaleDateString());
    setMessageConfirm(true);
    setvarlist(varList);
    setvarParam("Schedule");
  }

  function btnDeleteTime(varList, varParam) {
    setname("Schedule Time: " + new Date(`2024-02-14T${varList.tTime}`).toLocaleTimeString());
    setMessageConfirm(true);
    setvarlist(varList);
    setvarParam(varParam);
  }
  const handleConfirmRemove = async () => {
    if (varParam === "Schedule") {
      if (apCount > 0) {
        alert("Sorry, Schedule has been used!");
      } else {
        const Mdl1 = {
          Code: varlist.code,
        };
        const response = await axios.post(
          `${PlsConnect()}/API/WEBAPI/WEBAPIDelete/DeleteClsDeleteModeltblAPSchedule`,
          Mdl1,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          console.log("Success: Data deleted successfully!");
          fetchMdlProjectList(txtFilterDate);
          //tileContent();
          setMessageConfirm(false);
        } else {
          alert("Error: Something went wrong.");
        }
      }
    } else if (varParam === "TTime") {
      const Mdl1 = {
        TCode: varlist.tCode,
      };
      const response = await axios.post(
        `${PlsConnect()}/API/WEBAPI/WEBAPIDelete/DeleteClsDeleteModeltblAPSchedTime`,
        Mdl1,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Success: Data deleted successfully!");
        fetchMdlProjectList(txtFilterDate);
        //tileContent();
        setMessageConfirm(false);
      } else {
        alert("Error: Something went wrong.");
      }
    } else {
      console.log("Nothing to Delete!");
    }
  };

  const handleCancelRemove = () => {
    setMessageConfirm(false);
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
            <h5>APPOINTMENT SCHEDULE</h5>
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
            <i className="fa-solid fa-calendar-plus me-1"></i>Add Schedule
          </button>
        </div>

        <div
          className="container overflow-y-auto tbldiv"
          style={{ background: "#3BAFDA" }}
        >
          <div className="col-12 d-flex">
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

            <div className="col-4">
              <div className="d-flex gap-3 align-items-center justify-content-center bg-light col-10 ms-auto">
                <div>
                  <button
                    className="btn"
                    style={{ background: "#3BAFDA" }}
                  ></button>{" "}
                  <small>
                    <b>Schedule</b>
                  </small>
                </div>
                <div>
                  <button
                    className="btn"
                    style={{ background: "#9CC837" }}
                  ></button>{" "}
                  <small>
                    <b>Tasks</b>
                  </small>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex">
            <div className="container m-0 p-0 mt-3 col-8">
              <div className="row user-select-none ">
                {tblAPScheduleList
                  ? tblAPScheduleList.map((item, index) => (
                      <div className="col-lg-4 mb-4" key={index}>
                        <div
                          className="p-2 shadow rounded border-top border-dark border-2 text-start bg-light"
                          style={{ height: "170px", overflowX: "auto" }}
                          onClick={() => clickCountAp(item)}
                        >
                          <small>
                            <i className="fa-solid fa-calendar-day"></i>{" "}
                            Schedule
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
                                {item.slots}
                              </small>
                            </div>
                            <div className="col-12 text-start">
                              <small>
                                <b>Task: </b>
                                {item.description}
                              </small>
                            </div>
                            <div className="col-12 d-flex mt-2">
                              <button
                                className="btn btn-sm btn-outline-success"
                                data-bs-toggle="modal"
                                data-bs-target="#ViewSlots"
                                onClick={() => fetchMdlAPTimeList(item.code)}
                              >
                                <i className="fa-solid fa-eye"></i> Time
                              </button>
                              <button
                                className="btn btn-sm btn-outline-primary ms-auto"
                                data-bs-toggle="modal"
                                data-bs-target="#AddAPScheduleTime"
                                onClick={() => btnAPItemList(item)}
                              >
                                Add Time
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : ""}
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
          <AddAPScheduleModal
            onSaveComplete={fetchMdlProjectList}
            vartileContent={tileContent}
            vartxtFilterDate={txtFilterDate}
            varuserSession={userSession}
          />
        </div>
      </div>

      <div
        className="modal fade"
        id="AddAPScheduleTime"
        aria-labelledby="AddAPSchedulelabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <AddAPSchedTimeModal varAPSchedlist={APSchedlist} />
        </div>
      </div>

      <div
        className="modal fade"
        id="ViewSlots"
        aria-labelledby="AddAPSchedulelabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <ViewSlotsModal
            varvarlist={Mdlvarlist}
            varapCount={apCount}
            vartblAPSchedTime={tblAPSchedTime}
            varbtnDelete={btnDelete}
            varbtnDeleteTime={btnDeleteTime}
          />
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
            message={`You're about to delete `}
            onConfirm={handleConfirmRemove}
            onCancel={handleCancelRemove}
            varlistCode={name}
          />
        </div>
      </div>
    </>
  );
}

export default AppointmentSchedule;
