import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{user.name}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {user.roles &&
          user.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
};

export default Profile;