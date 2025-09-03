/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [], // Changed from null to [] to prevent null errors
  reducers: {
    addFeed: (state, action) => {
      // Handle nested data (e.g., { data: [users] }) or direct array
      const payload = action.payload;
      if (Array.isArray(payload)) return payload;
      if (payload?.data && Array.isArray(payload.data))
        return payload.data;
      return []; // Fallback to empty array if invalid
    },
    removeUserFromFeed: (state, action) => {
      // Handle case where state might not be an array (e.g., initial load)
      if (!Array.isArray(state)) return state;
      return state.filter((user) => user?._id !== action.payload);
    },
  },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
