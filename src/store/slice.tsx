import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Mode, Post, PostState, User } from "../types";

const initialState: PostState = { posts: {}, mode: "posts", users: {} };

// type CustomPayload<T> =  PayloadAction<{apiReturn: T, meta: ActionMeta}>

const slice = createSlice({
  name: "posts",
  initialState,
  reducers: {
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
      const newPosts = Object.values(state.posts).reduce((acc, post) => {
        if (post.id === action.payload) {
          return acc;
        }
        return { ...acc, [post.id]: post };
      }, {});
      state.posts = newPosts;
    },
  },
});

export const { setPosts, setUsers, setMode, deletePost } = slice.actions;

export default slice.reducer;
