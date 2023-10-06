import React from "react";
// providers
import { useUser } from "../../context/UserContext";
import { useComment } from "../../context/CommentContext";
// other
import { useNavigate } from "react-router-dom";
import noPic from "../../images/icon-256x256.png";

export default function CommentLikedByModal({ comment }) {
  // providers
  const { setUserInfoId, allUsers } = useUser();
  const { toggleCommentLikes } = useComment();
  // navigation
  const navigate = useNavigate();
  const goToUserProfile = (userID) => {
    toggleCommentLikes();
    localStorage.setItem("selectedUser", JSON.stringify(userID));
    setUserInfoId(comment.userId);
    navigate(`/userprofile`);
  };
  // comment liked users
  const likedUsers = comment.commentLikesIds.map((id) => {
    const user = allUsers.find((item) => item.id === id);
    return user;
  });

  return (
    <div className="liked-by">
      <div className="liked-header">
        <h2>Likes</h2>
        <button className="close-button" onClick={toggleCommentLikes}>
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
