import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
import { getPosts } from "../store/selectors";
import { RootState } from "../store/store";
import { ActionMeta, Post, User } from "../types";

export const API_ACTION = "api";

export type ActionApi = PayloadAction<ActionMeta>;

// separates, more simple fetches to call inside the Entity component
export const fetchUsers = createAsyncThunk<User[], void>(
  "posts/fetchUsers",
  () => axiosInstance.get("/users").then((result) => result.data)
);

// note: the API are managed in the state (fulfilled, rejected ecc) with the string, with no typeCheck
// not the best experience
export const fetchPosts = createAsyncThunk<Post[], void>(
  "posts/fetchPosts",
  () => axiosInstance.get("/posts").then((result) => result.data)
);

export const deletePost = createAsyncThunk<void, number>(
  "posts/fetchPosts",
  (postId) => {
    // JSON placeholder API doesn't return anything after delete
    return axiosInstance.delete(`/posts/${postId}`);
  }
);

// new API just to explain why thunks start to be complicated
// it lets you manage state in great detail, with a good typescript integration
export const complicateDeletePost = createAsyncThunk<
  void,
  number,
  { state: RootState }
>("posts/complicatePosts", (postId, { getState }) => {
  const posts = getPosts(getState());
  const myPost = posts.find((p) => p.id === postId);
  // suppose we can delete posts only with userId == 1
  if (myPost?.userId === 1) {
    return axiosInstance.delete(`/posts/${postId}`);
  }
});
