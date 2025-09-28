import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const AdminNav = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar bg-green-900 text-white shadow-md px-4">
      {/* Navbar Start */}
      <div className="navbar-start">
        <Link
          to="/admin/dashboard"
          className="btn btn-ghost normal-case text-xl text-green-300"
        >
          MyBrand
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              to="/admin/dashboard"
              className="hover:bg-green-700 rounded-lg"
            >
              Home
            </Link>
          </li>
          <li>
            <Link to="/admin/about" className="hover:bg-green-700 rounded-lg">
              About
            </Link>
          </li>
          <li>
            <Link to="/admin/contact" className="hover:bg-green-700 rounded-lg">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        <button
          onClick={handleLogout}
          className="btn bg-green-600 border-none hover:bg-green-500 text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNav;
