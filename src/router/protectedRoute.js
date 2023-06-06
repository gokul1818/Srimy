import React, { Children } from "react";
import UseAuth from "../customhook/useAuth";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({children}) => {
  const { currentUser } = UseAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    navigate("/login");
    return 
  }

  return children;
};

export default ProtectedRoute;
// import React from "react";
// import { Route, Navigate } from "react-router-dom";
// import UseAuth from "../customhook/useAuth";

// const ProtectedRoute = ({ element: Component, ...rest }) => {
//   const { currentUser } = UseAuth();

//   if (!currentUser) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Route {...rest} element={<Component />} />;
// };

// export default ProtectedRoute;

