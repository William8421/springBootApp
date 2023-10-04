import React from "react";
import { useComment } from "../../context/CommentContext";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import noPic from "../../images/icon-256x256.png";

export default function CommentLikedByModal({ comment }) {
  const { toggleCommentLikes } = useComment();
  const { setUserInfoId, allUsers } = useUser();
  const navigate = useNavigate();

  function goToUserProfile(userID) {
    toggleCommentLikes();
    localStorage.setItem("selectedUser", JSON.stringify(userID));
    setUserInfoId(comment.userId);
    navigate(`/userprofile`);
  }

  const users = comment.commentLikesIds.map((id) => {
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
        {users.length !== 0 ? (
          users.map((user) => {
            return (
              <div key={user.id} className="liked-user">
                <img
                  src={user.profilePic !== "noPic" ? user.profilePic : noPic}
                  alt="profile"
                />
                <p onClick={() => goToUserProfile(user.id)}>
                  {user.firstName} {user.lastName}
                </p>
              </div>
            );
          })
        ) : (
          <p>No likes yet</p>
        )}
      </div>
    </div>
  );
}
