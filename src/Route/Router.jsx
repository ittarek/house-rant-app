import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../Page/home/Home";
import Owner from "../dashboard/ownerDashboard/Owner ";
import Renter from "../dashboard/RenterDashbord/Renter";
import SignUp from "../authentication/SignUp";

import Login from "./../authentication/Login";
import PrivetRoute from "./PrivetRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/house-renter",
        element: <Renter />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "house-owner",
    element: <Owner />,
    children: [
      {
        path: "/house-owner",
        element: (
          <PrivetRoute>
            {" "}
            <Owner />
          </PrivetRoute>
        ),
      },
    ],
  },
]);
