import React, { useRef, useState } from "react";
// providers
import { useUser } from "../../context/UserContext";
import { usePost } from "../../context/PostContext";
// other
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiImageAddFill, RiCheckLine } from "react-icons/ri";
import axios from "axios";

export default function AddPost() {
  // providers
  const { loggedInUser, toggleAuthModal, setServerError, serverError } =
    useUser();
  const { createPost } = usePost();

  const initialValue = {
    body: "",
    image: "",
  };
  // form states
  const [newPost, setNewPost] = useState(initialValue);
  const [imgSelected, setImgSelected] = useState(null);
  const [uploaded, setUploaded] = useState("");

  const hiddenFileInput = useRef(null);
  // handler for input button
  const uploadButtonHandler = () => {
    if (loggedInUser) {
      hiddenFileInput.current.click();
    }
  };
  // image handler
  const picHandler = (e) => {
    const selectedFile = e.target.files?.[0];
    setImgSelected(selectedFile);
  };
  // input file function
  const uploadPic = async (e) => {
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
  };
  // form handler
  const handlePostForm = (e) => {
    const { name, value } = e.target;
    setNewPost((prevState) => ({
      ...prevState,
      [name]: value,
      userId: loggedInUser.id,
    }));
  };
  // add post
  const addPost = () => {
    if (!loggedInUser) {
      toggleAuthModal("login");
    } else if (newPost.body === "") {
      setServerError((prevError) => ({
        ...prevError,
        postError: "Your post and image are empty",
      }));
    } else {
      createPost(newPost);
      setUploaded("");
      setImgSelected(null);
      setNewPost(initialValue);
      setServerError((prevError) => ({
        ...prevError,
        postError: null,
      }));
    }
  };

  return (
    <div className="add-post">
      <form>
        <textarea
          name="body"
          placeholder="What's on your mind?"
          value={newPost.body}
          onChange={handlePostForm}
        />
        <div className="icons-container">
          <div className="input-button-container">
            <RiImageAddFill onClick={uploadButtonHandler} className="icon" />
            <span>{imgSelected?.name}</span>
          </div>
          <input type="file" onChange={picHandler} ref={hiddenFileInput} />
          {imgSelected === null ? null : uploaded === "" ? (
            <FaCloudUploadAlt className="icon" onClick={uploadPic} />
          ) : (
            <RiCheckLine className="icon" onClick={uploadPic} />
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
