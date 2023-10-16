import { Navigate } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Home from "./Pages/Home/Home";
import Otp from "./Pages/Auth/Otp";
import SingleProduct from "./Pages/SingleProduct/SingleProduct";

const UserRoutes = [
  
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin-login",
    element: <Login />,
  },
  {
    path: "/otp-verify",
    element: <Otp />,
  },
  {
    path:'*',
    element: <Navigate to='/' />
  },
  {
    path: "/single-product/:id",
    element: <SingleProduct />,
  },
];

export default UserRoutes