import React from "react";
// providers
import { useUser } from "../../context/UserContext";
import { usePost } from "../../context/PostContext";

export default function DeletePostModal({ post }) {
  // providers
  const { loggedInUser } = useUser();
  const { toggleDelete, removePost } = usePost();
  // delete post
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
        <div className="submit-buttons-container">
          <button className="main-button" onClick={deletePost}>
            Delete
          </button>
          <button className="cancel-button" onClick={toggleDelete}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
