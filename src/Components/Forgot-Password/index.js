import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./forgotpassword.css";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../Redux/Action/User";
import { useAlert } from "react-alert";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const { error, message, loading } = useSelector((state) => state.user);
  const alert = useAlert();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
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
    <div className="forgotPassword">
      <form className="forgotPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="forgotPasswordInputs"
        />
        <Button type="submit" disabled={loading} className="login_button">
          send-token
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
