import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { publicRoutes } from "../../routes";

const PublicRoutes = ({ children }) => {
  const isAuthenticated = !!Cookies.get("accessToken");

  if (!isAuthenticated) {
    return <Navigate to="/forbidden" replace />;
  }
  return children;
};

export default PublicRoutes;
