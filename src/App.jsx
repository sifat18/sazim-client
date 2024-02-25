// import { Home } from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";

// import { Login } from "./pages/Login";
import { Outlet } from "react-router-dom";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Outlet></Outlet>
    </>
  );
}

export default App;
