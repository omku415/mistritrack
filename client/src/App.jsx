import { useContext, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { AuthContext } from "./Context/AuthContext";

// Auth
import LoginPage from "./component/Auth/LoginPage";

// Admin Components
import AdminDashboard from "./component/AdminDashboard/AdminDashboard";
import SiteCreationForm from "./component/AdminDashboard/CreateSite";
import AddSupervisorForm from "./component/AdminDashboard/createSupervisor";
import AddLabourForm from "./component/AdminDashboard/createLabour";
import SupervisorDashboard from "./component/SupervisorDashboard/SupervisorDashboard";

// Shared Navbar Component
import Navbar from "./component/Nav/NavBar";

// LAYOUT (works for both Admin & Supervisor)
function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="pt-4">{children}</div>
    </>
  );
}

function App() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  console.log("APP RENDERED");

  useEffect(() => {
    if (user && location.pathname === "/") {
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "supervisor") {
        navigate("/supervisor/dashboard");
      }
    }
  }, [user, location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Routes>

        {/* LOGIN ROUTE */}
        <Route
          path="/"
          element={
            !user ? (
              <LoginPage />
            ) : (
              <Navigate to={`/${user.role}/dashboard`} replace />
            )
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/dashboard"
          element={
            user?.role === "admin" ? (
              <Layout>
                <AdminDashboard />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/admin/create-site"
          element={
            user?.role === "admin" ? (
              <Layout>
                <SiteCreationForm />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/admin/add-supervisor"
          element={
            user?.role === "admin" ? (
              <Layout>
                <AddSupervisorForm />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/admin/add-labour"
          element={
            user?.role === "admin" ? (
              <Layout>
                <AddLabourForm />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* TEMP SUPERVISOR PLACEHOLDER */}
        <Route
          path="/supervisor"
          element={
            user?.role === "supervisor" ? (
              <Layout>
                <SupervisorDashboard />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* CATCH ALL */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </>
  );
}

export default App;
