import { url } from "./utils"

export const fetchUsers = async (data) => {
  const res = await fetch(url + data.path, {
    headers: {
      Authorization: "Bearer " + data.token,
    },
  });
  const resData = await res.json();
  if (!res.ok) {
    throw new Error(resData.message || "Could not fetch users.");
  }
  const usersData = [];
  for (const elem of resData.users) {
    usersData.push({ key: elem._id, ...elem });
  }
  return {
    users: usersData,
    totalItems: resData.totalItems,
    perPage: resData.perPage,
  };
};

export const fetchUser = async (data) => {
  const res = await fetch(url + data.path, {
    headers: {
      Authorization: "Bearer " + data.token,
    },
  });
  const resData = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch user data.");
  }
  return resData;
};
