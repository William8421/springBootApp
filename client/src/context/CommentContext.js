import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useUser } from "./UserContext";

export const CommentContext = createContext();

export function CommentProvider({ children }) {
  const { setServerResponse } = useUser();
  const [postComments, setPostComments] = useState([]);
  const [refreshComments, setRefreshComments] = useState(false);

  const initialCommentShow = {
    updateCommentModal: null,
    deleteCommentModal: null,
    moreActions: null,
    likesForComment: null,
    hiddenDiv: false,
  };

  const [commentShow, setCommentShow] = useState(initialCommentShow);

  const axiosInstance = axios.create({
    baseURL: "http://192.168.1.103:8080/api/comments",
  });

  function triggerRefresh() {
    setRefreshComments(!refreshComments);
  }

  function toggleDeleteComment(commentId) {
    if (!commentShow.hiddenDiv) {
      setCommentShow({
        ...commentShow,
        deleteCommentModal: commentId,
        hiddenDiv: true,
      });
    } else {
      setCommentShow({
        ...commentShow,
        deleteCommentModal: null,
        hiddenDiv: false,
      });
    }
  }

  function toggleUpdateComment(commentId) {
    if (!commentShow.hiddenDiv) {
      setCommentShow({
        ...commentShow,
        updateCommentModal: commentId,
        hiddenDiv: true,
      });
    } else {
      setCommentShow({
        ...commentShow,
        updateCommentModal: null,
        hiddenDiv: false,
      });
    }
  }

  function toggleCommentLikes(commentId) {
    if (!commentShow.hiddenDiv) {
      setCommentShow({
        ...commentShow,
        likesForComment: commentId,
        hiddenDiv: true,
      });
    } else {
      setCommentShow({
        ...commentShow,
        likesForComment: null,
        hiddenDiv: false,
      });
    }
  }

  function toggleMoreCommentActions(commentId) {
    if (commentShow.moreActions === null) {
      setCommentShow({ ...commentShow, moreActions: commentId });
    } else {
      setCommentShow({ ...commentShow, moreActions: null, hiddenDiv: false });
    }
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
      triggerRefresh();
      setServerResponse({
        message: response.data,
        showMessage: true,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function editComment(comment) {
    try {
      const response = await axiosInstance.put("/updatepostcomment", comment);
      triggerRefresh();
      setCommentShow(initialCommentShow);
      setServerResponse({
        message: response.data,
        showMessage: true,
      });
      toggleUpdateComment();
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
      toggleDeleteComment();
      setCommentShow(initialCommentShow);
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
        editComment,
        toggleMoreCommentActions,
        toggleDeleteComment,
        toggleCommentLikes,
        commentShow,
        setCommentShow,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}

export function useComment() {
  return useContext(CommentContext);
}
