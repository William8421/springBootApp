import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useUser } from "./UserContext";

export const PostContext = createContext();

export function PostProvider({ children }) {
  const { setServerResponse, isLoggedIn } = useUser();

  const [posts, setPosts] = useState([]);
  const [refreshItems, setRefreshItems] = useState(false);
  const [isDeletePostOpen, setIsDeletePostOpen] = useState("delete-post-off");
  const [selectedPost, setSelectedPost] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [commentedPosts, setCommentedPosts] = useState([]);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCommentsForPost, setShowCommentsForPost] = useState(null);
  const [showLikesForPost, setShowLikesForPost] = useState(null);
  const [showMyLikes, setShowMyLikes] = useState(null);
  const [showMyComments, setShowMyComments] = useState(null);
  const [showMore, setShowMore] = useState(false);

  function toggleUpdate(postId) {
    setShowUpdateModal((prevState) => (prevState === postId ? null : postId));
  }

  function toggleComments(postId) {
    setShowCommentsForPost((prevState) =>
      prevState === postId ? null : postId
    );
  }

  function togglePostLikes(postId) {
    setShowLikesForPost((prevState) => (prevState === postId ? null : postId));
  }
  function toggleMyLikes(userId) {
    setShowMyLikes((prevState) => (prevState === userId ? null : userId));
    setShowMyComments(null);
  }

  function toggleMyComments(username) {
    setShowMyComments((prevState) =>
      prevState === username ? null : username
    );
    setShowMyLikes(null);
  }

  function toggleMoreActions(postId) {
    setShowMore((prevState) => (prevState === postId ? null : postId));
    toggleUpdate();
  }

  function openCloseDeletePost(e) {
    setIsDeletePostOpen(
      isDeletePostOpen === "delete-post-off"
        ? "delete-post-on"
        : "delete-post-off"
    );
    setSelectedPost(e);
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

  async function getUserPosts() {
    const response = await axiosInstance.post("/userposts", isLoggedIn);
    setUserPosts([...response.data].reverse());
  }

  async function getLikedPosts() {
    try {
      const userId = {
        userId: isLoggedIn.id,
      };
      const response = await axiosInstance.post("/likedposts", userId);
      setLikedPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getCommentedPosts() {
    try {
      const username = {
        username: isLoggedIn.username,
      };
      const response = await axiosInstance.post("/commentedposts", username);
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
      setShowUpdateModal(false);
      setRefreshItems(!refreshItems);
    } catch (error) {
      console.error(error);
    }
  }

  async function removePost(post) {
    try {
      const response = await axiosInstance.post("/deletepost", post);
      setIsDeletePostOpen("delete-post-off");
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
        openCloseDeletePost,
        isDeletePostOpen,
        selectedPost,
        removePost,
        userPosts,
        getUserPosts,
        showUpdateModal,
        toggleUpdate,
        showCommentsForPost,
        showMore,
        toggleMoreActions,
        toggleComments,
        showLikesForPost,
        togglePostLikes,
        setShowLikesForPost,
        getLikedPosts,
        likedPosts,
        showMyLikes,
        toggleMyLikes,
        getCommentedPosts,
        commentedPosts,
        showMyComments,
        toggleMyComments,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export function usePost() {
  return useContext(PostContext);
}
