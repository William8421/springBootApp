import React, { useEffect } from "react";

import { useComment } from "../context/CommentContext";
import { useUser } from "../context/UserContext";

import { BiLike, BiSolidLike } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiDotsThreeDuotone } from "react-icons/pi";

import UpdateComment from "./UpdateComment";
import DeleteComment from "./DeleteComment";
import CommentLikes from "./CommentLikes";
import { usePost } from "../context/PostContext";
import AddComment from "./AddComment";

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
              // Comment
              <div className="comment" key={comment.id}>
                <h4>{comment.commentOwner}</h4>
                {/* comment body container */}
                <div className="comment-body-container">
                  <p className="comment-body">{comment.body}</p>
                  {comment.edited === true && <p className="edited">Edited</p>}
                </div>
                <div className="reactions-section">
                  {/* like buttons */}
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
                  {/* UPDATE comment AND DELETE BUTTON */}
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
                {/* likes section */}
                <div className="comment-like-section">
                  <CommentLikes comment={comment} />
                </div>
                <div>
                  {commentShow.updateCommentModal === comment.id ? (
                    <UpdateComment comment={comment} />
                  ) : null}
                  {commentShow.deleteCommentModal === comment.id ? (
                    <DeleteComment comment={comment} />
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
