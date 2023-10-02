import React from "react";
import { useUser } from "../../context/UserContext";
import { useComment } from "../../context/CommentContext";

export default function CommentLikes({ comment }) {
  const { toggleCommentLikes } = useComment();
  const { loggedInUser } = useUser();
  return (
    <div className="likes-container">
      <p>{comment.commentLikes} likes</p>
      <div className="likes-div" onClick={() => toggleCommentLikes(comment.id)}>
        {comment.commentLikedBy.length === 0 ? (
          "Be the first to like this comment"
        ) : // one comment
        comment.commentLikedBy.length === 1 ? (
          // loggedin user?
          comment.commentLikedBy[0] === loggedInUser.username ? (
            <p>You like this</p>
          ) : (
            // not?
            <p>{comment.commentLikedBy[0]} likes this</p>
          )
        ) : // multiple comments loggedin user?
        comment.commentLikedBy.includes(loggedInUser.username) ? (
          <p>You and {comment.commentLikedBy.length - 1} others like this</p>
        ) : (
          // not
          <p>
            {comment.commentLikedBy[0]} and {comment.commentLikedBy.length - 1}{" "}
            others like this
          </p>
        )}
      </div>
    </div>
  );
}
