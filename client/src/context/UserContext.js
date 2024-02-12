import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import SignIn from "../components/auth/SignIn.js";
import SignUp from "../components/auth/SignUp.js";
import { useLocation, useNavigate } from "react-router-dom";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  // user data and info
  const [userData, setUserData] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [userInfoId, setUserInfoId] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  // server response and error
  const [serverResponse, setServerResponse] = useState({
    message: "",
    showMessage: false,
  });
  const [serverError, setServerError] = useState({
    userError: null,
    postError: null,
    commentError: null,
  });
  // menu control
  const [menu, setMenu] = useState("off");
  function switcher() {
    setMenu(menu === "off" ? "on" : "off");
  }
  // authentication modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(null);
  function toggleAuthModal(modalType) {
    setIsAuthModalOpen(isAuthModalOpen === modalType ? null : modalType);
    switcher();
  }
  // refresh components
  const [refresh, setRefresh] = useState(false);
  function triggerRefresh() {
    setRefresh(!refresh);
  }
  // Axios instance
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
  });
  // local storage
  const loggedInUser = JSON.parse(localStorage.getItem("user")) || "";
  const selectedUser = JSON.parse(localStorage.getItem("selectedUser")) || "";
  // form key
  const [formKey, setFormKey] = useState(0);
  function resetForm() {
    setFormKey((prevKey) => prevKey + 1);
  }
  // registration
  async function signUp(data) {
    try {
      const response = await axiosInstance.post(`/auth/register`, data);
      const [username, id] = response.data?.split("&") || [];
      const userStorage = {
        username,
        id,
      };
      localStorage.setItem("user", JSON.stringify(userStorage));
      toggleAuthModal(null);
      setMenu("off");
      setServerResponse({
        message: `Welcome ${userStorage.username}`,
        showMessage: true,
      });
      setServerError((prevError) => {
        return { ...prevError, userError: null };
      });
      if (response.data) {
        resetForm();
      }
      triggerRefresh();
    } catch (error) {
      console.error(error);
      setServerError((prevError) => {
        return { ...prevError, userError: error.response.data };
      });
    }
  }
  // login
  async function signIn(data) {
    try {
      const response = await axiosInstance.post("/auth/signin", data);
      const [username, id] = response.data?.split("&") || [];
      const userStorage = {
        username,
        id,
      };
      localStorage.setItem("user", JSON.stringify(userStorage));
      toggleAuthModal(null);
      setMenu("off");
      setServerResponse({
        message: "You are logged in",
        showMessage: true,
      });
      resetForm();
      triggerRefresh();
      setServerError((prevError) => {
        return { ...prevError, userError: null };
      });
    } catch (error) {
      setServerError((prevError) => {
        return { ...prevError, userError: error.response.data };
      });
    }
  }
  // logout
  function logOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("selectedUser");
    switcher();
    triggerRefresh();
    if (location.pathname === "/userprofile") {
      navigate("/");
    }
  }
  // user data function
  async function getUser() {
    if (loggedInUser) {
      try {
        const response = await axiosInstance.post("/users/user", loggedInUser);
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
  // user info function
  async function getUserInfo() {
    try {
      const response = await axiosInstance.post("/users/user", {
        id: selectedUser,
      });
      setUserInfo(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  // all users function
  async function getAllUsers() {
    try {
      const response = await axiosInstance.get("users/users");
      setAllUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  // edit user profile
  async function editUser(user) {
    try {
      const response = await axiosInstance.put("/users/editprofile", user);
      setServerResponse({
        message: response.data,
        showMessage: true,
      });
      setServerError((prevError) => {
        return { ...prevError, userError: null };
      });
      triggerRefresh();
      resetForm();
    } catch (error) {
      setServerError((prevError) => {
        return { ...prevError, userError: error.response.data };
      });
    }
  }
  // Timer to clear server response message after a certain time
  useEffect(() => {
    const timer = setTimeout(() => {
      setServerResponse({
        message: "",
        showMessage: false,
      });
    }, 2000);
    const errorTimer = setTimeout(() => {
      setServerError({
        userError: null,
        postError: null,
        commentError: null,
      });
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(errorTimer);
    };
  }, [serverResponse.showMessage, serverError]);

  return (
    <UserContext.Provider
      value={{
        signIn,
        logOut,
        signUp,
        loggedInUser,
        switcher,
        menu,
        toggleAuthModal,
        isAuthModalOpen,
        getUser,
        userData,
        editUser,
        refresh,
        serverResponse,
        setServerResponse,
        setUserInfoId,
        userInfoId,
        getUserInfo,
        userInfo,
        selectedUser,
        formKey,
        resetForm,
        serverError,
        setServerError,
        getAllUsers,
        allUsers,
      }}
    >
      {children}
      {isAuthModalOpen === "login" && <SignIn />}
      {isAuthModalOpen === "signup" && <SignUp />}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
