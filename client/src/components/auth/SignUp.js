import React, { useRef, useState } from "react";
// provider
import { useUser } from "../../context/UserContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiCheckLine, RiImageAddFill } from "react-icons/ri";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SignUp() {
  // provider
  const {
    signUp,
    toggleAuthModal,
    formKey,
    serverError,
    setServerError,
    isAuthModalOpen,
  } = useUser();
  // form states
  const initialForm = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
    profilePic: null,
  };
  const [signUpFormData, setSignUpFormData] = useState(initialForm);
  const [uploaded, setUploaded] = useState("");

  const hiddenFileInput = useRef(null);
  // handler for input button
  const uploadButtonHandler = () => {
    hiddenFileInput.current.click();
  };
  // image handler
  const picHandler = (e) => {
    const selectedFile = e.target.files?.[0];
    setSignUpFormData({ ...signUpFormData, profilePic: selectedFile });
  };
  // input file function
  const uploadPic = async (e) => {
    e.preventDefault();
    if (!(signUpFormData.profilePic instanceof File)) return;
    const formData = new FormData();
    formData.append("file", signUpFormData.profilePic);
    formData.append("upload_preset", "WilliamMallak");
    formData.append("upload_name", "denpxdokx");
    formData.append("folder", "social-media-app/users");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/denpxdokx/image/upload",
        formData
      );
      setUploaded(response.data.secure_url);
      setSignUpFormData({
        ...signUpFormData,
        profilePic: response.data.secure_url,
      });
    } catch (error) {
      console.error(error);
    }
  };
  // form handler
  const signUpFormHandler = (e) => {
    const { name, value } = e.target;
    setSignUpFormData({ ...signUpFormData, [name]: value });
  };
  // toggle password
  const [passToggle, setPassToggle] = useState({ showPassword: "" });
  const show_hidePassword = (e) => {
    setPassToggle({
      ...passToggle,
      [e]: passToggle[e] === e ? "" : e,
    });
  };
  // register/signup
  const submit = () => {
    if (signUpFormData.password !== signUpFormData.confirmPassword) {
      setServerError("password and confirm password don't match");
    } else {
      signUp(signUpFormData);
      setSignUpFormData({ ...initialForm, dateOfBirth: "" });
      setUploaded(""); // Reset uploaded state
    }
  };

  return (
    <div>
      <div
        className={`signUp-hidden-div ${isAuthModalOpen}`}
        onClick={() => toggleAuthModal(null)}
      ></div>
      <div className="auth-modal">
        <div className="auth-modal-header">
          <h2>Sign Up</h2>
          <button
            className="close-button"
            onClick={() => toggleAuthModal(null)}
          >
            X
          </button>
        </div>
        <form key={formKey} onChange={signUpFormHandler}>
          <input
            type="text"
            placeholder="First name"
            name="firstName"
            required
            autoComplete="given-name"
          />
          <input
            type="text"
            placeholder="Last name"
            name="lastName"
            required
            autoComplete="family-name"
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            required
            autoComplete="username"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            autoComplete="email"
          />
          <div className="password-container">
            <input
              type={
                passToggle.showPassword === "password" ? "text" : "password"
              }
              placeholder="Password"
              name="password"
              required
              minLength={6}
              autoComplete="off"
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
              autoComplete="off"
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

          <div className="date-gender-container">
            <div className="date-container">
              <DatePicker
                selected={signUpFormData.dateOfBirth}
                onChange={(date) =>
                  setSignUpFormData({ ...signUpFormData, dateOfBirth: date })
                }
                placeholderText="Date of birth"
                required
                autoComplete="dateOfBirth"
                dateFormat="dd-MM-yyyy"
                showYearDropdown
                scrollableYearDropdown
                showMonthDropdown
                scrollableMonthDropdown
                yearDropdownItemNumber={70}
              />
            </div>

            <select name="gender" placeholder="Gender">
              <option value="not set">--</option>
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
            </select>
          </div>

          <div className="icons-container">
            <div className="input-button-container">
              <RiImageAddFill onClick={uploadButtonHandler} className="icon" />
              <span>{signUpFormData.profilePic?.name}</span>
            </div>

            <input
              type="file"
              onChange={(e) => picHandler(e)}
              ref={hiddenFileInput}
            />
            {signUpFormData.profilePic === null ? null : uploaded === "" ? (
              <FaCloudUploadAlt
                className="icon"
                onClick={(e) => uploadPic(e)}
              />
            ) : (
              <RiCheckLine className="icon" onClick={(e) => uploadPic(e)} />
            )}
          </div>
          <div className="error">{serverError.userError}</div>
        </form>
        <div className="login-sign-up-buttons">
          <button className="main-button" onClick={submit}>
            Sign Up
          </button>
          <div>
            {" "}
            You have an account?
            <Link onClick={() => toggleAuthModal("login")}> Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
