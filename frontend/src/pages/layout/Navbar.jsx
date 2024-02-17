import React, { useState } from "react";
import {
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
// import FlexBetween from './FlexBetween'
// import { UseDispatch } from 'react-redux'
import { AppBar, IconButton, InputBase, Toolbar } from "@mui/material";

const Navbar = ({
  isSidebarOpen,
  setIsSidebarOpen
}) => {
  return (
    <AppBar sx={{ position: "static", background: "none", boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left Side */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <div
            style={{
              backgroundColor: "#eeececba",
              borderRadius: "9px",
              gap: "3rem",
              padding: "0.1rem 1.5rem",
            }}
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </div>
        </div>

        {/* Right Side */}
        <div style={{gap:"1.5rem"}}>
            <IconButton>
                <SettingsOutlined/>
            </IconButton>
            <IconButton>
                <PersonOutlineIcon/>
            </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
