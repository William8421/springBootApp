import React, { useEffect } from "react";

import { useComment } from "../../context/CommentContext";
import { useUser } from "../../context/UserContext";
import { usePost } from "../../context/PostContext";
import AddComment from "../add/AddComment";
import Comment from "./Comment";

export default function Comments({ post }) {
  const { postComments, getPostComments, refreshComments } = useComment();
  const { getAllUsers } = useUser();
  const { refreshItems } = usePost();

  useEffect(() => {
    getPostComments({ postId: post.id });
    getAllUsers();
    // eslint-disable-next-line
  }, [refreshComments, post.id, refreshItems]);

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
