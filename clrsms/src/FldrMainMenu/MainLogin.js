


import 'bootstrap/dist/css/bootstrap.css'; 
import { useEffect, useState } from 'react';
import PlsConnect from '../FldrFunctions/ClsGetConnection';
import { useNavigate } from 'react-router-dom';
import { userSessionCredentials } from '../FldrSessionsComponents/sessionComponent';
import { ExpireComponentToken } from '../FldrSessionsComponents/ExpireComponent';
function MainLogin(){
  const navigate = useNavigate();
  const [logindata, setlogindata] = useState({
    username: "",
    password: "",
  });

useEffect(()=>{ 
    const varToken = ExpireComponentToken();
    if (varToken) {
      navigate("/main");
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
          navigate(`/main`);
        }
      } else {
        alert("Failed to fetch");
      } 
  }

    return( 
    <div className="LoginMain d-flex justify-content-center"> 
      <div className='d-flex w-100 justify-content-center align-items-center'>
      <div className="container-fluid h-100 justify-content-center d-flex">
    <img src="/img/bgLogin.png" alt="" className="img-fluid" />
  </div>
      <div className="col-5">
      <div className="col-10 me-5 d-grid shadow rounded border-2 border-primary">
        <div className='p-3'>
        <h3><i className="fa-solid fa-scale-balanced"></i></h3>
        <h5 className="">Welcome</h5> 
        <small>Login to your account</small>
        </div>
        <div className="container p-3">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Username"
              value={logindata.username}
              onChange={(e)=>setlogindata(logindata=>({...logindata, username: e.target.value}))}
            />
            <label htmlFor="username"><i className="fa-solid fa-user"></i>{" "}Username</label>
          </div>
 
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              name="password"
              value={logindata.password}
              onChange={(e)=>setlogindata(logindata=>({...logindata, password: e.target.value}))}
            />
            <label htmlFor="password"><i className="fa-solid fa-key"></i>{" "}Password</label>
          </div>

          <div className="container p-3">
            <button
              className="btn btn-primary btn-sm w-75 p-2 rounded-5 shadow"
              onClick={()=>btnLogin()}
            >
              Log-in
            </button>
          </div>
  
          {/* <div className="container p-3">
            <button
              className="btn btn-primary btn-sm w-100 p-2"
            >
              Logout
            </button>
          </div> */}

          <div
            className="alert alert-danger d-none p-1"
            role="alert"
            id="loginAlertbox"
          ></div>
        </div>
      </div>
      </div>
    </div> 
    </div>  
  );
}

export default MainLogin;