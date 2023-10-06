import React from "react";
// providers
import { useUser } from "../../context/UserContext";
import { usePost } from "../../context/PostContext";

export default function PostLikes({ post }) {
  // providers
  const { loggedInUser, allUsers } = useUser();
  const { togglePostLikes } = usePost();
  // likes count variables
  const likesCount = post.postLikesIds.length;
  const isLikedByCurrentUser = post.postLikesIds.includes(loggedInUser.id);
  const firstLikeUser = allUsers.find(
    (user) => user.id === post.postLikesIds[0]
  );

  return (
    <div className="likes-container">
      <div className="likes-and-comments">
        <p>
          {likesCount} {likesCount === 1 ? "like" : "likes"}
        </p>
        <p>
          {post.postComments} {post.postComments === 1 ? "comment" : "comments"}
        </p>
      </div>
      <div className="likes-div" onClick={() => togglePostLikes(post.id)}>
        {likesCount === 0 ? (
          "Be the first to like this post"
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
          <div>
            {firstLikeUser && (
              <p>
                {firstLikeUser.firstName} {firstLikeUser.lastName} and{" "}
                {likesCount - 1} others like this
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
