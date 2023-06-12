import { Route, Routes } from "react-router-dom";
import { AdminPage } from "./pages/Admin";
import { EmployeePage } from "./pages/Employee";
import { Login } from "./pages/Login";
import { BookingEvents } from "./pages/BookingEvents";
import { ChooseBuilding } from "./pages/ChooseBuilding";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AdminPage />} />
        <Route path="/employee" element={<EmployeePage />} />
        <Route path="/booking_events" element={<BookingEvents />} />
        <Route path="/building" element={<ChooseBuilding />} />
      </Routes>
    </>
  );
}

export default App;
