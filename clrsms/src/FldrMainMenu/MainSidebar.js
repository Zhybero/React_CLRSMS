

import { useCallback } from "react";
import { Link } from "react-router-dom"; 
import { useState, useEffect } from "react";
import { GetModeltblPermission, GetModeltblUserCredSpecific, GetImg, GetModeltblUserSpecific } from "../FldrFunctions/ClsGetList";
const MainSidebar=({onSidebarItemClick})=>{
  const btnNavClick = (component) => {
    onSidebarItemClick(component);
  };
 
  const [imageSrc, setImageSrc] = useState('');
  const [userSession, setuserSession] = useState({});
  const [tblUser, settblUser] = useState({});
  const [tblPermissionList, settblPermissionList] = useState([]);


  const fetchtblUserCredObj = useCallback(async (varUserCode) => { 
    try {
        const varUserCred = await GetModeltblUserCredSpecific(varUserCode); 
        const varUserObj = await GetModeltblUserSpecific(varUserCode); 
        settblUser(varUserObj);
        fetchuserIMG(varUserCred.fileNameGUID);
    } catch {
      console.log("Connection error!");
    }
  },[]);
  
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
  const fetchMdlPermissionList = async (varGroupCode) => {
    try {
      settblPermissionList(await GetModeltblPermission(varGroupCode));
    } catch {
      console.log("Connection error!");
    }
  };
  useEffect(()=>{
    const varUsers = JSON.parse(sessionStorage.getItem("UserSession"));
    setuserSession(varUsers);
    fetchMdlPermissionList(varUsers.groupCode)
    fetchtblUserCredObj(varUsers.userCode); 
  },[fetchtblUserCredObj]);
 
    return ( 
      <>
        <div className="sidebar-header"> 
          <div className="profile-container mx-auto shadow" onClick={() => btnNavClick('Profile Management')}>
                {imageSrc && (
                  <img
                    className="profile-image"
                    src={imageSrc}
                    alt="Uploaded"
                  />
                )}
              </div> 
          <h3>{tblUser.fName}{" "}{tblUser.LName}</h3>
          <p>{tblUser.userName}</p>
          <strong>{tblUser.userName}</strong>
        </div>
        <div className="left-custom-menu-adp-wrap">
          <ul className="nav navbar-nav left-sidebar-menu-pro">
            {userSession? userSession.groupCode==="04"?(<li className="nav-item dropend" onClick={() => btnNavClick('HomeClient')}>
              <Link
                role="button" 
                className="nav-link"  
              >
                <i className="fa big-icon fa-home"></i>{" "}
                <span className="mini-dn">Home</span>{" "} 
              </Link> 
            </li>):(
            <li className="nav-item dropend" onClick={() => btnNavClick('Home')}>
              <Link
                role="button" 
                className="nav-link" 
              >
                <i className="fa big-icon fa-home"></i>{" "}
                <span className="mini-dn">Home</span>{" "} 
              </Link> 
            </li>):(<li className="nav-item dropend" onClick={() => btnNavClick('Home')}>
              <Link
                role="button" 
                className="nav-link" 
              >
                <i className="fa big-icon fa-home"></i>{" "}
                <span className="mini-dn">Home</span>{" "} 
              </Link> 
            </li>)}
            <li className="nav-item dropend">
              <Link
                role="button"
                aria-expanded="false"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown" 
              >
                <i className="fa big-icon fa-envelope"></i>{" "}
                <span className="mini-dn">Mailbox</span>{" "}
                <span className="indicator-right-menu mini-dn">
                  <i className="fa indicator-mn fa-angle-right"></i>
                </span>  
              </Link>
              <div
                role="menu"
                className="dropdown-menu"
              >
              <Link className="dropdown-item" onClick={()=>btnNavClick('Messages')}>Messages</Link>  
              </div>
            </li>
            {tblPermissionList?(tblPermissionList.some(item=>item.objectName==='Entry')?(
            <li className="nav-item dropend">
              <Link
                role="button"
                aria-expanded="false"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown" 
              >
                <i className="fa-solid fa-square-plus"></i>{" "}
                <span className="mini-dn">Entry</span>{" "}
                <span className="indicator-right-menu mini-dn">
                  <i className="fa indicator-mn fa-angle-right"></i>
                </span>
              </Link>
              <div
                role="menu"
                className="dropdown-menu"
              >
              {tblPermissionList?(tblPermissionList.some(item=>item.objectName==='Appointment Type')?(
                <Link className="dropdown-item" onClick={()=>btnNavClick('AppointmentType')}>Appointment Type</Link> 
                ):(<Link className="dropdown-item" onClick={() => btnNavClick('NotAuthorized')}>Appointment Type</Link>)):""}
              {tblPermissionList?(tblPermissionList.some(item=>item.objectName==='Create Task')?(
                <Link className="dropdown-item" onClick={()=>btnNavClick('Create Task')}>Create Task</Link> 
                ):(<Link className="dropdown-item" onClick={() => btnNavClick('NotAuthorized')}>Create Task</Link>)):""}
                {tblPermissionList?(tblPermissionList.some(item=>item.objectName==='Appointment Schedule')?(
                <Link className="dropdown-item" onClick={() => btnNavClick('Appointment Schedule')}>Schedule</Link>  
                ):(<Link className="dropdown-item" onClick={() => btnNavClick('NotAuthorized')}>Schedule</Link>)):""}
              </div>
            </li>
            ):""):""}
            {tblPermissionList?(tblPermissionList.some(item=>item.objectName==='Appointments')?(
            <li className="nav-item dropend">
              <Link
                role="button" 
                aria-expanded="false"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"  
              >
                <i className="fa-solid fa-calendar-check"></i>{" "}
                <span className="mini-dn">Appointments</span>{" "} 
                <span className="indicator-right-menu mini-dn">
                  <i className="fa indicator-mn fa-angle-right"></i>
                </span>
              </Link>
              <div
                role="menu"
                className="dropdown-menu"
              >
              {tblPermissionList?(tblPermissionList.some(item=>item.objectName==='Pending Appointments')?(
              <Link className="dropdown-item" onClick={() => btnNavClick('Pending Appointments')}>Pending Appointments</Link>   
              ):(<Link className="dropdown-item" onClick={() => btnNavClick('NotAuthorized')}>Pending Appointments</Link>)):""}
              {tblPermissionList?(tblPermissionList.some(item=>item.objectName==='Approved Appointments')?(
              <Link className="dropdown-item" onClick={() => btnNavClick('Approved Appointments')}>Approved Appointments</Link>   
              ):(<Link className="dropdown-item" onClick={() => btnNavClick('NotAuthorized')}>Approved Appointments</Link>)):""} 
              </div> 
            </li>  
            ):""):""}

            {tblPermissionList?(tblPermissionList.some(item=>item.objectName==='Active Cases')?(
          <li className="nav-item dropend" onClick={() => btnNavClick('Upcoming Hearings')}>
              <Link role="button" className="nav-link">
              <i className="fa-solid fa-file-arrow-up"></i>{" "}
                <span className="mini-dn">In-Process</span>{" "} 
              </Link> 
            </li>
              ):""):""}

            {tblPermissionList?(tblPermissionList.some(item=>item.objectName==='Finished Cases')?(
          <li className="nav-item dropend" onClick={() => btnNavClick('Finished Cases')}>
              <Link role="button" className="nav-link">
              <i className="fa-solid fa-clipboard-check"></i>{" "}
                <span className="mini-dn">Finished Cases</span>{" "} 
              </Link> 
            </li>
              ):""):""}
            

            {tblPermissionList?(tblPermissionList.some(item=>item.objectName==='Archives')?(
            <li className="nav-item dropend">
              <Link
                role="button" 
                aria-expanded="false"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"  
              >
                <i className="fa-solid fa-box-archive"></i>{" "}
                <span className="mini-dn">Archives</span>{" "} 
                <span className="indicator-right-menu mini-dn">
                  <i className="fa indicator-mn fa-angle-right"></i>
                </span>
              </Link>
              <div
                role="menu"
                className="dropdown-menu"
              >
              {tblPermissionList?(tblPermissionList.some(item=>item.objectName==='Documents Archive')?(
              <Link className="dropdown-item" onClick={() => btnNavClick('Projects')}>Documents Archive</Link>  
              ):(<Link className="dropdown-item" onClick={() => btnNavClick('NotAuthorized')}>Documents Archive</Link>)):""}
              {tblPermissionList?(tblPermissionList.some(item=>item.objectName==='Appointments Archive')?(
              <Link className="dropdown-item" onClick={() => btnNavClick('Appointments Archive')}>Appointments Archive</Link>  
              ):(<Link className="dropdown-item" onClick={() => btnNavClick('NotAuthorized')}>Appointments Archive</Link>)):""}
              </div> 
            </li> 
            ):""):""}
            
            {tblPermissionList?(tblPermissionList.some(item=>item.objectName==='Reports')?(
            <li className="nav-item dropend">
              <Link
                role="button" 
                aria-expanded="false"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"  
              >
                <i className="fa-solid fa-clipboard"></i>{" "}
                <span className="mini-dn">Reports</span>{" "} 
                <span className="indicator-right-menu mini-dn">
                  <i className="fa indicator-mn fa-angle-right"></i>
                </span>
              </Link>
              <div
                role="menu"
                className="dropdown-menu"
              >
              {tblPermissionList?(tblPermissionList.some(item=>item.objectName==='Archiving Reports')?(
              <Link className="dropdown-item" onClick={() => btnNavClick('Archiving Reports')}>Archiving Reports</Link>  
              ):(<Link className="dropdown-item" onClick={() => btnNavClick('NotAuthorized')}>Archiving Reports</Link>)):""}
              {tblPermissionList?(tblPermissionList.some(item=>item.objectName==='Case Reports')?(
              <Link className="dropdown-item" onClick={() => btnNavClick('Case Reports')}>Case Reports</Link>  
              ):(<Link className="dropdown-item" onClick={() => btnNavClick('NotAuthorized')}>Case Reports</Link>)):""}
              </div> 
            </li> 
            ):""):""}
            
            {tblPermissionList?(tblPermissionList.some(item=>item.objectName==='Settings')?(
            <li className="nav-item dropend">
              <Link
                role="button"
                aria-expanded="false"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown" 
              >
                <i className="fa-solid fa-gears"></i>{" "}
                <span className="mini-dn">Settings</span>{" "}
                <span className="indicator-right-menu mini-dn">
                  <i className="fa indicator-mn fa-angle-right"></i>
                </span>
              </Link>
              <div
                role="menu"
                className="dropdown-menu"
              >
              {tblPermissionList?(tblPermissionList.some(item=>item.objectName==='User Group')?(
              <Link className="dropdown-item" onClick={() => btnNavClick('UserGroup')}>User Group</Link>  
              ):(<Link className="dropdown-item" onClick={() => btnNavClick('NotAuthorized')}>User Group</Link>)):""}
              {tblPermissionList?(tblPermissionList.some(item=>item.objectName==='Add User')?(
              <Link className="dropdown-item" onClick={() => btnNavClick('AddUser')}>Add User</Link>  
              ):(<Link className="dropdown-item" onClick={() => btnNavClick('NotAuthorized')}>Add User</Link>)):""}
              </div>
            </li> 
            ):""):""}

            {userSession?userSession.groupCode==='04'?( <>
            
              <li className="nav-item dropend" onClick={() => btnNavClick('ClientSetAppointments')}>
            <Link
              role="button" 
              className="nav-link" 
            >
            <i className="fa-regular fa-calendar-plus"></i>{" "}
              <span className="mini-dn">Set Appointments</span>{" "}
            </Link> 
          </li> 
          
            <li className="nav-item dropend" onClick={() => btnNavClick('ClientCases')}>
            <Link
              role="button" 
              className="nav-link" 
            >
            <i className="fa-solid fa-calendar-check"></i>{" "}
              <span className="mini-dn">My Appointments</span>{" "}
            </Link> 
          </li> 
          </>):"":""}

            <li className="nav-item dropend" onClick={() => btnNavClick('Profile Management')}>
              <Link
                role="button" 
                className="nav-link" 
              >
                <i className="fa-solid fa-user"></i>{" "}
                <span className="mini-dn">Manage Profile</span>{" "} 
              </Link> 
            </li> 
          </ul>
        </div>
      </>
    );
}

export default MainSidebar;