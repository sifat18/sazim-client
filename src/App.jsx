import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/aurth/authSlice";

import { Outlet } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  // checking if user is already logged in
  useEffect(() => {
    if (localStorage.getItem("data")) {
      const user = JSON.parse(localStorage.getItem("data"));
      dispatch(
        setUser({
          name: user?.firstName + " " + user?.lastName,
          email: user?.email,
          id: user?.id,
        })
      );
      // setCount(1)
    }
  }, []);
  return (
    <>
      <Outlet></Outlet>
    </>
  );
}

export default App;
