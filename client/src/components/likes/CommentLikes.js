import React from "react";
// providers
import { useUser } from "../../context/UserContext";
import { useComment } from "../../context/CommentContext";

export default function CommentLikes({ comment }) {
  // providers
  const { loggedInUser, allUsers } = useUser();
  const { toggleCommentLikes } = useComment();
  // likes count variables
  const likesCount = comment.commentLikesIds.length;
  const isLikedByCurrentUser = comment.commentLikesIds.includes(
    loggedInUser.id
  );
  const firstLikeUser = allUsers.find(
    (user) => user.id === comment.commentLikesIds[0]
  );

  return (
    <div className="likes-container">
      <p>
        {likesCount} {likesCount === 1 ? "like" : "likes"}
      </p>
      <div className="likes-div" onClick={() => toggleCommentLikes(comment.id)}>
        {likesCount === 0 ? (
          "Be the first to like this comment"
        ) : likesCount === 1 ? (
          isLikedByCurrentUser ? (
            <p>You like this</p>
          ) : (
            <p>
              {firstLikeUser.firstName} {firstLikeUser.lastName} likes this
            </p>
          )
        ) : isLikedByCurrentUser ? (
          <p>You and {likesCount - 1} others like this</p>
        ) : (
          <p>
            {firstLikeUser.firstName} {firstLikeUser.lastName} and{" "}
            {likesCount - 1} others like this
          </p>
        )}
      </div>
    </div>
  );
}
