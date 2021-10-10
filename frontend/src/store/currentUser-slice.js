import { createSlice } from "@reduxjs/toolkit";

const currentUserSlice = createSlice({
  name: "current-user",
  initialState: {
    data: null,
  },
  reducers: {
    setUser(state, action) {
      state.data = action.payload;
    },
    updateUser(state, action) {
      state.data = { ...state.data, ...action.payload };
    },
    setLike(state, action) {
      if (state.data) {
        const userId = +action.payload;
        if (state.data.likes.includes(userId))
          state.data.likes = state.data.likes.filter((like) => like !== userId);
        else state.data.likes.push(userId);
      }
    },
  },
});

export const currentUserActions = currentUserSlice.actions;
export default currentUserSlice;
