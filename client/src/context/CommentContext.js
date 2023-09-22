import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useUser } from "./UserContext";

export const CommentContext = createContext();

export function CommentProvider({ children }) {
  const [postComments, setPostComments] = useState([]);
  const [refreshComments, setRefreshComments] = useState(false);
  const [isDeleteCommentOpen, setIsDeleteCommentOpen] =
    useState("delete-comment-off");
  const [selectedComment, setSelectedComment] = useState({});
  const [showUpdateCommentModal, setShowUpdateCommentModal] = useState(false);
  const [showMoreCommentAction, setShowMoreCommentAction] = useState(false);

  const { setServerResponse } = useUser();

  const axiosInstance = axios.create({
    baseURL: "http://192.168.1.103:8080/api/comments",
  });

  function triggerRefresh() {
    setRefreshComments(!refreshComments);
  }

  function openCloseDeleteComment(e) {
    setIsDeleteCommentOpen(
      isDeleteCommentOpen === "delete-comment-off"
        ? "delete-comment-on"
        : "delete-comment-off"
    );
    setSelectedComment(e);
  }

  function toggleUpdateComment(commentId) {
    setShowUpdateCommentModal((prevState) =>
      prevState === commentId ? null : commentId
    );
  }
  function toggleMoreCommentActions(commentId) {
    setShowMoreCommentAction((prevState) =>
      prevState === commentId ? null : commentId
    );
    toggleUpdateComment();
  }

  async function getPostComments(post) {
    try {
      const response = await axiosInstance.post("/postcomments", post);
      setPostComments([...response.data].reverse());
    } catch (error) {
      console.error(error);
    }
  }

  async function createComment(comment) {
    try {
      const response = await axiosInstance.post("/addcomment", comment);
      setServerResponse({
        message: response.data,
        showMessage: true,
      });
      triggerRefresh();
    } catch (error) {
      console.error(error);
    }
  }

  async function editComment(comment) {
    try {
      const response = await axiosInstance.put("/updatepostcomment", comment);
      triggerRefresh();
      setServerResponse({
        message: response.data,
        showMessage: true,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function removeComment(comment) {
    try {
      const response = await axiosInstance.post("deletecomment", comment);
      setServerResponse({
        message: response.data,
        showMessage: true,
      });
      setIsDeleteCommentOpen("delete-comment-off");
      triggerRefresh();
    } catch (error) {
      console.error(error);
    }
  }

  async function likeComment(comment) {
    try {
      const response = await axiosInstance.post("commentlike", comment);
      setServerResponse({
        message: response.data,
        showMessage: true,
      });
      triggerRefresh();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <CommentContext.Provider
      value={{
        getPostComments,
        postComments,
        createComment,
        likeComment,
        refreshComments,
        removeComment,
        toggleUpdateComment,
        showUpdateCommentModal,
        editComment,
        openCloseDeleteComment,
        isDeleteCommentOpen,
        selectedComment,
        showMoreCommentAction,
        toggleMoreCommentActions,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}

export function useComment() {
  return useContext(CommentContext);
}
