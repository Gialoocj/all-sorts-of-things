import { createSlice } from "@reduxjs/toolkit";
import { sendMessage } from "../apiService/chatService";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: "",
    error: null,
    loading: false,
    // data: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
      });
  },
});

export default chatSlice.reducer;
