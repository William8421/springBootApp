import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";

export const PostContext = createContext();

export function PostProvider({ children }) {
  const { setServerResponse, loggedInUser } = useUser();

  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [commentedPosts, setCommentedPosts] = useState([]);

  const navigate = useNavigate();

  const [refreshItems, setRefreshItems] = useState(false);
  const initialShow = {
    updateModal: null,
    deleteModal: null,
    commentsForPost: null,
    likesForPost: null,
    myLikes: null,
    myComments: null,
    more: null,
    hiddenDiv: false,
  };

  const [show, setShow] = useState(initialShow);

  function toggleMoreActions(postId) {
    if (show.more === null) {
      setShow({ ...show, more: postId });
    } else {
      setShow({ ...show, more: null });
    }
  }

  function toggleUpdate(postId) {
    if (!show.hiddenDiv) {
      setShow({ ...show, updateModal: postId, hiddenDiv: true });
    } else {
      setShow({ ...show, updateModal: null, hiddenDiv: false });
    }
  }

  function toggleDelete(postId) {
    if (!show.hiddenDiv) {
      setShow({ ...show, deleteModal: postId, hiddenDiv: true });
    } else {
      setShow({ ...show, deleteModal: null, hiddenDiv: false });
    }
  }

  function toggleComments(postId) {
    setShow((prevState) => {
      if (prevState.commentsForPost === postId) {
        return { ...show, commentsForPost: null };
      } else {
        return { ...show, commentsForPost: postId };
      }
    });
  }

  function togglePostLikes(postId) {
    if (!show.hiddenDiv) {
      setShow({ ...show, likesForPost: postId, hiddenDiv: true });
    } else {
      setShow({ ...show, likesForPost: null, hiddenDiv: false });
    }
  }

  function toggleMyLikes(userId) {
    if (show.myLikes === null) {
      setShow({ ...show, myLikes: userId, myComments: null });
    } else {
      setShow({ ...show, myLikes: null, myComments: null });
    }
  }

  function toggleMyComments(userId) {
    if (show.myComments === null) {
      setShow({ ...show, myComments: userId, myLikes: null });
    } else {
      setShow({ ...show, myComments: null, myLikes: null });
    }
  }

  const axiosInstance = axios.create({
    baseURL: "http://192.168.1.103:8080/api/posts",
  });

  async function getAllPosts() {
    try {
      const response = await axiosInstance.get("/allposts");
      setPosts([...response.data].reverse());
    } catch (error) {
      console.error(error);
    }
  }

  async function createPost(newPost) {
    try {
      const response = await axiosInstance.post("/addpost", newPost);
      setServerResponse({
        message: response.data,
        showMessage: true,
      });
      setRefreshItems(!refreshItems);
    } catch (error) {
      console.error(error);
    }
  }

  async function getUserPosts(user) {
    try {
      const response = await axiosInstance.post("/userposts", user);
      setUserPosts([...response.data].reverse());
    } catch (error) {
      navigate("/");
      console.error(error);
    }
  }

  async function getLikedPosts() {
    try {
      const userId = {
        userId: loggedInUser.id,
      };
      const response = await axiosInstance.post("/likedposts", userId);
      setLikedPosts([...response.data].reverse());
    } catch (error) {
      console.error(error);
    }
  }

  async function getCommentedPosts() {
    try {
      const userId = {
        userId: loggedInUser.id,
      };
      const response = await axiosInstance.post("/commentedposts", userId);
      setCommentedPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function editPost(post) {
    try {
      const response = await axiosInstance.put("/updatepost", post);
      setServerResponse({
        message: response.data,
        showMessage: true,
      });
      setShow(initialShow);
      setRefreshItems(!refreshItems);
    } catch (error) {
      console.error(error);
    }
  }

  async function removePost(post) {
    try {
      const response = await axiosInstance.post("/deletepost", post);
      setShow(initialShow);
      setServerResponse({
        message: response.data,
        showMessage: true,
      });
      setRefreshItems(!refreshItems);
    } catch (error) {
      console.error(error);
    }
  }

  async function likeAPost(like) {
    const response = await axiosInstance.post("/postlike", like);
    setServerResponse({
      message: response.data,
      showMessage: true,
    });
    setRefreshItems(!refreshItems);
  }

  return (
    <PostContext.Provider
      value={{
        getAllPosts,
        posts,
        createPost,
        likeAPost,
        refreshItems,
        editPost,
        removePost,
        userPosts,
        getUserPosts,
        toggleUpdate,
        toggleDelete,
        toggleMoreActions,
        toggleComments,
        togglePostLikes,
        getLikedPosts,
        likedPosts,
        toggleMyLikes,
        getCommentedPosts,
        commentedPosts,
        toggleMyComments,
        show,
        setShow,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export function usePost() {
  return useContext(PostContext);
}
