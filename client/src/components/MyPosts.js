import React, { useEffect } from "react";
import { usePost } from "../context/PostContext";
import { useUser } from "../context/UserContext";
import { FaRegComment } from "react-icons/fa";
import Comments from "./Comments";
import ManagePost from "./ManagePost";
import PostLikes from "./PostLikes";
import PostLikedByModal from "./PostLikedByModal";

export default function MyPosts({ userId }) {
  const {
    getUserPosts,
    userPosts,
    refreshItems,
    showCommentsForPost,
    toggleComments,
    showLikesForPost,
  } = usePost();
  const { refresh } = useUser();

  useEffect(() => {
    getUserPosts();
    // eslint-disable-next-line
  }, [refresh, refreshItems]);

  return (
    <div className="posts">
      My posts
      {userPosts.length > 0 ? (
        userPosts.map((post) => {
          return (
            <div className="post" key={post.id}>
              {post.image && <img src={post.image} alt="post" />}
              <div className="post-body-container">
                {/* POST BODY */}
                <p className="post-body">{post.body}</p>
                {/* EDITED */}
                {post.edited === true && <p className="edited">Edited</p>}
              </div>
              {/* post likes and manage post */}
              <div className="reactions-section">
                {/* LIKE BUTTON */}
                <div className="reactions-buttons">
                  <FaRegComment
                    onClick={() => toggleComments(post.id)}
                    className="icon"
                    color="#944854"
                  />
                </div>
                {/* manage post */}
                <div>
                  <ManagePost post={post} />
                </div>
              </div>

              {/* LIKES SECTION */}
              <div className="likes-section">
                <PostLikes post={post} />
              </div>

              {/* COMMENTS SECTION */}
              <div>
                {showCommentsForPost === post.id ? (
                  <Comments post={post} />
                ) : null}
              </div>
              <div>
                {showLikesForPost === post.id ? (
                  <PostLikedByModal post={post} />
                ) : null}
              </div>
            </div>
          );
        })
      ) : (
        <div>You have no posts yet</div>
      )}
    </div>
  );
}
