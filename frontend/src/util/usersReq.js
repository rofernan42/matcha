export const fetchUsers = async (token) => {
  const res = await fetch("http://localhost:8000/users", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const resData = await res.json();
  if (!res.ok) {
    throw new Error(resData.message || "Could not fetch users");
  }
  const usersData = [];
  for (const elem of resData) {
    usersData.push({ key: elem._id, ...elem });
  }
  return usersData;
};

export const fetchCurrentUser = async (token) => {
  const res = await fetch("http://localhost:8000/profile", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch user data");
  }
  return data;
};

export const updateGender = async (data) => {
  const res = await fetch("http://localhost:8000/change-gender", {
    method: "POST",
    body: JSON.stringify({ gender: data.gender }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    },
  });
  const resData = await res.json();
  if (!res.ok) {
    throw new Error(resData.message || "Could not update gender");
  }
  return resData;
};
