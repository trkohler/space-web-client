import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Progress } from "../components/registration/Progress";
import { FirstStep } from "../components/registration/FirstStep";
import { SecondStep } from "../components/registration/SecondStep";

export const RegistrationPage = () => {
  return (
    <Layout>
      <Progress />
      <Routes>
        <Route path="/" element={<FirstStep />} />
        <Route element={<SecondStep />} path="/second" />
      </Routes>
    </Layout>
  );
};
