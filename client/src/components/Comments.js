import React, { useEffect, useState } from "react";

import { useComment } from "../context/CommentContext";
import { useUser } from "../context/UserContext";

import { BiLike, BiSolidLike } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiDotsThreeDuotone } from "react-icons/pi";

import UpdateComment from "./UpdateComment";
import DeleteComment from "./DeleteComment";
import CommentLikes from "./CommentLikes";

export default function Comments({ post }) {
  const {
    postComments,
    likeComment,
    getPostComments,
    createComment,
    refreshComments,
    toggleUpdateComment,
    showUpdateCommentModal,
    openCloseDeleteComment,
    selectedComment,
    showMoreCommentAction,
    toggleMoreCommentActions,
  } = useComment();
  const { isLoggedIn } = useUser();
  const [commentBody, setCommentBody] = useState("");

  useEffect(() => {
    getPostComments({ postId: post.id });
    // eslint-disable-next-line
  }, [refreshComments, post.id]);

  function addComment() {
    const comment = {
      userId: isLoggedIn.id,
      postId: post.id,
      body: commentBody,
    };
    createComment(comment);
    setCommentBody("");
  }

  function likeAComment(comment) {
    const likeData = {
      id: comment.id,
      userId: isLoggedIn.id,
    };
    likeComment(likeData);
  }

  return (
    <div className="comments">
      {postComments ? (
        postComments.map((comment) => {
          const isLikedByUser = comment.commentLikesIds.includes(isLoggedIn.id);
          if (comment.postId === post.id) {
            return (
              // comment
              <div className="comment" key={comment.id}>
                <h4>{comment.commentOwner}</h4>
                {/* comment body container */}
                <div className="comment-body-container">
                  <p className="comment-body">{comment.body}</p>
                  {comment.edited === true && <p className="edited">Edited</p>}
                </div>
                <div className="like-and-more">
                  {/* like buttons */}
                  {!isLikedByUser ? (
                    <BiLike
                      onClick={() => likeAComment(comment)}
                      color="#944854"
                    />
                  ) : (
                    <BiSolidLike
                      onClick={() => likeAComment(comment)}
                      color="#944854"
                    />
                  )}
                  {/* UPDATE comment AND DELETE BUTTON */}
                  {comment.userId === isLoggedIn.id ? (
                    <div className="action-buttons-container">
                      <PiDotsThreeDuotone
                        onClick={() => toggleMoreCommentActions(comment.id)}
                        size={20}
                        color="#944854"
                        className="show-more-button"
                      />
                      {showMoreCommentAction === comment.id ? (
                        <div className="more-buttons-container">
                          <AiOutlineEdit
                            color="#944854"
                            onClick={(e) => toggleUpdateComment(comment.id)}
                          />
                          <RiDeleteBin6Line
                            color="#944854"
                            onClick={(e) => openCloseDeleteComment(comment)}
                          />
                        </div>
                      ) : null}
                      <div style={{ width: "100%" }}>
                        {showUpdateCommentModal === comment.id ? (
                          <UpdateComment comment={comment} />
                        ) : null}
                        <DeleteComment comment={selectedComment} />
                      </div>
                    </div>
                  ) : (
                    post.userId === isLoggedIn.id && (
                      <RiDeleteBin6Line
                        color="#944854"
                        onClick={(e) => openCloseDeleteComment(comment)}
                      />
                    )
                  )}
                </div>
                {/* likes section */}
                <div className="comment-like-section">
                  <CommentLikes comment={comment} />
                </div>
              </div>
            );
          }
          return null;
        })
      ) : (
        <p>No comments yet</p>
      )}
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <textarea
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            style={{ resize: "none" }}
          />
          <button onClick={() => addComment()}>Add comment</button>
        </form>
      </div>
    </div>
  );
}
