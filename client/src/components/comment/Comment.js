import React from "react";
// providers
import { useUser } from "../../context/UserContext";
import { useComment } from "../../context/CommentContext";
// components
import UpdateComment from "../update/UpdateComment";
import DeleteCommentModal from "../delete/DeleteCommentModal";
import CommentLikes from "../likes/CommentLikes";
import CommentLikedByModal from "../likedBy/CommentLikedByModal";
// react icons
import { BiLike, BiSolidLike } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiDotsThreeDuotone } from "react-icons/pi";
// other
import noPic from "../../images/icon-256x256.png";

export default function Comment({ comment }) {
  // providers
  const { loggedInUser, allUsers } = useUser();
  const {
    likeComment,
    toggleUpdateComment,
    commentShow,
    toggleMoreCommentActions,
    toggleDeleteComment,
  } = useComment();
  // like function
  const isLikedByUser = comment.commentLikesIds.includes(loggedInUser.id);
  function likeAComment(comment) {
    const likeData = {
      id: comment.id,
      userId: loggedInUser.id,
    };
    likeComment(likeData);
  }

  const commentOwner = allUsers.find((user) => user.id === comment.userId);
  // body shows the break lines
  const formattedPostBody = comment.body.replace(/\n/g, "<br />");
  // date and time format
  const formattedDate = new Date(comment.createdAt)
    .toLocaleString()
    .split(",")[0];
  const createdAt = new Date(comment.createdAt);
  const now = new Date();
  const timeDifference = now - createdAt;
  let formattedTime = "";

  if (timeDifference < 60 * 60 * 1000) {
    // Less than 1 hour
    const minutesAgo = Math.floor(timeDifference / (60 * 1000));
    formattedTime = `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;
  } else if (timeDifference < 24 * 60 * 60 * 1000) {
    // Less than 1 day
    const hoursAgo = Math.floor(timeDifference / (60 * 60 * 1000));
    formattedTime = `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
  } else {
    // More than 1 day
    const daysAgo = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    if (daysAgo < 7) {
      // Less than 1 week
      formattedTime = `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
    } else {
      // more than 1 week
      formattedTime = `on ${formattedDate}`;
    }
  }

  return (
    <div className="comment" key={comment.id}>
      <div className="comment-owner">
        <div className="pic-name">
          <img
            src={
              commentOwner.profilePic !== "noPic"
                ? commentOwner.profilePic
                : noPic
            }
            alt="profile"
          />
          <h4>
            {commentOwner.firstName} {commentOwner.lastName}
          </h4>
        </div>
      </div>
      <div className="comment-body-container">
        <div dangerouslySetInnerHTML={{ __html: formattedPostBody }} />
        <div className="comment-time-edited">
          <p>Posted {formattedTime}</p>
          {comment.edited === true && <p className="edited">Edited</p>}
        </div>
      </div>
      <div className="comment-reactions-section">
        {!isLikedByUser ? (
          <BiLike onClick={() => likeAComment(comment)} className="icon" />
        ) : (
          <BiSolidLike onClick={() => likeAComment(comment)} className="icon" />
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
          comment.userId === loggedInUser.id && (
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
