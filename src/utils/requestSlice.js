import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    addRequests: (state, action) => {
      return Array.isArray(action.payload) ? action.payload : [];
    },
    removeRequest: (state, action) => {
      if (!Array.isArray(state)) return state;
      return state.filter((r) => r._id !== action.payload);
    },
  },
});

export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
