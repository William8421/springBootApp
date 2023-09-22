import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";

export default function UpdateUserModal({ userData }) {
  const { editUser } = useUser();
  const [newData, setNewData] = useState({
    id: userData.id,
    profilePic: userData.profilePic,
    firstName: userData.firstName,
    lastName: userData.lastName,
    username: userData.username,
    age: userData.age,
    gender: userData.gender,
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
    formData.append("folder", "social-media-app");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/denpxdokx/image/upload",
        formData
      );
      setUploaded(response.data.secure_url);
      setNewData((prevState) => ({
        ...prevState,
        profilePic: response.data.secure_url,
      }));
    } catch (error) {
      console.error(error);
    }
  }

  function updateUserHandler(e) {
    const { name, value } = e.target;
    setNewData((prevState) => {
      return { ...prevState, [name]: value, id: userData.id };
    });
  }
  function updateUser() {
    editUser(newData);
    // setShowServerResponse(true);
  }

  return (
    <div style={{ position: "relative" }}>
      <form onChange={updateUserHandler}>
        <div>
          <input
            type="text"
            placeholder="First name"
            name="firstName"
            autoComplete="given-name"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Last name"
            name="lastName"
            autoComplete="family-name"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            autoComplete="username"
          />
        </div>
        <div>
          <input type="text" placeholder="Age" name="age" autoComplete="age" />
        </div>
        <div>
          <input
            type="text"
            placeholder="Gender"
            name="gender"
            autoComplete="sex"
          />
        </div>
        <div>
          <input
            type="file"
            name="profilePic"
            onChange={(e) => picHandler(e)}
          />
          {userData.profilePic !== "" ? (
            <button className="main-button" onClick={(e) => uploadPic(e)}>
              {uploaded === "" ? "Upload" : "Uploaded"}
            </button>
          ) : (
            <div>Please upload a photo</div>
          )}
        </div>
      </form>
      <button onClick={updateUser} className="main-button">
        Save
      </button>
    </div>
  );
}
