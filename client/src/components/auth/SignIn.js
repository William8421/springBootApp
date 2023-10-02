import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function SignIn({ isLoginModalOpen, openCloseLoginModal }) {
  const { signIn, openCloseSignUpModal, formKey, serverError } = useUser();
  const initialSignInForm = {
    email: "",
    password: "",
  };
  const [signInFormData, setSignInFormData] = useState(initialSignInForm);

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
  }

  function goToSignUp() {
    openCloseLoginModal();
    openCloseSignUpModal();
  }

  return (
    <div>
      <div>
        <div
          className={`login-hidden-div ${isLoginModalOpen}`}
          onClick={openCloseLoginModal}
        ></div>
        <div className={`auth-modal ${isLoginModalOpen}`}>
          <div className="auth-modal-header">
            <h2>Login</h2>
            <button className="close-button" onClick={openCloseLoginModal}>
              X
            </button>
          </div>

          <form key={formKey} onChange={signInFormHandler}>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Email"
              required
            />
            <div className="password-container">
              <input
                type={
                  passToggle.showPassword === "password" ? "text" : "password"
                }
                name="password"
                required
                minLength={6}
                autoComplete="off"
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
            <div className="error">{serverError.userError}</div>
          </form>
          <div className="submit-buttons-container">
            <button className="main-button" onClick={submit}>
              Login
            </button>
            <button className="cancel-button" onClick={goToSignUp}>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
