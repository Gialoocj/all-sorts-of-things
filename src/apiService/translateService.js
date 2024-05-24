import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl =
  //   "https://all-sorts-of-things.onrender.com/api/v1" ||
  "http://localhost:5000/api/v1";

export const translate = createAsyncThunk(
  "chat/translate",
  async ({ inputText, lang }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/translate`, {
        input: inputText,
        lang: lang,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
