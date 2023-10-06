import React from "react";
// providers
import { useUser } from "../../context/UserContext";
import { usePost } from "../../context/PostContext";
// other
import { useNavigate } from "react-router-dom";
import noPic from "../../images/icon-256x256.png";

export default function PostLikedByModal({ post }) {
  // providers
  const { togglePostLikes } = usePost();
  const { setUserInfoId, allUsers } = useUser();
  // navigation
  const navigate = useNavigate();
  const goToUserProfile = (userID) => {
    togglePostLikes();
    localStorage.setItem("selectedUser", JSON.stringify(userID));
    setUserInfoId(post.userId);
    navigate(`/userprofile`);
  };
  // post liked users
  const likedUsers = post.postLikesIds.map((id) => {
    const user = allUsers.find((item) => item.id === id);
    return user;
  });

  return (
    <div className="liked-by">
      <div className="liked-header">
        <h2>Likes</h2>
        <button className="close-button" onClick={togglePostLikes}>
          X
        </button>
      </div>
      <div className="liked-users-container">
        {likedUsers.length !== 0 ? (
          likedUsers.map((user) => (
            <div
              key={user.id}
              className="liked-user"
              onClick={() => goToUserProfile(user.id)}
            >
              <img
                src={user.profilePic ? user.profilePic : noPic}
                alt="profile"
              />
              <p>
                {user.firstName} {user.lastName}
              </p>
            </div>
          ))
        ) : (
          <p>No likes yet</p>
        )}
      </div>
    </div>
  );
}
