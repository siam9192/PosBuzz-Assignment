import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import MainPage from "../pages/MainPage";
import MainLayout from "../components/MainLayout";
import ProtectedRoute from "../providers/ProtectedRoute";
export default function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute access="auth">
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<MainPage />} />
      </Route>
      <Route
        path="/login"
        element={
          <ProtectedRoute access="guest">
            <LoginPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedRoute access="guest">
            <RegistrationPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
