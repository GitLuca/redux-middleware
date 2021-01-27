import reducer, { initialState, deletePost, setPosts, setUsers } from "../store/slice";
import { posts, users } from "../testData";
import { PostState } from "../types";

// here I can simply test the reducer without dispatching the thunk
test("should add posts to the state", () => {
  const postsObj = posts.reduce((acc, p) => ({ ...acc, [p.id]: p }), {});
  const correctState = { ...initialState, posts: postsObj };
  const newState = reducer(initialState, setPosts(posts));
  expect(newState).toEqual(correctState);
});

test("should add users to the state", () => {
  const usersObj = users.reduce((acc, u) => ({ ...acc, [u.id]: u }), {});
  const correctState = { ...initialState, users: usersObj };
  const newState = reducer(initialState, setUsers(users));
  expect(newState).toEqual(correctState);
});

describe("test delete all users", () => {
  const oldState = {
    ...initialState,
    posts: { [posts[0].id]: posts[0], [posts[1].id]: posts[1] },
  };
  test("should delete all if mode is users", () => {
    const stateToCheck = reducer(oldState, deletePost(posts[1].id));
    const newState = {
      ...initialState,
      posts: { [posts[0].id]: posts[0] },
    };
    expect(stateToCheck).toEqual(newState);
  });
  test("should not delete if mode is posts", () => {
    const userState: PostState = { ...oldState, mode: "users" };
    const stateToCheck = reducer(userState, deletePost(posts[1].id));
    expect(stateToCheck).toEqual(userState);
  });
});


