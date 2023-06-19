import { googleLogout } from "@react-oauth/google";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { AuthContext } from "..";
import { useLocation, useNavigate } from "react-router-dom";

type UserProfile = {
  picture: string;
  name: string;
  email: string;
  email_verified: boolean;
};

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
  const [credentials, setCredentials] = useState(null);
  const [profile, setProfile] = useState<UserProfile>(null);

  const handleLogin = async (codeResponse) => {
    setCredentials(codeResponse);
    console.log(location.state)
    const origin = location.state?.from?.pathname || '/admin'; // TODO: should be changed later according to user roles
    console.log(origin)
    navigate(origin);
  };

  useEffect(() => {
    async function fetchProfile() {
      if (credentials) {
        const decoded = jwt_decode<UserProfile>(credentials.credential);
        setProfile(decoded);

        console.log(`token should be set`);
      }
    }
    fetchProfile();
  }, [credentials]);

  const handleLogout = () => {
    googleLogout();
    setCredentials(null);
  };

  const value = {
    credentials,
    onLogin: handleLogin,
    onLogout: handleLogout,
    profile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
