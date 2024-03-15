import { Avatar, Button, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserPosts, getUserProfile } from "../../Redux/Action/User";
import { followAndUnfollowUser } from "../../Redux/Action/Post";
import Post from "../Post";
import User from "../User";

const UserProfile = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { user, error: userError } = useSelector((state) => state.userProfile);
  const { user: me } = useSelector((state) => state.user);
  const { posts, error } = useSelector((state) => state.userPosts);
  const {
    error: followError,
    message,
    loading: followLoading,
  } = useSelector((state) => state.likePost);

  const params = useParams();
  const [followerToggle, setFollowerToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);

  const followHandler = async () => {
    setFollowing(!following);
    await dispatch(followAndUnfollowUser(user._id));
    dispatch(getUserProfile(params.id));
  };

  useEffect(() => {
    dispatch(getUserPosts(params.id));
    dispatch(getUserProfile(params.id));
    if (me._id === params.id) {
      setMyProfile(true);
    }
  }, [dispatch, me._id, params.id, myProfile]);

  useEffect(() => {
    if (user) {
      user.followers.forEach((item) => {
        if (item._id === me._id) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
  }, [me._id, user]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (followError) {
      alert.error(followError);
      dispatch({ type: "clearErrors" });
    }
    if (userError) {
      alert.error(userError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [error, followError, userError, message, dispatch, alert]);

  return (
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
          {user && (
            <>
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

              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
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
                  <Typography sx={{ textAlign: "center" }}>
                    Following
                  </Typography>
                </button>
              </div>

              {myProfile ? null : (
                <Button
                  variant="contained"
                  style={{ background: following ? "red" : "#1565C6" }}
                  onClick={followHandler}
                  disabled={followLoading}
                >
                  {following ? "UnFollow" : "Follow"}
                </Button>
              )}
            </>
          )}
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
            />
          ))
        ) : (
          <Typography variant="h6">User has not made any posts yet</Typography>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
