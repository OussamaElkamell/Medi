import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined
  ,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserWidget from "../UserWidget";
import UserWidgetProfile from "./UserWidgetProfile";
import FriendListWidget from "./FriendListWidget";
const LeftWidgetProfile = ({ user ,userId, picturePath }) => {
  console.log("user from left widget profile", user.role)
  const navigate = useNavigate();
console.log("userID from left widget profile",userId)
  return (
    <WidgetWrapper >
      <UserWidgetProfile user={user} userId={userId} onClick={() => navigate(`/profile/${user._id}`)} />
      <ManageAccountsOutlined />
      <Divider />
      <FriendListWidget userId={userId} />
      <Divider />
    </WidgetWrapper>
  );
};

export default LeftWidgetProfile;
