import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user.email) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;
