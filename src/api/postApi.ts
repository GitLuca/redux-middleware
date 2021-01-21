import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
import { getMode } from "../store/selectors";
import { deletePost } from "../store/slice";
import { RootState } from "../store/store";
import { ActionMeta, Mode, Post, PostState, User } from "../types";

export const API_ACTION = "api";

export type ActionApi = PayloadAction<ActionMeta>;

// unique fetch post, based on mode
export const initFetch = createAsyncThunk<
  User[] | Post[],
  void,
  { state: RootState }
>("posts/fetchInit", async (_, { getState }) => {
  const state = getState();
  const mode = getMode(state);
  const url = mode === "users" ? "/users" : "posts";
  const result = await axiosInstance.get(url);
  return result.data;
});

// separates, more simple fetches to call inside the Entity component
export const fetchUsers = createAsyncThunk<User[], void>("posts/fetchUsers", () =>
  axiosInstance.get("/users").then((result) => result.data)
);

export const fetchPosts = createAsyncThunk<Post[], void>("posts/fetchPosts", () =>
  axiosInstance.get("/posts").then((result) => result.data)
);

// export const deletePostApi = (postId: number): ActionApi => ({
//   type: API_ACTION,
//   payload: {
//     url: `/posts/${postId}`,
//     method: "delete",
//     onSuccess: deletePost,
//     body: {},
//   },
// });
// export const deletePostApi = () =>{}
