import React, { useEffect } from "react";
// providers
import { useUser } from "../../context/UserContext";
import { usePost } from "../../context/PostContext";
import { useComment } from "../../context/CommentContext";
// comments
import AddComment from "../add/AddComment";
import Comment from "./Comment";

export default function Comments({ post }) {
  // providers
  const { getAllUsers } = useUser();
  const { refreshPost } = usePost();
  const { postComments, getPostComments, refreshComments } = useComment();

  useEffect(() => {
    getPostComments({ postId: post.id });
    getAllUsers();
    // eslint-disable-next-line
  }, [refreshComments, post.id, refreshPost]);

  return (
    <div className="comments">
      <AddComment post={post} />
      {postComments.length > 0 &&
        postComments.map((comment) => {
          return <Comment comment={comment} key={comment.id} />;
        })}
    </div>
  );
}
