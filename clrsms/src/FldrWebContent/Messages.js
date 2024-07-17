


import { useState, useEffect } from "react";
import NewMessageModal from "../FldrModal/NewMessageModal"; 
import ReplyMessageModal from "../FldrModal/ReplyMessageModal";
import ViewMailModal from "../FldrModal/ViewMailModal";
import ArchiveModal from "../FldrModal/ArchiveModal";
import ViewMailModalReadOnly from "../FldrModal/ViewMailModalReadOnly";
import { GetModeltblUserForMessage, GetModelViewInboxName, GetModelViewInbox, GetModeltblMessage1List1, GetModelViewSentboxName } from "../FldrFunctions/ClsGetList";
function Messages(){
  
  const [tblUserList, settblUserList] = useState([]);
  const [viewInboxNameList, setviewInboxNameList] = useState([]); 
  const [viewSentboxNameList, setviewSentboxNameList] = useState([]); 
  const [viewInboxList, setviewInboxList] = useState([]); 
  const [viewSentboxList, setviewSentboxList] = useState([]); 
  const [tblMessageList1, settblMessageList1] = useState([]); 
  const [paramVaremail, setparamVaremail] = useState(""); 
  const [paramvarViewMailobj, setparamvarViewMailobj] = useState(""); 
  const [paramvarViewMailobjCredential, setparamvarViewMailobjCredential] = useState({}); 
  const [btnboxClick, setbtnboxClick] = useState("boxIn"); 

    const [userSession, setuserSession] = useState({});
    useEffect(()=>{
      const varUsers = JSON.parse(sessionStorage.getItem("UserSession"));
      setuserSession(varUsers); 
      fetchMdltblUserList(varUsers.groupCode); 
    const interval = setInterval(()=>{
      fetchMdlViewSentboxNameList(varUsers.userCode);   
        fetchMdlVieIBNameList(varUsers.userCode)}, 500); 
    return () => clearInterval(interval); 
    },[]);

  //fetch 
  const fetchMdltblUserList = async (varGroupCode) => {
    try {
        settblUserList(await GetModeltblUserForMessage(varGroupCode)); 
    } catch {
      console.log("Connection error!");
    }
  }; 
  const fetchMdlVieIBNameList = async (varUserCode) => {
    try {
      setviewInboxNameList(await GetModelViewInboxName(varUserCode)); 
    } catch {
      console.log("Connection error!");
    }
  }; 
  const fetchMdlViewSentboxNameList = async (varUserCode) => {
    try {
      setviewSentboxNameList(await GetModelViewSentboxName(varUserCode)); 
    } catch {
      console.log("Connection error!");
    }
  }; 
  const fetchMdlviewInboxList = async (varlist) => { 
    try {
      setviewInboxList(await GetModelViewInbox(userSession.userCode, varlist.userCode));   
      setparamVaremail(varlist.email);
    } catch {
      console.log("Connection error!");
    }
  }; 
  const fetchMdlviewSentboxList = async (varlist) => { 
    try {
      setviewSentboxList(await GetModelViewInbox(varlist.toUserCode, userSession.userCode));   
      setparamVaremail(varlist.email); 
    } catch {
      console.log("Connection error!");
    }
  }; 
  const fetchMdltblMessage1List = async (varfileIC) => { 
    try {
      settblMessageList1(await GetModeltblMessage1List1(varfileIC));  
    } catch {
      console.log("Connection error!");
    }
  }; 

  //button
  function btnViewMail(varlistmsg, varlist){
    setparamvarViewMailobj(varlistmsg);
    fetchMdltblMessage1List(varlistmsg.fileIC);
    setparamvarViewMailobjCredential(varlist); 
  }
  function btnbox(varbox){
    setbtnboxClick(varbox); 
    fetchMdltblUserList(userSession.groupCode);
    fetchMdlVieIBNameList(userSession.userCode);
    fetchMdlViewSentboxNameList(userSession.userCode);
  }


    return (
      <>
        <div className="d-flex gap-1 align-items-center p-2 shadow">
          <p className="m-1 user-select-none" style={{ fontSize: "12px" }}></p>
        </div>
        {/* Content */}
        <div
          className="container-lg container-md-fluid col-lg-6 col-md-9 col-sm-12 rounded p-1 shadow mt-2"
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
              {/* <button className="btn btn-lg">
              <i className="fa-solid fa-circle-left"></i>{" "}
            </button> */}
            </div>
            <div className="col-8 text-center">
              <h5>MAIL</h5>
            </div>
          </div>

          <div className="d-flex align-items-center m-2 gap-3">
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#NewMessageModal"
              className="btn btn-sm text-white"
              style={{ background: "#303030" }}
            >
              <i className="fa-solid fa-square-plus me-1"></i>New Message
            </button>
            <button
              className="btn btn-sm text-white"
              style={{ background: "#303030" }}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#msgcollapse"
              aria-expanded="false"
              aria-controls="msgcollapse"
              onClick={() => btnbox("boxIn")}
            >
              <i className="fa-solid fa-envelope me-1"></i>Inbox
            </button>

            <button
              className="btn btn-sm text-white"
              style={{ background: "#303030" }}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#msgcollapseSentbox"
              aria-expanded="false"
              aria-controls="msgcollapseSentbox"
              onClick={() => btnbox("boxSent")}
            >
              <i className="fa-solid fa-envelope-circle-check me-1"></i>Sentbox
            </button>
          </div>

          <div
            className={btnboxClick === "boxIn" ? "collapse" : "d-none"}
            id="msgcollapse"
          >
            <div
              className="container overflow-y-auto tbldiv"
              style={{ background: "#3BAFDA" }}
            >
              <div className="container-fluid">
                <div className="row mb-1">
                  <div className="col-md-12">
                    <div
                      className="text-start w-100 p-2 border border-3 rounded mx-auto accordion accordion-flush"
                      id="accordiondDiv"
                    >
                      {viewInboxNameList
                        ? viewInboxNameList.map((varlist, index) => (
                            <span key={index}>
                              <div
                                className="w-100 p-2 rounded btn btn-light text-black text-start border-top"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#inboxcollapse${varlist.userCode}`}
                                aria-expanded="true"
                                aria-controls={`inboxcollapse${varlist.userCode}`}
                                onClick={() => fetchMdlviewInboxList(varlist)}
                              >
                                <span
                                  style={{
                                    fontFamily: "arial narrow",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {`${varlist.fName} ${varlist.mName} ${varlist.lName} ${varlist.xName}`}
                                </span>
                              </div>
                              <div
                                id={`inboxcollapse${varlist.userCode}`}
                                className={`accordion-collapse ${
                                  paramVaremail === varlist.email
                                    ? "show"
                                    : "collapse"
                                }`}
                                data-bs-parent="#accordiondDiv"
                              >
                                <div className="bg-light w-100 mb-2 rounded border-bottom">
                                  {viewInboxList
                                    ? viewInboxList.map((varlistMsg, index) => (
                                        <div
                                          className="w-100 ps-4 text-start rounded btn btn-outline-info"
                                          type="button"
                                          data-bs-toggle="modal"
                                          data-bs-target="#ViewMailModalCred"
                                          key={index}
                                          onClick={() =>
                                            btnViewMail(varlistMsg, varlist)
                                          }
                                        >
                                          <small>
                                            {" "}
                                            Subject:{" "}
                                            <b className="me-2">
                                              {varlistMsg.subject.substring(
                                                0,
                                                30
                                              )}
                                            </b>{" "}
                                            Message:{" "}
                                            <b>
                                              {varlistMsg.message.length > 30
                                                ? `${varlistMsg.message.substring(
                                                    0,
                                                    30
                                                  )}...`
                                                : varlistMsg.message}
                                            </b>
                                          </small>
                                        </div>
                                      ))
                                    : ""}
                                </div>
                              </div>
                            </span>
                          ))
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* SENT */}
          <div
            className={btnboxClick === "boxSent" ? "collapse" : "d-none"}
            id="msgcollapseSentbox"
          >
            <div
              className="container overflow-y-auto tbldiv"
              style={{ background: "#3BAFDA" }}
            >
              <div className="container-fluid">
                <div className="row mb-1">
                  <div className="col-md-12">
                    <div
                      className="text-start w-100 p-2 border border-3 rounded mx-auto accordion accordion-flush"
                      id="accordiondDivSent"
                    >
                      {viewSentboxNameList
                        ? viewSentboxNameList.map((varlist, index) => (
                            <span key={index}>
                              <div
                                className="w-100 p-2 rounded btn btn-light text-black text-start border-top"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#inboxcollapse${varlist.toUserCode}`}
                                aria-expanded="true"
                                aria-controls={`inboxcollapse${varlist.toUserCode}`}
                                onClick={() => fetchMdlviewSentboxList(varlist)}
                              >
                                <span
                                  style={{
                                    fontFamily: "arial narrow",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {`${varlist.fName} ${varlist.mName} ${varlist.lName} ${varlist.xName}`}
                                </span>
                              </div>
                              <div
                                id={`inboxcollapse${varlist.toUserCode}`}
                                className={`accordion-collapse ${
                                  paramVaremail === varlist.email
                                    ? "show"
                                    : "collapse"
                                }`}
                                data-bs-parent="#accordiondDivSent"
                              >
                                <div className="bg-light w-100 mb-2 rounded border-bottom">
                                  {viewSentboxList
                                    ? viewSentboxList.map(
                                        (varlistMsg, index) => (
                                          <div
                                            className="w-100 ps-4 text-start rounded btn btn-outline-info"
                                            type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target="#ViewMailModalReadOnly"
                                            key={index}
                                            onClick={() =>
                                              btnViewMail(varlistMsg, varlist)
                                            }
                                          >
                                            <small>
                                              {" "}
                                              Subject:{" "}
                                              <b className="me-2">
                                                {varlistMsg.subject.substring(
                                                  0,
                                                  30
                                                )}
                                              </b>{" "}
                                              Message:{" "}
                                              <b>
                                                {varlistMsg.message.length > 30
                                                  ? `${varlistMsg.message.substring(
                                                      0,
                                                      30
                                                    )}...`
                                                  : varlistMsg.message}
                                              </b>
                                            </small>
                                          </div>
                                        )
                                      )
                                    : ""}
                                </div>
                              </div>
                            </span>
                          ))
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <div
          className="modal fade"
          id="NewMessageModal"
          aria-labelledby="AddDocTypelabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <NewMessageModal
              vartblUserList={tblUserList}
              varuserSession={userSession}
            />
          </div>
        </div>
        <div
          className="modal fade"
          id="ViewMailModalCred"
          aria-labelledby="AddDocTypelabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <ViewMailModal
              varuserSession={userSession}
              varparamvarViewMailobj={paramvarViewMailobj}
              vartblMessageList1={tblMessageList1}
              varparamvarViewMailobjCredential={paramvarViewMailobjCredential}
              varfetchMdlVieIBNameList={fetchMdlVieIBNameList}
            />
            {/* <AddDocTypeModal
            onSaveComplete={fetchMdlProjectListParam}
            varProjCode={paramProjCode}
          /> */}
          </div>
        </div>
        <div
          className="modal fade"
          id="ViewMailModalReadOnly"
          aria-labelledby="AddDocTypelabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <ViewMailModalReadOnly
              varuserSession={userSession}
              varparamvarViewMailobj={paramvarViewMailobj}
              vartblMessageList1={tblMessageList1}
              varparamvarViewMailobjCredential={paramvarViewMailobjCredential}
              varfetchMdlViewSentboxNameList={fetchMdlViewSentboxNameList}
            />
            {/* <AddDocTypeModal
            onSaveComplete={fetchMdlProjectListParam}
            varProjCode={paramProjCode}
          /> */}
          </div>
        </div>
        <div
          className="modal fade"
          id="ReplyMessageModalCred"
          aria-labelledby="AddDocTypelabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <ReplyMessageModal
              varparamvarViewMailobjCredential={paramvarViewMailobjCredential}
              varuserSession={userSession} 
            />
            {/* <AddDocTypeModal
            onSaveComplete={fetchMdlProjectListParam}
            varProjCode={paramProjCode}
          /> */}
          </div>
        </div>
        <div
          className="modal fade"
          id="ArchiveModal"
          aria-labelledby="AddDocTypelabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <ArchiveModal
              varparamvarViewMailobj={paramvarViewMailobj}
              vartblMessageList1={tblMessageList1}
              varparamvarViewMailobjCredential={paramvarViewMailobjCredential}
            />
            {/* <AddDocTypeModal
            onSaveComplete={fetchMdlProjectListParam}
            varProjCode={paramProjCode}
          /> */}
          </div>
        </div>
      </>
    );
}

export default Messages;