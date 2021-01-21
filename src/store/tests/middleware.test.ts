import { API_ACTION } from "../../api/postApi";
import { apiMiddleware } from "../middleware";
import * as slice from "../slice"

const create = (store) => {
  const next = jest.fn();

  const invoke = (action) => apiMiddleware(store)(next)(action);

  return { store, next, invoke };
};

//TODO: non so come testare che unSuccess giusta sia chiamata
describe("test API actions", () => {
    test('should call error action', async () => {
        const spyError = jest.spyOn(slice, "setError")
        const store = {
            getState: jest.fn(() => ({})),
            dispatch: jest.fn(),
          };
          const { next, invoke } = create(store);
          const action = { type: API_ACTION, payload: { onSuccess: "wrongString" } };
          await invoke(action);
          expect(spyError).toHaveBeenCalled();
    })
    
  test("should not call next", async() => {
    const store = {
      getState: jest.fn(() => ({})),
      dispatch: jest.fn(),
    };
    const { next, invoke } = create(store);
    //TODO: iìI don't like writing the right string "setUsers"
    const action = { type: API_ACTION, payload: { onSuccess: "setUsers" } };
    await invoke(action);
    expect(next).toBeCalledTimes(0);
  });

  test("should call dispatch for action and loading", async () => {
    const mockDispatch = jest.fn();
    const store = {
      getState: jest.fn(() => ({})),
      dispatch: mockDispatch,
    };
    const { invoke } = create(store);
    const action = { type: API_ACTION, payload: { onSuccess: "setUsers" } };
    await invoke(action);
    expect(mockDispatch).toBeCalledTimes(3);
  });
});

describe("test not_api actions", () => {
  test("should call next", () => {
    const store = {
      getState: jest.fn(() => ({})),
      dispatch: jest.fn(),
    };
    const { next, invoke } = create(store);
    const action = { type: "NOT_API", payload:{onSuccess: "setUsers"} };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  test("should not call dispatch for action and loading", async () => {
    const mockDispatch = jest.fn();
    const store = {
      getState: jest.fn(() => ({})),
      dispatch: mockDispatch,
    };
    const { invoke } = create(store);
    const action = { type: "NOT_API", payload: { onSuccess: "setUsers" } };
    await invoke(action);
    expect(mockDispatch).toBeCalledTimes(0);
  });
});
