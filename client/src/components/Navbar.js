import React, { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const {
    openCloseLoginModal,
    openCloseSignUpModal,
    logOut,
    switcher,
    burger,
    menu,
    isLoggedIn,
    userData,
    getUser,
    serverResponse,
  } = useUser();

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, [!isLoggedIn]);

  return (
    <div className="navbar-container">
      <div className="navbar-sub-container">
        <div className="bar-button" onClick={switcher}>
          <div className={`bar top ${burger}`}></div>
          <div className={`bar middle ${burger}`}></div>
          <div className={`bar bottom ${burger}`}></div>
        </div>
        <div className="pages">
          <div className={`burger-menu ${menu}`}>
            <div className="routes-container">
              <NavLink to={"/"}>
                <button onClick={switcher}>Home</button>
              </NavLink>
              <NavLink to={"/about"}>
                <button onClick={switcher}>About</button>
              </NavLink>
            </div>
            <div>
              {!isLoggedIn ? (
                <div className="signUp-login-container">
                  <button onClick={openCloseSignUpModal}>Sign Up</button>
                  <button onClick={openCloseLoginModal}>Login</button>
                </div>
              ) : (
                <div className="signUp-login-container">
                  <button onClick={logOut}>Logout</button>
                </div>
              )}
            </div>
          </div>
          <div className="username-container">
            {isLoggedIn ? (
              <div>
                <NavLink className="username" to="myprofile">
                  {userData.profilePic === "noPic" ? (
                    isLoggedIn.username[0].toUpperCase()
                  ) : (
                    <img src={userData.profilePic} alt="profile" />
                  )}
                </NavLink>
              </div>
            ) : (
              <div className="no-username"></div>
            )}
          </div>
        </div>
      </div>
      <div className="app-name-landscape">
        <NavLink className="app-name" to="/">
          <h2>Social media app</h2>
        </NavLink>
        <div className="landscape-username-container">
          {isLoggedIn ? (
            <div>
              <NavLink className="landscape-username" to="myprofile">
                {userData.profilePic === "noPic" ? (
                  isLoggedIn.username[0].toUpperCase()
                ) : (
                  <img src={userData.profilePic} alt="profile" />
                )}
              </NavLink>
            </div>
          ) : (
            <div className="landscape-no-username"></div>
          )}
        </div>
      </div>
      {/* <div className='landscape-bar'>
        <NavLink className='landscape-routes' to='/'>Home</NavLink>
        <NavLink className='landscape-routes' to='/about'>About</NavLink>
        <div>
          {!isLoggedIn ? (
            <div className='landscape-signUp-login-container'>
              <button onClick={openCloseSignUpModal}>Sign Up</button>
              <button onClick={openCloseLoginModal}>Login</button>
            </div>
          )
            :
            (<div className='landscape-signUp-login-container'><button onClick={logOut} >Logout</button></div>)
          }
        </div>
      </div> */}
      {serverResponse.showMessage && (
        <p className="server-response-message">{serverResponse.message}</p>
      )}
    </div>
  );
}
