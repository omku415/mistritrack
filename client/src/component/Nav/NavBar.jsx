import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import AdminNav from "./AdminNav";
import SupervisorNav from "./SupervisorNav";

const Navbar = () => {
  const { user,loading } = useContext(AuthContext);
   if(loading) return null;
  return (
    <>
      {user?.role === "admin" && <AdminNav />}
      {user?.role === "supervisor" && <SupervisorNav />}
    </>
  );
};

export default Navbar;
