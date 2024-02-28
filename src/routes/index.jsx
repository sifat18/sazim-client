import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import App from "../App";
import NotFound from "../pages/NotFound";
import { Home } from "../pages/Home";
import { CreateProduct } from "../pages/CreateProduct";
import { EditProduct } from "../pages/EditProduct";
import { AllProducts } from "../pages/AllProducts";
import { ProductView } from "../pages/ProductView";
import OverView from "../pages/OverView";
import PrivateRoute from "../common/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "/All",
        element: (
          <PrivateRoute>
            <AllProducts />
          </PrivateRoute>
        ),
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
        element: (
          <PrivateRoute>
            <OverView />
          </PrivateRoute>
        ),
      },
      {
        path: "/create-product",
        element: (
          <PrivateRoute>
            <CreateProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit/:productName",
        element: (
          <PrivateRoute>
            <EditProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/buy-rent/:productName",
        element: (
          <PrivateRoute>
            <ProductView />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
