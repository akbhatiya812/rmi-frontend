import React from "react";
import "./comment.css";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { DeleteComment } from "../../Redux/Action/Post";
import { getFollowingPosts, getMyPosts } from "../../Redux/Action/User";
const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // Delete comment
  const deleteComment = () => {
    dispatch(DeleteComment(postId, commentId));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };

  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <img src={avatar} alt={name} />
        <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
      </Link>
      <Typography>{comment}</Typography>
      {isAccount ? (
        <Button onClick={deleteComment}>
          <Delete />
        </Button>
      ) : userId === user._id ? (
        <Button onClick={deleteComment}>
          <Delete />
        </Button>
      ) : null}
    </div>
  );
};

export default CommentCard;
