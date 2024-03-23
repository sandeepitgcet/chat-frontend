// ProtectedRoute.tsx
import React from "react";
import { Navigate, RouteProps } from "react-router-dom";
import useLocalStorage from "../hooks/localStorage";

interface LoginInfoInterface {
  email?: string;
  userName?: string;
  accessToken?: string;
  refreshToken?: string;
}

const ProtectedRoute: React.FC<RouteProps> = ({ children }) => {
  const [userInfo] = useLocalStorage<LoginInfoInterface>("userInfo", {});

  const isLoggedIn =
    userInfo.userName !== undefined || userInfo.accessToken !== undefined;

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
