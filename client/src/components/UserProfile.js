import React, { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { usePost } from "../context/PostContext";
import Post from "./Post";
import { AiOutlineEdit } from "react-icons/ai";
import UpdateUserModal from "./UpdateUserModal";
import MyLikedPosts from "./MyLikedPosts";
import MyCommentedPosts from "./MyCommentedPosts";

export default function UserProfile() {
  const {
    loggedInUser,
    refresh,
    getUserInfo,
    userInfo,
    userInfoId,
    toggleUpdateUser,
    getUser,
    showUpdateUserModal,
  } = useUser();
  const {
    refreshItems,
    userPosts,
    getUserPosts,
    toggleMyLikes,
    toggleMyComments,
    show,
  } = usePost();

  const selectedUser = JSON.parse(localStorage.getItem("selectedUser")) || "";

  useEffect(() => {
    let user = {
      id: selectedUser,
    };
    console.log(user);
    getUser();
    getUserInfo();
    getUserPosts(user);
    // eslint-disable-next-line
  }, [refresh, refreshItems]);

  return (
    <div className="profile">
      {userInfo ? (
        <div>
          {userInfo.profilePic === "noPic" ? (
            <div>No profile picture provided</div>
          ) : (
            <img
              src={userInfo.profilePic}
              alt="profile"
              style={{ width: "20%" }}
            />
          )}

          <div>First name: {userInfo.firstName}</div>
          <div>Last name: {userInfo.lastName}</div>
          <div>Username: {userInfo.username}</div>
          <div>Age: {userInfo.age}</div>
          <div>Gender: {userInfo.gender}</div>
          {loggedInUser.id === userInfoId ? (
            <>
              <AiOutlineEdit
                className="icon"
                onClick={() => toggleUpdateUser(userInfo.id)}
              />
              {showUpdateUserModal === userInfo.id ? (
                <UpdateUserModal userData={userInfo} />
              ) : null}
            </>
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
          <div>No posts to show</div>
        )}
      </div>
      {loggedInUser.id === userInfoId ? (
        <div>
          <div className="my-likes">
            <button onClick={() => toggleMyLikes(loggedInUser.id)}>
              My likes
            </button>
            {show.myLikes === loggedInUser.id ? <MyLikedPosts /> : null}
          </div>
          <div className="my-comments">
            <button onClick={() => toggleMyComments(loggedInUser.id)}>
              My comments
            </button>
            {show.myComments === loggedInUser.id ? <MyCommentedPosts /> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
