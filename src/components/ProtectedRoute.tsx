// ProtectedRoute.tsx
import React from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHook";

const ProtectedRoute: React.FC<RouteProps> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
