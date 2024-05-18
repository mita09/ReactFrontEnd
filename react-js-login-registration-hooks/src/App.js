import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import JsonData from "./data/data.json";
import { Navigation } from "./components/navigation";
import EventBus from "./common/EventBus";
import { About } from "./components/about";
import { Header } from "./components/header";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery"
import { Testimonials } from "./components/testimonials"
import { Team } from "./components/Team"
import { Contact } from "./components/contact"
import { Dashboard } from "./components/Dashboard";
import { UserDashBoard } from "./components/UserDashBoard";

const App = () => {
 const [landingPageData, setLandingPageData] = useState({});

  useEffect(() => {
    setLandingPageData(JsonData);
   
    return () => {
      EventBus.remove("logout");
    };
  }, []);

  
  return (
    <div>
      {/* <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          bezKoder
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

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
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
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
      </nav> */}
     
      {/* <Header data={landingPageData.Header} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <Gallery data={landingPageData.Gallery} />
      <Testimonials data={landingPageData.Testimonials} />
      <Team data={landingPageData.Team} />
      <Contact data={landingPageData.Contact} /> */}

      <Navigation />
      <div className="">
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/UserDashBoard"} element={<UserDashBoard data={landingPageData.cards}/>} />
          <Route path={"/home"} element={<Home />} />
          <Route path={"/dashboard"} element={<Dashboard data={landingPageData.Gallery}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/about" element={<About data={landingPageData.About}/>} />
          <Route path="/services" element={<Services data={landingPageData.Services}/>} />
          <Route path="/portfolio" element={<Gallery data={landingPageData.Gallery}/>} />
          <Route path="/testimonials" element={<Testimonials data={landingPageData.Testimonials}/>} />
          <Route path="/team" element={<Team data={landingPageData.Team}/>} />
          <Route path="/contact" element={<Contact data={landingPageData.Contact}/>} />
          <Route path="/header" element={<Header data={landingPageData.Header}/>} />
       </Routes>
      </div>
    </div>
  );
};

export default App;
