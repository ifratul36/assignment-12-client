import {
    createBrowserRouter
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import PrivateRoute from "./PrivateRoute";
import AboutMe from "../pages/AboutMe/AboutMe";
import Tab from "../pages/Home/Tab/CustomTab";
import DetailsPage from "../Layout/DetailsPage";
import Gallery from "../pages/DetailsPage/Gallery/Gallery";
import AllTripsPage from "../pages/AllTripsPage/AllTripsPage";
import Dashboard from "../../src/Layout/Dashboard";
import MyBooking from "../pages/Dashboard/MyBooking/MyBooking";
import ManageStories from "../pages/Dashboard/ManageStories/ManageStories";
import AddPackage from "../pages/Dashboard/AddPackage/AddPackage";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import JoinTourGuide from "../pages/Dashboard/JoinTourGuide/JoinTourGuide";
import AdminRoute from "./AdminRoute";
import Contact from "../components/Contact/Contact";
import GuideProfile from "../pages/Dashboard/GuideProfile/GuideProfile";
import TourPlan from "../components/TourPlan/TourPlan";
import ManageProfile from "../pages/Dashboard/ManageProfile/ManageProfile";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
            path: '/',
            element: <Home />
        },
        {
          path: "/tab",
          elementL:<Tab />,
        },
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/about",
      element: <AboutMe />,
    },
    {
      path: "/trip",
      element: <PrivateRoute><AllTripsPage /></PrivateRoute>,
    },
    {
      path: "/details",
      element: <DetailsPage />,
      children:[
        {
          path: 'gallery',
          element: <Gallery />
        },
        {
          path: 'plan',
          element: <TourPlan />
        },
      ]
    },
    {
      path:'/contact',
      element:<Contact />
    },
    {
      path:'/dashboard',
      element: <Dashboard />,
      children: [
        {
          path:'book',
          element: <MyBooking />
        },
        {
          path:'story',
          element: <ManageStories />
        },
        {
          path:'profile',
          element: <ManageProfile />
        },
        {
          path:'guide',
          element: <JoinTourGuide />
        },
        // guide


        {
          path:'profileGuide',
          element: <GuideProfile />
        },

        // admin 
        {
          path:'package',
          element: <AdminRoute><AddPackage /></AdminRoute>
        },
        {
          path:'users',
          element: <AdminRoute><ManageUsers /></AdminRoute>   
        },
        // shared list
        
      ]
    }
  ]);

  