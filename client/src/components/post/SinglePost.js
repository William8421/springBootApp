import React, { useEffect } from "react";
// provider
import { usePost } from "../../context/PostContext";
import Post from "./Post";
import { useNavigate, useParams } from "react-router-dom";

export default function SinglePost() {
  // provider
  const { posts, getAllPosts } = usePost();

  const { postId } = useParams();
  // navigation
  const navigate = useNavigate();
  function goBack() {
    navigate("/userprofile");
  }

  useEffect(() => {
    getAllPosts();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);

  const post = posts.find((post) => post.id === postId);

  return (
    <div className="single-post">
      {post && <Post post={post} />}
      <button onClick={goBack} className="main-button">
        Back
      </button>
    </div>
  );
}
