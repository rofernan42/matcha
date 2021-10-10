import { configureStore } from "@reduxjs/toolkit";
import currentUserSlice from "./currentUser-slice";

const store = configureStore({
  reducer: { currentUser: currentUserSlice.reducer },
});

export default store;
