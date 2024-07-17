

function ClientNotificationAPModal(props){


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
                <div className="container d-grid overflow-y-auto border-start">
                   
                          <div className="container p-3 mx-auto rounded text-start bg-white border-3 border-top border-warning">
                            
                            <h5
                              className="mb-4 p-2 d-grid text-center mt-2 rounded"
                              style={{ background: "rgba(181, 57, 79, 0.5)" }}
                            >
                              <b>Date :</b>{" "}
                              {props.varvarObjMdlUserAP.hDate
                                ? new Date(props.varvarObjMdlUserAP.hDate).toDateString()+" "+new Date(props.varvarObjMdlUserAP.hDate).toLocaleTimeString()
                                : ""}
                            </h5>
                            <h5
                              className="mb-4 p-2 d-grid text-center rounded"
                              style={{ background: "rgba(181, 57, 79, 0.4)" }}
                            >
                              <b>Appointment Type :</b> {props.varvarObjMdlUserAP.apmTitle}
                            </h5>
                            <h5
                              className="mb-4 p-2 d-grid text-center rounded"
                              style={{ background: "rgba(181, 57, 79, 0.3)" }}
                            >
                              <b>Description :</b> {props.varvarObjMdlUserAP.apDesc}
                            </h5>
                            <h5
                              className="mb-4 p-2 d-grid text-center rounded"
                              style={{ background: "rgba(181, 57, 79, 0.3)" }}
                            >
                              <b>Status :</b> {props.varvarObjMdlUserAP.decline?"Declined":props.varvarObjMdlUserAP.approve === false &&
                                props.varvarObjMdlUserAP.active === true ?"Pending":props.varvarObjMdlUserAP.approve === true &&
                                props.varvarObjMdlUserAP.active === true &&
                                props.varvarObjMdlUserAP.hDate <= new Date().toISOString() ?"Approved":props.varvarObjMdlUserAP.approve === true &&
                                props.varvarObjMdlUserAP.active === true &&
                                props.varvarObjMdlUserAP.hDate > new Date().toISOString() ?"Re-Scheduled":props.varvarObjMdlUserAP.approve === false &&
                                props.varvarObjMdlUserAP.active === false ?"Verdict/Finish":""}
                            </h5>

                             
                          </div>
 
                        </div> 
                </div>
              </div>
            </div><div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            Ok
          </button>
        </div>
          </div> 
      </>
    );
}

export default ClientNotificationAPModal;