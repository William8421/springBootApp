import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import SignIn from "../components/auth/SignIn.js";
import SignUp from "../components/auth/SignUp.js";
import { useLocation, useNavigate } from "react-router-dom";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [userData, setUserData] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [userInfoId, setUserInfoId] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [serverResponse, setServerResponse] = useState({
    message: "",
    showMessage: false,
  });
  const [serverError, setServerError] = useState({
    userError: null,
    postError: null,
    commentError: null,
  });

  const [menu, setMenu] = useState("off");

  function switcher() {
    setMenu(menu === "off" ? "on" : "off");
  }

  const [isLoginModalOpen, setIsLoginModalOpen] = useState("loginModalOff");
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState("signUpModalOff");

  function openCloseLoginModal() {
    setIsLoginModalOpen(
      isLoginModalOpen === "loginModalOff" ? "loginModalOn" : "loginModalOff"
    );
    setMenu("off");
  }
  function openCloseSignUpModal() {
    setIsSignUpModalOpen(
      isSignUpModalOpen === "signUpModalOff"
        ? "signUpModalOn"
        : "signUpModalOff"
    );
    switcher();
  }

  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => {
    setRefresh(!refresh);
  };

  const axiosInstance = axios.create({
    baseURL: "http://192.168.1.103:8080/api",
  });

  const loggedInUser = JSON.parse(localStorage.getItem("user")) || "";
  const selectedUser = JSON.parse(localStorage.getItem("selectedUser")) || "";

  const [formKey, setFormKey] = useState(0);

  function resetForm() {
    setFormKey((prevKey) => prevKey + 1);
  }

  async function signUp(data) {
    try {
      const response = await axiosInstance.post(`/auth/register`, data);
      const user = response.data.split("&");
      const userStorage = {
        username: user[0],
        id: user[1],
      };
      localStorage.setItem("user", JSON.stringify(userStorage));
      openCloseSignUpModal();
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
    } catch (error) {
      console.error(error);
      setServerError((prevError) => {
        return { ...prevError, userError: error.response.data };
      });
    }
  }

  async function signIn(data) {
    try {
      const response = await axiosInstance.post("/auth/signin", data);
      const user = response.data.split("&");
      const userStorage = {
        username: user[0],
        id: user[1],
      };
      localStorage.setItem("user", JSON.stringify(userStorage));
      openCloseLoginModal();
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

  function logOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("selectedUser");
    switcher();
    triggerRefresh();
    if (location.pathname === "/userprofile") {
      navigate("/");
    }
  }

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

  async function getAllUsers() {
    try {
      const response = await axiosInstance.get("users/users");
      setAllUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setServerResponse({
        message: "",
        showMessage: false,
      });
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [serverResponse.showMessage]);

  return (
    <UserContext.Provider
      value={{
        signIn,
        logOut,
        signUp,
        loggedInUser,
        switcher,
        menu,
        openCloseLoginModal,
        openCloseSignUpModal,
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
      {
        <SignIn
          isLoginModalOpen={isLoginModalOpen}
          openCloseLoginModal={openCloseLoginModal}
        />
      }
      {
        <SignUp
          isSignUpModalOpen={isSignUpModalOpen}
          openCloseSignUpModal={openCloseSignUpModal}
        />
      }
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
