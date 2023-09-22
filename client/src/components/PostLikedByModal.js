import React from "react";
import { usePost } from "../context/PostContext";

export default function PostLikedByModal({ post }) {
  const { showLikesForPost, setShowLikesForPost } = usePost();
  return (
    <div
      className={`post-liked-by ${
        showLikesForPost !== null
          ? "showLikesForPost-on"
          : "showLikesForPost-off"
      }`}
    >
      <div className="post-liked-header">
        <h2>Likes</h2>
        <button
          className="close-button"
          onClick={() => setShowLikesForPost(null)}
        >
          X
        </button>
      </div>
      {post.postLikedBy.length !== 0 ? (
        post.postLikedBy.map((username) => {
          return (
            <ul key={username}>
              <li>{username}</li>
            </ul>
          );
        })
      ) : (
        <p>No likes yet</p>
      )}
    </div>
  );
}
