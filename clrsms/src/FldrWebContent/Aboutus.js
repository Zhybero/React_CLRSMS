
import Header from "../FldrMainMenu/Header";
import { Link } from "react-router-dom";  
function Aboutus(){
 
    //const [userSession, setuserSession] = useState({});
      
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
            <div className="row user-select-none">  
                  <h3><b>About us:</b></h3>
                <p>Atty . Benjamin S. Candari Jr. Is the owner of law firm office is located in St. Bartholomew Extension BDoña Juliana Height Sunday. Taculing Bacolod City Transactioning legal issues related to the Real estate firm offering Their Clients first class value added professional assistance, combined with an in depth understanding of the particular areas of the business.</p>
              </div> 
          </div>
          <div className="col-lg-8 col-sm-12 mx-auto shadow rounded-4 border-top border-dark border-2 p-3 lbody" style={{background:"#D4D4FF"}}>
            <div className="row user-select-none text-start">  
                  <h5><b>Location:</b></h5>
                <small>St. Bartholomew Extension Doña Juliana Heights Sub.Brgy taculing Bacolod City</small>
                  </div> 
            <div className="row user-select-none text-start">  
                  <h5><b>Contacts:</b></h5>
                <small>Phone: 0917-559-8740</small>
                <small>Email: Candari_ben@yahoo.com</small>
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

export default Aboutus;