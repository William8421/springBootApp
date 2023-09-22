import React from "react";
import { useComment } from "../context/CommentContext";
import { useUser } from "../context/UserContext";

export default function DeleteComment({ comment }) {
  const { isDeleteCommentOpen, openCloseDeleteComment, removeComment } =
    useComment();
  const { isLoggedIn } = useUser();

  function deleteComment() {
    if (isLoggedIn) {
      const commentId = {
        id: comment.id,
        postId: comment.postId,
      };
      removeComment(commentId);
    }
  }

  return (
    <div>
      <div
        className={`delete-comment-hidden-div ${isDeleteCommentOpen}`}
        onClick={openCloseDeleteComment}
      ></div>
      <div className={`delete-comment ${isDeleteCommentOpen}`}>
        <div className="delete-comment-header">
          <h2>Warning</h2>
        </div>
        <p>Are you sure you want to delete this comment?</p>
        <button onClick={deleteComment}>Delete</button>
        <button onClick={openCloseDeleteComment}>Cancel</button>
      </div>
    </div>
  );
}
