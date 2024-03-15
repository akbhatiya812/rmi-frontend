import { Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import "./updatePassword.css";
import { LoadUser, updatePassword } from "../../Redux/Action/User";

const UpdateProfile = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, message } = useSelector((state) => state.myPosts);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(updatePassword(oldPassword, newPassword));
    dispatch(LoadUser());
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
  }, [alert, error, dispatch, message]);

  return (
    <div className="updatePassword">
      <form className="updatePasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ marginBottom: "3rem" }}>
          Update Password
        </Typography>

        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Old Password"
          className="updatePasswordInputs"
          required
        />

        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          className="updatePasswordInputs"
          required
        />

        <Button type="submit" disabled={loading} className="login_button">
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfile;
