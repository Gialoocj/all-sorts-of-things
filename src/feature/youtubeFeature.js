import { createSlice } from "@reduxjs/toolkit";
import {
  searchVideos,
  getVideoById,
  getPopularVideos,
} from "../apiService/youtubeService";

export const youtubeSlice = createSlice({
  name: "youtube",
  initialState: {
    videos: "",
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(searchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // console.log(action.payload);
      })
      .addCase(getVideoById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVideoById.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(getVideoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // console.log(action.payload);
      })
      .addCase(getPopularVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPopularVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(getPopularVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default youtubeSlice.reducer;
