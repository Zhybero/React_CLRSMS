
 
import { Link } from "react-router-dom";
import { ExpireComponentToken } from "../FldrSessionsComponents/ExpireComponent";
import { userSessionCredentials } from "../FldrSessionsComponents/sessionComponent";
import { useState, useEffect } from "react";
function HeaderProfile(){
 const [token, settoken]= useState('');
 const [userSession, setuserSession] = useState({});
  
 async function btnLogout(){
  userSessionCredentials(null);
  if ((await ExpireComponentToken()) === null) {
    window.location.href="/";//landing
  }
}


 useEffect(()=>{ 
    settoken(ExpireComponentToken()); 
    setuserSession(JSON.parse(sessionStorage.getItem("UserSession"))) 
 },[]);

    return (
      <>
        {/* <Link className="navbar-brand fs-4" style={{ 
                  fontFamily: "'Times New Roman'",
                }}>Candari Law & Realty Services</Link> */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
          data-bs-auto-close="true"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-lg-0 gap-lg-2">
          <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={'/Aboutus'} className="nav-link">About</Link>
            </li>
            <li className="nav-item">
              <Link to={'/Services'} className="nav-link">Services</Link>
            </li>
          </ul>
          {token ? (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to={'/Profile'} className="me-1 nav-link border-0">
                <i className="fa-solid fa-user"></i>{" "}
                   <b>{userSession.lName}</b>
                  </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="me-1 nav-link border-0" onClick={()=>btnLogout()}
                >
                  <i className="fa-solid fa-arrow-right-to-bracket"></i>{' '} Log-out
                </Link>
              </li>
            </ul>
            
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="me-1 nav-link border-0"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  <i className="fa-solid fa-arrow-right-to-bracket"></i> Log-in
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link border-0"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                >
                  <i className="fa fa-globe" aria-hidden="true"></i> Sign-up
                </Link>
              </li>
            </ul>
          )}
        </div>
      </>
    );
}

export default HeaderProfile;