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
