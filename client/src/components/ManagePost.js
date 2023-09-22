import React from "react";
import { usePost } from "../context/PostContext";
import { useUser } from "../context/UserContext";
import DeletePost from "./DeletePostModal";
import UpdatePostModal from "./UpdatePostModal";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiDotsThreeDuotone } from "react-icons/pi";

export default function ManagePost({ post }) {
  const {
    openCloseDeletePost,
    selectedPost,
    toggleUpdate,
    showUpdateModal,
    showMore,
    toggleMoreActions,
  } = usePost();
  const { isLoggedIn } = useUser();
  return (
    <div className="manage-post-container">
      {post.userId === isLoggedIn.id && (
        <div className="action-buttons-container">
          <PiDotsThreeDuotone
            onClick={() => toggleMoreActions(post.id)}
            size={20}
            color="#944854"
            className="show-more-button"
          />
          {showMore === post.id ? (
            <div className="more-buttons-container">
              <AiOutlineEdit
                color="#944854"
                onClick={() => toggleUpdate(post.id)}
              />{" "}
              <RiDeleteBin6Line
                color="#944854"
                onClick={(e) => openCloseDeletePost(post)}
              />
            </div>
          ) : null}
          <div style={{ width: "100%" }}>
            {showUpdateModal === post.id ? (
              <UpdatePostModal post={post} />
            ) : null}
            <DeletePost post={selectedPost} />
          </div>
        </div>
      )}
    </div>
  );
}
