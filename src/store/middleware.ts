import { Dispatch, Middleware } from "redux";
import {
  ActionApi,
  API_ACTION,
  onSuccessMask,
} from "../api/postApi";
import axiosInstance from "../axiosInstance";
import { ActionMeta } from "../types";

export const apiMiddleware: Middleware = (store) => (next) => (
  action: ActionApi
) => {
    console.log('action', action)
  try {
    if (action.type === API_ACTION) {
      return asyncHandler(store.dispatch, action.payload);
    }
    return next(action);
  } catch (error) {
    console.log("error", error);
  }
};

const asyncHandler = async (dispatch: Dispatch, meta: ActionMeta) => {
  const result = await axiosInstance({
    method: meta.method,
    url: meta.url,
    data: meta.body,
  });
  const action = onSuccessMask[meta.onSuccess];
  return dispatch(action(result.data));
};
