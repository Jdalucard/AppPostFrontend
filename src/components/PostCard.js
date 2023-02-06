import React from "react";
import toast from "react-hot-toast";
import { usePosts } from "../context/postContext";
import { useNavigate } from "react-router-dom";

export const PostCard = ({ post }) => {
  const { deletePost } = usePosts();

  const navigate = useNavigate();

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div>
          <p className="text-white">
            {" "}
            DO you want to delete? <strong>{id}</strong>
          </p>
          <div>
            <button
              className="bg-red-600 rounded-sm mx-2  text-white hover:bg-red-400 text-sm px-3 py-2"
              onClick={() => {
                deletePost(id);
                toast.dismiss(t.id);
              }}
            >
              Delete
            </button>
            <button
              className="bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2"
              onClick={() => toast.dismiss(t.id)}
            >
              {" "}
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        style: {
          background: "#202020",
        },
      }
    );
  };

  return (
    <div
      className="bg-zinc-800 text-white rounded-sm shadow-md shadow-black hover:bg-zinc-700  mx-2 my-2 hover:cursor-pointer "
      onClick={() => navigate(`/posts/${post._id}`)}
    >
      <div className="px-3 py-7  my-1 ">
        <div className="flex justify-between">
          <h3>{post.title}</h3>

          <button
            className="bg-red-600 text-sm px-2 hover:bg-red-500 py-1  px-2rounded-sm"
            onClick={(e) => {
              e.stopPropagation(e);
              handleDelete(post._id);
            }}
          >
            Delete
          </button>
        </div>
        <p> {post.description}</p>
      </div>
      {post.image && (
        <img
          src={post.image.secure_url}
          alt=""
          className="w-full h-96 object-cover"
        />
      )}
    </div>
  );
};
