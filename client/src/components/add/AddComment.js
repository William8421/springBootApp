import React, { useState } from "react";
import { useComment } from "../../context/CommentContext";
import { useUser } from "../../context/UserContext";

export default function AddComment({ post }) {
  const { createComment } = useComment();
  const { loggedInUser, openCloseLoginModal, setServerError, serverError } =
    useUser();

  const [commentBody, setCommentBody] = useState("");

  function addComment() {
    if (!loggedInUser) {
      openCloseLoginModal();
    } else if (commentBody === "") {
      setServerError((prevError) => {
        return { ...prevError, commentError: "Your comment is empty" };
      });
    } else {
      const comment = {
        userId: loggedInUser.id,
        postId: post.id,
        body: commentBody,
      };
      createComment(comment);
      setCommentBody("");
      setServerError((prevError) => {
        return { ...prevError, commentError: null };
      });
    }
  }
  return (
    <div className="add-comment">
      <form onSubmit={(e) => e.preventDefault()}>
        <textarea
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
        />
        <div className="error">{serverError.commentError}</div>
      </form>
      <button className="main-button" onClick={() => addComment()}>
        Comment
      </button>
    </div>
  );
}
