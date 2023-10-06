import React from "react";
// providers
import { useUser } from "../../context/UserContext";
import { usePost } from "../../context/PostContext";
// components
import DeletePostModal from "../delete/DeletePostModal";
import UpdatePostModal from "../update/UpdatePostModal";
// react icons
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiDotsThreeDuotone } from "react-icons/pi";

export default function ManagePost({ post }) {
  // providers
  const { loggedInUser } = useUser();
  const { toggleUpdate, toggleDelete, toggleMoreActions, show } = usePost();
  // function to show more buttons
  const renderMoreButtons = () => {
    if (show.more === post.id) {
      return (
        <div className="more-buttons-container">
          <AiOutlineEdit
            className="icon"
            onClick={() => toggleUpdate(post.id)}
          />
          <RiDeleteBin6Line
            className="icon"
            onClick={() => toggleDelete(post.id)}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="manage-post-container">
        {post.userId === loggedInUser.id && (
          <div className="action-buttons-container">
            <PiDotsThreeDuotone
              className="icon"
              onClick={() => toggleMoreActions(post.id)}
            />
            {renderMoreButtons()}
          </div>
        )}
      </div>
      <div>
        {show.updateModal === post.id ? <UpdatePostModal post={post} /> : null}
        {show.deleteModal === post.id ? <DeletePostModal post={post} /> : null}
      </div>
    </div>
  );
}
