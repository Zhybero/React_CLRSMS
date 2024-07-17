
import Header from "../FldrMainMenu/Header";
import { Link } from "react-router-dom";  
import { GetModeltblAPMatter } from "../FldrFunctions/ClsGetList";
import { useState,useEffect } from "react";
function Services(){
 
    //const [userSession, setuserSession] = useState({});
    
const [tblAPMatterList, settblAPMatterList] = useState([]);
const fetchMdlAPMatter = async () => {
  try {
    settblAPMatterList(await GetModeltblAPMatter());  
  } catch {
    console.log("Connection error!");
  }
};
//useEffects
  useEffect(() => {   
    fetchMdlAPMatter();
  }, []);
  
      
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
              <Header/>
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
          <div className="col-lg-8 col-sm-12  mx-auto shadow rounded-4 border-top border-dark border-2 p-3 lbody" style={{background:"#D4D4FF"}}>
          <div className="container-fluid container-xxl rounded my-5"> 

<div className="row">
  {tblAPMatterList
    ? tblAPMatterList.map((varlist, index) => (
        <div className="col-lg-4 col-md-4 col-sm-6 mb-3" key={index}>
          <div
            className="ps-2 pe-2 shadow rounded border-top border-info border-2"
            style={{ height: "400px" }}
          >
            <img alt="" className="img-fluid rounded" />

            <h6 style={{ fontfamily: "'Anton', sans-serif" }}>
              {varlist.apmTitle}
            </h6>

            <div
              className="p-3 overflow-auto text-start"
              style={{ maxHeight: "35vh" }}
            >
              <small>
                <p>{varlist.apmDesc}</p>
              </small>
            </div>

          </div>
        </div>
      ))
    : ""}
 
</div>
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

export default Services;