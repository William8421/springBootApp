import React, { useState } from "react";
import { useComment } from "../context/CommentContext";

export default function UpdateComment({ comment }) {
  const { editComment, toggleUpdateComment } = useComment();

  const [newComment, setNewComment] = useState({
    id: comment.id,
    body: comment.body,
  });

  function updateCommentHandler(e) {
    const { name, value } = e.target;
    setNewComment((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  function updateComment(e) {
    editComment(newComment);
  }

  return (
    <div className="update-comment">
      <div className="update-header">
        <h2>Update your comment</h2>
        <button className="close-button" onClick={toggleUpdateComment}>
          X
        </button>
      </div>
      <form>
        <textarea
          name="body"
          value={newComment.body}
          onChange={(e) => updateCommentHandler(e)}
          style={{ resize: "none" }}
        />
      </form>
      <div className="delete-update-buttons-container">
        <button className="main-button" onClick={updateComment}>
          Update
        </button>
        <button onClick={toggleUpdateComment}>Cancel</button>
      </div>
    </div>
  );
}
