import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
import { getMode } from "../store/selectors";
import { deletePost, setPosts, setUsers } from "../store/slice";
import { RootState } from "../store/store";
import { ActionMeta, Mode, Post, PostState, User } from "../types";

export const API_ACTION = "api";

export type ActionApi = PayloadAction<ActionMeta>;

// unique fetch post, based on mode
export const initFetch = (mode: Mode): ActionApi => ({
  type: API_ACTION,
  payload: {
    url: mode === "users" ? "/users" : "/posts",
    method: "get",
    onSuccess: mode === "users" ? setUsers : setPosts,
    body: {},
  },
});

// separates, more simple fetches to call inside the Entity component
export const fetchUsers = (): ActionApi => ({
  type: API_ACTION,
  payload: {
    url: "/users",
    method: "get",
    onSuccess: setUsers,
    body: {},
  },
});

export const fetchPosts = (): ActionApi => ({
  type: API_ACTION,
  payload: {
    url: "/posts",
    method: "get",
    onSuccess:setPosts,
    body: {},
  },
});

export const deletePostApi = (postId: number): ActionApi => ({
  type: API_ACTION,
  payload: {
    url: `/posts/${postId}`,
    method: "delete",
    onSuccess: deletePost,
    body: {},
  },
});

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
