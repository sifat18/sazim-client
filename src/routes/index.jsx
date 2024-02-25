import { createBrowserRouter } from "react-router-dom";
// import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import App from "../App";
import NotFound from "../pages/NotFound";
import { Home } from "../pages/Home";
import { CreateProduct } from "../pages/CreateProduct";

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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/create-product",
        element: <CreateProduct />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
