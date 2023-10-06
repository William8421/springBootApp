import React from "react";
//providers
import { useUser } from "../../context/UserContext";
import { usePost } from "../../context/PostContext";
// react icons
import { BiLike, BiSolidLike } from "react-icons/bi";
// other
import { useNavigate } from "react-router-dom";

export default function PostsList({ post }) {
  //providers
  const { loggedInUser } = useUser();
  const { likeAPost } = usePost();
  // navigation
  const navigate = useNavigate();
  const navigateToPost = (postId) => {
    navigate(`/post/${postId}`);
  };
  // like function
  const isLikedByUser = post.postLikesIds.includes(loggedInUser.id);
  const like = (e) => {
    const likeData = {
      id: e.id,
      userId: loggedInUser.id,
    };
    likeAPost(likeData);
  };

  return (
    <div className="posts-list" key={post.id}>
      <div className="post-container">
        <div onClick={() => navigateToPost(post.id)}>
          {post.image && <img src={post.image} alt="post" />}
          <p>{post.body}</p>
        </div>
        <div className="">
          {!isLikedByUser ? (
            <BiLike className="icon" onClick={() => like(post)} />
          ) : (
            <BiSolidLike className="icon" onClick={() => like(post)} />
          )}
        </div>
      </div>
    </div>
  );
}
