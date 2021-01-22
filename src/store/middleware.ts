import { Middleware } from "redux";
import { ActionApi, API_ACTION } from "../api/postApi";
import axiosInstance from "../axiosInstance";
import { ActionMeta } from "../types";
import { setLoading } from "./slice";

export const apiMiddleware: Middleware = ({ dispatch }) => (next) => async (
  action: ActionApi
) => {
  if (action.type === API_ACTION) {
    dispatch(setLoading(true));
    return asyncHandler(action.payload)
      .then((result) => {
<<<<<<< HEAD
        dispatch(setLoading(false));
        const nextAction = action.payload.onSuccess;
=======
        const nextAction = onSuccessMask[action.payload.onSuccess];
>>>>>>> parent of efd705e... testing complete
        return dispatch(nextAction(result));
      })
      .catch((e) => console.log("e", e))
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
