import React, { useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "./components/common/Sidebar";
import SubscriptionsPage from "./pages/SubscriptionsPage";
import ContactPage from "./pages/ContactPage";
import GymAccountsPage from "./pages/GymAccountsPage";
import UsersPage from "./pages/UsersPage";
import Login from "./components/login/Login";
import { checkAuthStatus } from "./store/authSlice";
import GymSections from "./components/GymSections/GymSections";

function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  return isAuthenticated ? children : null;
}

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-black text-gray-100">
      {isAuthenticated && <Sidebar />}
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        
        <Route
          path="/Subscriptions"
          element={
            <PrivateRoute>
              <SubscriptionsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/Users"
          element={
            <PrivateRoute>
              <UsersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/GymAccounts"
          element={
            <PrivateRoute>
              <GymAccountsPage />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/contact"
          element={
            <PrivateRoute>
              <ContactPage />
            </PrivateRoute>
          }
        />
        
        
        <Route
          path="/gymsections"
          element={
            <PrivateRoute>
              <GymSections />
            </PrivateRoute>
          }
        />
        

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
