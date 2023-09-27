import React, { useState } from "react";
import { useComment } from "../context/CommentContext";
import { useUser } from "../context/UserContext";

export default function AddComment({ post }) {
  const { createComment } = useComment();
  const { loggedInUser } = useUser();

  const [commentBody, setCommentBody] = useState("");

  function addComment() {
    if (commentBody !== "") {
      const comment = {
        userId: loggedInUser.id,
        postId: post.id,
        body: commentBody,
      };
      createComment(comment);
      setCommentBody("");
    }
  }
  return (
    <div className="add-comment">
      <form onSubmit={(e) => e.preventDefault()}>
        <textarea
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
        />
      </form>
      <button className="main-button" onClick={() => addComment()}>
        Comment
      </button>
    </div>
  );
}
