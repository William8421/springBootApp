import React, { useEffect } from "react";
import { usePost } from "../../context/PostContext";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import noPic from "../../images/icon-256x256.png";

export default function PostLikedByModal({ post }) {
  const { togglePostLikes } = usePost();
  const { getUsersByIds, postLikesUsers, setUserInfoId } = useUser();

  const navigate = useNavigate();

  function goToUserProfile(userID) {
    togglePostLikes();
    localStorage.setItem("selectedUser", JSON.stringify(userID));
    setUserInfoId(post.userId);
    navigate(`/userprofile`);
  }

  useEffect(() => {
    getUsersByIds(post.postLikesIds);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="liked-by">
      <div className="liked-header">
        <h2>Likes</h2>
        <button className="close-button" onClick={togglePostLikes}>
          X
        </button>
      </div>
      <div className="liked-users-container">
        {postLikesUsers.length !== 0 ? (
          postLikesUsers.map((user) => {
            return (
              <div key={user.id} className="liked-user">
                {user.profilePic !== "noPic" ? (
                  <img src={user.profilePic} alt="profile" />
                ) : (
                  <img src={noPic} alt="empty" />
                )}
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
