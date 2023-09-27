import React from "react";
import { usePost } from "../context/PostContext";
import { useUser } from "../context/UserContext";

export default function DeletePostModal({ post }) {
  const { toggleDelete, removePost } = usePost();
  const { loggedInUser } = useUser();

  function deletePost() {
    if (loggedInUser) {
      const postId = {
        id: post.id,
      };
      removePost(postId);
    }
  }
  return (
    <div>
      <div className="delete-post">
        <div className="delete-header">
          <h2>Warning</h2>
          <button onClick={toggleDelete} className="close-button">
            X
          </button>
        </div>
        <p>Are you sure you want to delete this post?</p>
        <div className="delete-update-buttons-container">
          <button className="main-button" onClick={deletePost}>
            Delete
          </button>
          <button onClick={toggleDelete}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
