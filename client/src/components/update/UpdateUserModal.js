import React, { useRef, useState } from "react";
// providers
import { useUser } from "../../context/UserContext";
import { usePost } from "../../context/PostContext";
// react icons
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiImageAddFill, RiCheckLine } from "react-icons/ri";
// date picker
import DatePicker from "react-datepicker";
// other
import axios from "axios";

export default function UpdateUserModal({ userData }) {
  // providers
  const { editUser, formKey } = useUser();
  const { toggleUpdateUser } = usePost();
  // form states
  const originalData = {
    id: userData.id,
    profilePic: userData.profilePic,
    firstName: userData.firstName,
    lastName: userData.lastName,
    username: userData.username,
    age: userData.age,
    gender: userData.gender,
  };
  const [newData, setNewData] = useState(originalData);
  const [imgSelected, setImgSelected] = useState("");
  const [uploaded, setUploaded] = useState("");

  const hiddenFileInput = useRef(null);
  // handler for input button
  const uploadButtonHandler = (event) => {
    hiddenFileInput.current.click();
  };
  // image handler
  function picHandler(e) {
    const selectedFile = e.target.files?.[0];
    setImgSelected(selectedFile || "");
  }
  // input file function
  async function uploadPic(e) {
    e.preventDefault();
    if (!(imgSelected instanceof File)) return;
    const formData = new FormData();
    formData.append("file", imgSelected);
    formData.append("upload_preset", "WilliamMallak");
    formData.append("upload_name", "denpxdokx");
    formData.append("folder", "social-media-app/users");
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
  // form handler
  function updateUserHandler(e) {
    const { name, value } = e.target;
    setNewData((prevState) => {
      return { ...prevState, [name]: value, id: userData.id };
    });
  }
  // update post
  function updateUser() {
    if (newData !== originalData) {
      editUser(newData);
      toggleUpdateUser();
    } else {
      toggleUpdateUser();
    }
  }

  return (
    <div className="update-modal">
      <div className="update-header">
        <h2>Update information</h2>
        <button className="close-button" onClick={toggleUpdateUser}>
          X
        </button>
      </div>
      <form key={formKey} onChange={updateUserHandler}>
        <input
          type="text"
          placeholder="First name"
          name="firstName"
          autoComplete="given-name"
        />

        <input
          type="text"
          placeholder="Last name"
          name="lastName"
          autoComplete="family-name"
        />

        <input
          type="text"
          placeholder="Username"
          name="username"
          autoComplete="username"
        />
        <div className="date-gender-container">
          <div className="date-container">
            <DatePicker
              key={formKey}
              onChange={(date) => setNewData({ ...newData, dateOfBirth: date })}
              placeholderText="Date of birth"
              required
              autoComplete="dateOfBirth"
              dateFormat="dd-MM-yyyy"
              showYearDropdown
              scrollableYearDropdown
              showMonthDropdown
              scrollableMonthDropdown
              yearDropdownItemNumber={70}
            />
          </div>

          <select name="gender" placeholder="Gender">
            <option value="not set">--</option>
            <option>Male</option>
            <option>Female</option>
            <option>Others</option>
          </select>
        </div>

        <div className="icons-container">
          <div className="input-button-container">
            <RiImageAddFill onClick={uploadButtonHandler} className="icon" />
            <span>{imgSelected.name}</span>
          </div>

          <input
            type="file"
            key={formKey}
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
        <button onClick={updateUser} className="main-button">
          Save
        </button>
        <button className="cancel-button" onClick={toggleUpdateUser}>
          Cancel
        </button>
      </div>
    </div>
  );
}
