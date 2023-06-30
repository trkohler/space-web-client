import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/auth";

export const ProtectedRoute = ({ children }) => {
  const { profile } = useAuth();
  const location = useLocation();

  if (!profile) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};
