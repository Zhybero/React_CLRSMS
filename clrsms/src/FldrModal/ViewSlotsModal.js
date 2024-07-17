


function ViewSlotsModal(props){
 
//Others
const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
    return (
      <>
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="AddAPSchedulelabel">
              Schedule Summary
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="col-lg- mb-4">
              <div className="p-2 shadow rounded border-top border-dark border-2 text-start bg-light">
                <small>
                  <i className="fa-solid fa-calendar-day"></i> Schedule
                </small>

                <div className="p-2">
                  <div className="col-12 text-star">
                    <small>
                      <b>Date: </b>
                      {props.varvarlist.apDate
                        ? new Date(
                            props.varvarlist.apDate.split("T")[0]
                          ).toLocaleDateString("en-US", options)
                        : ""}
                    </small>
                  </div>
                  <div className="col-4 text-start">
                    <small>
                      <b>Available Slots: </b>
                      {props.varvarlist.slots - props.varapCount}
                    </small>
                  </div>
                  <div className="col-12 text-start">
                    <small>
                      <b>Task: </b>
                      {props.varvarlist.description}
                    </small>
                  </div>
                  <div className="col-12 text-start container-fluid">
                    <div className="row gap-2 justify-content-center align-items-center">
                      {props.vartblAPSchedTime
                        ? props.vartblAPSchedTime.map((varlist, index) => (
                            <small
                              key={index}
                              className="col-5 text-center p-2 border"
                            >
                              <b>
                                {new Date(
                                  `2024-02-14T${varlist.tTime}`
                                ).toLocaleTimeString([], {
                                  hour: "numeric",
                                  minute: "2-digit",
                                })}
                              </b>
                              <button
                                className="btn btn-sm ms-5 btn-outline-danger border rounded-3 me-auto"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() =>
                                  props.varbtnDeleteTime(varlist,"TTime")
                                }
                              >
                                <i className="fa-solid fa-trash-can" />
                              </button>
                            </small>
                          ))
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-outline-danger border rounded-3 me-auto"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => props.varbtnDelete(props.varvarlist)}
              >
                <i className="fa-solid fa-trash-can" /> <b>Delete</b>
              </button>
              <button
                type="button"
                className="btn btn-dark"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </>
    );
}
export default ViewSlotsModal;