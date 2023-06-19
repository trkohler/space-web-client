import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { history } from "../utils/history";
import { Login } from "../pages/Login";
import { AdminPage } from "../pages/Admin";
import { ChooseBuilding } from "../pages/ChooseBuilding";
import { ProtectedRoute } from "./ProtectedRoute";

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        index
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/choose_building"
        element={
          <ProtectedRoute>
            <ChooseBuilding />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};