import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import { router } from "./routes/index.jsx";
import { store } from "./redux/store.js";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
</React.StrictMode>
)
