import React, { useRef, useState } from "react";
import { usePost } from "../../context/PostContext";
import { useUser } from "../../context/UserContext";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiImageAddFill, RiCheckLine } from "react-icons/ri";
import axios from "axios";

export default function AddPost() {
  const { createPost } = usePost();
  const { loggedInUser, openCloseLoginModal, setServerError, serverError } =
    useUser();

  const initialValue = {
    body: "",
    image: "",
  };
  const [newPost, setNewPost] = useState(initialValue);
  const [imgSelected, setImgSelected] = useState("");
  const [uploaded, setUploaded] = useState("");

  const hiddenFileInput = useRef(null);

  const uploadButtonHandler = (event) => {
    hiddenFileInput.current.click();
  };

  function picHandler(e) {
    const selectedFile = e.target.files?.[0];
    setImgSelected(selectedFile);
  }

  async function uploadPic(e) {
    e.preventDefault();
    if (!(imgSelected instanceof File)) return;
    const formData = new FormData();
    formData.append("file", imgSelected);
    formData.append("upload_preset", "WilliamMallak");
    formData.append("upload_name", "denpxdokx");
    formData.append("folder", "social-media-app/posts");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/denpxdokx/image/upload",
        formData
      );
      setUploaded(response.data.secure_url);
      setNewPost((prevState) => ({
        ...prevState,
        image: response.data.secure_url,
      }));
    } catch (error) {
      console.error(error);
    }
  }

  function handlePostForm(e) {
    const { name, value } = e.target;
    if (loggedInUser) {
      setNewPost((prevState) => {
        return { ...prevState, [name]: value, userId: loggedInUser.id };
      });
    }
  }

  function addPost() {
    if (!loggedInUser) {
      openCloseLoginModal();
    } else if (newPost.body === "") {
      setServerError((prevError) => {
        return { ...prevError, postError: "Your post and image are empty" };
      });
    } else {
      createPost(newPost);
      setUploaded("");
      setImgSelected("");
      setNewPost(initialValue);
      setServerError((prevError) => {
        return { ...prevError, postError: null };
      });
    }
  }

  return (
    <div className="add-post">
      <form>
        <textarea
          name="body"
          placeholder="What's on your mind?"
          value={newPost.body}
          onChange={(e) => handlePostForm(e)}
        />
        <div className="icons-container">
          <div className="input-button-container">
            <RiImageAddFill onClick={uploadButtonHandler} className="icon" />
            <span>{imgSelected.name}</span>
          </div>

          <input
            type="file"
            onChange={(e) => picHandler(e)}
            ref={hiddenFileInput}
            style={{ display: "none" }}
          />
          {imgSelected === "" ? null : uploaded === "" ? (
            <FaCloudUploadAlt className="icon" onClick={(e) => uploadPic(e)} />
          ) : (
            <RiCheckLine className="icon" onClick={(e) => uploadPic(e)} />
          )}
        </div>
        <div className="error">{serverError.postError}</div>
      </form>
      <div className="add-post-button-container">
        <button onClick={addPost} className="main-button">
          Add post
        </button>
      </div>
    </div>
  );
}
