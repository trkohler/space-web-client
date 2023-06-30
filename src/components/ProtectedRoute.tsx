import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/auth";

export const ProtectedRoute = ({ children }) => {
  console.log(`calling protected route`)
  const { profile } = useAuth();
  const location = useLocation();

  if (!profile) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};
