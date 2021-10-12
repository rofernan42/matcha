import { url } from "./utils";

export const fetchMatches = async (data) => {
  const res = await fetch(url + data.path, {
    headers: {
      Authorization: "Bearer " + data.token,
    },
  });
  const resData = await res.json();
  if (!res.ok) {
    throw new Error(resData.message || "Could not fetch matches.");
  }
  const matchesData = [];
  for (const elem of resData.matches) {
    matchesData.push({ key: elem.match._id, ...elem });
  }
  return {
    matches: matchesData,
  };
};

export const getRoom = async (data) => {
  const res = await fetch(url + data.path, {
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
