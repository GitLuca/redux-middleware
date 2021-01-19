import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const getPostState = (state: RootState) => state.post;

export const getPosts = createSelector([getPostState], (state) =>
  Object.values(state.posts)
);

export const getUsers= createSelector([getPostState], (state) =>
  Object.values(state.users)
);

export const getMode = createSelector([getPostState], (state) => state.mode)