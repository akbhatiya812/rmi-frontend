import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../Redux/Action/User";
import User from "../User";
import "./search.css";

const Search = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.allUser);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllUser(name));
  };

  return (
    <div className="search">
      <div className="main">
        <div className="searchResults">
          {user &&
            user.map((user, index) => (
              <User
                key={index}
                userId={user._id}
                name={user.name}
                avatar={user.avatar.url}
              />
            ))}
        </div>
        <form className="searchForm" onSubmit={submitHandler}>
          <Typography variant="h3" style={{ marginBottom: "3rem" }}>
            Search Profile
          </Typography>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Search"
            required
          />

          <Button type="submit" disabled={loading} className="login_button">
            Search
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Search;
