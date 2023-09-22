import React, { useState } from "react";
import { useComment } from "../context/CommentContext";

export default function UpdateComment({ comment }) {
  const { editComment } = useComment();

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
    <div>
      <form>
        <textarea
          name="body"
          value={newComment.body}
          onChange={(e) => updateCommentHandler(e)}
          style={{ resize: "none" }}
        />
      </form>
      <button className="main-button" onClick={updateComment}>
        Update
      </button>
    </div>
  );
}
