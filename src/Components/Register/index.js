import { Typography, Button, Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../Redux/Action/User";
import "./register.css";

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);;
  const alert = useAlert();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(register(name, email, avatar, password));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [alert, error, dispatch]);

  return (
    <div className="register">
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ marginBottom: "3rem" }}>
          Social App Register
        </Typography>

        <Avatar
          src={avatar}
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
          className="registerInputs"
          required
        />

        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="registerInputs"
          required
        />

        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="registerInputs"
          placeholder="Password"
          required
        />

        <Link to="/">
          <Typography>Already Signed Up? Login Now</Typography>
        </Link>

        <Button type="submit" disabled={loading} className="login_button">
          Sign Up
        </Button>
      </form>
    </div>
  );
};
export default Register;
