import React, { useEffect, useState } from "react";
// providers
import { useUser } from "../../context/UserContext";
import { usePost } from "../../context/PostContext";
// components
import PostsList from "../post/PostsList";

export default function LikedCommentedPosts() {
  // providers
  const { loggedInUser } = useUser();
  const {
    getLikedPosts,
    likedPosts,
    refreshPost,
    getCommentedPosts,
    commentedPosts,
    show,
  } = usePost();
  // state to manage liked or comments data
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
  }, [refreshPost, show]);

  return (
    <div className="profile-liked-posts-comments">
      {data.length > 0 ? (
        data.map((post) => <PostsList post={post} key={post.id} />)
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
