import { GetModeltblAPMatter } from "../FldrFunctions/ClsGetList";
import AddAPTypeModal from "../FldrModal/AddAPTypeModal";
import { useState, useEffect } from "react";
function AppointmentType() {
  const [tblAPMatterList, settblAPMatterList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  //Searched
  const [searchList, setsearchList] = useState([]);
 let listAPList = searchTerm?searchList:tblAPMatterList;

  //fetch
  const fetchMdlAPMatter = async () => {
    try {
      settblAPMatterList(await GetModeltblAPMatter());
    } catch {
      console.log("Connection error!");
    }
  };

  useEffect(() => {
    fetchMdlAPMatter();
  }, []);

  const handleChange = (event) => {
    fetchMdlAPMatter(); 
    setSearchTerm(event.target.value); 
    const results = tblAPMatterList.filter(
      (item) =>
        item.apmTitle
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        item.apmDesc.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setsearchList(results);
  };

  return (
    <>
      <div className="d-flex gap-1 align-items-center p-2 shadow">
        <p className="m-1 user-select-none" style={{ fontSize: "12px" }}></p>
      </div>
      {/* Content */}
      <div
        className="container-lg container-md-fluid rounded p-1 shadow mt-2"
        style={{ background: "#3BAFDA" }}
      >
        <div
          className="d-flex align-items-center"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            fontFamily: "Cooper Black",
          }}
        >
          <div className="col-2 text-start">
            <button className="btn btn-lg">
              <i className="fa-solid fa-circle-left"></i>{" "}
            </button>
          </div>
          <div className="col-8 text-center">
            <h5>APPOINTMENT TYPE</h5>
          </div>
        </div>

        <div className="d-flex align-items-center m-2">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#AddAPSchedule"
            className="btn btn-sm text-white"
            style={{ background: "#303030" }}
          >
            <i className="fa-solid fa-note-sticky me-1"></i>Add Appointment
            Type
          </button>
          <div className="col-lg-4 col-sm-12 ms-auto d-flex align-items-center justify-content-end">
            <div className="input-group rounded">
              <div className="input-group-text bg-white">
                <i className="fa-solid fa-search"></i>
              </div>
              <input
                type="search"
                className="form-control form-control-sm"
                placeholder="Search types..."
                value={searchTerm}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div
          className="container overflow-y-auto tbldiv rounded-4"
          style={{ background: "rgba(10, 10, 10, 0.1)" }}
        >
          <div className="d-flex gap-2">
            <div className="container m-0 p-0 mt-3 col-12">
              <div className="row">
                {tblAPMatterList
                  ? listAPList.map((varlist, index) => (
                      <div className="col-lg-4 mb-4" key={index}>
                        <div
                          className="p-2 shadow rounded border-top border-dark border-2 text-start bg-light"
                          style={{ height: "250px", overflowX: "auto" }}
                        >
                          <small>
                            <i className="fa-solid fa-gavel"></i> Legal Matter
                          </small>

                          <div className="p-2">
                            <div className="col-12 text-star">
                              <small>
                                <b>TITLE : {varlist.apmTitle}</b>
                              </small>
                            </div>
                            <div className="col-12 text-start">
                              <small>
                                <b>DESCRIPTION : </b>
                                {varlist.apmDesc}
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="AddAPSchedule"
        aria-labelledby="AddAPSchedulelabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <AddAPTypeModal onSaveComplete={fetchMdlAPMatter} />
        </div>
      </div>
    </>
  );
}

export default AppointmentType;
