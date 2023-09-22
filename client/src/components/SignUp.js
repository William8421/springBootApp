import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";

export default function SignUp({ isSignUpModalOpen, openCloseSignUpModal }) {
  const { signUp } = useUser();

  const initialForm = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassowrd: "",
    age: "",
    gender: "",
    profilePic: "noPic",
  };

  const [signUpFormData, setSignUpFormData] = useState(initialForm);

  const [passToggle, setPassToggle] = useState({
    showPassword: "",
  });

  const [imgSelected, setImgSelected] = useState("");
  const [uploaded, setUploaded] = useState("");

  function show_hidePassword(e) {
    if (e === "password") {
      setPassToggle({
        ...passToggle,
        showPassword: e === passToggle.showPassword ? "" : e,
      });
    } else if (e === "confirmPassword") {
      setPassToggle({
        ...passToggle,
        showConfirmPassword: e === passToggle.showConfirmPassword ? "" : e,
      });
    }
  }

  function picHandler(e) {
    const selectedFile = e.target.files?.[0];
    setImgSelected(selectedFile || "");
  }

  async function uploadPic(e) {
    e.preventDefault();
    if (!(imgSelected instanceof File)) return;
    const formData = new FormData();
    formData.append("file", imgSelected);
    formData.append("upload_preset", "WilliamMallak");
    formData.append("upload_name", "denpxdokx");
    formData.append("folder", "social-media-app");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/denpxdokx/image/upload",
        formData
      );
      setUploaded(response.data.secure_url);
      setSignUpFormData((prevState) => ({
        ...prevState,
        profilePic: response.data.secure_url,
      }));
    } catch (error) {
      console.error(error);
    }
  }
  const signUpFormHandler = (e) => {
    const { name, value } = e.target;
    setSignUpFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  function submit() {
    if (signUpFormData.password !== signUpFormData.confirmPassword) {
      alert("password and confirm password don't match");
    } else {
      signUp(signUpFormData);
    }
  }

  return (
    <div>
      <div
        className={`signUp-hidden-div ${isSignUpModalOpen}`}
        onClick={openCloseSignUpModal}
      ></div>
      <div className={`signUp-modal ${isSignUpModalOpen}`}>
        <div className="signUp-modal-header">
          <h2>Sign Up</h2>
          <button className="close-button" onClick={openCloseSignUpModal}>
            X
          </button>
        </div>
        <div className="signUp-form-container">
          <form onChange={signUpFormHandler}>
            <div>
              <input
                type="text"
                placeholder="First name"
                name="firstName"
                required
                autoComplete="given-name"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Last name"
                name="lastName"
                required
                autoComplete="family-name"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Username"
                name="username"
                required
                autoComplete="username"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                required
                autoComplete="email"
              />
            </div>
            <div className="password-container">
              <input
                type={
                  passToggle.showPassword === "password" ? "text" : "password"
                }
                placeholder="Password"
                name="password"
                required
                minLength={6}
                autoComplete="new-password"
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
            <div className="password-container">
              <input
                type={
                  passToggle.showConfirmPassword === "confirmPassword"
                    ? "text"
                    : "password"
                }
                placeholder="Confirm password"
                name="confirmPassword"
                required
                minLength={6}
                autoComplete="new-password"
              />
              {passToggle.showConfirmPassword === "confirmPassword" ? (
                <AiOutlineEyeInvisible
                  className="showHidePassword"
                  onClick={() => show_hidePassword("confirmPassword")}
                />
              ) : (
                <AiOutlineEye
                  className="showHidePassword"
                  onClick={() => show_hidePassword("confirmPassword")}
                />
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Age"
                name="age"
                required
                autoComplete="age"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Gender"
                name="gender"
                autoComplete="sex"
              />
            </div>
            <div>
              <input
                type="file"
                name="profilePic"
                onChange={(e) => picHandler(e)}
              />
              {signUpFormData.profilePic !== "" ? (
                <button className="main-button" onClick={(e) => uploadPic(e)}>
                  {uploaded === "" ? "Upload" : "Uploaded"}
                </button>
              ) : (
                <div>Please upload a photo</div>
              )}
            </div>
          </form>
          <button className="main-button" onClick={submit}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
