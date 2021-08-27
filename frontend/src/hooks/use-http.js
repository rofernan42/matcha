import { useCallback, useReducer } from "react";

const httpReducer = (state, action) => {
  if (action.type === "SEND") {
    return {
      data: null,
      error: null,
      status: "pending",
    };
  }
  if (action.type === "SUCCESS") {
    return {
      data: action.data,
      error: null,
      status: "completed",
    };
  }
  if (action.type === "ERROR") {
    return {
      data: null,
      error: action.message,
      status: "completed",
    };
  }
  return state;
};

const useHttp = (reqFct, isPending = false) => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: isPending ? "pending" : null,
    data: null,
    error: null,
  });
  const sendReq = useCallback(
    async (reqData) => {
      dispatch({ type: "SEND" });
      try {
        const resData = await reqFct(reqData);
        dispatch({ type: "SUCCESS", data: resData });
      } catch (err) {
        dispatch({
          type: "ERROR",
          message: err.data || "Something went wrong",
        });
      }
    },
    [reqFct]
  );
  return { sendReq, ...httpState };
};

export default useHttp;
