import React, { useState } from "react";
// provider
import { useComment } from "../../context/CommentContext";

export default function UpdateComment({ comment }) {
  // provider
  const { editComment, toggleUpdateComment } = useComment();
  // form state
  const [newComment, setNewComment] = useState({
    id: comment.id,
    body: comment.body,
  });
  // form handler
  const updateCommentHandler = (e) => {
    const { name, value } = e.target;
    setNewComment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // update comment
  const updateComment = () => {
    editComment(newComment);
  };

  return (
    <div className="update-modal">
      <div className="update-header">
        <h2>Update comment</h2>
        <button className="close-button" onClick={toggleUpdateComment}>
          X
        </button>
      </div>
      <form>
        <textarea
          name="body"
          value={newComment.body}
          onChange={(e) => updateCommentHandler(e)}
        />
      </form>
      <div className="submit-buttons-container">
        <button className="main-button" onClick={updateComment}>
          Update
        </button>
        <button className="cancel-button" onClick={toggleUpdateComment}>
          Cancel
        </button>
      </div>
    </div>
  );
}
