import React from "react";
import {
  FaAd,
  FaCalendar,
  FaEnvelope,
  FaHome,
  FaList,
  FaShoppingBag,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { FiLayers } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { MdReviews } from "react-icons/md";
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
      {/* dashboard side bar */}
      <div className="w-64 min-h-screen bg-blue-950 text-white">
        <ul className="menu gap-2">
          {isAdmin ? (
            <>
              <li className="uppercase">
                <NavLink to="/dashboard/adminHome">
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
                <NavLink to="/dashboard/guide">
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
                <NavLink to="/dashboard/assignedTours">
                  <FaCalendar className="size-6" /> My Assigned Tours
                </NavLink>
              </li>
              <li className="uppercase">
                <NavLink to="/dashboard/addStories">
                  <FaShoppingCart className="size-6" /> Add Stories
                </NavLink>
              </li>
              <li className="uppercase">
                <NavLink to="/dashboard/manageStories">
                  <MdReviews className="size-6" /> Manage Stories
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="uppercase">
                <NavLink to="/dashboard/userHome">
                  <FaHome className="size-6" /> Manage Profile
                </NavLink>
              </li>
              <li className="uppercase">
                <NavLink to="/dashboard/reservation">
                  <FaCalendar className="size-6" /> Manage Stories
                </NavLink>
              </li>
              <li className="uppercase">
                <NavLink to="/dashboard/cart">
                  <FaShoppingCart className="size-6" /> Add Stories
                </NavLink>
              </li>
              <li className="uppercase">
                <NavLink to="/dashboard/review">
                  <MdReviews className="size-6" /> Join as tour guide
                </NavLink>
              </li>
              <li className="uppercase">
                <NavLink to="/dashboard/booking">
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

// import React from "react";
// import {
//   FaAd,
//   FaCalendar,
//   FaEnvelope,
//   FaHome,
//   FaList,
//   FaShoppingBag,
//   FaShoppingCart,
//   FaUsers,
//   FaUtensils,
// } from "react-icons/fa";
// import { FiLayers } from "react-icons/fi";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { CgProfile } from "react-icons/cg";
// import { MdReviews } from "react-icons/md";
// import { NavLink, Outlet } from "react-router-dom";
// import { FaBook } from "react-icons/fa6";
// import useAdmin from "../hooks/useAdmin";
// import useGuide from "../hooks/useGuide";

// const Dashboard = () => {
//   const { isAdmin } = useAdmin();
//   const { isGuide } = useGuide();
//   console.log(isAdmin, isGuide);

//   return (
//     <div className="flex ">
//       {/* Dashboard Sidebar */}
//       <div className="w-64 min-h-screen bg-blue-950 text-white">
//         <ul className="menu gap-2">
//           {/* Admin Links */}
//           {isAdmin ? (
//             <>
//               <li className="uppercase">
//                 <NavLink to="/dashboard/adminHome">
//                   <CgProfile className="size-6" /> Manage Profile
//                 </NavLink>
//               </li>
//               <li className="uppercase">
//                 <NavLink to="/dashboard/addItems">
//                   <FaUtensils className="size-6" /> My Assigned Tours
//                 </NavLink>
//               </li>
//               <li className="uppercase">
//                 <NavLink to="/dashboard/manageItems">
//                   <FaList className="size-6" /> Add Stories
//                 </NavLink>
//               </li>
//               <li className="uppercase">
//                 <NavLink to="/dashboard/package">
//                   <FiLayers className="size-7" /> Add Package
//                 </NavLink>
//               </li>
//               <li className="uppercase">
//                 <NavLink to="/dashboard/guide">
//                   <FaAd className="size-6" /> Manage Stories
//                 </NavLink>
//               </li>
//               <li className="uppercase">
//                 <NavLink to="/dashboard/users">
//                   <FaUsers className="size-6" /> Manage Users
//                 </NavLink>
//               </li>
//             </>
//           ) : isGuide ? (
//             // Guide Links
//             <>
//               <li className="uppercase">
//                 <NavLink to="/dashboard/guideProfile">
//                   <CgProfile className="size-6" /> Manage Profile
//                 </NavLink>
//               </li>
//               <li className="uppercase">
//                 <NavLink to="/dashboard/assignedTours">
//                   <FaCalendar className="size-6" /> My Assigned Tours
//                 </NavLink>
//               </li>
//               <li className="uppercase">
//                 <NavLink to="/dashboard/addStories">
//                   <FaShoppingCart className="size-6" /> Add Stories
//                 </NavLink>
//               </li>
//               <li className="uppercase">
//                 <NavLink to="/dashboard/manageStories">
//                   <MdReviews className="size-6" /> Manage Stories
//                 </NavLink>
//               </li>
//             </>
//           ) : (
//             // Default User Links
//             <>
//               <li className="uppercase">
//                 <NavLink to="/dashboard/userHome">
//                   <FaHome className="size-6" /> Manage Profile
//                 </NavLink>
//               </li>
//               <li className="uppercase">
//                 <NavLink to="/dashboard/reservation">
//                   <FaCalendar className="size-6" /> Manage Stories
//                 </NavLink>
//               </li>
//               <li className="uppercase">
//                 <NavLink to="/dashboard/cart">
//                   <FaShoppingCart className="size-6" /> Add Stories
//                 </NavLink>
//               </li>
//               <li className="uppercase">
//                 <NavLink to="/dashboard/review">
//                   <MdReviews className="size-6" /> Join as Tour Guide
//                 </NavLink>
//               </li>
//               <li className="uppercase">
//                 <NavLink to="/dashboard/booking">
//                   <FaBook className="size-6" /> My Bookings
//                 </NavLink>
//               </li>
//             </>
//           )}
//           {/* Shared Links */}
//           <div className="divider"></div>
//           <li className="uppercase">
//             <NavLink to="/">
//               <FaHome className="size-6" /> Home
//             </NavLink>
//           </li>
//           <li className="uppercase">
//             <NavLink to="/order/salad">
//               <GiHamburgerMenu className="size-6" /> Menu
//             </NavLink>
//           </li>
//           <li className="uppercase">
//             <NavLink to="/order/salad">
//               <FaEnvelope className="size-6" /> Contact
//             </NavLink>
//           </li>
//         </ul>
//       </div>
//       {/* Dashboard Content */}
//       <div className="flex-1 bg-[#f6f6f602]">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
