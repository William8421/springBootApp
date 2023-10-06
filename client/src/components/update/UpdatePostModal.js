import React, { useRef, useState } from "react";
// provider
import { usePost } from "../../context/PostContext";
// react icons
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiImageAddFill, RiCheckLine } from "react-icons/ri";
// other
import axios from "axios";

export default function UpdatePostModal({ post }) {
  // provider
  const { editPost, toggleUpdate } = usePost();
  // form handler
  const [newData, setNewData] = useState({
    id: post.id,
    body: post.body,
    image: post.image,
  });
  const [imgSelected, setImgSelected] = useState("");
  const [uploaded, setUploaded] = useState("");

  const hiddenFileInput = useRef(null);
  // handler for input button
  const uploadButtonHandler = () => {
    hiddenFileInput.current.click();
  };
  // image handler
  const picHandler = (e) => {
    const selectedFile = e.target.files?.[0];
    setImgSelected(selectedFile || "");
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
      setNewData((prevState) => ({
        ...prevState,
        image: response.data.secure_url,
      }));
    } catch (error) {
      console.error(error);
    }
  };
  // form handler
  const updatePostHandler = (e) => {
    const { name, value } = e.target;
    setNewData((prevState) => ({
      ...prevState,
      [name]: value,
      id: post.id,
    }));
  };
  // update post
  const updatePost = (e) => {
    editPost(newData);
  };

  return (
    <div className="update-modal">
      <div className="update-header">
        <h2>Update your post</h2>
        <button className="close-button" onClick={toggleUpdate}>
          X
        </button>
      </div>

      <form>
        <textarea
          name="body"
          value={newData.body}
          onChange={(e) => updatePostHandler(e)}
        />
        {post.image && <img src={post.image} alt="post" />}
        <div className="icons-container">
          <div className="input-button-container">
            <RiImageAddFill onClick={uploadButtonHandler} className="icon" />
            <span>{imgSelected.name}</span>
          </div>

          <input
            type="file"
            onChange={(e) => picHandler(e)}
            ref={hiddenFileInput}
          />
          {imgSelected === "" ? null : uploaded === "" ? (
            <FaCloudUploadAlt className="icon" onClick={(e) => uploadPic(e)} />
          ) : (
            <RiCheckLine className="icon" onClick={(e) => uploadPic(e)} />
          )}
        </div>
      </form>
      <div className="submit-buttons-container">
        <button className="main-button" onClick={updatePost}>
          Update post
        </button>
        <button className="cancel-button" onClick={toggleUpdate}>
          Cancel
        </button>
      </div>
    </div>
  );
}
