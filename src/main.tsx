import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { Landing } from "./pages/Landing";
import { Public } from "./components/Public";
import { Private } from "./components/Private";
import { Home } from "./pages/Home";
import { MainLayout } from "./layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Public>
        <Landing />
      </Public>
    ),
  },
  {
    path: "/login",
    element: (
      <Public>
        <Login />
      </Public>
    ),
  },
  {
    path: "/register",
    element: (
      <Public>
        <Register />
      </Public>
    ),
  },
  {
    path: "/",
    element: (
      <Private>
        <MainLayout />
      </Private>
    ),
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
