import React from "react";
import { useUser } from "../../context/UserContext";
import { usePost } from "../../context/PostContext";

import { BiLike, BiSolidLike } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function PostsList({ post }) {
  const { loggedInUser } = useUser();
  const { likeAPost } = usePost();
  const navigate = useNavigate();
  const isLikedByUser = post.postLikesIds.includes(loggedInUser.id);

  function like(e) {
    const likeData = {
      id: e.id,
      userId: loggedInUser.id,
    };
    likeAPost(likeData);
  }
  function navigateToPost(postId) {
    navigate(`/post/${postId}`);
  }

  return (
    <div className="posts-list" key={post.id}>
      <div className="post-container">
        <div onClick={() => navigateToPost(post.id)}>
          {post.image && <img src={post.image} alt="post" />}
          <p>{post.body}</p>
        </div>
        <div className="">
          {!isLikedByUser ? (
            <BiLike className="icon" onClick={(e) => like(post)} />
          ) : (
            <BiSolidLike className="icon" onClick={(e) => like(post)} />
          )}
        </div>
      </div>
    </div>
  );
}
