import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/auth";


export const ProtectedRoute = ({ children }) => {
    const { credentials } = useAuth();
    const location = useLocation();
  
    if (!credentials) {
      return <Navigate to="/login" replace state={{from: location}} />;
    }
  
    return children;
  };