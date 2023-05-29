import React from "react";
import UseAuth from "../customhook/useAuth";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { currentUser } = UseAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  return <Outlet/>;
};

export default ProtectedRoute;
