import { useRef } from "react";
function ClientInformationModalFinish(props) {
  const closebtnref = useRef(null);

  return (
    <>
      <div className="modal-content">
        <div className="modal-header">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div
          className="modal-body text-center"
          style={{ background: "#3BAFDA" }}
        >
          <div
            className="container-lg container-md-fluidrounded p-4 shadow mt-2"
            style={{ background: "#3BAFDA" }}
          >
            <div className="row">
              <div className="cotainer-fluid d-lg-flex d-sm-grid gap-4">
                <div className="col-lg-4 col-sm-12">
                  <div className="row">
                    <div className="col-12">
                      <div className="profile-container mx-auto shadow">
                        {props.varimageSrc && (
                          <img
                            className="profile-image text-center"
                            src={props.varimageSrc}
                            alt=""
                          />
                        )}
                      </div>
                      <div className="mx-auto mt-3 d-flex gap-4 align-items-center justify-content-center">
                        <h3 className="fs-2 fw-bold">
                          {props.vartblUser
                            ? `${props.vartblUser.fName} ${props.vartblUser.mName} ${props.vartblUser.lName} ${props.vartblUser.xName}`
                            : ""}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3 bg-white rounded shadow">
                    <hr />
                    <h4 className="fw-bold mb-3 bg-warning">
                      PERSONAL INFORMATION
                    </h4>
                    <div className="container-fluid d-lg-flex d-sm-grid p-2">
                      <div className="col-lg-12 col-sm-12 p-5 mx-auto border-start border-2 border-primary rounded">
                        <div className="col-lg-12 col-sm-12 mb-2 text-start mx-auto">
                          <h4>
                            <label className="fw-bold">Address :</label>{" "}
                            <small>
                              {props.vartblUser ? props.vartblUser.address : ""}
                            </small>
                          </h4>
                        </div>
                        <div className="col-lg-12 col-sm-12 mb-2 text-start mx-auto">
                          <h4>
                            <label className="fw-bold">Email :</label>{" "}
                            <small>
                              {props.vartblUser ? props.vartblUser.email : ""}
                            </small>
                          </h4>
                        </div>
                        <div className="col-lg-12 col-sm-12 mb-2 text-start mx-auto">
                          <h4>
                            <label className="fw-bold">Contact :</label>{" "}
                            <small>
                              {props.vartblUser ? props.vartblUser.contact : ""}
                            </small>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-sm-12">
                  <div className="container d-grid overflow-y-auto border-start">
                    {props.varvarlist
                      ? props.varvarlist.map((varlist, index) => (
                          <div className="col-12 mx-auto mb-3" key={index}>
                            <div className="container p-3 mx-auto rounded text-start bg-white border-3 border-top border-warning">
                              <small>Appointment Progress : </small>
                                
                              <div className="progress">
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{ width: "100%" }}
                                  aria-valuenow="100"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                >
                                  100%
                                </div>
                              </div> 
                               
                              <hr />
                              <h5
                                className="mb-4 p-2 d-grid text-center mt-2 rounded"
                                style={{ background: "rgba(181, 57, 79, 0.5)" }}
                              >
                                <b>Date :</b>{" "}
                                {varlist.hDate
                                  ? varlist.hDate.replace("T", " ")
                                  : ""}
                              </h5>
                              <h5
                                className="mb-4 p-2 d-grid text-center rounded"
                                style={{ background: "rgba(181, 57, 79, 0.4)" }}
                              >
                                <b>Appointment Type :</b> {varlist.apmTitle}
                              </h5>
                              <h5
                                className="mb-4 p-2 d-grid text-center rounded"
                                style={{ background: "rgba(181, 57, 79, 0.3)" }}
                              >
                                <b>Description :</b> {varlist.apDesc}
                              </h5>

                              <div className="container-fluid mt-2 d-flex gap-2">
                                <button
                                  className="btn bg-danger border rounded-3 me-auto"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                  onClick={() => props.varbtnDelete(varlist)}
                                >
                                  <i className="fa-solid fa-trash-can" />{" "}
                                  <b>Delete</b>
                                </button>
 
                                
                                <button
                                  type="button"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                  className="btn text-white" 
                                  style={{ background: "#007EF3" }}  
                                  onClick={()=>props.varbtnArchive(varlist)}
                                >
                                  Archive
                                </button>
                                 
 
                              </div>
                            </div>
                            
                          <hr/>
                          </div>
                        ))
                      : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-danger"
            data-bs-dismiss="modal"
            ref={closebtnref}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default ClientInformationModalFinish;
