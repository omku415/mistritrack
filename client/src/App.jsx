import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";
import LoginPage from "./component/Auth/LoginPage";
import AdminDashboard from "./component/AdminDashboard/AdminDashboard";
import SiteCreationForm from "./component/AdminDashboard/CreateSite";
import AdminNav from "./component/Nav/AdminNav";
function App() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user && location.pathname === "/") {
      navigate(`/${user.role}/dashboard`);
    }
  }, [user, navigate, location.pathname]);

  
  return (
    <>
      <Routes>
        <Route path="/" element={!user ? <LoginPage /> : null} />
        <Route
          path="/admin/dashboard"
          element={
            user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/create-site"
          element={
            user?.role === "admin" ? (
              <>
                <AdminNav />
                <SiteCreationForm />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
