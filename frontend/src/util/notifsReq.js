import { url } from "./utils";

export const fetchNotifs = async (data) => {
  const res = await fetch(url + data.path, {
    headers: {
      Authorization: "Bearer " + data.token,
    },
  });
  const resData = await res.json();
  if (!res.ok) {
    throw new Error(resData.message || "Could not fetch notifs.");
  }
  const notifsData = [];
  for (const elem of resData) {
    notifsData.push({ key: elem._id, ...elem });
  }
  return notifsData;
};

export const createNotification = async (data) => {
  const res = await fetch(url + "create-notification", {
    method: "POST",
    body: JSON.stringify({
      type: data.type,
      fromName: data.fromName,
      userId: data.userId,
    }),
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

export const deleteNotifications = async (data) => {
  const res = await fetch(url + data.path, {
    method: "DELETE",
    headers: {
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
