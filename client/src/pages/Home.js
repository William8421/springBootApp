import React, { useEffect } from "react";

import { usePost } from "../context/PostContext";
import { useUser } from "../context/UserContext";

import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";

import AddPost from "../components/AddPost";
import Comments from "../components/Comments";
import PostLikes from "../components/PostLikes";
import ManagePost from "../components/ManagePost";
import PostLikedByModal from "../components/PostLikedByModal";

export default function Home() {
  const {
    getAllPosts,
    posts,
    likeAPost,
    refreshItems,
    openCloseDeletePost,
    isDeletePostOpen,
    showCommentsForPost,
    toggleComments,
    showLikesForPost,
    setShowLikesForPost,
  } = usePost();
  const { isLoggedIn } = useUser();

  function like(e) {
    if (isLoggedIn) {
      const likeData = {
        id: e.id,
        userId: isLoggedIn.id,
      };
      likeAPost(likeData);
    } else {
      alert("please login or sign up to be able to like posts");
    }
  }

  useEffect(() => {
    getAllPosts();
    // eslint-disable-next-line
  }, [refreshItems]);

  return (
    <div className="home-container">
      <AddPost />
      <div className="posts">
        <div
          className={`delete-post-hidden-div ${isDeletePostOpen} `}
          onClick={openCloseDeletePost}
        ></div>
        <div
          className={`post-likes-hidden-div ${
            showLikesForPost !== null
              ? "showLikesForPost-on"
              : "showLikesForPost-off"
          } `}
          onClick={() => setShowLikesForPost(null)}
        ></div>

        {posts &&
          posts.map((post) => {
            const isLikedByUser = post.postLikesIds.includes(isLoggedIn.id);
            return (
              // POST
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
          })}
      </div>
    </div>
  );
}
