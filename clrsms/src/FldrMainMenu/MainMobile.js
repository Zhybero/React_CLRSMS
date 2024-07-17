

import { Link } from "react-router-dom";
function MainMobile(){
    return(
        <>
        
        <div className="mobile-menu-area">
            <div className="container-fluid">
                  <div className="mobile-menu">
                    <nav id="dropdown">
                      <ul className="mobile-menu-nav">
                        <li>
                          <Link data-toggle="collapse" data-target="#Charts">
                            Home{" "}
                            <span className="admin-project-icon adminpro-icon adminpro-down-arrow"></span>
                          </Link>
                          <ul className="collapse dropdown-header-top">
                            <li>
                              <Link>Dashboard v.1</Link>
                            </li>
                            <li>
                              <Link>Dashboard v.2</Link>
                            </li>
                            <li>
                              <Link>Analytics</Link>
                            </li>
                            <li>
                              <Link>Widgets</Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link data-toggle="collapse" data-target="#demo">
                            Mailbox{" "}
                            <span className="admin-project-icon adminpro-icon adminpro-down-arrow"></span>
                          </Link>
                          <ul id="demo" className="collapse dropdown-header-top">
                            <li>
                              <Link>Inbox</Link>
                            </li>
                            <li>
                              <Link>View Mail</Link>
                            </li>
                            <li>
                              <Link>Compose Mail</Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link data-toggle="collapse" data-target="#others">
                            Miscellaneous{" "}
                            <span className="admin-project-icon adminpro-icon adminpro-down-arrow"></span>
                          </Link>
                          <ul id="others" className="collapse dropdown-header-top">
                            <li>
                              <Link>Profile</Link>
                            </li>
                            <li>
                              <Link>Contact Client</Link>
                            </li>
                            <li>
                              <Link>Contact Client v.1</Link>
                            </li>
                            <li>
                              <Link>Project List</Link>
                            </li>
                            <li>
                              <Link>Project Details</Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link
                            data-toggle="collapse"
                            data-target="#Miscellaneousmob"
                          >
                            Interface{" "}
                            <span className="admin-project-icon adminpro-icon adminpro-down-arrow"></span>
                          </Link>
                          <ul
                            id="Miscellaneousmob"
                            className="collapse dropdown-header-top"
                          >
                            <li>
                              <Link>Google Map</Link>
                            </li>
                            <li>
                              <Link>Data Maps</Link>
                            </li>
                            <li>
                              <Link>Pdf Viewer</Link>
                            </li>
                            <li>
                              <Link>X-Editable</Link>
                            </li>
                            <li>
                              <Link>Code Editor</Link>
                            </li>
                            <li>
                              <Link>Tree View</Link>
                            </li>
                            <li>
                              <Link>Preloader</Link>
                            </li>
                            <li>
                              <Link>Images Cropper</Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link data-toggle="collapse" data-target="#Chartsmob">
                            Charts{" "}
                            <span className="admin-project-icon adminpro-icon adminpro-down-arrow"></span>
                          </Link>
                          <ul
                            id="Chartsmob"
                            className="collapse dropdown-header-top"
                          >
                            <li>
                              <Link>Bar Charts</Link>
                            </li>
                            <li>
                              <Link>Line Charts</Link>
                            </li>
                            <li>
                              <Link>Area Charts</Link>
                            </li>
                            <li>
                              <Link>Rounded Charts</Link>
                            </li>
                            <li>
                              <Link>C3 Charts</Link>
                            </li>
                            <li>
                              <Link>Sparkline Charts</Link>
                            </li>
                            <li>
                              <Link>Peity Charts</Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link data-toggle="collapse" data-target="#Tablesmob">
                            Tables{" "}
                            <span className="admin-project-icon adminpro-icon adminpro-down-arrow"></span>
                          </Link>
                          <ul
                            id="Tablesmob"
                            className="collapse dropdown-header-top"
                          >
                            <li>
                              <Link>Static Table</Link>
                            </li>
                            <li>
                              <Link>Data Table</Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link data-toggle="collapse" data-target="#formsmob">
                            Forms{" "}
                            <span className="admin-project-icon adminpro-icon adminpro-down-arrow"></span>
                          </Link>
                          <ul
                            id="formsmob"
                            className="collapse dropdown-header-top"
                          >
                            <li>
                              <Link>Basic Form Elements</Link>
                            </li>
                            <li>
                              <Link>Advanced Form Elements</Link>
                            </li>
                            <li>
                              <Link>Password Meter</Link>
                            </li>
                            <li>
                              <Link>Multi Upload</Link>
                            </li>
                            <li>
                              <Link>Text Editor</Link>
                            </li>
                            <li>
                              <Link>Dual List Box</Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link
                            data-toggle="collapse"
                            data-target="#Appviewsmob"
                          >
                            App views{" "}
                            <span className="admin-project-icon adminpro-icon adminpro-down-arrow"></span>
                          </Link>
                          <ul
                            id="Appviewsmob"
                            className="collapse dropdown-header-top"
                          >
                            <li>
                              <Link>Basic Form Elements</Link>
                            </li>
                            <li>
                              <Link>Advanced Form Elements</Link>
                            </li>
                            <li>
                              <Link>Password Meter</Link>
                            </li>
                            <li>
                              <Link>Multi Upload</Link>
                            </li>
                            <li>
                              <Link>Text Editor</Link>
                            </li>
                            <li>
                              <Link>Dual List Box</Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link data-toggle="collapse" data-target="#Pagemob">
                            Pages{" "}
                            <span className="admin-project-icon adminpro-icon adminpro-down-arrow"></span>
                          </Link>
                          <ul id="Pagemob" className="collapse dropdown-header-top">
                            <li>
                              <Link>Login</Link>
                            </li>
                            <li>
                              <Link>Register</Link>
                            </li>
                            <li>
                              <Link>Captcha</Link>
                            </li>
                            <li>
                              <Link>Checkout</Link>
                            </li>
                            <li>
                              <Link>Contacts</Link>
                            </li>
                            <li>
                              <Link>Review</Link>
                            </li>
                            <li>
                              <Link>Order</Link>
                            </li>
                            <li>
                              <Link>Comment</Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </nav> 
              </div>
            </div>
          </div>
          <div className="breadcome-area mg-b-30 des-none">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="breadcome-list map-mg-t-40-gl shadow-reset">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <div className="breadcome-heading">
                          <form role="search" className="">
                            <input
                              type="text"
                              placeholder="Search..."
                              className="form-control"
                            />
                            <Link>
                              <i className="fa fa-search"></i>
                            </Link>
                          </form>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <ul className="breadcome-menu">
                          <li>
                            <Link>Home</Link> <span className="bread-slash">/</span>
                          </li>
                          <li>
                            <span className="bread-blod">Dashboard</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
    );
}
export default MainMobile;