import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState("light");
  const location = useLocation();

  const handleLogOut = () => {
    logOut()
      .then(() => window.location.reload())
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const navOptions = (
    <>
      <li>
        <Link to="/" className={`hover:text-primary ${location.pathname === "/" ? "text-teal-500 font-bold" : ""}`}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/details" className={`hover:text-primary ${location.pathname === "/details" ? "text-teal-500 font-bold" : ""}`}>
          Package Details
        </Link>
      </li>
      <li>
        <Link to="/trip" className={`hover:text-primary ${location.pathname === "/trip" ? "text-teal-500 font-bold" : ""}`}>
          All Trips
        </Link>
      </li>
      <li>
        <Link to="/about" className={`hover:text-primary ${location.pathname === "/about" ? "text-teal-500 font-bold" : ""}`}>
          About
        </Link>
      </li>
      <li>
        {user ? (
          <button className="hover:text-primary" onClick={handleLogOut}>
            Log Out
          </button>
        ) : (
          <Link to="/login" className={`hover:text-primary ${location.pathname === "/login" ? "text-teal-500 font-bold" : ""}`}>
            Log in
          </Link>
        )}
      </li>
    </>
  );

  return (
    <div className={`navbar fixed z-50 w-full px-6 py-4 transition-all duration-300 ${theme === "dark" ? "bg-[#1c232b58] text-white" : "bg-[#eedede95] text-black"}`}>
      <div className="navbar-start">
        <div className="dropdown text-neutral-900">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#fff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {navOptions}
          </ul>
        </div>
        <Link to="/">
          <div className="btn btn-ghost md:text-2xl text-2xl font-bold flex-col">
            <motion.div animate={{ y: ["0px", "-8px", "0px"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
              <span>Tour</span>
            </motion.div>
            <motion.div animate={{ y: ["0px", "7px", "0px"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
              <span className="text-teal-400"> & Trip</span>
            </motion.div>
          </div>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
      <div className="navbar-end flex items-center space-x-4">
        {user && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="User Avatar" src={user.photoURL || "https://via.placeholder.com/150"} />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 text-[#7f8689] rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <ul className="rounded py-2 pl-6">
                <li>{user.displayName || "Anonymous"}</li>
                <li>{user.email || "No Email"}</li>
              </ul>
            </ul>
          </div>
        )}

        {/* Theme Toggle Button */}
        <button onClick={toggleTheme} className="text-3xl">
          {theme === "dark" ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-800" />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
