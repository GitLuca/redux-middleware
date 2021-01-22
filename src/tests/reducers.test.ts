import reducer, { initialState, deletePost } from "../store/slice";
import { posts } from "../testData";
import { PostState } from "../types";
import {rest} from "msw"
import {setupServer} from "msw/node"

const server = setupServer(
  rest.get(
      '*',
      (_, res, ctx) => {
          return res(ctx.status(200))
      }
  ),
)

beforeAll(
  () => (
      server.listen()
  )
)
afterAll(() => server.close())
afterEach(() => {
  server.resetHandlers()
})

// this is a interesting test because it needs a setup for the state
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
