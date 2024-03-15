import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
const Header = () => {
  const [tab, setTab] = useState(window.location.pathname);
  // const [mode, setMode] = useState();

  // const changeTheme = () => {
  //   if (theme === 'light') {
  //     setTheme('dark')
  //     setMode('dark')
  //   } else {
  //     setTheme('light')
  //     setMode('light')
  //   }
  // }

  return (
    <div className="header">
      <Link to="/" onClick={() => setTab("/")}>
        {tab === "/" ? (
          <HomeIcon style={{ color: "black" }} />
        ) : (
          <HomeOutlinedIcon />
        )}
      </Link>
      <Link to="/newpost" onClick={() => setTab("/newpost")}>
        {tab === "/newpost" ? (
          <AddIcon style={{ color: "black" }} />
        ) : (
          <AddCircleOutlineOutlinedIcon />
        )}
      </Link>
      <Link to="/search" onClick={() => setTab("/search")}>
        {tab === "/search" ? (
          <ManageSearchOutlinedIcon style={{ color: "black" }} />
        ) : (
          <ZoomInIcon />
        )}
      </Link>
      <Link to="/account" onClick={() => setTab("/account")}>
        {tab === "/account" ? (
          <AccountCircleIcon style={{ color: "black" }} />
        ) : (
          <AccountCircleOutlinedIcon />
        )}
      </Link>
      {/* <div className="hello" onClick={changeTheme}>
      {mode === 'light' ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          className='w-5 h-5 transform -rotate-90'
        >
          <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z'></path>
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          className='w-5 h-5'
        >
          <path
            d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
            fillRule='evenodd'
            clipRule='evenodd'
          ></path>
        </svg>
      )}
      </div>
      */}
    </div>
  );
};

export default Header;
