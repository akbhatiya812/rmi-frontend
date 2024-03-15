import React, { useEffect } from "react";
import User from "../User";
import Post from "../Post";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser, getFollowingPosts } from "../../Redux/Action/User";
import Loader from "../Loader";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
const Home = () => {
  const dispatch = useDispatch();

  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );

  const { user, loading: usersLoading } = useSelector((state) => state.allUser);

  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUser());
  }, [dispatch]);

  const alert = useAlert();
  const { error: likeError, message } = useSelector((state) => state.likePost);

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

  return loading === true || usersLoading === true ? (
    <Loader />
  ) : (
    <div className="home">
      <div className="homeright">
        {user && user.length > 0 ? (
          user.map((item, index) => (
            <User
              key={index}
              userId={item._id}
              name={item.name}
              avatar={item.avatar.url}
            />
          ))
        ) : (
          <Typography variant="h6">No users yet</Typography>
        )}
      </div>
      <div className="homeleft">
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
          <Typography variant="h6">No posts yet</Typography>
        )}
      </div>
    </div>
  );
};

export default Home;
