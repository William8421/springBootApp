import React from "react";
import { useUser } from "../../context/UserContext";
import { useComment } from "../../context/CommentContext";

export default function CommentLikes({ comment }) {
  const { toggleCommentLikes } = useComment();
  const { loggedInUser, allUsers } = useUser();

  const test = allUsers.find((user) => user.id === comment.commentLikesIds[0]);
  return (
    <div className="likes-container">
      <p>{comment.commentLikes} likes</p>
      <div className="likes-div" onClick={() => toggleCommentLikes(comment.id)}>
        {comment.commentLikesIds.length === 0 ? (
          "Be the first to like this comment"
        ) : // one comment
        comment.commentLikesIds.length === 1 ? (
          // loggedin user?
          comment.commentLikesIds[0] === loggedInUser.id ? (
            <p>You like this</p>
          ) : (
            // not?
            <p>
              {test.firstName} {test.lastName} likes this
            </p>
          )
        ) : // multiple comments loggedin user?
        comment.commentLikesIds.includes(loggedInUser.id) ? (
          <p>You and {comment.commentLikesIds.length - 1} others like this</p>
        ) : (
          // not
          <p>
            {test.firstName} {test.lastName} and{" "}
            {comment.commentLikesIds.length - 1} others like this
          </p>
        )}
      </div>
    </div>
  );
}
