import React, { useEffect } from "react";

import { usePost } from "../context/PostContext";
import PostsList from "./PostsList";

export default function MyCommentedPosts() {
  const { getCommentedPosts, commentedPosts, refreshItems } = usePost();

  useEffect(() => {
    getCommentedPosts();
    // eslint-disable-next-line
  }, [refreshItems]);
  return (
    <div className="my-liked-posts">
      {commentedPosts.length > 0 ? (
        commentedPosts.map((post) => {
          return <PostsList post={post} key={post.id} />;
        })
      ) : (
        <p>You didn't didn't comment on any post yet</p>
      )}
    </div>
  );
}
