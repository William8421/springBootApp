import React from "react";
import { usePost } from "../context/PostContext";
import { useUser } from "../context/UserContext";

import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegComment, FaComment } from "react-icons/fa";
import ManagePost from "./ManagePost";
import PostLikes from "./PostLikes";
import Comments from "./Comments";
import PostLikedByModal from "./PostLikedByModal";
import { useNavigate } from "react-router-dom";

export default function Post({ post }) {
  const { likeAPost, toggleComments, show } = usePost();
  const { loggedInUser, setUserInfoId } = useUser();
  const navigate = useNavigate();

  const isLikedByUser = post.postLikesIds.includes(loggedInUser.id);

  function like(e) {
    if (loggedInUser) {
      const likeData = {
        id: e.id,
        userId: loggedInUser.id,
      };
      likeAPost(likeData);
    } else {
      alert("please login or sign up to be able to like posts");
    }
  }

  function goToUserProfile() {
    localStorage.setItem("selectedUser", JSON.stringify(post.userId));
    setUserInfoId(post.userId);
    navigate(`/userprofile`);
  }

  return (
    <div className="post" key={post.id}>
      <div className="owner">
        <h3>{post.postOwnerName}</h3>
        <h5 onClick={() => goToUserProfile()}>{post.postOwnerName}</h5>
      </div>
      {post.image && <img src={post.image} alt="post" />}
      <div className="post-body-container">
        {/* POST BODY */}
        <p className="post-body">{post.body}</p>
        {/* EDITED */}
        {post.edited === true && <p className="edited">Edited</p>}
      </div>

      {/* post likes and manage post */}
      <div className="reactions-section">
        {/* LIKE BUTTON */}
        <div className="reactions-buttons">
          {!isLikedByUser ? (
            <BiLike className="icon" onClick={(e) => like(post)} />
          ) : (
            <BiSolidLike className="icon" onClick={(e) => like(post)} />
          )}
          {show.commentsForPost === post.id ? (
            <FaComment
              onClick={() => toggleComments(post.id)}
              className="icon"
            />
          ) : (
            <FaRegComment
              onClick={() => toggleComments(post.id)}
              className="icon"
            />
          )}
        </div>
        {/* manage post */}
        <div>
          <ManagePost post={post} />
        </div>
      </div>

      {/* LIKES SECTION */}
      <div className="likes-comments-section">
        <PostLikes post={post} />
      </div>

      {/* COMMENTS SECTION */}
      <div className="likes-comments-section">
        {show.commentsForPost === post.id ? <Comments post={post} /> : null}
      </div>
      <div>
        {show.likesForPost === post.id ? (
          <PostLikedByModal post={post} />
        ) : null}
      </div>
    </div>
  );
}
