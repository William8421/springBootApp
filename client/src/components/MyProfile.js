import React, { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { AiOutlineEdit } from "react-icons/ai";
import MyPosts from "./MyPosts";
import UpdateUserModal from "./UpdateUserModal";
import { usePost } from "../context/PostContext";
import MyLikedPosts from "./MyLikedPosts";
import MyCommentedPosts from "./MyCommentedPosts";

export default function MyProfile() {
  const {
    getUser,
    userData,
    refresh,
    isLoggedIn,
    toggleUpdateUser,
    showUpdateUserModal,
  } = useUser();
  const {
    isDeletePostOpen,
    openCloseDeletePost,
    showMyLikes,
    toggleMyLikes,
    showMyComments,
    toggleMyComments,
  } = usePost();

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, [refresh]);

  return (
    <div className="my-profile">
      My profile
      <div
        className={`delete-post-hidden-div ${isDeletePostOpen}`}
        onClick={openCloseDeletePost}
      ></div>
      {isLoggedIn && userData ? (
        <div>
          {userData.profilePic === "noPic" ? (
            <div>No profile picture provided</div>
          ) : (
            <img
              src={userData.profilePic}
              alt="profile"
              style={{ width: "20%" }}
            />
          )}

          <div>First name: {userData.firstName}</div>
          <div>Last name: {userData.lastName}</div>
          <div>Username: {userData.username}</div>
          <div>Age: {userData.age}</div>
          <div>Gender: {userData.gender}</div>
          <AiOutlineEdit onClick={() => toggleUpdateUser(userData.id)} />
          {showUpdateUserModal === userData.id ? (
            <UpdateUserModal userData={userData} />
          ) : null}
        </div>
      ) : null}
      <MyPosts userId={userData.id} />
      <div className="my-likes">
        <button onClick={() => toggleMyLikes(isLoggedIn.id)}>My likes</button>
        {showMyLikes === isLoggedIn.id ? <MyLikedPosts /> : null}
      </div>
      <div className="my-comments">
        <button onClick={() => toggleMyComments(isLoggedIn.username)}>
          My comments
        </button>
        {showMyComments === isLoggedIn.username ? <MyCommentedPosts /> : null}
      </div>
    </div>
  );
}
