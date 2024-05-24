import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl =
  "https://all-sorts-of-things.onrender.com/api/v1" ||
  "http://localhost:5000/api/v1";

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (message, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/chat/send`, {
        message: message,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
