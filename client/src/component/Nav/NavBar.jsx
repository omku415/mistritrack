import { useContext } from "react";
import { useNavigate } from "react-router-dom"; // <-- import navigate hook
import { AuthContext } from "../../Context/AuthContext";
import AdminNav from "./AdminNav";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return <div>{user?.role === "admin" && <AdminNav />}</div>;
};

export default Navbar;
