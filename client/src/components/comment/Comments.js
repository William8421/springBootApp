import React, { useEffect } from "react";

import { useComment } from "../../context/CommentContext";
import { useUser } from "../../context/UserContext";

import { BiLike, BiSolidLike } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiDotsThreeDuotone } from "react-icons/pi";

import UpdateComment from "../update/UpdateComment";
import DeleteCommentModal from "../delete/DeleteCommentModal";
import CommentLikes from "../likes/CommentLikes";
import { usePost } from "../../context/PostContext";
import AddComment from "../add/AddComment";
import noPic from "../../images/icon-256x256.png";
import CommentLikedByModal from "../likedBy/CommentLikedByModal";

export default function Comments({ post }) {
  const {
    postComments,
    likeComment,
    getPostComments,
    refreshComments,
    toggleUpdateComment,
    commentShow,
    toggleMoreCommentActions,
    toggleDeleteComment,
  } = useComment();
  const { loggedInUser } = useUser();
  const { refreshItems } = usePost();

  useEffect(() => {
    getPostComments({ postId: post.id });
    // eslint-disable-next-line
  }, [refreshComments, post.id, refreshItems]);

  function likeAComment(comment) {
    const likeData = {
      id: comment.id,
      userId: loggedInUser.id,
    };
    likeComment(likeData);
  }

  return (
    <div className="comments">
      <AddComment post={post} />
      {postComments &&
        postComments.map((comment) => {
          const isLikedByUser = comment.commentLikesIds.includes(
            loggedInUser.id
          );
          if (comment.postId === post.id) {
            return (
              <div className="comment" key={comment.id}>
                <div className="comment-owner">
                  <div className="pic-name">
                    {comment.userPicture !== "noPic" ? (
                      <img src={comment.userPicture} alt="profile" />
                    ) : (
                      <img src={noPic} alt="empty" />
                    )}
                    <h4>{comment.commentOwnerName}</h4>
                  </div>
                </div>
                <div className="comment-body-container">
                  <p className="comment-body">{comment.body}</p>
                  {comment.edited === true && <p className="edited">Edited</p>}
                </div>
                <div className="reactions-section">
                  {!isLikedByUser ? (
                    <BiLike
                      onClick={() => likeAComment(comment)}
                      className="icon"
                    />
                  ) : (
                    <BiSolidLike
                      onClick={() => likeAComment(comment)}
                      className="icon"
                    />
                  )}
                  {comment.userId === loggedInUser.id ? (
                    <div className="action-buttons-container">
                      <PiDotsThreeDuotone
                        className="icon"
                        onClick={() => toggleMoreCommentActions(comment.id)}
                      />
                      {commentShow.moreActions === comment.id ? (
                        <div className="more-buttons-container">
                          <AiOutlineEdit
                            className="icon"
                            onClick={(e) => toggleUpdateComment(comment.id)}
                          />
                          <RiDeleteBin6Line
                            className="icon"
                            onClick={(e) => toggleDeleteComment(comment.id)}
                          />
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    post.userId === loggedInUser.id && (
                      <RiDeleteBin6Line
                        className="icon"
                        onClick={(e) => toggleDeleteComment(comment.id)}
                      />
                    )
                  )}
                </div>
                <div className="comment-like-section">
                  <CommentLikes comment={comment} />
                </div>
                <div className="comment-like-section">
                  {commentShow.likesForComment === comment.id ? (
                    <CommentLikedByModal comment={comment} />
                  ) : null}
                </div>
                <div>
                  {commentShow.updateCommentModal === comment.id ? (
                    <UpdateComment comment={comment} />
                  ) : null}
                  {commentShow.deleteCommentModal === comment.id ? (
                    <DeleteCommentModal comment={comment} />
                  ) : null}
                </div>
              </div>
            );
          }
          return null;
        })}
    </div>
  );
}
