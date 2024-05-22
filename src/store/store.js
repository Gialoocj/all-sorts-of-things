import { configureStore } from "@reduxjs/toolkit";
import chatFeature from "../feature/chatFeature";
import authFeature from "../feature/authFeature";
import youtubeFeature from "../feature/youtubeFeature";

const store = configureStore({
  reducer: { chatFeature, authFeature, youtubeFeature },
});
export default store;
