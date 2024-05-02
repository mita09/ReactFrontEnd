import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
// import JsonData from "../data/data.json";
import EventBus from "../common/EventBus";

export const Navigation = (props) => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  // const [landingPageData, setLandingPageData] = useState({});

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    // setLandingPageData(JsonData);
    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };
  return (
    <div>
      <nav class="navbar navbar-expand-md navbar-dark navbar-custom">
        <a class="navbar-brand">Your Brand</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="collapsibleNavbar"
        >
          <ul class="navbar-nav">
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                {showModeratorBoard && (
                  <li className="nav-item">
                    <Link to={"/mod"} className="nav-link">
                      Moderator Board
                    </Link>
                  </li>
                )}

                {showAdminBoard && (
                  <li className="nav-item">
                    <Link to={"/admin"} className="nav-link">
                      Admin Board
                    </Link>
                  </li>
                )}
                {currentUser && (
                  <li className="nav-item">
                    <Link class="nav-link" to={"/user"} className="nav-link">
                      User
                    </Link>
                  </li>
                  
                )}
                {currentUser && (
                  <li className="nav-item">
                    <Link class="nav-link" to={"/UserDashBoard"} className="nav-link">
                      User Dashboard
                    </Link>
                  </li>
                  
                )}
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link" onClick={logOut}>
                    LogOut
                  </Link>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li class="nav-item">
                  <a class="nav-link" href="/UserDashBoard">
                    User Dashboard
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/header">
                    Header
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/about">
                    About
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/services">
                    Services
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/portfolio">
                    Gallery
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/testimonials">
                    Testimonials
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/team">
                    Team
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/contact">
                    Contact
                  </a>
                </li>
                <li class="nav-item d-flex align-items-center">
                <a href="javascript:;" class="nav-link text-white font-weight-bold px-0" href="/login">
                <i class="fa fa-user me-sm-1" aria-hidden="true"></i>
                <span class="d-sm-inline d-none">Sign In</span>
                </a>
                </li>
                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
                
              </div>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};
