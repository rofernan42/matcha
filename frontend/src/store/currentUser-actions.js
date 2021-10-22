import { url } from "../util/utils";
import { currentUserActions } from "./currentUser-slice";
import { toast } from "react-toastify";

export const fetchCurrentUser = (token) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch(url + "profile", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch user data.");
      }
      return data;
    };
    try {
      const userData = await fetchData();
      dispatch(currentUserActions.setUser({ ...userData }));
      return true;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
};

export const userAction = (data) => {
  return async () => {
    const sendData = async () => {
      const res = await fetch(url + data.path, {
        method: data.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      });
      const resData = await res.json();
      if (!res.ok) {
        const error = new Error("Something went wrong.");
        error.data = resData.message;
        throw error;
      }
      return resData;
    };
    try {
      const data = await sendData();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateUser = (data) => {
  return async (dispatch) => {
    const sendData = async () => {
      const res = await fetch(url + data.path, {
        method: "PUT",
        body: JSON.stringify({ data: data.toUpdate }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      });
      const resData = await res.json();
      if (!res.ok) {
        const error = new Error("Something went wrong.");
        error.data = resData.message;
        throw error;
      }
      return resData;
    };
    try {
      const data = await sendData();
      dispatch(currentUserActions.updateUser({ ...data }));
    } catch (err) {
      console.log(err.data);
      toast.error("Something went wrong.");
      return err.data;
    }
  };
};

export const updateImage = (data) => {
  return async (dispatch) => {
    const sendData = async () => {
      let res;
      if (data.req === "POST") {
        const formData = new FormData();
        formData.append("image", data.files);
        formData.append("imageNb", data.imageNb);
        res = await fetch(url + data.path, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + data.token,
          },
        });
      } else if (data.req === "DELETE") {
        res = await fetch(url + data.path, {
          method: "DELETE",
          body: JSON.stringify({ imageNb: data.imageNb }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + data.token,
          },
        });
      }
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message || "Could not update image.");
      }
      return resData;
    };
    try {
      const data = await sendData();
      dispatch(currentUserActions.updateUser({ ...data }));
    } catch (err) {
      console.log(err.data);
      toast.error("Something went wrong.");
    }
  };
};
