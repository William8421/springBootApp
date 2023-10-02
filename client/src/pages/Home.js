import React, { useEffect } from "react";

import { usePost } from "../context/PostContext";
import { useComment } from "../context/CommentContext";

import AddPost from "../components/add/AddPost";
import Post from "../components/post/Post";

export default function Home() {
  const { getAllPosts, posts, refreshItems } = usePost();
  const { refreshComments } = useComment();

  useEffect(() => {
    getAllPosts();
    // eslint-disable-next-line
  }, [refreshItems, refreshComments]);

  return (
    <div className="home-container">
      <AddPost />
      <div className="posts">
        {posts.length > 0
          ? posts.map((post) => {
              return <Post post={post} key={post.id} />;
            })
          : null}
      </div>
    </div>
  );
}
