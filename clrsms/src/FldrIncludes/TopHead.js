
import { Link } from "react-router-dom";

function TopHead(){

  return (
    <div className="materialdesign">
      <div className="content-inner-all">
        <div className="header-top-area">
          <div className="fixed-header-top">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-1 col-md-6 col-sm-6 col-xs-12">
                  <button
                    type="button"
                    id="sidebarCollapse"
                    className="btn bar-button-pro header-drl-controller-btn btn-info navbar-btn"
                  >
                    <i className="fa fa-bars"></i>
                  </button>
                  <div className="admin-logo logo-wrap-pro">
                    <Link>
                      <img src="img/logo/log.png" alt="" />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-6 col-md-1 col-sm-1 col-xs-12">
                  <div className="header-top-menu tabl-d-n">
                    <ul className="nav navbar-nav mai-top-nav">
                      <li className="nav-item">
                        <Link className="nav-link">Home</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link">About</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link">Services</Link>
                      </li>
                      <li className="nav-item dropdown">
                        <Link
                          data-toggle="dropdown"
                          role="button"
                          aria-expanded="false"
                          className="nav-link dropdown-toggle"
                        >
                          Project{" "}
                          <span className="angle-down-topmenu">
                            <i className="fa fa-angle-down"></i>
                          </span>
                        </Link>
                        <div role="menu" className="dropdown-menu animated flipInX">
                          <Link className="dropdown-item">Company Info</Link>
                          <Link className="dropdown-item">Documentation</Link>
                          <Link className="dropdown-item">Expert Backend</Link>
                          <Link className="dropdown-item">Expert FrontEnd</Link>
                          <Link className="dropdown-item">Contact Support</Link>
                        </div>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link">Support</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-5 col-md-5 col-sm-6 col-xs-12">
                  <div className="header-right-info">
                    <ul className="nav navbar-nav mai-top-nav header-right-menu">
                      <li className="nav-item dropdown">
                        <Link
                          data-toggle="dropdown"
                          role="button"
                          aria-expanded="false"
                          className="nav-link dropdown-toggle"
                        >
                          <span className="adminpro-icon adminpro-chat-pro"></span>
                          <span className="indicator-ms"></span>
                        </Link>
                        <div
                          role="menu"
                          className="author-message-top dropdown-menu animated flipInX"
                        >
                          <div className="message-single-top">
                            <h1>Message</h1>
                          </div>
                          <ul className="message-menu">
                            <li>
                              <Link>
                                <div className="message-img">
                                  <img src="img/message/1.jpg" alt="" />
                                </div>
                                <div className="message-content">
                                  <span className="message-date">16 Sept</span>
                                  <h2>Advanda Cro</h2>
                                  <p>
                                    Please done this project as soon possible.
                                  </p>
                                </div>
                              </Link>
                            </li>
                            <li>
                              <Link>
                                <div className="message-img">
                                  <img src="img/message/4.jpg" alt="" />
                                </div>
                                <div className="message-content">
                                  <span className="message-date">16 Sept</span>
                                  <h2>Sulaiman din</h2>
                                  <p>
                                    Please done this project as soon possible.
                                  </p>
                                </div>
                              </Link>
                            </li>
                            <li>
                              <Link>
                                <div className="message-img">
                                  <img src="img/message/3.jpg" alt="" />
                                </div>
                                <div className="message-content">
                                  <span className="message-date">16 Sept</span>
                                  <h2>Victor Jara</h2>
                                  <p>
                                    Please done this project as soon possible.
                                  </p>
                                </div>
                              </Link>
                            </li>
                            <li>
                              <Link>
                                <div className="message-img">
                                  <img src="img/message/2.jpg" alt="" />
                                </div>
                                <div className="message-content">
                                  <span className="message-date">16 Sept</span>
                                  <h2>Victor Jara</h2>
                                  <p>
                                    Please done this project as soon possible.
                                  </p>
                                </div>
                              </Link>
                            </li>
                          </ul>
                          <div className="message-view">
                            <Link>View All Messages</Link>
                          </div>
                        </div>
                      </li>
                      <li className="nav-item">
                        <Link
                          data-toggle="dropdown"
                          role="button"
                          aria-expanded="false"
                          className="nav-link dropdown-toggle"
                        >
                          <i className="fa fa-bell-o" aria-hidden="true"></i>
                          <span className="indicator-nt"></span>
                        </Link>
                        <div
                          role="menu"
                          className="notification-author dropdown-menu animated flipInX"
                        >
                          <div className="notification-single-top">
                            <h1>Notifications</h1>
                          </div>
                          <ul className="notification-menu">
                            <li>
                              <Link>
                                <div className="notification-icon">
                                  <span className="adminpro-icon adminpro-checked-pro"></span>
                                </div>
                                <div className="notification-content">
                                  <span className="notification-date">16 Sept</span>
                                  <h2>Advanda Cro</h2>
                                  <p>
                                    Please done this project as soon possible.
                                  </p>
                                </div>
                              </Link>
                            </li>
                            <li>
                              <Link>
                                <div className="notification-icon">
                                  <span className="adminpro-icon adminpro-cloud-computing-down"></span>
                                </div>
                                <div className="notification-content">
                                  <span className="notification-date">16 Sept</span>
                                  <h2>Sulaiman din</h2>
                                  <p>
                                    Please done this project as soon possible.
                                  </p>
                                </div>
                              </Link>
                            </li>
                            <li>
                              <Link>
                                <div className="notification-icon">
                                  <span className="adminpro-icon adminpro-shield"></span>
                                </div>
                                <div className="notification-content">
                                  <span className="notification-date">16 Sept</span>
                                  <h2>Victor Jara</h2>
                                  <p>
                                    Please done this project as soon possible.
                                  </p>
                                </div>
                              </Link>
                            </li>
                            <li>
                              <Link>
                                <div className="notification-icon">
                                  <span className="adminpro-icon adminpro-analytics-arrow"></span>
                                </div>
                                <div className="notification-content">
                                  <span className="notification-date">16 Sept</span>
                                  <h2>Victor Jara</h2>
                                  <p>
                                    Please done this project as soon possible.
                                  </p>
                                </div>
                              </Link>
                            </li>
                          </ul>
                          <div className="notification-view">
                            <Link>View All Notification</Link>
                          </div>
                        </div>
                      </li>
                      <li className="nav-item">
                        <Link
                          data-toggle="dropdown"
                          role="button"
                          aria-expanded="false"
                          className="nav-link dropdown-toggle"
                        >
                          <span className="adminpro-icon adminpro-user-rounded header-riht-inf"></span>
                          <span className="admin-name">Advanda Cro</span>
                          <span className="author-project-icon adminpro-icon adminpro-down-arrow"></span>
                        </Link>
                        <ul
                          role="menu"
                          className="dropdown-header-top author-log dropdown-menu animated flipInX"
                        >
                          <li>
                            <Link>
                              <span className="adminpro-icon adminpro-home-admin author-log-ic"></span>
                              My Account
                            </Link>
                          </li>
                          <li>
                            <Link>
                              <span className="adminpro-icon adminpro-user-rounded author-log-ic"></span>
                              My Profile
                            </Link>
                          </li>
                          <li>
                            <Link>
                              <span className="adminpro-icon adminpro-money author-log-ic"></span>
                              User Billing
                            </Link>
                          </li>
                          <li>
                            <Link>
                              <span className="adminpro-icon adminpro-settings author-log-ic"></span>
                              Settings
                            </Link>
                          </li>
                          <li>
                            <Link>
                              <span className="adminpro-icon adminpro-locked author-log-ic"></span>
                              Log Out
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="nav-item nav-setting-open">
                        <Link
                          data-toggle="dropdown"
                          role="button"
                          aria-expanded="false"
                          className="nav-link dropdown-toggle"
                        >
                          <i className="fa fa-tasks"></i>
                        </Link>
                        <div
                          role="menu"
                          className="admintab-wrap menu-setting-wrap menu-setting-wrap-bg dropdown-menu animated flipInX"
                        >
                          <ul className="nav nav-tabs custon-set-tab">
                            <li className="active">
                              <Link data-toggle="tab">Notes</Link>
                            </li>
                            <li>
                              <Link data-toggle="tab">Projects</Link>
                            </li>
                            <li>
                              <Link data-toggle="tab">Settings</Link>
                            </li>
                          </ul>
                          <div className="tab-content">
                            <div id="Notes" className="tab-pane fade in active">
                              <div className="notes-area-wrap">
                                <div className="note-heading-indicate">
                                  <h2>
                                    <i className="fa fa-comments-o"></i> Latest
                                    Notes
                                  </h2>
                                  <p>You have 10 new message.</p>
                                </div>
                                <div className="notes-list-area notes-menu-scrollbar">
                                  <ul className="notes-menu-list">
                                    <li>
                                      <Link>
                                        <div className="notes-list-flow">
                                          <div className="notes-img">
                                            <img
                                              src="img/notification/5.jpg"
                                              alt=""
                                            />
                                          </div>
                                          <div className="notes-content">
                                            <p>
                                              {" "}
                                              The point of using Lorem Ipsum is
                                              that it has a more-or-less normal.
                                            </p>
                                            <span>Yesterday 2:45 pm</span>
                                          </div>
                                        </div>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link>
                                        <div className="notes-list-flow">
                                          <div className="notes-img">
                                            <img
                                              src="img/notification/1.jpg"
                                              alt=""
                                            />
                                          </div>
                                          <div className="notes-content">
                                            <p>
                                              {" "}
                                              The point of using Lorem Ipsum is
                                              that it has a more-or-less normal.
                                            </p>
                                            <span>Yesterday 2:45 pm</span>
                                          </div>
                                        </div>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link>
                                        <div className="notes-list-flow">
                                          <div className="notes-img">
                                            <img
                                              src="img/notification/2.jpg"
                                              alt=""
                                            />
                                          </div>
                                          <div className="notes-content">
                                            <p>
                                              {" "}
                                              The point of using Lorem Ipsum is
                                              that it has a more-or-less normal.
                                            </p>
                                            <span>Yesterday 2:45 pm</span>
                                          </div>
                                        </div>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link>
                                        <div className="notes-list-flow">
                                          <div className="notes-img">
                                            <img
                                              src="img/notification/3.jpg"
                                              alt=""
                                            />
                                          </div>
                                          <div className="notes-content">
                                            <p>
                                              {" "}
                                              The point of using Lorem Ipsum is
                                              that it has a more-or-less normal.
                                            </p>
                                            <span>Yesterday 2:45 pm</span>
                                          </div>
                                        </div>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link>
                                        <div className="notes-list-flow">
                                          <div className="notes-img">
                                            <img
                                              src="img/notification/4.jpg"
                                              alt=""
                                            />
                                          </div>
                                          <div className="notes-content">
                                            <p>
                                              {" "}
                                              The point of using Lorem Ipsum is
                                              that it has a more-or-less normal.
                                            </p>
                                            <span>Yesterday 2:45 pm</span>
                                          </div>
                                        </div>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link>
                                        <div className="notes-list-flow">
                                          <div className="notes-img">
                                            <img
                                              src="img/notification/5.jpg"
                                              alt=""
                                            />
                                          </div>
                                          <div className="notes-content">
                                            <p>
                                              {" "}
                                              The point of using Lorem Ipsum is
                                              that it has a more-or-less normal.
                                            </p>
                                            <span>Yesterday 2:45 pm</span>
                                          </div>
                                        </div>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link>
                                        <div className="notes-list-flow">
                                          <div className="notes-img">
                                            <img
                                              src="img/notification/6.jpg"
                                              alt=""
                                            />
                                          </div>
                                          <div className="notes-content">
                                            <p>
                                              {" "}
                                              The point of using Lorem Ipsum is
                                              that it has a more-or-less normal.
                                            </p>
                                            <span>Yesterday 2:45 pm</span>
                                          </div>
                                        </div>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link>
                                        <div className="notes-list-flow">
                                          <div className="notes-img">
                                            <img
                                              src="img/notification/1.jpg"
                                              alt=""
                                            />
                                          </div>
                                          <div className="notes-content">
                                            <p>
                                              {" "}
                                              The point of using Lorem Ipsum is
                                              that it has a more-or-less normal.
                                            </p>
                                            <span>Yesterday 2:45 pm</span>
                                          </div>
                                        </div>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link>
                                        <div className="notes-list-flow">
                                          <div className="notes-img">
                                            <img
                                              src="img/notification/2.jpg"
                                              alt=""
                                            />
                                          </div>
                                          <div className="notes-content">
                                            <p>
                                              {" "}
                                              The point of using Lorem Ipsum is
                                              that it has a more-or-less normal.
                                            </p>
                                            <span>Yesterday 2:45 pm</span>
                                          </div>
                                        </div>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link>
                                        <div className="notes-list-flow">
                                          <div className="notes-img">
                                            <img
                                              src="img/notification/3.jpg"
                                              alt=""
                                            />
                                          </div>
                                          <div className="notes-content">
                                            <p>
                                              {" "}
                                              The point of using Lorem Ipsum is
                                              that it has a more-or-less normal.
                                            </p>
                                            <span>Yesterday 2:45 pm</span>
                                          </div>
                                        </div>
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div id="Projects" className="tab-pane fade">
                              <div className="projects-settings-wrap">
                                <div className="note-heading-indicate">
                                  <h2>
                                    <i className="fa fa-cube"></i> Latest projects
                                  </h2>
                                  <p> You have 20 projects. 5 not completed.</p>
                                </div>
                                <div className="project-st-list-area project-st-menu-scrollbar">
                                  <ul className="projects-st-menu-list">
                                    <li>
                                      <Link>
                                        <div className="project-list-flow">
                                          <div className="projects-st-heading">
                                            <h2>Web Development</h2>
                                            <p>
                                              {" "}
                                              The point of using Lorem Ipsum is
                                              that it has a more or less normal.
                                            </p>
                                            <span className="project-st-time">
                                              1 hours ago
                                            </span>
                                          </div>
                                          <div className="projects-st-content">
                                            <p>Completion with: 28%</p>
                                            <div className="progress progress-mini">
                                              <div
                                                style={{ width: "28%;" }}
                                                className="progress-bar progress-bar-danger"
                                              ></div>
                                            </div>
                                            <p>
                                              Project end: 4:00 pm - 12.06.2014
                                            </p>
                                          </div>
                                        </div>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link>
                                        <div className="project-list-flow">
                                          <div className="projects-st-heading">
                                            <h2>Software Development</h2>
                                            <p>
                                              {" "}
                                              The point of using Lorem Ipsum is
                                              that it has a more or less normal.
                                            </p>
                                            <span className="project-st-time">
                                              2 hours ago
                                            </span>
                                          </div>
                                          <div className="projects-st-content project-rating-cl">
                                            <p>Completion with: 68%</p>
                                            <div className="progress progress-mini">
                                              <div
                                                style={{ width: "68%;" }}
                                                className="progress-bar"
                                              ></div>
                                            </div>
                                            <p>
                                              Project end: 4:00 pm - 12.06.2014
                                            </p>
                                          </div>
                                        </div>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link>
                                        <div className="project-list-flow">
                                          <div className="projects-st-heading">
                                            <h2>Graphic Design</h2>
                                            <p>
                                              {" "}
                                              The point of using Lorem Ipsum is
                                              that it has a more or less normal.
                                            </p>
                                            <span className="project-st-time">
                                              3 hours ago
                                            </span>
                                          </div>
                                          <div className="projects-st-content">
                                            <p>Completion with: 78%</p>
                                            <div className="progress progress-mini">
                                              <div
                                                style={{ width: "78%;" }}
                                                className="progress-bar"
                                              ></div>
                                            </div>
                                            <p>
                                              Project end: 4:00 pm - 12.06.2014
                                            </p>
                                          </div>
                                        </div>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link>
                                        <div className="project-list-flow">
                                          <div className="projects-st-heading">
                                            <h2>Web Design</h2>
                                            <p>
                                              {" "}
                                              The point of using Lorem Ipsum is
                                              that it has a more or less normal.
                                            </p>
                                            <span className="project-st-time">
                                              4 hours ago
                                            </span>
                                          </div>
                                          <div className="projects-st-content project-rating-cl2">
                                            <p>Completion with: 38%</p>
                                            <div className="progress progress-mini">
                                              <div
                                                style={{ width: "38%;" }}
                                                className="progress-bar progress-bar-danger"
                                              ></div>
                                            </div>
                                            <p>
                                              Project end: 4:00 pm - 12.06.2014
                                            </p>
                                          </div>
                                        </div>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link>
                                        <div className="project-list-flow">
                                          <div className="projects-st-heading">
                                            <h2>Business Card</h2>
                                            <p>
                                              {" "}
                                              The point of using Lorem Ipsum is
                                              that it has a more or less normal.
                                            </p>
                                            <span className="project-st-time">
                                              5 hours ago
                                            </span>
                                          </div>
                                          <div className="projects-st-content">
                                            <p>Completion with: 28%</p>
                                            <div className="progress progress-mini">
                                              <div
                                                style={{ width: "28%;" }}
                                                className="progress-bar progress-bar-danger"
                                              ></div>
                                            </div>
                                            <p>
                                              Project end: 4:00 pm - 12.06.2014
                                            </p>
                                          </div>
                                        </div>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link>
                                        <div className="project-list-flow">
                                          <div className="projects-st-heading">
                                            <h2>Ecommerce Business</h2>
                                            <p>
                                              {" "}
                                              The point of using Lorem Ipsum is
                                              that it has a more or less normal.
                                            </p>
                                            <span className="project-st-time">
                                              6 hours ago
                                            </span>
                                          </div>
                                          <div className="projects-st-content project-rating-cl">
                                            <p>Completion with: 68%</p>
                                            <div className="progress progress-mini">
                                              <div
                                                style={{ width: "68%;" }}
                                                className="progress-bar"
                                              ></div>
                                            </div>
                                            <p>
                                              Project end: 4:00 pm - 12.06.2014
                                            </p>
                                          </div>
                                        </div>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link>
                                        <div className="project-list-flow">
                                          <div className="projects-st-heading">
                                            <h2>Woocommerce Plugin</h2>
                                            <p>
                                              {" "}
                                              The point of using Lorem Ipsum is
                                              that it has a more or less normal.
                                            </p>
                                            <span className="project-st-time">
                                              7 hours ago
                                            </span>
                                          </div>
                                          <div className="projects-st-content">
                                            <p>Completion with: 78%</p>
                                            <div className="progress progress-mini">
                                              <div
                                                style={{ width: "78%;" }}
                                                className="progress-bar"
                                              ></div>
                                            </div>
                                            <p>
                                              Project end: 4:00 pm - 12.06.2014
                                            </p>
                                          </div>
                                        </div>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link>
                                        <div className="project-list-flow">
                                          <div className="projects-st-heading">
                                            <h2>Wordpress Theme</h2>
                                            <p>
                                              {" "}
                                              The point of using Lorem Ipsum is
                                              that it has a more or less normal.
                                            </p>
                                            <span className="project-st-time">
                                              9 hours ago
                                            </span>
                                          </div>
                                          <div className="projects-st-content project-rating-cl2">
                                            <p>Completion with: 38%</p>
                                            <div className="progress progress-mini">
                                              <div
                                                style={{ width: "38%;" }}
                                                className="progress-bar progress-bar-danger"
                                              ></div>
                                            </div>
                                            <p>
                                              Project end: 4:00 pm - 12.06.2014
                                            </p>
                                          </div>
                                        </div>
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div id="Settings" className="tab-pane fade">
                              <div className="setting-panel-area">
                                <div className="note-heading-indicate">
                                  <h2>
                                    <i className="fa fa-gears"></i> Settings Panel
                                  </h2>
                                  <p> You have 20 Settings. 5 not completed.</p>
                                </div>
                                <ul className="setting-panel-list">
                                  <li>
                                    <div className="checkbox-setting-pro">
                                      <div className="checkbox-title-pro">
                                        <h2>Show notifications</h2>
                                        <div className="ts-custom-check">
                                          <div className="onoffswitch">
                                            <input
                                              type="checkbox"
                                              name="collapsemenu"
                                              className="onoffswitch-checkbox"
                                              id="example"
                                            />
                                            <label
                                              className="onoffswitch-label"
                                              for="example"
                                            >
                                              <span className="onoffswitch-inner"></span>
                                              <span className="onoffswitch-switch"></span>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="checkbox-setting-pro">
                                      <div className="checkbox-title-pro">
                                        <h2>Disable Chat</h2>
                                        <div className="ts-custom-check">
                                          <div className="onoffswitch">
                                            <input
                                              type="checkbox"
                                              name="collapsemenu"
                                              className="onoffswitch-checkbox"
                                              id="example3"
                                            />
                                            <label
                                              className="onoffswitch-label"
                                              for="example3"
                                            >
                                              <span className="onoffswitch-inner"></span>
                                              <span className="onoffswitch-switch"></span>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="checkbox-setting-pro">
                                      <div className="checkbox-title-pro">
                                        <h2>Enable history</h2>
                                        <div className="ts-custom-check">
                                          <div className="onoffswitch">
                                            <input
                                              type="checkbox"
                                              name="collapsemenu"
                                              className="onoffswitch-checkbox"
                                              id="example4"
                                            />
                                            <label
                                              className="onoffswitch-label"
                                              for="example4"
                                            >
                                              <span className="onoffswitch-inner"></span>
                                              <span className="onoffswitch-switch"></span>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="checkbox-setting-pro">
                                      <div className="checkbox-title-pro">
                                        <h2>Show charts</h2>
                                        <div className="ts-custom-check">
                                          <div className="onoffswitch">
                                            <input
                                              type="checkbox"
                                              name="collapsemenu"
                                              className="onoffswitch-checkbox"
                                              id="example7"
                                            />
                                            <label
                                              className="onoffswitch-label"
                                              for="example7"
                                            >
                                              <span className="onoffswitch-inner"></span>
                                              <span className="onoffswitch-switch"></span>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="checkbox-setting-pro">
                                      <div className="checkbox-title-pro">
                                        <h2>Update everyday</h2>
                                        <div className="ts-custom-check">
                                          <div className="onoffswitch">
                                            <input
                                              type="checkbox"
                                              name="collapsemenu"
                                              checked=""
                                              className="onoffswitch-checkbox"
                                              id="example2"
                                            />
                                            <label
                                              className="onoffswitch-label"
                                              for="example2"
                                            >
                                              <span className="onoffswitch-inner"></span>
                                              <span className="onoffswitch-switch"></span>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="checkbox-setting-pro">
                                      <div className="checkbox-title-pro">
                                        <h2>Global search</h2>
                                        <div className="ts-custom-check">
                                          <div className="onoffswitch">
                                            <input
                                              type="checkbox"
                                              name="collapsemenu"
                                              checked=""
                                              className="onoffswitch-checkbox"
                                              id="example6"
                                            />
                                            <label
                                              className="onoffswitch-label"
                                              for="example6"
                                            >
                                              <span className="onoffswitch-inner"></span>
                                              <span className="onoffswitch-switch"></span>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="checkbox-setting-pro">
                                      <div className="checkbox-title-pro">
                                        <h2>Offline users</h2>
                                        <div className="ts-custom-check">
                                          <div className="onoffswitch">
                                            <input
                                              type="checkbox"
                                              name="collapsemenu"
                                              checked=""
                                              className="onoffswitch-checkbox"
                                              id="example5"
                                            />
                                            <label
                                              className="onoffswitch-label"
                                              for="example5"
                                            >
                                              <span className="onoffswitch-inner"></span>
                                              <span className="onoffswitch-switch"></span>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TopHead;