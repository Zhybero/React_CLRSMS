
import HeaderProfile from "../FldrMainMenu/HeaderProfile";
import { Link } from "react-router-dom"; 
import { GetModeltblAppointmentsforUser } from "../FldrFunctions/ClsGetList";
import { useState, useEffect } from "react";
function Profile(){

    const [tblAppointmentforuserList, settblAppointmentforuserList] = useState([]);
    //const [userSession, setuserSession] = useState({});
    
//Others
const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const fetchMdlApuserList = async (varuserCode) => {
    try {
        settblAppointmentforuserList(await GetModeltblAppointmentsforUser(varuserCode));
    } catch {
      console.log("Connection error!");
    }
  };
  useEffect(()=>{
    const varUsers = JSON.parse(sessionStorage.getItem("UserSession"));
    //setuserSession(varUsers);
    fetchMdlApuserList(varUsers.userCode) 
  },[]);
    return (
      <>
        <div className="container-fluid HeadContainerLanding">
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <div className="logo-wrap-pro">
                <Link>
              <img src="img/lg01.jpg" alt=""></img>
                </Link>
              </div>
              <HeaderProfile />
            </div>
          </nav>
        </div>
        <div id="landing">
          <div className="container">
            <div className="row h-100 justify-content-end">
              <div className="col-12 my-auto">
                <h1
                  className="text-end display-3"
                  style={{
                    color: "#8BD6FF",
                    fontFamily: "'Times New Roman', cursive",
                    marginTop: "150px",
                  }}
                >
                  Candari Law & Realty Services
                </h1>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 mb-4  mx-auto shadow rounded-4 border-top border-dark border-2 p-3 lbody" style={{background:"#D4D4FF"}}>
            <div className="row user-select-none">  
                  <h4 className="mb-4 text-primary">
                    <i className="fa-solid fa-calendar-day"></i> Schedule For
                    Appointment
                  </h4>
                  {tblAppointmentforuserList?(tblAppointmentforuserList.map((varlist,index)=>(
                    <div className="d-flex align-items-center justify-content-center" key={index}>
                  <div className="col-6 d-flex align-items-center justify-content-start p-2 mb-2">
                    <div className="text-center p-3 shadow rounded-5">
                      <h4 className="fs-4 ps-2 pe-2">
                        <b >{varlist?varlist.approve===true?"Approved!":"Waiting for approval":""}</b>
                      </h4>
                      <h5>Status</h5>
                    </div>  
                  </div>
                  <div className="col-6 d-flex align-items-center justify-content-end p-2">
                    <div className="text-center p-3 shadow rounded-5">
                      <h4 className="fs-4 ps-2 pe-2">
                        <b>{varlist?varlist.hDate?new Date(
                                  varlist.hDate.split("T")[0]
                                ).toLocaleDateString("en-US", options):"":""}</b>
                      </h4>
                      <h5>Date</h5>
                    </div>   
                    </div>   
                </div> ))):""}
              </div> 
          </div>
          <div className="footer-copyright-area divFooter">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="footer-copy-right">
                  <p>Copyright &#169; 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

        
      </>
    );
}

export default Profile;