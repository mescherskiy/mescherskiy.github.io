import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./app/components/Login";
import Register from "./app/components/Register";
import Home from "./app/components/Home";
import Profile from "./app/components/Profile";
import UserBoard from "./app/components/UserBoard";
import AdminBoard from "./app/components/AdminBoard";

//import { logout } from "./app/slices/auth";
import { useLogoutMutation } from "./app/api/api";
import RequireAuth from "./app/components/RequireAuth";

const App = () => {

  const [logout, { isLoading }] = useLogoutMutation();

  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  // const logOut = useCallback(() => {
  //   dispatch(logout());
  // }, [dispatch]);

  useEffect(() => {
    if (user) {
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    } else {
      setShowAdminBoard(false);
    }
  }, [user]);

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            bezKoder
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {user && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {user ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {user.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logout}>
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
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<RequireAuth />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/user" element={<UserBoard />} />
              <Route path="/admin" element={<AdminBoard />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
