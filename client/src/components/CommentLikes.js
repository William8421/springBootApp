import React from "react";
import { useUser } from "../context/UserContext";

export default function CommentLikes({ comment }) {
  const { isLoggedIn } = useUser();
  return (
    <div className="comment-likes-container">
      <p>{comment.commentLikes} likes</p>
      <div className="comment-liked-by">
        {comment.commentLikedBy.length === 0 ? (
          "Be the first to like this comment"
        ) : // one like
        comment.commentLikedBy.length === 1 ? (
          // loggedin user?
          comment.commentLikedBy[0] === isLoggedIn.username ? (
            <p>You like this</p>
          ) : (
            // not?
            <p>{comment.commentLikedBy[0]} likes this</p>
          )
        ) : // multiple likes loggedin user?
        comment.commentLikedBy.includes(isLoggedIn.username) ? (
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
