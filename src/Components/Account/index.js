import React, { useEffect, useState } from "react";
import "./account.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfile, getMyPosts, LogoutUser } from "../../Redux/Action/User";
import Loader from "../Loader";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import Post from "../Post";
import { Link } from "react-router-dom";
import { Delete, Password, Update } from "@mui/icons-material";
import { useAlert } from "react-alert";
import User from "../User";
import { Box } from "@mui/system";
const Account = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, posts, error } = useSelector((state) => state.myPosts);
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const {
    error: likeError,
    message,
    loading: deleteLoading,
  } = useSelector((state) => state.likePost);

  const [followerToggle, setFollowerToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [likeError, error, message, dispatch, alert]);

  const logoutHandler = () => {
    dispatch(LogoutUser());
    alert.success("logout user successfully");
  };

  const deleteProfileHandler = async () => {
    await dispatch(deleteProfile());
    dispatch(LogoutUser());
  };

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountright">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
          className="user"
        >
          <div>
            <Avatar
              src={user.avatar.url}
              sx={{ height: "8vmax", width: "8vmax" }}
            />
            <Typography
              variant="h5"
              sx={{ textAlign: "center", marginTop: "20px " }}
            >
              {user.name}
            </Typography>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <button style={{ width: "106.75px" }}>
              <Typography sx={{ textAlign: "center" }}>
                {user.posts.length}
              </Typography>
              <Typography>Posts</Typography>
            </button>
            <button onClick={() => setFollowerToggle(!followerToggle)}>
              <Typography>{user.followers.length}</Typography>
              <Typography>Followers</Typography>
            </button>
            <button onClick={() => setFollowingToggle(!followingToggle)}>
              <Typography>{user.following.length}</Typography>
              <Typography sx={{ textAlign: "center" }}>Following</Typography>
            </button>
          </div>
        </div>
        <div className="setting">
          <Box className="grid"
          >
          <Link to="/change/password">
          <Button
            variant="contained"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
            }}
          >
            Change Password <Password />
          </Button>
        </Link>
            <Link to="/update/profile">
              <Button
                variant="contained"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "5px",
                }}
                className="edit"
              >
                Edit
                <Update />
              </Button>
            </Link>
            <Button variant="contained" onClick={logoutHandler}>
              Logout
            </Button>
            <Button
              variant="contained"
              color="error"
              disabled={deleteLoading}
              onClick={deleteProfileHandler}
            >
              delete My Account
              <Delete />
            </Button>
          </Box>
        </div>
        <Dialog
          open={followerToggle}
          onClose={() => setFollowerToggle(!followerToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followers By</Typography>

            {user && user.followers.length > 0 ? (
              user.followers.map((follower, index) => (
                <User
                  key={index}
                  userId={follower._id}
                  name={follower.name}
                  avatar={follower.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You have no followers
              </Typography>
            )}
          </div>
        </Dialog>

        <Dialog
          open={followingToggle}
          onClose={() => setFollowingToggle(!followingToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Following</Typography>

            {user && user.following.length > 0 ? (
              user.following.map((follow, index) => (
                <User
                  key={index}
                  userId={follow._id}
                  name={follow.name}
                  avatar={follow.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You're not following anyone
              </Typography>
            )}
          </div>
        </Dialog>
      </div>

      <div className="accountleft">
        {posts && posts.length > 0 ? (
          posts.map((item, index) => (
            <Post
              key={index}
              postId={item._id}
              caption={item.caption}
              postImage={item.image.url}
              likes={item.likes}
              comments={item.comments}
              ownerImage={item.owner.avatar}
              ownerName={item.owner.name}
              ownerId={item.owner._id}
              isAccount={true}
              isDelete={true}
            />
          ))
        ) : (
          <Typography variant="h6">No posts yet</Typography>
        )}
      </div>
    </div>
  );
};

export default Account;
