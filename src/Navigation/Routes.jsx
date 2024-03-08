import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../Components/Loader";
import GetUser from "../lib/get-data";
import "../App.css";

//Auth Routes
const Login = lazy(() => import("../Pages/Auth/Login"));
const Logout = lazy(() => import("../Pages/Auth/Logout"));
const Register = lazy(() => import("../Pages/Auth/Register"));
const ForgotPassword = lazy(() => import("../Pages/Auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../Pages/Auth/ResetPassword"));
const VerifyEmail = lazy(() => import("../Pages/Auth/VerifyEmail"));

//User Routes
const Dashboard = lazy(() => import("../Pages/Dashboard"));
const Trending = lazy(() => import("../Pages/Trending"));
const UploadProfile = lazy(() => import("../Pages/User/UploadProfile"));
const Search = lazy(() => import("../Pages/Search"));
const CreatePost = lazy(() => import("../Pages/CreatePost"));
const Chat = lazy(()=> import("../Pages/Messages/Chat"))
const EditPost = lazy(() => import("../Pages/EditPost"));
const User = lazy(() => import("../Pages/User"));
const Post = lazy(() => import("../Pages/PostView"));
const Notifications = lazy(() => import("../Pages/Notifications"));

const Messages = lazy(() => import("../Pages/Messages/Messages"));

//Other Routes
const PageNotFound = lazy(() => import("../Pages/PageNotFound"));

const Layout = lazy(() => import("../Pages/Layout"));

const navs = [
  {
    path: "/",
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
    isPrivate: false,
  },
  { path: "/login", element: <Login />, isPrivate: false },
  { path: "/logout", element: <Logout />, isPrivate: false },
  { path: "/forgot-password", element: <ForgotPassword />, isPrivate: false },
  { path: "/reset-password/:token", element: <ResetPassword />, isPrivate: false },
  {
    path: "/register",
    element: <Register />,
    isPrivate: false,
  },
  {
    path: "/loader",
    element: <Loader />,
    isPrivate: false,
  },
  {
    path: "*",
    element: <PageNotFound />,
    isPrivate: false,
  },
  {
    path: "/trending",
    element: (
      <Layout>
        <Trending />
      </Layout>
    ),
    isPrivate: true,
  },
  {
    path: "/create-post",
    element: (
      <Layout>
        <CreatePost />
      </Layout>
    ),
    isPrivate: true,
  },
  {
    path: "/messages",
    element: (
      <Layout>
        <Messages/>
      </Layout>
    ),
    isPrivate: false,
  },
  // {
  //   path: "/Chat",
  //   element: (
  //     <Layout>
  //       <Chat/>
  //     </Layout>
  //   ),
  //   isPrivate: true,
  // },
  {
    path: "/search",
    element: (
      <Layout>
        <Search />
      </Layout>
    ),
    isPrivate: true,
  },
  {
    path: "/verify-email/:token",
    element: <VerifyEmail />,
    isPrivate: true,
  },
  {
    path: "/my-profile",
    element: (
      <Layout>
        <User userType="auth" />
      </Layout>
    ),
    isPrivate: true,
  },
  {
    path: "/user/:username",
    element: (
      <Layout>
        <User userType="guest" />
      </Layout>
    ),
    isPrivate: true,
  },
  {
    path: "/profile",
    element: <UploadProfile />,
    isPrivate: true,
  },
  {
    path: "/notifications",
    element: (
      <Layout>
        <Notifications />
      </Layout>
    ),
    isPrivate: true,
  },
  {
    path: "/post/edit/:postid",
    element: (
      <Layout>
        <EditPost />
      </Layout>
    ),
    isPrivate: true,
  },
  {
    path: "/post/:postid",
    element: (
      <Layout>
        <Post />
      </Layout>
    ),
    isPrivate: false,
  },
];

function AllRoutes() {
  const user = GetUser();

  return (
    <Routes>
      {navs.map((r, i) => {
        if (r.isPrivate && user != null) {
          return (
            <Route
              key={i}
              path={r.path}
              element={
                <React.Suspense fallback={<Loader />}>
                  {r.element}
                </React.Suspense>
              }
            />
          );
        } else if (r.isPrivate && user == null) {
          return (
            <Route
              key={i}
              path={r.path}
              element={
                <React.Suspense fallback={<Loader />}>
                  <Login />
                </React.Suspense>
              }
            />
          );
        } else if (!r.isPrivate) {
          return (
            <Route
              key={i}
              path={r.path}
              element={
                <React.Suspense fallback={<Loader />}>
                  {r.element}
                </React.Suspense>
              }
            />
          );
        }
      })}
    </Routes>
  );
}

export default AllRoutes;
