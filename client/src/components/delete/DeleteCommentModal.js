import React from "react";
import { useComment } from "../../context/CommentContext";
import { useUser } from "../../context/UserContext";

export default function DeleteCommentModal({ comment }) {
  const { removeComment, toggleDeleteComment } = useComment();
  const { loggedInUser } = useUser();

  function deleteComment() {
    if (loggedInUser) {
      const commentId = {
        id: comment.id,
        postId: comment.postId,
      };
      removeComment(commentId);
    }
  }

  return (
    <div className="delete-comment">
      <div className="delete-header">
        <h2>Warning</h2>
        <button onClick={toggleDeleteComment} className="close-button">
          X
        </button>
      </div>
      <p>Are you sure you want to delete this comment?</p>
      <div className="submit-buttons-container">
        <button className="main-button" onClick={deleteComment}>
          Delete
        </button>
        <button className="cancel-button" onClick={toggleDeleteComment}>
          Cancel
        </button>
      </div>
    </div>
  );
}
