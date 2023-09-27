import React from "react";
import { usePost } from "../context/PostContext";
import { useUser } from "../context/UserContext";
import DeletePostModal from "./DeletePostModal";
import UpdatePostModal from "./UpdatePostModal";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiDotsThreeDuotone } from "react-icons/pi";

export default function ManagePost({ post }) {
  const { toggleUpdate, toggleDelete, toggleMoreActions, show } = usePost();
  const { loggedInUser } = useUser();
  return (
    <div>
      <div className="manage-post-container">
        {post.userId === loggedInUser.id && (
          <div className="action-buttons-container">
            <PiDotsThreeDuotone
              className="icon"
              onClick={() => toggleMoreActions(post.id)}
            />
            {show.more === post.id ? (
              <div className="more-buttons-container">
                <AiOutlineEdit
                  className="icon"
                  onClick={() => toggleUpdate(post.id)}
                />{" "}
                <RiDeleteBin6Line
                  className="icon"
                  onClick={(e) => toggleDelete(post.id)}
                />
              </div>
            ) : null}
          </div>
        )}
      </div>
      <div style={{ width: "100%" }}>
        {show.updateModal === post.id ? <UpdatePostModal post={post} /> : null}
        {show.deleteModal === post.id ? <DeletePostModal post={post} /> : null}
      </div>
    </div>
  );
}
