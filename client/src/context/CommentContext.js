import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useUser } from "./UserContext";

export const CommentContext = createContext();

export function CommentProvider({ children }) {
  // user provider
  const { setServerResponse } = useUser();
  // comment data states
  const [postComments, setPostComments] = useState([]);
  // toggle modal state
  const initialCommentShow = {
    updateCommentModal: null,
    deleteCommentModal: null,
    moreActions: null,
    likesForComment: null,
    hiddenDiv: false,
  };
  const [commentShow, setCommentShow] = useState(initialCommentShow);

  // refresh comments components
  const [refreshComments, setRefreshComments] = useState(false);
  function triggerRefreshComments() {
    setRefreshComments(!refreshComments);
  }
  // comments' toggle update and delete button
  function toggleMoreCommentActions(commentId) {
    if (commentShow.moreActions === null) {
      setCommentShow({ ...commentShow, moreActions: commentId });
    } else {
      setCommentShow({ ...commentShow, moreActions: null, hiddenDiv: false });
    }
  }
  // toggle update comment modal
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
  // toggle delete comment modal
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
  // toggle comments liked modal
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
  // Axios instance
  const axiosInstance = axios.create({
    baseURL: "http://192.168.1.104:8080/api/comments",
  });
  // all post comments
  async function getPostComments(post) {
    try {
      const response = await axiosInstance.post("/postcomments", post);
      setPostComments([...response.data].reverse());
    } catch (error) {
      console.error(error);
    }
  }
  // create comment
  async function createComment(comment) {
    try {
      const response = await axiosInstance.post("/addcomment", comment);
      triggerRefreshComments();
      setServerResponse({
        message: response.data,
        showMessage: true,
      });
    } catch (error) {
      console.error(error);
    }
  }
  // edit comment
  async function editComment(comment) {
    try {
      const response = await axiosInstance.put("/updatepostcomment", comment);
      triggerRefreshComments();
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
  // delete comment
  async function removeComment(comment) {
    try {
      const response = await axiosInstance.post("deletecomment", comment);
      setServerResponse({
        message: response.data,
        showMessage: true,
      });
      toggleDeleteComment();
      setCommentShow(initialCommentShow);
      triggerRefreshComments();
    } catch (error) {
      console.error(error);
    }
  }
  // like comment function
  async function likeComment(comment) {
    try {
      const response = await axiosInstance.post("commentlike", comment);
      setServerResponse({
        message: response.data,
        showMessage: true,
      });
      triggerRefreshComments();
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
