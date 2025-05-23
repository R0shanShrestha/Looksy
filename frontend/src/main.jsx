import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login&signup/Login.jsx";
import Register from "./pages/Login&signup/Register.jsx";
import UserContext from "./context/UserContext.jsx";
import UserAuthWrapper from "./wrappers/UserAuthWrapper.jsx";
import PhotoContext from "./context/PhotoContext.jsx";
import UserProfile from "./pages/Account/UserProfile.jsx";
import Logout from "./pages/Login&signup/Logout.jsx";
import ExplorePage from "./pages/Explore/ExplorePage.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/explore",
        element: (
          <UserAuthWrapper>
            <ExplorePage />
          </UserAuthWrapper>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: (
          <UserAuthWrapper>
            <UserProfile />
          </UserAuthWrapper>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/logout",
        element: (
          <UserAuthWrapper>
            <Logout />
          </UserAuthWrapper>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <UserContext>
    <PhotoContext>
      <RouterProvider router={routes} />
    </PhotoContext>
  </UserContext>
);
