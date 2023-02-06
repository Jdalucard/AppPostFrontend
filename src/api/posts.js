import axios from "axios";

export const getPostsRequests = async () => {
  const res = await axios.get("https://apipostgalery.onrender.com/posts");
  return res.data;
};

export const createPostRequest = async (post) => {
  const form = new FormData();
  for (let key in post) {
    form.append(key, post[key]);
  }
  const res = await axios.post(
    "https://apipostgalery.onrender.com/posts",
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  console.log(res.data);
  return res;
};

/* http://localhost:4500/post/id */
export const deletePostRequest = async (_id) => {
  const res = await axios.delete(
    `https://apipostgalery.onrender.com/posts/${_id}`
  );
  return res;
};

export const getPostRequest = async (_id) => {
  const res = await axios.get(
    `https://apipostgalery.onrender.com/posts/${_id}`
  );
  return res;
};

export const updatePostRequest = async (_id, newfile) => {
  const form = new FormData();
  for (let key in newfile) {
    form.append(key, newfile[key]);
  }
  const res = await axios.put(
    `https://apipostgalery.onrender.com/posts/${_id}`,
    newfile
  );
  console.log(res);
  return res;
};
