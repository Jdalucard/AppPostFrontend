import axios from "axios";

export const getPostsRequests = async () => {
  const res = await axios.get("/posts");
  return res.data;
};

export const createPostRequest = async (post) => {
  const form = new FormData();
  for (let key in post) {
    form.append(key, post[key]);
  }
  const res = await axios.post("/posts", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res;
};

/* http://localhost:4500/post/id */
export const deletePostRequest = async (_id) => {
  const res = await axios.delete(`/posts/${_id}`);
  return res;
};

export const getPostRequest = async (_id) => {
  const res = await axios.get(`/posts/${_id}`);
  return res;
};

export const updatePostRequest = async (_id, newfields) => {
  const form = new FormData();
  for (let key in newfields) {
    form.append(key, newfields[key]);
  }
  const res = await axios.put(`/posts/${_id}`, newfields);
  return res;
};
