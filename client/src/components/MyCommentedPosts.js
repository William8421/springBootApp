import React, { useEffect } from "react";

import { usePost } from "../context/PostContext";
import { useUser } from "../context/UserContext";

import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";

import ManagePost from "../components/ManagePost";
import PostLikes from "./PostLikes";
import Comments from "./Comments";
import PostLikedByModal from "./PostLikedByModal";

export default function MyCommentedPosts() {
  const {
    getCommentedPosts,
    commentedPosts,
    likeAPost,
    toggleComments,
    refreshItems,
    showCommentsForPost,
    showLikesForPost,
  } = usePost();
  const { isLoggedIn } = useUser();

  function like(e) {
    const likeData = {
      id: e.id,
      userId: isLoggedIn.id,
    };
    likeAPost(likeData);
  }

  useEffect(() => {
    getCommentedPosts();
    // eslint-disable-next-line
  }, [refreshItems]);
  return (
    <div className="posts">
      {commentedPosts.length > 0 ? (
        commentedPosts.map((post) => {
          const isLikedByUser = post.postLikesIds.includes(isLoggedIn.id);
          return (
            <div className="post" key={post.id}>
              <h4>{post.postOwner}</h4>
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
                  {!isLikedByUser ? (
                    <BiLike
                      className="like-button"
                      onClick={(e) => like(post)}
                      color="#944854"
                    />
                  ) : (
                    <BiSolidLike
                      className="icon"
                      onClick={(e) => like(post)}
                      color="#944854"
                    />
                  )}
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
        <p>You didn't comment on posts yet</p>
      )}
    </div>
  );
}
