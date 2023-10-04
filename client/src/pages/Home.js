import React, { useEffect } from "react";

import { usePost } from "../context/PostContext";
import { useComment } from "../context/CommentContext";

import AddPost from "../components/add/AddPost";
import Post from "../components/post/Post";
import spinner from "../images/loading-loading-forever.gif";
import { useUser } from "../context/UserContext";

export default function Home() {
  const { getAllPosts, posts, refreshItems } = usePost();
  const { refreshComments } = useComment();
  const { getAllUsers } = useUser();

  useEffect(() => {
    getAllPosts();
    getAllUsers();
    // eslint-disable-next-line
  }, [refreshItems, refreshComments]);

  return (
    <div className="home-container">
      <AddPost />
      <div className="posts">
        {posts.length > 0 ? (
          posts.map((post) => {
            return <Post post={post} key={post.id} />;
          })
        ) : (
          <img className="spinner" src={spinner} alt="spinner" />
        )}
      </div>
    </div>
  );
}
