import React from "react";
// providers
import { useUser } from "../../context/UserContext";
import { usePost } from "../../context/PostContext";
// react icons
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegComment, FaComment } from "react-icons/fa";
// components
import ManagePost from "./ManagePost";
import PostLikes from "../likes/PostLikes";
import Comments from "../comment/Comments";
import PostLikedByModal from "../likedBy/PostLikedByModal";
// other
import { useNavigate } from "react-router-dom";
import noPic from "../../images/icon-256x256.png";

export default function Post({ post }) {
  // providers
  const { loggedInUser, setUserInfoId, toggleAuthModal, allUsers } = useUser();
  const { likeAPost, toggleComments, show } = usePost();
  // navigation
  const navigate = useNavigate();
  function goToUserProfile() {
    localStorage.setItem("selectedUser", JSON.stringify(post.userId));
    setUserInfoId(post.userId);
    navigate("/userprofile");
    window.scrollTo(0, 0);
  }
  // like function
  const isLikedByUser = post.postLikesIds.includes(loggedInUser.id);
  function like() {
    if (loggedInUser) {
      likeAPost({ id: post.id, userId: loggedInUser.id });
    } else {
      toggleAuthModal("login");
    }
  }

  const postOwner = allUsers.find((user) => user.id === post.userId);
  // body shows the break lines
  const formattedPostBody = post.body.replace(/\n/g, "<br />");
  // date and time format
  const formattedDate = new Date(post.createdAt).toLocaleString().split(",")[0];
  const timeDifference = Date.now() - new Date(post.createdAt);
  let formattedTime = "";

  if (timeDifference < 60 * 60 * 1000) {
    const minutesAgo = Math.floor(timeDifference / (60 * 1000));
    formattedTime = `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;
  } else if (timeDifference < 24 * 60 * 60 * 1000) {
    const hoursAgo = Math.floor(timeDifference / (60 * 60 * 1000));
    formattedTime = `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
  } else {
    const daysAgo = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    formattedTime =
      daysAgo < 7
        ? `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`
        : `on ${formattedDate}`;
  }

  return (
    <div className="post" key={post.id}>
      <div className="owner" onClick={goToUserProfile}>
        {postOwner && (
          <div>
            <div className="pic-name">
              <img
                src={
                  postOwner.profilePic !== "noPic"
                    ? postOwner.profilePic
                    : noPic
                }
                alt="profile"
              />
              <h4>{`${postOwner.firstName} ${postOwner.lastName}`}</h4>
            </div>
            <h5>@{postOwner.username}</h5>
          </div>
        )}
      </div>
      {post.image && <img src={post.image} alt="post" />}
      <div className="post-body-container">
        <div dangerouslySetInnerHTML={{ __html: formattedPostBody }} />
        <div className="time-edited">
          <p>Posted {formattedTime}</p>
          {post.edited && <p className="edited">Edited</p>}
        </div>
      </div>

      <div className="reactions-section">
        <div className="reactions-buttons">
          {isLikedByUser ? (
            <BiSolidLike className="icon" onClick={like} />
          ) : (
            <BiLike className="icon" onClick={like} />
          )}
          {show.commentsForPost === post.id ? (
            <FaComment
              className="icon"
              onClick={() => toggleComments(post.id)}
            />
          ) : (
            <FaRegComment
              className="icon"
              onClick={() => toggleComments(post.id)}
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
