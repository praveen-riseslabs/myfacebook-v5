import ReactDOM from "react-dom/client";
import "./globels.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Registration from "./pages/Registration.jsx";
import { Provider } from "react-redux";
import { store } from "./store";
import ResetPassword from "./pages/ResetPassword.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Registration /> },
  { path: "/forgot-password", element: <ResetPassword /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
