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
    <div className="navbar bg-gradient-to-r from-emerald-500 to-emerald-700 text-white dark:bg-gray-800 shadow-md px-4">
      {/* Navbar Start */}
      <div className="navbar-start">
        <Link
          to="/admin/dashboard"
          className="btn btn-ghost normal-case text-xl text-white"
        >
          MistriTrack
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-6">
          <li>
            <Link
              to="/admin/create-site"
              className="hover:bg-gray-800 hover:text-white rounded-lg px-3 py-1"
            >
              AddSite
            </Link>
          </li>
          <li>
            <Link
              to="/admin/about"
              className="hover:bg-gray-800 hover:text-white rounded-lg px-3 py-1"
            >
              AddLabour
            </Link>
          </li>
          <li>
            <Link
              to="/admin/contact"
              className="hover:bg-gray-800 hover:text-white rounded-lg px-3 py-1"
            >
              AddSupervisor
            </Link>
          </li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        <button
          onClick={handleLogout}
          className="btn bg-emerald-600 border-none hover:bg-gray-800 text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNav;
