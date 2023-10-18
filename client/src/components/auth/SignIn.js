import React, { useState } from "react";
// provider
import { useUser } from "../../context/UserContext";
// other
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function SignIn() {
  // provider
  const { signIn, toggleAuthModal, formKey, serverError, isAuthModalOpen } =
    useUser();
  // form state
  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });

  // toggle password
  const [passToggle, setPassToggle] = useState({
    showPassword: "",
  });
  function show_hidePassword(e) {
    setPassToggle({
      ...passToggle,
      showPassword: e === passToggle.showPassword ? "" : e,
    });
  }
  // form handler
  const signInFormHandler = (e) => {
    const { name, value } = e.target;
    setSignInFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // sign in
  function submit() {
    signIn(signInFormData);
  }

  return (
    <div>
      <div
        className={`login-hidden-div ${isAuthModalOpen}`}
        onClick={() => toggleAuthModal(null)}
      ></div>
      <div className="auth-modal">
        <div className="auth-modal-header">
          <h2>Login</h2>
          <button
            className="close-button"
            onClick={() => toggleAuthModal(null)}
          >
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
        <div className="login-sign-up-buttons">
          <button className="main-button" onClick={submit}>
            Login
          </button>
          <div>
            {" "}
            Don't have an account?
            <Link onClick={() => toggleAuthModal("signup")}> Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
