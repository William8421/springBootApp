import React, { useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineHome, AiOutlineInfo } from "react-icons/ai";
import { usePost } from "../../context/PostContext";
import { useComment } from "../../context/CommentContext";

export default function Navbar() {
  const {
    openCloseLoginModal,
    openCloseSignUpModal,
    logOut,
    switcher,
    menu,
    loggedInUser,
    userData,
    getUser,
    serverResponse,
    setUserInfoId,
    refresh,
  } = useUser();

  const { show, setShow } = usePost();
  const { commentShow, setCommentShow } = useComment();

  const navigate = useNavigate();

  function closeHiddenDiv() {
    if (show.hiddenDiv) {
      setShow({
        ...show,
        updateModal: null,
        deleteModal: null,
        commentsForPost: null,
        likesForPost: null,
        hiddenDiv: false,
        updateUser: null,
      });
    } else {
      setCommentShow({
        ...commentShow,
        updateCommentModal: null,
        deleteCommentModal: null,
        likesForComment: null,
        hiddenDiv: false,
      });
    }
  }

  function goToUserProfile() {
    localStorage.setItem("selectedUser", JSON.stringify(loggedInUser.id));
    setUserInfoId(loggedInUser.id);
    navigate(`/userprofile`);
    switcher();
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    if (loggedInUser) {
      getUser();
    }
    // eslint-disable-next-line
  }, [refresh]);

  return (
    <div className="navbar-container">
      <div
        className={`hidden-div ${show.hiddenDiv ? "open" : ""} ${
          commentShow.hiddenDiv ? "open" : ""
        } `}
        onClick={closeHiddenDiv}
      ></div>
      <div className="routes-container">
        <div className="route">
          {loggedInUser ? (
            <div>
              <div onClick={switcher}>
                {userData.profilePic === "noPic" ? (
                  loggedInUser.username[0].toUpperCase()
                ) : (
                  <img src={userData.profilePic} alt="profile" />
                )}
              </div>
            </div>
          ) : (
            <div>
              <AiOutlineUser onClick={switcher} className="nav-icon" />
            </div>
          )}
        </div>
        <div className="route">
          <NavLink to={"/"}>
            <AiOutlineHome className="nav-icon" />
          </NavLink>
        </div>
        <div className="route">
          <NavLink to={"/about"}>
            <AiOutlineInfo className="nav-icon" />
          </NavLink>
        </div>
      </div>
      <div className="pages">
        <div className={`burger-menu ${menu}`}>
          {!loggedInUser ? (
            <div className="signUp-login-container">
              <button onClick={openCloseSignUpModal}>Sign Up</button>
              <button onClick={openCloseLoginModal}>Login</button>
            </div>
          ) : (
            <div>
              <div className="signUp-login-container">
                <button onClick={goToUserProfile}>Your profile</button>
                <button onClick={logOut}>Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>
      {serverResponse.showMessage && (
        <p className="server-response-message">{serverResponse.message}</p>
      )}
    </div>
  );
}
