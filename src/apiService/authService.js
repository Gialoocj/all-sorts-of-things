import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const baseUrl = "http://localhost:5000/api/v1";

export const register = createAsyncThunk(
  "auth/register",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/auth/register`,
        userCredentials
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/auth/login`,
        userCredentials
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
