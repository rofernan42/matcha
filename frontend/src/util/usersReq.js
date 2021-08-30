// export const url = "http://localhost:8000/";
export const url = "http://192.168.1.44:8000/";

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

export const fetchCurrentUser = async (token) => {
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

export const updateUser = async (data) => {
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

export const updateImage = async (data) => {
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
