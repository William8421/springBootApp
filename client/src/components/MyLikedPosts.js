import React, { useEffect } from "react";

import { usePost } from "../context/PostContext";
import PostsList from "./PostsList";

export default function MyLikedPosts() {
  const { getLikedPosts, likedPosts, refreshItems } = usePost();

  useEffect(() => {
    getLikedPosts();
    // eslint-disable-next-line
  }, [refreshItems]);
  return (
    <div className="my-liked-posts">
      {likedPosts.length > 0 ? (
        likedPosts.map((post) => {
          return <PostsList post={post} key={post.id} />;
        })
      ) : (
        <p>You didn't like posts yet</p>
      )}
    </div>
  );
}
