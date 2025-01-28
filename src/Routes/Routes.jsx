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
import ManageCandidates from "../pages/Dashboard/ManageCandidates/ManageCandidates";
import Payment from "../pages/Dashboard/Payment/Payment";
import AdminProfile from "../pages/Dashboard/AdminProfile/AdminProfile";
import MyAssignedTours from "../pages/Dashboard/MyAssignedTours/MyAssignedTours";
import AddStory from "../pages/Dashboard/AddStory/AddStory";
import GuideStory from "../pages/Dashboard/GuideStory/GuideStory";
import ManageGuideStory from "../pages/Dashboard/ManageGuideStory/ManageGuideStory";
import Community from "../pages/DetailsPage/Community/Community";
import AllStory from "../pages/AllStory/AllStory";
import ErrorPage from "../Layout/ErrorPage";

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
      path: "/allStory",
      element: <AllStory />,
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
        {
          path: 'unity',
          element: <Community />
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
          path:'addStory',
          element: <AddStory />
        },
        {
          path:'profile',
          element: <ManageProfile />
        },
        {
          path:'guide',
          element: <JoinTourGuide />
        },
        {
          path:'payment',
          element:<Payment />
        },
        // guide
        {
          path:'profileGuide',
          element: <GuideProfile />
        },
        {
          path:'guideStory',
          element: <GuideStory />
        },
        {
          path:'manageGuideStory',
          element: <ManageGuideStory />
        },
        {
          path:'assigned',
          element: <MyAssignedTours />
        },
        // admin 
        {
          path:'package',
          element: <AdminRoute><AddPackage /></AdminRoute>
        },
        {
          path:'adminProflie',
          element: <AdminRoute><AdminProfile /></AdminRoute>
        },
        {
          path:'candidates',
          element: <AdminRoute><ManageCandidates /></AdminRoute>
        },
        {
          path:'users',
          element: <AdminRoute><ManageUsers /></AdminRoute>   
        },
        // shared list
        
      ]
    },
    {
      path:'*',
      element:<ErrorPage />
    }
  ]);

  