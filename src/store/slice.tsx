import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    setPosts(state, action: PayloadAction<Post[]>) {
      const newPosts = action.payload.reduce((acc, post) => {
        return { ...acc, [post.id]: post };
      }, {} as Record<number, Post>);
      state.posts = newPosts;
    },
    setMode(state, action: PayloadAction<Mode>) {
      state.mode = action.payload;
    },
    setUsers(state, action: PayloadAction<User[]>) {
      const newUsers = action.payload.reduce((acc, user) => {
        return { ...acc, [user.id]: user };
      }, {} as Record<number, User>);
      state.users = newUsers;
    },
    deletePost(state, action: PayloadAction<number>) {
      if (state.mode === "posts") {
        const newPosts = Object.values(state.posts).reduce((acc, post) => {
          if (post.id === action.payload) {
            return acc;
          }
          return { ...acc, [post.id]: post };
        }, {});
        state.posts = newPosts;
      }
    },
    deleteAllUsers(state) {
        if(state.mode === "users") {
            state.users = {}
        }
    }
  },
});

export const {
  setPosts,
  setUsers,
  setMode,
  deletePost,
  setLoading,
  setError,
  clearErrors,
  deleteAllUsers
} = slice.actions;

export default slice.reducer;
