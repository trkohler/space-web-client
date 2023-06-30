import { GoogleLogin } from "@react-oauth/google";
import { Layout } from "../components/Layout";
import { useAuth } from "../hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type UserProfile = {
  picture: string;
  name: string;
  email: string;
  email_verified: boolean;
};

export const Login = () => {
  const { onLogin } = useAuth();
  const [ showGoogleLogin, setShowGoogleLogin ] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      onLogin({ credential: token });
    } else {
      setShowGoogleLogin(true);
    }
  }, [onLogin]);

  return (
    <Layout>
      <div>
        <h1>Login</h1>
        {showGoogleLogin && <GoogleLogin
          onSuccess={onLogin}
          useOneTap
          auto_select
          theme="filled_black"
        />}
        <Link to="/admin">Admin</Link> <br />
        <Link to="/choose_building">Choose building</Link>
      </div>
    </Layout>
  );
};
