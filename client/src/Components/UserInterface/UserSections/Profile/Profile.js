import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiImageEditFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import toastr from "toastr";
import { updateUser } from "../../../../Redux/Actions/AuthAction";
import "../../UserInterface.scss";
import UserNavBar from "../../UserNavBar/UserNavBar";
import "./Profile.scss";
import loadingImg from "./loading.gif";

const initialState = {
  firstName: "",
  lastName: "",
  avatar: "",
};

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [data, setData] = useState(initialState);
  const { firstName, lastName, password, cf_password } = data;
  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const token = user?.token;
  const hash = user?.result._id;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file) {
        return setData({
          ...data,
          err: "No files were uploaded.",
          success: "",
        });
      } else if (file.size > 1024 * 1024) {
        toastr["error"](
          "Please make sure the file size is 1024 * 1024!",
          "Size too large!"
        );
        setData({ ...data, err: "Size too large.", success: "" });
      } else if (file.type !== "image/jpeg" && file.type !== "image/png") {
        toastr["error"](
          "We do not support this file format, make sure it is jpeg or png format!",
          "Wrong Format!"
        );
        setData({ ...data, err: "File format is incorrect.", success: "" });
      } else {
        let formData = new FormData();
        formData.append("file", file);

        setLoading(true);
        const res = await axios.post("/api/avatar/upload_avatar", formData, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: token,
          },
        });
        setLoading(false);
        setAvatar(res.data.url);
      }
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const updateInfor = () => {
    toastr.options = {
      closeButton: true,
      debug: true,
      newestOnTop: false,
      progressBar: true,
      positionClass: "toast-top-center",
      preventDuplicates: true,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };
    try {
      dispatch(
        updateUser({
          ...data,
          firstName: firstName ? firstName : user?.result?.firstName,
          lastName: lastName ? lastName : user?.result?.lastName,
          avatar: avatar ? avatar : user?.result?.avatar,
        })
      );
      toastr["success"](
        "Your personal information has now been updated!",
        "Information Updated!"
      );
    } catch (err) {
      toastr["error"](
        "There was an issue updating your personal information, please try again later!",
        "Update not possible!"
      );
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  useEffect(() => {
    let existing = localStorage.getItem("profile");
    existing = existing ? JSON.parse(existing) : {};
    existing.result["firstName"] = firstName
      ? firstName
      : user?.result?.firstName;
    existing.result["lastName"] = lastName ? lastName : user?.result?.lastName;
    existing.result["avatar"] = avatar ? avatar : user?.result?.avatar;
    existing.result["password"] = password ? password : user?.result?.password;
    window.localStorage.setItem("profile", JSON.stringify(existing));
  });

  const updatePassword = async () => {
    toastr.options = {
      closeButton: true,
      debug: true,
      newestOnTop: false,
      progressBar: true,
      positionClass: "toast-top-center",
      preventDuplicates: true,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };

    if (password !== cf_password) {
      toastr["error"](
        "Password is not the same as Confirm Password, please try again!",
        "No Match!"
      );
    } else {
      const res = await axios.post(`/api/user/reset/${hash}`, { password });
      if (res) {
        toastr["success"](
          "Your password is now updated, Next time sign in with your new Password!",
          "Password Changed!"
        );
      } else {
        toastr["error"](
          "There was an issue updating your password, please try again later!",
          "Update not possible!"
        );
      }
    }
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);

  const handleUpdate = () => {
    if (firstName || lastName || avatar) {
      updateInfor();
    } else if (password) {
      updatePassword();
    } else {
      console.error("no update");
    }
  };

  return (
    <section className="userSection">
      <div className="userInterface">
        <UserNavBar />
        <main className="userSections userProfile ">
          <h2>User Profile</h2>
          <div className="titleUnderline"></div>

          <div className="profilePage">
            <div className="profilePageAvatar">
              <div className="profileAvatar">
                <span className="profilePageAvatarSpan">
                  <RiImageEditFill className="icon" size={20} />
                  <input
                    type="file"
                    name="file"
                    className="fileUp"
                    onChange={changeAvatar}
                  />
                </span>
                <img
                  className="imageAvatar"
                  src={avatar ? avatar : user?.result.avatar}
                  alt=""
                />
                {loading && (
                  <img
                    className="loadingAvatar"
                    src={loadingImg}
                    alt="profile"
                  />
                )}
              </div>
            </div>

            <div className="colRight">
              <div className="inputFormGroup">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  defaultValue={user?.result.firstName}
                  autoComplete="off"
                  onChange={handleChange}
                />
                <label htmlFor="firstName">First Name</label>
              </div>

              <div className="inputFormGroup">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  defaultValue={user?.result.lastName}
                  onChange={handleChange}
                />
                <label htmlFor="lastName">Last Name</label>
              </div>

              <div className="inputFormGroup">
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={user?.result.email}
                  disabled
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="inputFormGroup">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={handleChange}
                />
                <label htmlFor="password">New Password</label>
              </div>

              <div className="inputFormGroup">
                <input
                  type="password"
                  name="cf_password"
                  id="cf_password"
                  value={cf_password}
                  onChange={handleChange}
                />
                <label htmlFor="cf_password">Confirm New Password</label>
              </div>
            </div>
          </div>
          <div>
            <button onClick={handleUpdate} type="submit" disabled={loading}>
              Update
            </button>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Profile;
