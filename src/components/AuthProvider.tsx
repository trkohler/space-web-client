import { googleLogout } from "@react-oauth/google";
import { AuthContext } from "..";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";
import { useEffect, useState } from "react";

type UserProfile = {
  displayName: string;
  email: string;
  role?: "super-admin" | "admin" | "user";
};

const loginMutation = loader("../queries/login.gql");

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [login, { error }] = useMutation(loginMutation);

  if (error) {
    console.log(error);
  }

  const handleLogin = async (codeResponse) => {
    const { credential } = codeResponse;
    sessionStorage.setItem("token", credential);

    login({
      onCompleted: (data) => {
        const {
          login: { ...user },
        } = data;
        setProfile(user);
        const origin = location.state?.from?.pathname || "/admin"; // TODO: should be changed later according to user roles
        navigate(origin, { replace: true });
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const handleLogout = () => {
    googleLogout();
    sessionStorage.removeItem("token");
    setProfile(null);
    navigate("/login", { replace: true });
  };

  const value = {
    profile,
    setProfile,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
