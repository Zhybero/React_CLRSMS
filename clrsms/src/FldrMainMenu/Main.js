import React, { useState, useEffect } from "react";
import MainSidebar from "./MainSidebar";
import MainHeader from "./MainHeader";
import { useNavigate } from "react-router-dom";
import Projects from "../FldrWebContent/Projects";
import axios from "axios";
import { ExpireComponentToken } from "../FldrSessionsComponents/ExpireComponent";
import SettingsUserGroup from "../FldrWebContent/SettingsUserGroup";
import AppointmentSchedule from "../FldrWebContent/AppointmentSchedule";
import AppointmentType from "../FldrWebContent/AppointmentType";
import ApproveAppointments from "../FldrWebContent/ApproveAppointments";
import AddUser from "../FldrWebContent/AddUser";
import NotAuthorize from "../FldrWebContent/NotAuthorize";
import ViewAppointments from "../FldrWebContent/ViewAppointments";
import Home from "../FldrWebContent/Home";
import CreateTasks from "../FldrWebContent/CreateTasks";
import UpcomingHearings from "../FldrWebContent/UpcomingHearings";
import FinishedCases from "../FldrWebContent/FinishedCases"; 
import Messages from "../FldrWebContent/Messages";
import Profile from "../FldrWebContent/Profile";
import Reports from "../FldrWebContent/Reports";
import ReportsCases from "../FldrWebContent/ReportsCases";
import ProfileManagement from "../FldrWebContent/ProfileManagement";
import ClientCases from "../FldrWebContent/ClientCases";
import ClientHome from "../FldrWebContent/ClientHome";
import ClientSetAppointment from "../FldrWebContent/ClientSetAppointment";
import AppointmentsArchive from "../FldrWebContent/AppointmentsArchive";

function Main() {
  const history = useNavigate();
  useEffect(() => {
    const varToken = ExpireComponentToken();
    if (varToken === null) {
      history("/");
    } else {
      axios.defaults.headers.common["Authorization"] = `Bearer ${varToken}`;
    }
  }, [history]);

  //const [userSession, setuserSession] = useState({});
  useEffect(()=>{
    const varUsers = JSON.parse(sessionStorage.getItem("UserSession"));
    //setuserSession(varUsers);  
    //fetchcountfiles(varUsers.userCode);
    varUsers.groupCode==='04'?setSelectedComponent('HomeClient'):setSelectedComponent('Home');
  },[]);
  const [isActive, setIsActive] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState('');

  const handleSidebarToggle = () => {
    setIsActive(!isActive);
  };

  const handleSidebarItemClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <>
      <div className="d-flex">
        <nav id="sidebar" className={isActive ? "active" : ""}>
          <MainSidebar onSidebarItemClick={handleSidebarItemClick} />
        </nav>
        <div
          className={
            isActive
              ? "content-inner-all-Active"
              : "content-inner-all"
          }
        >
          <div className="container-fluid HeadContainer">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
              <div className="container-fluid">
                <button
                  type="button"
                  onClick={handleSidebarToggle}
                  id="sidebarCollapse"
                  className="btn navbar-btn me-3 text-white"
                  style={{ background: "#2b2a2a" }}
                >
                  <i className="fa fa-bars"></i>
                </button>

                <button
                  type="button"
                  id={isActive ? "btnSidebarActive" : "btnSidebar"}
                  onClick={handleSidebarToggle}
                  className="btn me-3 text-white"
                  style={{ background: "#393939" }}
                >
                  <i className="fa indicator-mn fa-angle-right"></i>
                </button>

                {/* <div className="admin-logo logo-wrap-pro">
                  <Link>
                    <img src="img/logo/log.png" alt="" />
                  </Link>
                </div> */}
                <MainHeader onSidebarItemClick={handleSidebarItemClick}/>
              </div>
            </nav>
          </div>
          {/* <div className="breadcome-area mg-b-30 small-dn">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcome-list map-mg-t-40-gl shadow-reset">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="breadcome-heading">
                          <form role="search" className="">
                            <input
                              type="text"
                              placeholder="Search..."
                              className="form-control"
                              id="search"
                            /> 
                          </form>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <ul className="breadcome-menu">
                          <li>
                            <Link>Home</Link> <span className="bread-slash">/</span>
                          </li>
                          <li>
                            <span className="bread-blod">Accordion</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>  */}
          {/* Content */}

          <div className="Container mt-4">
            {selectedComponent === "HomeClient" && <ClientHome />}
          </div>

          <div className="Container mt-4">
            {selectedComponent === "Home" && <Home />}
          </div>

          <div className="Container mt-4">
            {selectedComponent === "Projects" && <Projects />}
          </div>

          <div className="Container mt-4">
            {selectedComponent === "Appointment Schedule" && <AppointmentSchedule />}
          </div>

          <div className="Container mt-4">
            {selectedComponent === "UserGroup" && <SettingsUserGroup />}
          </div>

          <div className="Container mt-4">
            {selectedComponent === "AppointmentType" && <AppointmentType />}
          </div>

          <div className="Container mt-4">
            {selectedComponent === "Create Task" && <CreateTasks />}
          </div>

          <div className="Container mt-4">
            {selectedComponent === "Pending Appointments" && <ApproveAppointments />}
          </div>

          <div className="Container mt-4">
            {selectedComponent === "Approved Appointments" && <ViewAppointments />}
          </div>

          <div className="Container mt-4">
            {selectedComponent === "Upcoming Hearings" && <UpcomingHearings />}
          </div>

          <div className="Container mt-4">
            {selectedComponent === "Finished Cases" && <FinishedCases />}
          </div>

          <div className="Container mt-4">
            {selectedComponent === "AddUser" && <AddUser />}
          </div>

          <div className="Container mt-4">
            {selectedComponent === "Messages" && <Messages />}
          </div>

          <div className="Container mt-4">
            {selectedComponent === "Profile" && <Profile />}
          </div>

          <div className="Container mt-4">
            {selectedComponent === "Archiving Reports" && <Reports />}
          </div>

          <div className="Container mt-4">
            {selectedComponent === "Case Reports" && <ReportsCases />}
          </div>

          <div className="Container mt-4">
            {selectedComponent === "Profile Management" && <ProfileManagement />}
          </div>
          
          <div className="Container mt-4">
            {selectedComponent === "ClientCases" && <ClientCases />}
          </div>
          
          <div className="Container mt-4">
            {selectedComponent === "ClientSetAppointments" && <ClientSetAppointment />}
          </div>
          
          <div className="Container mt-4">
            {selectedComponent === "Appointments Archive" && <AppointmentsArchive />}
          </div>
 
          <div className="Container mt-4">
            {selectedComponent === "NotAuthorized" && <NotAuthorize />}
          </div>

          {/* <div className="footer-copyright-area divFooter">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="footer-copy-right">
                    <p>
                      Copyright &#169; 2023
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
export default Main;
