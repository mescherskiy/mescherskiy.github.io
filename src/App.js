import React from "react";
import { Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Layout from "./app/components/Layout";
import Login from "./app/components/Login";
import Register from "./app/components/Register";
import Home from "./app/components/Home";
import Profile from "./app/components/Profile";
import UserBoard from "./app/components/UserBoard";
import AdminBoard from "./app/components/AdminBoard";

import RequireAuth from "./app/components/RequireAuth";

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route element={<RequireAuth />}>
          <Route path="profile" element={<Profile />} />
          <Route path="user" element={<UserBoard />} />
          <Route path="admin" element={<AdminBoard />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
