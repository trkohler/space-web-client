import React, { useEffect } from "react";
import { useAuth } from "../../hooks/auth";
import { GoogleLogin } from "@react-oauth/google";

export const FirstStep = (props) => {
  const { onLogin } = useAuth();
  


  return (
    <>
      <br />
      <br />
      <br />
      <GoogleLogin
        onSuccess={(response) => {
          onLogin(response, "/registration/second");
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
