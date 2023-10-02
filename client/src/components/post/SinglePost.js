import React, { useEffect } from "react";
import Post from "./Post";
import { usePost } from "../../context/PostContext";
import { Link, useParams } from "react-router-dom";

export default function SinglePost() {
  const { postId } = useParams();
  const { posts, getAllPosts } = usePost();

  useEffect(() => {
    getAllPosts();
    // eslint-disable-next-line
  }, []);

  const post = posts.find((post) => post.id === postId);
  return (
    <div className="posts">
      {post ? <Post post={post} /> : null}
      <Link to={"/profile"}>
        <button className="main-button">Back</button>
      </Link>
    </div>
  );
}
