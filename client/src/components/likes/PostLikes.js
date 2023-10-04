import React from "react";
import { useUser } from "../../context/UserContext";
import { usePost } from "../../context/PostContext";

export default function PostLikes({ post }) {
  const { loggedInUser, allUsers } = useUser();
  const { togglePostLikes } = usePost();

  const test = allUsers.find((user) => user.id === post.postLikesIds[0]);
  return (
    <div className="likes-container">
      <div className="likes-and-comments">
        <p>{post.postLikes} likes</p>
        <p>{post.postComments} comments</p>
      </div>
      <div className="likes-div" onClick={() => togglePostLikes(post.id)}>
        {/* no likes */}
        {post.postLikesIds.length === 0 ? (
          "Be the first to like this post"
        ) : // one like
        post.postLikesIds.length === 1 ? (
          // loggedIn user?
          post.postLikesIds[0] === loggedInUser.id ? (
            <p>You like this</p>
          ) : (
            // not?
            <p>
              {test.firstName} {test.lastName} likes this
            </p>
          )
        ) : // multiple likes loggedIn user?
        post.postLikesIds.includes(loggedInUser.id) ? (
          <p>You and {post.postLikesIds.length - 1} others like this</p>
        ) : (
          // not?

          <p>
            {test.firstName} {test.lastName} and {post.postLikesIds.length - 1}{" "}
            others like this
          </p>
        )}
      </div>
    </div>
  );
}
