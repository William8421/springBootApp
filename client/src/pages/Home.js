import React, { useEffect } from "react";
// providers
import { useUser } from "../context/UserContext";
import { usePost } from "../context/PostContext";
import { useComment } from "../context/CommentContext";
// components
import AddPost from "../components/add/AddPost";
import Post from "../components/post/Post";
// other
import spinner from "../images/loading-loading-forever.gif";

export default function Home() {
  // providers
  const { getAllUsers } = useUser();
  const { getAllPosts, posts, refreshPost } = usePost();
  const { refreshComments } = useComment();

  useEffect(() => {
    getAllPosts();
    getAllUsers();
    // eslint-disable-next-line
  }, [refreshPost, refreshComments]);

  return (
    <div className="home-container">
      <AddPost />
      <div className="posts">
        {posts.length > 0 ? (
          posts.map((post) => <Post post={post} key={post.id} />)
        ) : (
          <img className="spinner" src={spinner} alt="spinner" />
        )}
      </div>
    </div>
  );
}
