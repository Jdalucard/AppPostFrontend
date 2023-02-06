import { useState, createContext, useContext, useEffect } from "react";
import {
  getPostsRequests,
  createPostRequest,
  deletePostRequest,
  getPostRequest,
  updatePostRequest,
} from "../api/posts";

const postContext = createContext();

export const usePosts = () => {
  const context = useContext(postContext);
  return context;
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const res = await getPostsRequests();

    setPosts(res);
  };

  const createPost = async (post) => {
    try {
      const res = await createPostRequest(post);
      setPosts([...posts, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    try {
      const res = await deletePostRequest(id);
      if (res.status === 204) {
        setPosts(posts.filter((post) => post._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPost = async (id) => {
    try {
      const res = await getPostRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const upDatePost = async (id, newfile) => {
    try {
      await updatePostRequest(id, newfile);

      /*    setPosts(posts.map((post) => (post.id === id ? res.data : post)));
       */
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <postContext.Provider
      value={{
        posts,
        getPosts,
        createPost,
        deletePost,
        getPost,
        upDatePost,
      }}
    >
      {children}
    </postContext.Provider>
  );
};
