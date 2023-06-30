import { Route, Routes, useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Progress } from "../components/registration/Progress";
import { FirstStep } from "../components/registration/FirstStep";
import { SecondStep } from "../components/registration/SecondStep";
import { loader } from "graphql.macro";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useAuth } from "../hooks/auth";

const registerMutation = loader("../queries/register.gql");

export const RegistrationPage = () => {
  const [token, setToken] = useState<string | null>(null);
  const [spaceName, setSpaceName] = useState<string | null>(null);
  const [register, { error }] = useMutation(registerMutation);
  const navigate = useNavigate();
  const { setProfile } = useAuth();

  useEffect(() => {
    if (token && spaceName) {
      register({
        variables: {
          token,
        },
        onCompleted: (data) => {
          setProfile(data.register);
          console.log(`register mutation completed: ${data}`)
          navigate("/admin");
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  }, [token, spaceName, register]);

  return (
    <Layout>
      <Progress />
      <Routes>
        <Route path="/" element={<FirstStep setToken={setToken} />} />
        <Route
          element={<SecondStep setSpaceName={setSpaceName} />}
          path="/second"
        />
      </Routes>
    </Layout>
  );
};
