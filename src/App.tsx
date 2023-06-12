import { Route, Routes } from "react-router-dom";
import { AdminPage } from "./pages/Admin";
import { EmployeePage } from "./pages/Employee";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AdminPage />} />
        <Route path="/employee" element={<EmployeePage />} />
      </Routes>
    </>
  );
}

export default App;
