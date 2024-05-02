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
    <nav id="menu" className="navbar navbar-default">
      <div className="container navheader">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
           
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
           
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
              <Link to={"/user"} className="nav-link">
                User
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
              <li>
              <a href="/adminDashboard" className="page-scroll">
              Admin Dashboard
              </a>
            </li>
            <li>
              <a href="/header" className="page-scroll">
                Header
              </a>
            </li>
             <li>
              <a href="/about" className="page-scroll">
                About
              </a>
            </li>
            <li>
              <a href="/services" className="page-scroll">
                Services
              </a>
            </li>
            <li>
              <a href="/portfolio" className="page-scroll">
                Gallery
              </a>
            </li>
            <li>
              <a href="/testimonials" className="page-scroll">
                Testimonials
              </a>
            </li>
            <li>
              <a href="/team" className="page-scroll">
                Team
              </a>
            </li>
            <li>
              <a href="/contact" className="page-scroll">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
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
      </div>
    </nav>
  );
};
