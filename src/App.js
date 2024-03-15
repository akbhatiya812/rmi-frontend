import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Login from "./Components/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadUser } from "./Redux/Action/User";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Account from "./Components/Account";
import NewPost from "./Components/NewPost";
import UpdateProfile from "./Components/UpdateProfile";
import UpdatePassword from "./Components/updatePassword";
import ForgotPassword from "./Components/Forgot-Password";
import ResetPassword from "./Components/Reset-Password";
import UserProfile from "./Components/UserProfile";
import Search from "./Components/Search";
import NotFound from "./Components/Not-Found";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoadUser());
  }, [dispatch]);

  const { isAuthincated } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      {isAuthincated && <Header />}

      <Routes>
        <Route extact path="/" element={isAuthincated ? <Home /> : <Login />} />
        <Route
          extact
          path="/register"
          element={isAuthincated ? <Account /> : <Register />}
        />
        <Route
          extact
          path="/account"
          element={isAuthincated ? <Account /> : <Login />}
        />
        <Route
          extact
          path="/newpost"
          element={isAuthincated ? <NewPost /> : <Login />}
        />
        <Route
          extact
          path="/update/profile"
          element={isAuthincated ? <UpdateProfile /> : <Login />}
        />
        <Route
          extact
          path="/change/password"
          element={isAuthincated ? <UpdatePassword /> : <Login />}
        />
        <Route
          extact
          path="/forgot/password"
          element={isAuthincated ? <UpdatePassword /> : <ForgotPassword />}
        />
        <Route
          extact
          path="/password/reset/:token"
          element={isAuthincated ? <UpdatePassword /> : <ResetPassword />}
        />
        <Route
          path="/user/:id"
          element={isAuthincated ? <UserProfile /> : <Login />}
        />
        <Route
          path="/search"
          element={isAuthincated ? <Search /> : <Login />}
        />
         <Route
          path="*"
          element={<NotFound/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
