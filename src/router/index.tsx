import {RouteObject} from "react-router-dom";
import Home from "@/views/home";
import Login from "@/views/login";

const routes: RouteObject[] = [
  {
    path: "/home",
    element: <Home/>
  },
  {
    path: "/login",
    element: <Login/>
  }
]


export default routes
