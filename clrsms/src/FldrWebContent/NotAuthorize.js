



function NotAuthorize(){


    return(<>
    <div className="d-flex gap-1 align-items-center p-2 shadow">
        <p className="m-1 user-select-none" style={{ fontSize: "12px" }}></p>
      </div>
      {/* Content */}
      <div
        className="container-lg container-md-fluid rounded p-1 shadow mt-2"
        style={{ background: "#3BAFDA",
        fontFamily: "Cooper Black", }}
      >  

        <div
          className="container text-center overflow-y-auto tbldiv rounded-4"
          style={{ background: "rgba(10, 10, 10, 0.1)" }}
        >
           <h1>You are not authorize!</h1>
            <small>Contact admin for authorization</small>
        </div>
      </div>
    
    </>);
}

export default NotAuthorize;