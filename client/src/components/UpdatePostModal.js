import React, { useRef, useState } from "react";
import { usePost } from "../context/PostContext";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiImageAddFill, RiCheckLine } from "react-icons/ri";

export default function UpdatePostModal({ post }) {
  const { editPost } = usePost();

  const hiddenFileInput = useRef(null);

  const uploadButtonHandler = (event) => {
    hiddenFileInput.current.click();
  };

  const [newData, setNewData] = useState({
    id: post.id,
    body: post.body,
    image: post.image,
  });
  const [imgSelected, setImgSelected] = useState("");
  const [uploaded, setUploaded] = useState("");

  function picHandler(e) {
    const selectedFile = e.target.files?.[0];
    setImgSelected(selectedFile || "");
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
      setNewData((prevState) => ({
        ...prevState,
        image: response.data.secure_url,
      }));
    } catch (error) {
      console.error(error);
    }
  }

  function updatePostHandler(e) {
    const { name, value } = e.target;
    setNewData((prevState) => {
      return { ...prevState, [name]: value, id: post.id };
    });
  }
  function updatePost(e) {
    editPost(newData);
  }

  return (
    <div className="update-post">
      <form>
        {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        > */}
        <textarea
          name="body"
          value={newData.body}
          onChange={(e) => updatePostHandler(e)}
        />
        <img src={post.image} alt="post" style={{ width: "25%" }} />
        <div className="icons-container">
          <div className="input-button-container">
            <RiImageAddFill
              onClick={uploadButtonHandler}
              className="icon"
              color="#944854"
            />
            <span>{imgSelected.name}</span>
          </div>

          <input
            type="file"
            onChange={(e) => picHandler(e)}
            ref={hiddenFileInput}
            style={{ display: "none" }}
          />
          {imgSelected === "" ? null : uploaded === "" ? (
            <FaCloudUploadAlt
              className="icon"
              onClick={(e) => uploadPic(e)}
              color="#944854"
            />
          ) : (
            <RiCheckLine
              className="icon"
              onClick={(e) => uploadPic(e)}
              color="#944854"
            />
          )}
        </div>
        {/* </div> */}
      </form>
      <button className="main-button" onClick={updatePost}>
        Update post
      </button>
    </div>
  );
}
