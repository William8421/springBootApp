import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import SignIn from "../components/SignIn.js";
import SignUp from "../components/SignUp.js";
import { useLocation, useNavigate } from "react-router-dom";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [userData, setUserData] = useState({});
  const [serverResponse, setServerResponse] = useState({
    message: "",
    showMessage: false,
  });

  const [menu, setMenu] = useState("off");
  const [burger, setBurger] = useState("close");

  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);

  function toggleUpdateUser(userId) {
    setShowUpdateUserModal((prevState) =>
      prevState === userId ? null : userId
    );
  }

  function switcher() {
    setMenu(menu === "off" ? "on" : "off");
    setBurger(burger === "close" ? "open" : "close");
  }

  const [isLoginModalOpen, setIsLoginModalOpen] = useState("loginModalOff");
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState("signUpModalOff");

  function openCloseLoginModal() {
    setIsLoginModalOpen(
      isLoginModalOpen === "loginModalOff" ? "loginModalOn" : "loginModalOff"
    );
    setMenu("off");
    setBurger("close");
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
    setRefresh(true);
  };

  const axiosInstance = axios.create({
    baseURL: "http://192.168.1.103:8080/api",
  });

  const isLoggedIn = JSON.parse(localStorage.getItem("user")) || "";

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
      setBurger("close");
      setServerResponse({
        message: "You are signed up",
        showMessage: true,
      });
    } catch (error) {
      alert(error.response.data);
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
      setBurger("close");
      setServerResponse({
        message: "You are logged in",
        showMessage: true,
      });
    } catch (error) {
      console.error(error);
    }
  }

  function logOut() {
    localStorage.removeItem("user");
    switcher();
    triggerRefresh();
    if (location.pathname === "/myprofile") {
      navigate("/");
    }
  }

  async function getUser() {
    if (isLoggedIn) {
      try {
        const response = await axiosInstance.post("/users/user", isLoggedIn);
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function editUser(user) {
    try {
      const response = await axiosInstance.put("/users/editprofile", user);
      triggerRefresh();
      setShowUpdateUserModal(false);
      setServerResponse({
        message: response.data,
        showMessage: true,
      });
    } catch (error) {
      console.error(error);
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
        isLoggedIn,
        switcher,
        menu,
        burger,
        openCloseLoginModal,
        openCloseSignUpModal,
        getUser,
        userData,
        editUser,
        toggleUpdateUser,
        showUpdateUserModal,
        refresh,
        serverResponse,
        setServerResponse,
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
