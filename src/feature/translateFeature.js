import { createSlice } from "@reduxjs/toolkit";
import { translate } from "../apiService/translateService";

const translateSlice = createSlice({
  name: "translate",
  initialState: {
    translated: "",
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(translate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(translate.fulfilled, (state, action) => {
      state.loading = false;
      state.translated = action.payload;
    });
    builder.addCase(translate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default translateSlice.reducer;
