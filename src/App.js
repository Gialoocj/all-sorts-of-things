import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import DefaultLayout from "./Layout/DefaultLayout/DefaultLayout";
import { publicRoutes } from "./routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  return (
    <div className="App">
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
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
