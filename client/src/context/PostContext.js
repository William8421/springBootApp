import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";

export const PostContext = createContext();

export function PostProvider({ children }) {
  const navigate = useNavigate();
  // user provider
  const { setServerResponse, loggedInUser } = useUser();
  // post data states
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [commentedPosts, setCommentedPosts] = useState([]);
  // toggle modal state
  const initialShow = {
    updateModal: null,
    deleteModal: null,
    commentsForPost: null,
    likesForPost: null,
    myLikes: null,
    myComments: null,
    more: null,
    hiddenDiv: false,
    updateUser: null,
  };
  const [show, setShow] = useState(initialShow);

  // refresh posts components
  const [refreshPost, setRefreshPosts] = useState(false);
  function triggerRefreshPost() {
    setRefreshPosts(!refreshPost);
  }
  // post's toggle update and delete button
  function toggleMoreActions(postId) {
    if (show.more === null) {
      setShow({ ...show, more: postId });
    } else {
      setShow({ ...show, more: null });
    }
  }
  // toggle update post modal
  function toggleUpdate(postId) {
    if (!show.hiddenDiv) {
      setShow({ ...show, updateModal: postId, hiddenDiv: true });
    } else {
      setShow({ ...show, updateModal: null, hiddenDiv: false });
    }
  }
  // toggle delete post modal
  function toggleDelete(postId) {
    if (!show.hiddenDiv) {
      setShow({ ...show, deleteModal: postId, hiddenDiv: true });
    } else {
      setShow({ ...show, deleteModal: null, hiddenDiv: false });
    }
  }
  // toggle posts' comments
  function toggleComments(postId) {
    setShow((prevState) => {
      if (prevState.commentsForPost === postId) {
        return { ...show, commentsForPost: null };
      } else {
        return { ...show, commentsForPost: postId };
      }
    });
  }
  // toggle post's liked modal
  function togglePostLikes(postId) {
    if (!show.hiddenDiv) {
      setShow({ ...show, likesForPost: postId, hiddenDiv: true });
    } else {
      setShow({ ...show, likesForPost: null, hiddenDiv: false });
    }
  }
  // toggle posts user liked
  function toggleMyLikes(userId) {
    if (show.myLikes === null) {
      setShow({ ...show, myLikes: userId, myComments: null });
    } else {
      setShow({ ...show, myLikes: null, myComments: null });
    }
  }
  // toggle posts user commented on
  function toggleMyComments(userId) {
    if (show.myComments === null) {
      setShow({ ...show, myComments: userId, myLikes: null });
    } else {
      setShow({ ...show, myComments: null, myLikes: null });
    }
  }
  // toggle update user modal
  function toggleUpdateUser(userId) {
    if (show.updateUser === null) {
      setShow({ ...show, updateUser: userId, hiddenDiv: true });
    } else {
      setShow({ ...show, updateUser: null, hiddenDiv: null });
    }
  }
  // Axios instance
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/posts",
  });
  // all posts
  async function getAllPosts() {
    try {
      const response = await axiosInstance.get("/allposts");
      setPosts([...response.data].reverse());
    } catch (error) {
      console.error(error);
    }
  }
  // create post
  async function createPost(newPost) {
    try {
      const response = await axiosInstance.post("/addpost", newPost);
      setServerResponse({
        message: response.data,
        showMessage: true,
      });
      triggerRefreshPost();
    } catch (error) {
      console.error(error);
    }
  }
  // user's posts
  async function getUserPosts(user) {
    try {
      const response = await axiosInstance.post("/userposts", user);
      setUserPosts([...response.data].reverse());
    } catch (error) {
      navigate("/");
      console.error(error);
    }
  }
  // posts user liked
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
  // posts user commented on
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
  // edit post
  async function editPost(post) {
    try {
      const response = await axiosInstance.put("/updatepost", post);
      setServerResponse({
        message: response.data,
        showMessage: true,
      });
      setShow(initialShow);
      triggerRefreshPost();
    } catch (error) {
      console.error(error);
    }
  }
  // delete post
  async function removePost(post) {
    try {
      const response = await axiosInstance.post("/deletepost", post);
      setShow(initialShow);
      setServerResponse({
        message: response.data,
        showMessage: true,
      });
      triggerRefreshPost();
    } catch (error) {
      console.error(error);
    }
  }
  // like post function
  async function likeAPost(like) {
    const response = await axiosInstance.post("/postlike", like);
    setServerResponse({
      message: response.data,
      showMessage: true,
    });
    triggerRefreshPost();
  }

  return (
    <PostContext.Provider
      value={{
        getAllPosts,
        posts,
        createPost,
        likeAPost,
        refreshPost,
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
        toggleUpdateUser,
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
