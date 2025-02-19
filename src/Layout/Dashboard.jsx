import React from "react";
import {
  FaAd,
  FaCalendar,
  FaEnvelope,
  FaHome,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa";
import { FiLayers } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { MdReviews } from "react-icons/md";
import { Helmet } from 'react-helmet-async';
import { NavLink, Outlet } from "react-router-dom";
import { FaBook } from "react-icons/fa6";
import useAdmin from "../hooks/useAdmin";
import useGuide from "../hooks/useGuide";

const Dashboard = () => {
  // TODO: get admin value from the database
  const [isAdmin] = useAdmin();
  const [isGuide] = useGuide();
  // const  isGuide  = false;
  console.log(isAdmin);
  return (
    <div className="flex ">
       <Helmet>
              <title>Assignment | Dashboard</title>
            </Helmet>
            
      {/* dashboard side bar */}
      <div className="w-64 min-h-screen bg-teal-700 text-white">
        <ul className="menu gap-2">
          {isAdmin ? (
            <>
              <li className="uppercase">
                <NavLink to="/dashboard/adminProflie">
                  <CgProfile className="size-6" /> Manage Profile
                </NavLink>
              </li>
              <li className="uppercase">
                <NavLink to="/dashboard/package">
                  <FiLayers className="size-7" />
                  Add Package
                </NavLink>
              </li>
              <li className="uppercase">
                <NavLink to="/dashboard/candidates">
                  <FaAd className="size-6" />
                  Manage Candidates
                </NavLink>
              </li>
              <li className="uppercase">
                <NavLink to="/dashboard/users">
                  <FaUsers className="size-6" />
                  Manage Users
                </NavLink>
              </li>
            </>
          ) : isGuide ? (
            // Guide Links
            <>
              <li className="uppercase">
                <NavLink to="/dashboard/profileGuide">
                  <CgProfile className="size-6" /> Manage Profile
                </NavLink>
              </li>
              <li className="uppercase">
                <NavLink to="/dashboard/assigned">
                  <FaCalendar className="size-6" /> My Assigned Tours
                </NavLink>
              </li>
              <li className="uppercase">
                <NavLink to="/dashboard/guideStory">
                  <FaShoppingCart className="size-6" /> Add Stories
                </NavLink>
              </li>
              <li className="uppercase">
                <NavLink to="/dashboard/manageGuideStory">
                  <MdReviews className="size-6" /> Manage Stories
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="uppercase">
                <NavLink to="/dashboard/profile">
                  <CgProfile className="size-6" /> Manage Profile
                </NavLink>
              </li>
              <li className="uppercase">
                <NavLink to="/dashboard/story">
                  <FaCalendar className="size-6" /> Manage Stories
                </NavLink>
              </li>
              <li className="uppercase">
                <NavLink to="/dashboard/addStory">
                  <FaShoppingCart className="size-6" /> Add Stories
                </NavLink>
              </li>
              <li className="uppercase">
                <NavLink to="/dashboard/guide">
                  <MdReviews className="size-6" /> Join as tour guide
                </NavLink>
              </li>
              <li className="uppercase">
                <NavLink to="/dashboard/book">
                  <FaBook className="size-6" /> My Bookings
                </NavLink>
              </li>
            </>
          )}
          {/* shaared navlinks */}
          <div className="divider"></div>
          <li className="uppercase">
            <NavLink to="/">
              <FaHome className="size-6" /> Home
            </NavLink>
          </li>
          <li className="uppercase">
            <NavLink to="/trip">
              <GiHamburgerMenu className="size-6" /> Alltrip
            </NavLink>
          </li>
          <li className="uppercase">
            <NavLink to="/contact">
              <FaEnvelope className="size-6" /> contact
            </NavLink>
          </li>
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 bg-[#f6f6f602]">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
