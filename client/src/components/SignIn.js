import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function SignIn({ isLoginModalOpen, openCloseLoginModal }) {
  const { signIn, getUser } = useUser();
  const [signInFormData, setSignInFormData] = useState();

  const [passToggle, setPassToggle] = useState({
    showPassword: "",
  });

  function show_hidePassword(e) {
    setPassToggle({
      ...passToggle,
      showPassword: e === passToggle.showPassword ? "" : e,
    });
  }

  const signInFormHandler = (e) => {
    const { name, value } = e.target;
    setSignInFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  function submit() {
    signIn(signInFormData);
    getUser();
  }

  return (
    <div>
      <div
        className={`login-hidden-div ${isLoginModalOpen}`}
        onClick={openCloseLoginModal}
      ></div>
      <div className={`login-modal ${isLoginModalOpen}`}>
        <div className="login-modal-header">
          <h2>Login</h2>
          <button className="close-button" onClick={openCloseLoginModal}>
            X
          </button>
        </div>

        <div className="login-form-container">
          <form onChange={signInFormHandler}>
            <div>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="password-container">
              <input
                type={
                  passToggle.showPassword === "password" ? "text" : "password"
                }
                name="password"
                required
                minLength={6}
                autoComplete="new-password"
                placeholder="Password"
              />
              {passToggle.showPassword === "password" ? (
                <AiOutlineEyeInvisible
                  className="showHidePassword"
                  onClick={() => show_hidePassword("password")}
                />
              ) : (
                <AiOutlineEye
                  className="showHidePassword"
                  onClick={() => show_hidePassword("password")}
                />
              )}
            </div>
          </form>
          <button className="main-button" onClick={submit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
