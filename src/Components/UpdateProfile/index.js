import { Typography, Button, Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../Redux/Action/Post";
import "./updateProfile.css";
import { LoadUser } from "../../Redux/Action/User";
import Loader from "../Loader"

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.user);
  const {
    loading: updateLoading,
    error: updateError,
    message,
  } = useSelector((state) => state.myPosts);
  const alert = useAlert();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState("");
  const [avatarprev, setAvatarprev] = useState(user.avatar.url);

  const handleImage = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatarprev(Reader.result);
        setAvatar(Reader.result);
      }
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, email, avatar));
    dispatch(LoadUser())
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (updateError) {
      alert.error(updateError);
      dispatch({ type: "clearErrors" });
    }
  }, [alert, error, dispatch, message, updateError]);

  return (
    loading ? <Loader/> : (
      <div className="register">
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ marginBottom: "3rem" }}>
          Update Profile
        </Typography>

        <Avatar
          src={avatarprev}
          alt="User"
          sx={{ height: "5vmax", width: "5vmax" }}
        />

        <input type="file" accept="image/*" onChange={handleImage} />

        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="updateProfileInputs"
          required
        />

        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="updateProfileInputs"
          required
        />

        <Button type="submit" disabled={updateLoading} className="login_button">
          Update
        </Button>
      </form>
    </div>
    )
  );
};

export default UpdateProfile;
