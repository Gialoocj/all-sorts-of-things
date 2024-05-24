import { configureStore } from "@reduxjs/toolkit";
import chatFeature from "../feature/chatFeature";
import authFeature from "../feature/authFeature";
import youtubeFeature from "../feature/youtubeFeature";
import translateFeature from "../feature/translateFeature";

const store = configureStore({
  reducer: { chatFeature, authFeature, youtubeFeature, translateFeature },
});
export default store;
