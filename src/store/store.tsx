import { configureStore } from "@reduxjs/toolkit";
import { API_ACTION } from "../api/postApi";
import { apiMiddleware } from "./middleware";
import slice from "./slice";

export const store = configureStore({
  reducer: {
    post: slice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [API_ACTION],
      },
    }).concat(apiMiddleware),
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
