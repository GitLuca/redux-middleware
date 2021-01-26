import { complicateDeletePost, fetchPosts, fetchUsers } from "../api/postApi";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { store } from "../store/store";
import reducer, { initialState } from "../store/slice";
import { base_URL } from "../axiosInstance";
import { posts, users } from "../testData";

// we are using msw to mock API calls
const server = setupServer(
  rest.get(`${base_URL}/posts`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(posts));
  }),
  rest.get(`${base_URL}/users`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(users));
  }),
  rest.delete(`${base_URL}/posts/:postId`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(posts));
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
});

test("should return a correct fetchPosts action", async () => {
  const postObj = posts.reduce((acc, p) => ({ ...acc, [p.id]: p }), {});
  const correctState = { ...initialState, posts: postObj };
  const fulfilled = await store.dispatch(fetchPosts());
  const newState = reducer(initialState, fulfilled);
  expect(newState).toEqual(correctState);
});

test("should return a correct fetchUsers action", async () => {
  const userObj = users.reduce((acc, p) => ({ ...acc, [p.id]: p }), {});
  const correctState = { ...initialState, users: userObj };
  const fulfilled = await store.dispatch(fetchUsers());
  const newState = reducer(initialState, fulfilled);
  expect(newState).toEqual(correctState);
});

// with thunk it seems a good idea to pass less infos and take them from store
// but testing is hard that way
test("should delete posts only if userId === 1", async () => {
  //TODO: how does we can initialize the store this way?
  const postObj = posts.reduce((acc, p) => ({ ...acc, [p.id]: p }), {});
  const objWithoutFirst = posts.reduce((acc, p) => {
    if (p.id === 1) {
      return acc;
    }
    return { ...acc, [p.id]: p };
  }, {});
  const correctState = { ...initialState, posts: objWithoutFirst };
  // this will fail, no post cannot be found in the state
  const fulfilled = await store.dispatch(complicateDeletePost(1));
  const newState = reducer({ ...initialState, posts: postObj }, fulfilled);
  expect(newState).toEqual(correctState);
});
