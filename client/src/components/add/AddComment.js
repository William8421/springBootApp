import React, { useState } from "react";
// providers
import { useUser } from "../../context/UserContext";
import { useComment } from "../../context/CommentContext";

export default function AddComment({ post }) {
  // providers
  const { loggedInUser, toggleAuthModal, setServerError, serverError } =
    useUser();
  const { createComment } = useComment();
  // form state
  const [commentBody, setCommentBody] = useState("");
  // add comment
  const addComment = () => {
    if (!loggedInUser) {
      toggleAuthModal("login");
    } else if (commentBody.trim() === "") {
      setServerError((prevError) => ({
        ...prevError,
        commentError: "Your comment is empty",
      }));
    } else {
      const comment = {
        userId: loggedInUser.id,
        postId: post.id,
        body: commentBody,
      };
      createComment(comment);
      setCommentBody("");
      setServerError((prevError) => ({
        ...prevError,
        commentError: null,
      }));
    }
  };

  return (
    <div className="add-comment">
      <form onSubmit={(e) => e.preventDefault()}>
        <textarea
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
          placeholder="Your comment"
          className="comment-textarea"
        />
        <div className="error">{serverError.commentError}</div>
      </form>
      <button className="main-button" onClick={addComment}>
        Comment
      </button>
    </div>
  );
}
