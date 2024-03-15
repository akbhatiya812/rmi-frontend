import { configureStore } from "@reduxjs/toolkit";
import { likeReducer, myPostsReducer } from "./Reducer/Post";
import {
  allUserReqducer,
  postOfFollowingReducer,
  useReducer,
  userPostsReducer,
  userProfileReducer,
} from "./Reducer/User";

const store = configureStore({
  reducer: {
    user: useReducer,
    postOfFollowing: postOfFollowingReducer,
    allUser: allUserReqducer,
    likePost: likeReducer,
    myPosts: myPostsReducer,
    userProfile: userProfileReducer,
    userPosts: userPostsReducer,
  },
});
export default store;
