/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";
import { Login } from "../pages/Login";

const PrivateRoute = ({ children }) => {
  const { id } = useSelector((state) => state.auth);

  if (!id) {
    return <Login />;
  }

  return children;
};

export default PrivateRoute;
