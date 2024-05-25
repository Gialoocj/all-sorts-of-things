import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import DefaultLayout from "./Layout/DefaultLayout/DefaultLayout";
import { publicRoutes, privateRoutes } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import PublicRoutes from "./components/PublicRoutes/PublicRoutes";
import PageNotFound from "./pages/Page404";

const App = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [position]);

  return (
    <div className="App">
      {/* {isDesktop && (
        <div
          className="pointer"
          style={{ left: position.x, top: position.y }}
        ></div>
      )} */}
      <Router>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}

          {privateRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <PublicRoutes>
                    <Layout>
                      <Page />
                    </Layout>
                  </PublicRoutes>
                }
              />
            );
          })}

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
