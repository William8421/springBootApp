import React, { useEffect, useState } from "react";

import { usePost } from "../../context/PostContext";
import PostsList from "../post/PostsList";
import { useUser } from "../../context/UserContext";

export default function LikedCommentedPosts() {
  const {
    getLikedPosts,
    likedPosts,
    refreshItems,
    getCommentedPosts,
    commentedPosts,
    show,
  } = usePost();
  const { loggedInUser } = useUser();
  const [data, setData] = useState([]);

  useEffect(() => {
    getLikedPosts();
    getCommentedPosts();
    if (show.myLikes === loggedInUser.id) {
      setData(likedPosts);
    } else if (show.myComments === loggedInUser.id) {
      setData(commentedPosts);
    }
    // eslint-disable-next-line
  }, [refreshItems, show]);
  return (
    <div className="profile-liked-posts-comments">
      {data.length > 0 ? (
        data.map((post) => {
          return <PostsList post={post} key={post.id} />;
        })
      ) : (
        <p>
          {show.myLikes === loggedInUser.id
            ? "You didn't like posts yet"
            : "You didn't comment on posts yet"}{" "}
        </p>
      )}
    </div>
  );
}
