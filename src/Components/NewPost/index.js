import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./post.css";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from "../../Redux/Action/Post";
import { useAlert } from "react-alert";
import { LoadUser } from "../../Redux/Action/User";

const Post = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, message } = useSelector((state) => state.likePost);

  const handleImage = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(createNewPost(image, caption));
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
  }, [error, dispatch, message,alert]);

  return (
    <div className="newPost">
      <form className="newPostForm" onSubmit={submitHandler}>
        <Typography variant="h3">New Post</Typography>
        {image && (
          <img
            src={image}
            alt="avatar"
            style={{ height: "200px", overflow: "hidden" }}
          />
        )}
        <input type="file" accept="image/*" onChange={handleImage} />
        <input
          type="text"
          placeholder="Caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button disabled={loading} variant="contained" type="submit">
          Post
        </Button>
      </form>
    </div>
  );
};

export default Post;
