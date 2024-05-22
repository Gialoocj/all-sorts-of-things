// import Home from "../pages/Home";
import config from "../config";
import DefaultLayout from "../Layout/DefaultLayout";
import Register from "../pages/Register/Register";
import Login from "../pages/Login";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Film from "../pages/Film";

const publicRoutes = [
  {
    path: config.routes.watch,
    component: Film,
    layout: MainLayout,
  },

  {
    path: config.routes.register,
    component: Register,
    layout: null,
  },

  {
    path: config.routes.login,
    component: Login,
    layout: null,
  },
];

export { publicRoutes };
