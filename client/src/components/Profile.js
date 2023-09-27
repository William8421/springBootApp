import React, { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { AiOutlineEdit } from "react-icons/ai";
import UpdateUserModal from "./UpdateUserModal";
import { usePost } from "../context/PostContext";
import MyLikedPosts from "./MyLikedPosts";
import MyCommentedPosts from "./MyCommentedPosts";
import Post from "./Post";

export default function MyProfile() {
  const {
    getUser,
    userData,
    refresh,
    loggedInUser,
    toggleUpdateUser,
    showUpdateUserModal,
  } = useUser();
  const {
    toggleMyLikes,
    toggleMyComments,
    userPosts,
    getUserPosts,
    show,
    refreshItems,
  } = usePost();
  useEffect(() => {
    getUser();
    getUserPosts(loggedInUser);

    // eslint-disable-next-line
  }, [refresh, refreshItems]);

  return (
    <div className="profile">
      My profile
      {loggedInUser && userData ? (
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
          <AiOutlineEdit
            className="icon"
            onClick={() => toggleUpdateUser(userData.id)}
          />
          {showUpdateUserModal === userData.id ? (
            <UpdateUserModal userData={userData} />
          ) : null}
        </div>
      ) : null}
      <div className="posts">
        My posts
        {userPosts.length > 0 ? (
          userPosts.map((post) => {
            return <Post post={post} key={post.id} />;
          })
        ) : (
          <div>You have no posts yet</div>
        )}
      </div>
      <div className="my-likes">
        <button onClick={() => toggleMyLikes(loggedInUser.id)}>My likes</button>
        {show.myLikes === loggedInUser.id ? <MyLikedPosts /> : null}
      </div>
      <div className="my-comments">
        <button onClick={() => toggleMyComments(loggedInUser.id)}>
          My comments
        </button>
        {show.myComments === loggedInUser.id ? <MyCommentedPosts /> : null}
      </div>
    </div>
  );
}
