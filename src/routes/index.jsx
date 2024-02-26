import { createBrowserRouter } from "react-router-dom";
// import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import App from "../App";
import NotFound from "../pages/NotFound";
import { Home } from "../pages/Home";
import { CreateProduct } from "../pages/CreateProduct";
import {EditProduct} from "../pages/EditProduct";
import { AllProducts } from "../pages/AllProducts";
import { ProductView } from "../pages/ProductView";
import OverView from "../pages/OverView";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/All",
        element: <AllProducts />,
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
        path: "/overview",
        element: <OverView />,
      },
      {
        path: "/create-product",
        element: <CreateProduct />,
      },
      {
        path: "/edit/:productName",
        element: <EditProduct />,
      },
      {
        path: "/buy-rent/:productName",
        element: <ProductView />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
