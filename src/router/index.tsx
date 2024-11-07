import React, { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";

const Home = lazy(() => import("@/views/home"));
const Login = lazy(() => import("@/views/login"));
const AuthPhone = lazy(() => import("@/views/auth-phone"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/auth_phone" />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/auth_phone",
    element: <AuthPhone />,
  },
];

export default routes;
