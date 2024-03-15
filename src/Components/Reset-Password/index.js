import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { resetPassword } from "../../Redux/Action/User";
import "./resetpassword.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();
  const { error, message, loading } = useSelector((state) => state.user);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(params.token, password));
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
  }, [alert, error, message, dispatch]);

  return (
    <div className="resetPassword">
      <form className="resetPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>

        <input
          type="password"
          placeholder="New Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="resetPasswordInputs"
        />
        <Link to="/">Login</Link>
        <Typography>OR</Typography>
        <Link to="/forgot/password">Request another Token !</Link>
        <Button type="submit" disabled={loading} className="login_button">
          Reset-password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
