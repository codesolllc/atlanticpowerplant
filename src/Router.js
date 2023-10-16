import { Navigate } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Home from "./Pages/Home/Home";
import Otp from './Pages/Auth/Otp'
import UploadProduct from "./Pages/UploadProduct/UploadProduct";
import SingleProduct from "./Pages/SingleProduct/SingleProduct";
import ManageProducts from "./Pages/ManageProducts/ManageProducts";

const routes = [
  {
    path: "/admin_atlanticpower",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/otp-verify",
    element: <Otp />,
  },
  {
    path: "/upload-product",
    element: <UploadProduct />,
  },
  {
    path: "/single-product/:id",
    element: <SingleProduct />,
  },
  {
    path: "/manage-products",
    element: <ManageProducts />,
  },
  {
    path: "*",
    element: <Navigate to='/' />,
  },
  
];

export default routes