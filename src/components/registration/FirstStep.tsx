import React, { useEffect } from "react";
import { useAuth } from "../../hooks/auth";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export const FirstStep = ({ setToken }) => {
  const navigate = useNavigate();

  return (
    <>
      <br />
      <br />
      <br />
      <GoogleLogin
        onSuccess={(response) => {
          setToken(response.credential);
          sessionStorage.setItem("token", response.credential);
          navigate("/registration/second");
        }}
        useOneTap
        auto_select
        theme="filled_black"
      />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};
