import React from "react";
import { usePost } from "../../context/PostContext";
import { useUser } from "../../context/UserContext";

import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegComment, FaComment } from "react-icons/fa";
import ManagePost from "./ManagePost";
import PostLikes from "../likes/PostLikes";
import Comments from "../comment/Comments";
import PostLikedByModal from "../likedBy/PostLikedByModal";
import { useNavigate } from "react-router-dom";
import noPic from "../../images/icon-256x256.png";

export default function Post({ post }) {
  const { likeAPost, toggleComments, show } = usePost();
  const { loggedInUser, setUserInfoId, openCloseLoginModal, allUsers } =
    useUser();
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
      openCloseLoginModal();
    }
  }

  function goToUserProfile() {
    localStorage.setItem("selectedUser", JSON.stringify(post.userId));
    setUserInfoId(post.userId);
    navigate(`/userprofile`);
  }

  const formattedPostBody = post.body.replace(/\n/g, "<br />");
  const formattedDate = new Date(post.createdAt).toLocaleString().split(",")[0];

  const createdAt = new Date(post.createdAt);
  const now = new Date();
  const timeDifference = now - createdAt;
  let formattedTime = "";

  if (timeDifference < 60 * 60 * 1000) {
    // Less than 1 hour
    const minutesAgo = Math.floor(timeDifference / (60 * 1000));
    formattedTime = `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;
  } else if (timeDifference < 24 * 60 * 60 * 1000) {
    // Less than 1 day
    const hoursAgo = Math.floor(timeDifference / (60 * 60 * 1000));
    formattedTime = `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
  } else {
    // More than 1 day
    const daysAgo = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    if (daysAgo < 7) {
      // Less than 1 week
      formattedTime = `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
    } else {
      // more than 1 week
      formattedTime = `on ${formattedDate}`;
    }
  }

  const postOwner = allUsers.find((user) => user.id === post.userId);

  return (
    <div className="post" key={post.id}>
      <div className="owner" onClick={() => goToUserProfile()}>
        <div className="pic-name">
          <img
            src={
              postOwner.profilePic !== "noPic" ? postOwner.profilePic : noPic
            }
            alt="profile"
          />
          <h4>
            {postOwner.firstName} {postOwner.lastName}
          </h4>
        </div>
        <h5>@{postOwner.username}</h5>
      </div>
      {post.image && <img src={post.image} alt="post" />}
      <div className="post-body-container">
        <div dangerouslySetInnerHTML={{ __html: formattedPostBody }} />
        <div className="time-edited">
          <p>Posted {formattedTime}</p>
          {post.edited === true && <p className="edited">Edited</p>}
        </div>
      </div>

      <div className="reactions-section">
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
        <div>
          <ManagePost post={post} />
        </div>
      </div>
      <div className="likes-comments-section">
        <PostLikes post={post} />
      </div>
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
