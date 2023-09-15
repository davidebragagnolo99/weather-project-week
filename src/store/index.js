import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "../redux/reducers";

const store = configureStore({
  reducer: mainReducer,
});

export default store;
