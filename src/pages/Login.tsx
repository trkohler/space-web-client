import {
  CredentialResponse,
  GoogleLogin,
  googleLogout,
} from "@react-oauth/google";
import { Layout } from "../components/Layout";
import { useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useAuth } from "../hooks/auth";
import { Link } from "react-router-dom";

type UserProfile = {
  picture: string;
  name: string;
  email: string;
  email_verified: boolean;
};

export const Login = () => {
  const { onLogin, onLogout, profile } = useAuth();
  const [credentials, setCredentials] = useState<CredentialResponse | null>(
    null
  );

  const logOut = () => {
    onLogout();
  };

  return (
    <Layout>
      <div>
        <h1>Login</h1>
        {profile ? (
          <>
            <p>you are logged in as {profile.name}</p>
          </>
        ) : (
          <GoogleLogin
            onSuccess={onLogin}
            useOneTap
            auto_select
            theme="filled_black"
          />
        )}
        <Link to="/admin">Admin</Link> <br />
        <Link to="/choose_building">Choose building</Link>
      </div>
    </Layout>
  );
};
