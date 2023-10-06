import React, { useEffect } from "react";
// providers
import { useUser } from "../../context/UserContext";
import { usePost } from "../../context/PostContext";
// components
import Post from "../post/Post";
import UpdateUserModal from "../update/UpdateUserModal";
import LikedCommentedPosts from "./LikedCommentedPosts";
// react icons
import { AiOutlineEdit } from "react-icons/ai";
// other
import noPic from "../../images/icon-256x256.png";

export default function UserProfile() {
  // providers
  const {
    loggedInUser,
    refresh,
    getUserInfo,
    userInfo,
    selectedUser,
    getAllUsers,
  } = useUser();
  const {
    refreshPost,
    userPosts,
    getUserPosts,
    toggleMyLikes,
    toggleMyComments,
    toggleUpdateUser,
    show,
    getLikedPosts,
    getCommentedPosts,
  } = usePost();

  function dateOfBirthFormat(dateOfBirth) {
    const date = new Date(dateOfBirth);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString(undefined, options);
  }

  useEffect(() => {
    let user = {
      id: selectedUser,
    };
    if (selectedUser === loggedInUser.id) {
      getLikedPosts();
      getCommentedPosts();
    }
    getUserInfo();
    getUserPosts(user);
    getAllUsers();
    // eslint-disable-next-line
  }, [refresh, refreshPost, selectedUser]);

  return (
    <div className="profile">
      {userInfo ? (
        <div className="profile-info">
          <div className="pic-container">
            <img
              src={userInfo.profilePic ? userInfo.profilePic : noPic}
              alt="profile"
            />
          </div>
          <div className="information">
            <p>
              <span>First name:</span> <span> {userInfo.firstName}</span>
            </p>
            <p>
              <span>Last name:</span> <span> {userInfo.lastName}</span>
            </p>
            <p>
              <span>Username:</span> <span> {userInfo.username}</span>
            </p>
            <p>
              <span>Date of birth:</span>{" "}
              <span> {dateOfBirthFormat(userInfo.dateOfBirth)}</span>
            </p>
            <p>
              <span>Gender:</span> <span> {userInfo.gender}</span>
            </p>
          </div>
          {loggedInUser.id === selectedUser && (
            <div className="update-section">
              <AiOutlineEdit
                className="icon"
                onClick={() => toggleUpdateUser(userInfo.id)}
              />
              {show.updateUser === userInfo.id && (
                <UpdateUserModal userData={userInfo} />
              )}
            </div>
          )}
        </div>
      ) : null}
      <div className="posts">
        <h2>Posts</h2>
        {userPosts.length > 0 ? (
          userPosts.map((post) => <Post post={post} key={post.id} />)
        ) : (
          <div>No posts to show</div>
        )}
      </div>
      {loggedInUser.id === selectedUser && (
        <div>
          <div className="activity-buttons">
            <button
              className="main-button"
              onClick={() => toggleMyLikes(loggedInUser.id)}
            >
              My likes
            </button>
            <button
              className="main-button"
              onClick={() => toggleMyComments(loggedInUser.id)}
            >
              My comments
            </button>
          </div>
          <div className="activity-list">
            {show.myLikes === loggedInUser.id ? (
              <LikedCommentedPosts />
            ) : show.myComments === loggedInUser.id ? (
              <LikedCommentedPosts />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
