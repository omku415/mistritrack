import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const SupervisorNav = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar bg-gradient-to-r from-emerald-500 to-emerald-700 text-white shadow-md px-4">

      {/* Navbar Start (Logo) */}
      <div className="navbar-start">
        <Link
          to="/supervisor/dashboard"
          className="btn btn-ghost normal-case text-xl text-white"
        >
          MistriTrack
        </Link>
      </div>

      {/* Navbar Center — Only Add Labour */}
      <div className="navbar-center">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              to="/supervisor/add-labour"
              className="hover:bg-gray-800 hover:text-white rounded-lg px-4 py-1"
            >
              Add Labour
            </Link>
          </li>
        </ul>
      </div>

      {/* Navbar End — Logout */}
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

export default SupervisorNav;
