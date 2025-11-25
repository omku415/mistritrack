import { useContext, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { AuthContext } from "./Context/AuthContext";

import LoginPage from "./component/Auth/LoginPage";
import AdminDashboard from "./component/AdminDashboard/AdminDashboard";
import SiteCreationForm from "./component/AdminDashboard/CreateSite";
import AddSupervisorForm from "./component/AdminDashboard/createSupervisor";
import AddLabourForm from "./component/AdminDashboard/createLabour";
import AdminNav from "./component/Nav/AdminNav";

function AdminLayout({ children }) {
  return (
    <>
      <AdminNav />
      {children}
    </>
  );
}

function App() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Auto-redirect logged-in user from "/" to their dashboard
  useEffect(() => {
    if (user && location.pathname === "/") {
      navigate(`/${user.role}/dashboard`);
    }
  }, [user]);

  return (
    <Routes>
      {/* Public Login Page */}
      <Route path="/" element={!user ? <LoginPage /> : null} />

      {/* Admin Dashboard */}
      <Route
        path="/admin/dashboard"
        element={
          user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />
        }
      />

      {/* Create Site */}
      <Route
        path="/admin/create-site"
        element={
          user?.role === "admin" ? (
            <AdminLayout>
              <SiteCreationForm />
            </AdminLayout>
          ) : (
            <Navigate to="/" />
          )
        }
      />

      {/* Add Supervisor */}
      <Route
        path="/admin/add-supervisor"
        element={
          user?.role === "admin" ? (
            <AdminLayout>
              <AddSupervisorForm />
            </AdminLayout>
          ) : (
            <Navigate to="/" />
          )
        }
      />

      {/* Add Labour */}
      <Route
        path="/admin/add-labour"
        element={
          user?.role === "admin" ? (
            <AdminLayout>
              <AddLabourForm />
            </AdminLayout>
          ) : (
            <Navigate to="/" />
          )
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
