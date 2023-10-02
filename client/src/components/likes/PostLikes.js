import React from "react";
import { useUser } from "../../context/UserContext";
import { usePost } from "../../context/PostContext";

export default function PostLikes({ post }) {
  const { loggedInUser } = useUser();
  const { togglePostLikes } = usePost();
  return (
    <div className="likes-container">
      <div className="likes-and-comments">
        <p>{post.postLikes} likes</p>
        <p>{post.postComments} comments</p>
      </div>
      <div className="likes-div" onClick={() => togglePostLikes(post.id)}>
        {/* no likes */}
        {post.postLikedBy.length === 0 ? (
          "Be the first to like this post"
        ) : // one like
        post.postLikedBy.length === 1 ? (
          // loggedIn user?
          post.postLikedBy[0] === loggedInUser.username ? (
            <p>You like this</p>
          ) : (
            // not?
            <p>{post.postLikedBy[0]} likes this</p>
          )
        ) : // multiple likes loggedIn user?
        post.postLikedBy.includes(loggedInUser.username) ? (
          <p>You and {post.postLikedBy.length - 1} others like this</p>
        ) : (
          // not?
          <p>
            {post.postLikedBy[0]} and {post.postLikedBy.length - 1} others like
            this
          </p>
        )}
      </div>
    </div>
  );
}
