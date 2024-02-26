// import ReactDOM from "react-dom/client";
// import "./globels.css";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/js/bootstrap.bundle.js";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Home from "./pages/Home.jsx";
// import Login from "./pages/Login.jsx";
// import Registration from "./pages/Registration.jsx";
// import { Provider } from "react-redux";
// import { store } from "./store";
// import ResetPassword from "./pages/ResetPassword.jsx";
// import NewPassword from "./pages/NewPassword.jsx";
// import NotFound from "./pages/NotFound.jsx";

// const router = createBrowserRouter([
//   { path: "/", element: <Home /> },
//   { path: "/login", element: <Login /> },
//   { path: "/register", element: <Registration /> },
//   { path: "/forgot-password", element: <ResetPassword /> },
//   { path: "/new-password", element: <NewPassword /> },
//   { path: "/*", element: <NotFound /> },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     <RouterProvider router={router} />
//   </Provider>
// );

import ReactDOM from "react-dom/client";
import "./globels.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Registration from "./pages/Registration.jsx";
import { Provider } from "react-redux";
import { store } from "./store";
import ResetPassword from "./pages/ResetPassword.jsx";
import Layout from "./pages/layout/Layout";
import Dashboard from "./pages/Dashboard";
import MyDocument from "./pages/MyDocument";
import MyHealth from "./pages/MyHealth";
import NewPassword from "./pages/NewPassword.jsx";
import NotFound from "./pages/NotFound.jsx";
import Social from "./pages/Social";
import Twitter from "./pages/Twitter";
import Instagram from "./pages/Instagram";
import Facebook from "./pages/Facebook";

// const router = createBrowserRouter([
//   { path: "/", element: <Home /> },
//   { path: "/login", element: <Login /> },
//   { path: "/register", element: <Registration /> },
//   { path: "/forgot-password", element: <ResetPassword /> },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        {/* <RouterProvider router={router} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/*" element={<NotFound />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/mydocument" element={<MyDocument/>}/>
          <Route path="/myhealth" element={<MyHealth/>}/>
          <Route path="/social" element={<Social/>}/>
          <Route path="/facebook" element={<Facebook/>}/>
          <Route path="/twitter" element={<Twitter/>}/>
          <Route path="/instagram" element={<Instagram/>}/>
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);
