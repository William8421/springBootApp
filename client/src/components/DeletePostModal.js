import React from "react";
import { usePost } from "../context/PostContext";
import { useUser } from "../context/UserContext";

export default function DeletePostModal({ post }) {
  const { isDeletePostOpen, openCloseDeletePost, removePost } = usePost();
  const { isLoggedIn } = useUser();

  function deletePost() {
    if (isLoggedIn) {
      const postId = {
        id: post.id,
      };
      removePost(postId);
    }
  }
  return (
    <div>
      <div className={`delete-post ${isDeletePostOpen}`}>
        <div className="delete-post-header">
          <h2>Warning</h2>
          <button className="close-button" onClick={openCloseDeletePost}>
            X
          </button>
        </div>
        <p>Are you sure you want to delete this post?</p>
        <button onClick={deletePost}>Delete</button>
        <button onClick={openCloseDeletePost}>Cancel</button>
      </div>
    </div>
  );
}
