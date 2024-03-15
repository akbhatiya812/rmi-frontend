import axios from "axios";

export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: "likeRequest" });
    const { data } = await axios.get(`https://rmi-backend.onrender.com/api/post/${id}`);
    dispatch({ type: "likeSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "likeFailure", payload: error.response.data.message });
  }
};

export const addCommentOnPost = (id, comment) => async (dispatch) => {
  try {
    dispatch({ type: "addCommentRequest" });
    const { data } = await axios.put(
      `https://rmi-backend.onrender.com/api/post/comment/${id}`,
      { comment },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch({ type: "addCommentSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "addCommentFailure",
      payload: error.response.data.message,
    });
  }
};

export const DeleteComment = (id, commentId) => async (dispatch) => {
  try {
    dispatch({ type: "deleteCommentRequest" });
    const { data } = await axios.delete(`https://rmi-backend.onrender.com/api/post/comment/${id}`, {
      data: {commentId},
    });
    dispatch({ type: "deleteCommentSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "deleteCommentFailure",
      payload: error.response.data.message,
    });
  }
};

export const createNewPost = (image, caption) => async (dispatch) => {
  try {
    dispatch({ type: "newPostRequest" });
    const { data } = await axios.post("https://rmi-backend.onrender.com/api/post/upload", { image, caption });
    dispatch({ type: "newPostSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "newPostFailure", payload: error.response.data.message });
  }
};

export const updateCaption = (location, caption, id) => async (dispatch) => {
  try {
    dispatch({ type: "updateCaptionRequest" });

    const { data } = await axios.put(`https://rmi-backend.onrender.com/api/post/${id}`, { caption, location });
    dispatch({ type: "updateCaptionSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateCaptionFailure",
      payload: error.response.data.message,
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deletePostRequest" });

    const { data } = await axios.delete(`https://rmi-backend.onrender.com/api/post/${id}`);
    dispatch({ type: "deletePostSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "deletePostFailure",
      payload: error.response.data.message,
    });
  }
};

export const updateProfile = (name, email, avatar) => async (dispatch) => {
  try {
    dispatch({ type: "updateProfileRequest" });

    const { data } = await axios.put(`https://rmi-backend.onrender.com/api/update/profile`, {
      avatar,
      name,
      email,
    });
    dispatch({ type: "updateProfileSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const followAndUnfollowUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: "followUserRequest" });
    const { data } = await axios.get(`https://rmi-backend.onrender.com/api/follow/${id}`);
    dispatch({ type: "followUserSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "followUserFailure",
      payload: error.response.data.message,
    });
  }
};
