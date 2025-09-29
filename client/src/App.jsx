import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";
import LoginPage from "./component/Auth/LoginPage";
import AdminDashboard from "./component/AdminDashboard/AdminDashboard";
import NavBar from "./component/Nav/NavBar";

function App() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      navigate(`/${user.role}/dashboard`);
    }
  }, [user, navigate]);

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
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
