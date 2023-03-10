import { usePosts } from "../context/postContext";
import { VscEmptyWindow } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { PostCard } from "../components/PostCard";

export const HomaPage = () => {
  const { posts } = usePosts();

  const renderMain = () => {
    if (posts.length === 0)
      return (
        <div className="flex flex-col justify-center items-center">
          <VscEmptyWindow className="w-68 h-58 text-white" />
          <h1 className="text-white text-2xl">The are no post</h1>
        </div>
      );
    return (
      <>
        <div className="grid grid-cols-3  gap-1">
          {posts.map((post) => (
            <PostCard post={post} key={post._id} />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="text-white">
      <header className="flex justify-between py-4">
        <h1 className="text-2xl text-gray-300 font-bold">
          {" "}
          Post({posts.length})
        </h1>
        <Link
          to="/new"
          className="px-3 py-2 bg-indigo-500 hover:bg-indigo-400 mr-2 rounded-sm text-white"
        >
          Create new Post
        </Link>
      </header>
      {renderMain()}
    </div>
  );
};
