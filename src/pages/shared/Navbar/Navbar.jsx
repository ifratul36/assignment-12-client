import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../../Providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        // Reload the page after successful logout
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };
  

  const navOptions = (
    <>
      <li className=" hover:text-primary">
        <Link to="/">Home</Link>
      </li>
      <li className=" hover:text-primary">
        <Link to="/details">Package Details Page</Link>
      </li>
      <li className=" hover:text-primary">
        <Link to="/trip">All Trip Page</Link>
      </li>
      <li className=" hover:text-primary">
        <Link to="/about">About</Link>
      </li>
      <li>
        {user ? (
          <>
            <button className=" hover:text-primary" onClick={handleLogOut}>
              {" "}
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className=" hover:text-primary ">
              Log in
            </Link>
          </>
        )}
      </li>
    </>
  );

  return (
    <div className="text-[#fff] navbar md:max-w-screen-xl mx-auto fixed z-50 bg-opacity-80 bg-[#172554]">
      <div className="navbar-start">
        <div className="dropdown text-neutral-900">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-[#fff]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navOptions}
          </ul>
        </div>
       <Link to="/">
       <div className="btn btn-ghost text-xl font-bold flex-col">
          <motion.div
            animate={{
              y: ["0px", "-8px", "0px"], // Up and down animation effect
            }}
            transition={{
              duration: 3, // Duration of one cycle
              repeat: Infinity, // Infinite loop
              repeatType: "loop", // Loop it forever
              ease: "easeInOut", // Smooth easing
            }}
          >
            <span> Tour</span>
          </motion.div>
          <motion.div
            animate={{
              y: ["0px", "7px", "0px"], // Up and down animation effect
            }}
            transition={{
              duration: 3, // Duration of one cycle
              repeat: Infinity, // Infinite loop
              repeatType: "loop", // Loop it forever
              ease: "easeInOut", // Smooth easing
            }}
          >
            <span className="text-teal-400"> & Trip</span>
          </motion.div>
        </div>
       </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          {user && (
            <div className="flex items-center space-x-4">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="User Avatar"
                      src={user.photoURL || "https://via.placeholder.com/150"}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 text-neutral-900 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <ul className=" rounded py-2 pl-6">
                    <li>{user.displayName || "Anonymous"}</li>
                    <li>{user.email || "No Email"}</li>
                  </ul>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
