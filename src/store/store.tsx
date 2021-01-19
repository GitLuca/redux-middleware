import { configureStore } from "@reduxjs/toolkit";
import { apiMiddleware } from "./middleware";
import slice from "./slice";

export const store = configureStore({
    reducer: {
        post: slice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiMiddleware)
});

export type RootState = ReturnType<typeof store.getState>