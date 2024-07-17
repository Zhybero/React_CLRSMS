

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ExpireComponentToken } from "../FldrSessionsComponents/ExpireComponent";
import PlsConnect from "../FldrFunctions/ClsGetConnection";
import { userSessionCredentials } from "../FldrSessionsComponents/sessionComponent";
function UserLogin(){

  const navigate = useNavigate();
  const [logindata, setlogindata] = useState({
    username: "",
    password: "",
  });

  useEffect(()=>{ 
    const varToken = ExpireComponentToken();
    if (varToken) {
      navigate("/"); //landing
    }
},[navigate]);


  //button
  async function btnLogin(){  
    const response = await fetch(
      `${PlsConnect()}/API/WebAPI/tblUserAll/LoginlUserInfo?Username=${logindata.username}&Password=${logindata.password}`
    );
    if (response.ok) {
      const data = await response.json(); 
      //const varsetData = setData(data);
      //setData(data);
      //window.location.href = '/main';
        userSessionCredentials(data);
      if(data){  
        window.location.href = '/'; //landing
      }
    } else {
      alert("Failed to fetch");
    } 
}


    return(<>
   <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                style={{ color: "'#87CEEB', !important" }}
                id="staticBackdropLabel"
              >
                Log-in to your account
              </h5>
              <button 
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container-fluid text-center">
                <img src="Images/QCA LOGO.png" height="100" alt="" />

                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={logindata.username}
                    onChange={(e)=>setlogindata(logindata=>({...logindata, username: e.target.value}))}
                  />
                  <label htmlFor="floatingInput">Username</label>
                </div>

                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password" 
                    value={logindata.password}
                    onChange={(e)=>setlogindata(logindata=>({...logindata, password: e.target.value}))}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <p className="mt-1">
                  Don't have an account?{" "}
                  <Link
                    to="#"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                    data-bs-dismiss="modal"
                  >
                    Create One
                  </Link>
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-primary"
              onClick={()=>btnLogin()}>
                Log-in
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
         
    </>);
}

export default UserLogin;