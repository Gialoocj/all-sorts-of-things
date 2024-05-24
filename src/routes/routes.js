// import Home from "../pages/Home";
import config from "../config";
import DefaultLayout from "../Layout/DefaultLayout";
import Register from "../pages/Register/Register";
import Login from "../pages/Login";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Film from "../pages/Film";
import ChatBot from "../pages/ChatBot";
import Page404 from "../pages/Page404";
import Forbidden from "../pages/Forbidden/Forbidden";
import Translate from "../pages/Translate/Translate";

const publicRoutes = [
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

  {
    path: config.routes.error,
    component: Page404,
    layout: null,
  },
  {
    path: config.routes.forbidden,
    component: Forbidden,
    layout: null,
  },
];

const privateRoutes = [
  {
    path: config.routes.watch,
    component: Film,
    layout: MainLayout,
  },
  {
    path: config.routes.chatbot,
    component: ChatBot,
    layout: MainLayout,
  },
  { path: config.routes.translate, component: Translate, layout: MainLayout },
];

export { publicRoutes, privateRoutes };
