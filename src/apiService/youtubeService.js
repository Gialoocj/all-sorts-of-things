import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const key = "AIzaSyDxyw5CSlgtx3TfH0H6E0vfIGkILa8aHnA";
const baseUrl = `https://www.googleapis.com/youtube/v3/`;

export const searchVideos = createAsyncThunk(
  "youtube/searchVideos",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}search`, {
        params: {
          key: key,
          type: "video",
          part: "snippet",
          q: query,
          maxResults: 12,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getVideoById = createAsyncThunk(
  "youtube/getVideoById",
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}videos`, {
        params: {
          key: key,
          part: "snippet",
          id: videoId,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPopularVideos = createAsyncThunk(
  "youtube/popularVideos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}videos`, {
        params: {
          key: key,
          part: "snippet,statistics",
          chart: "mostPopular",
          regionCode: "KR",
          maxResults: 18,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getChannelById = createAsyncThunk(
  "youtube/channelById",
  async (channelId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}channels`, {
        params: {
          key: key,
          id: channelId,
          part: "snippet,statistics",
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
