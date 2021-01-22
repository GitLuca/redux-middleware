import { Middleware } from "redux";
import { ActionApi, API_ACTION } from "../api/postApi";
import axiosInstance from "../axiosInstance";
import { ActionMeta } from "../types";
import { setLoading, setError } from "./slice";

export const apiMiddleware: Middleware = ({ dispatch }) => (next) => async (
  action: ActionApi
) => {
  if (action.type === API_ACTION) {
    dispatch(setLoading(true));
    return asyncHandler(action.payload)
      .then((result) => {
        const nextAction = action.payload.onSuccess;
        return dispatch(nextAction(result));
      })
      .catch((e) =>  dispatch(setError(e.message)))
      .finally(() => dispatch(setLoading(false)));
  }
  return next(action);
};

const asyncHandler = async (meta: ActionMeta) =>
  axiosInstance({
    method: meta.method,
    url: meta.url,
    data: meta.body,
  }).then((response) => response.data);
