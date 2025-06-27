import { createBrowserRouter } from "react-router-dom";
import RoommateDetails from "../Components/RoommateDetails/RoommateDetails";
import AddRoommate from "../pages/AddRoommate/AddRoommate";
import BrowseListing from "../pages/BrowseListing/BrowseListing";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import MyListings from "../pages/MyListings/MyListings";
import MyProfile from "../pages/MyProfile/MyProfile";
import Register from "../pages/Register/Register";
import Root from "../pages/Root/Root";
import UpdateListing from "../pages/UpdateListing/UpdateListing";
import ErrorPage from "./../pages/ErrorPage/ErrorPage";
import DashboardLayout from "../Components/DashboardLayout";
import DashboardOverview from "../pages/Dashboard/Overview";
import TermsOfService from "../Components/TermsOfServices/TermsOfService";
import PrivacyPolicy from "../Components/TermsOfServices/PrivacyPolicy";
import RefundPolicy from "../Components/TermsOfServices/RefundPolicy";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/my-profile",
        Component: MyProfile,
      },
      {
        path: "/my-listings",
        Component: MyListings,
      },
      {
        path: "/browse-listing",
        loader: () =>
          fetch("https://roommate-finder-server-rouge.vercel.app/roommates"),
        Component: BrowseListing,
      },
      {
        path: "/find-roommate",
        Component: AddRoommate,
      },
      {
        path: "/update-listing/:id",
        loader: ({ params }) =>
          fetch(
            `https://roommate-finder-server-rouge.vercel.app/roommates/${params.id}`
          ),
        Component: UpdateListing,
      },
      {
        path: "/roommate/:id",
        Component: RoommateDetails,
      },
      {
        path: "/terms" ,
        Component: TermsOfService 
      },
      {
        path: "/privacy" ,
        Component: PrivacyPolicy 
      },
      {
        path: "/refund" ,
        Component: RefundPolicy 
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardOverview /> },
          { path: "overview", element: <DashboardOverview /> },
          {
            path: "browse-listing",
            loader: () =>
              fetch(
                "https://roommate-finder-server-rouge.vercel.app/roommates"
              ),
            element: <BrowseListing />,
          },
          { path: "my-profile", element: <MyProfile /> },
          { path: "my-listings", element: <MyListings /> },
        ],
      },
    ],
  },
]);
