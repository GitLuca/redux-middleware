import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers, fetchPosts, initFetch } from "../api/postApi";
import { Mode, Post, PostState, User } from "../types";

export const initialState: PostState = {
  posts: {},
  mode: "posts",
  users: {},
  loading: false,
  error: [],
};

const slice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.error.push(action.payload);
    },
    clearErrors(state) {
      state.error = [];
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setMode(state, action: PayloadAction<Mode>) {
      state.mode = action.payload;
    },
    deleteAllUsers(state) {
      if (state.mode === "users") {
        state.users = {};
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      const newPosts = action.payload.reduce((acc, post) => {
        return { ...acc, [post.id]: post };
      }, {} as Record<number, Post>);
      state.posts = newPosts;
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      const newUsers = action.payload.reduce((acc, user) => {
        return { ...acc, [user.id]: user };
      }, {} as Record<number, User>);
      state.users = newUsers;
    })
    // builder.addCase(initFetch.fulfilled, (state, action) => {
      // const newUsers = action.payload.reduce((acc, user) => {
      //   return { ...acc, [user.id]: user };
      // }, {} as Record<number, User>);
      // state.users = newUsers;
    // })
  },
});

export const {
  setMode,
  setLoading,
  setError,
  clearErrors,
  deleteAllUsers,
} = slice.actions;

export default slice.reducer;
