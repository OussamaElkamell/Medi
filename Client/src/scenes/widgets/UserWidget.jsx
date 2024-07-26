import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import { Box, Typography, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import { ManageAccountsOutlined } from "@mui/icons-material";
import { setMedecin } from "state";
import { useNavigate } from "react-router-dom";
import { getMedecinUser, getUser } from "Requests";
const UserWidget = ({ userId, onClick }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUser(userId, token);
        setUser(userData);
        setRole(userData.role);

        if (userData.role === "medecin") {
          const medecinData = await getMedecinUser(userId, token);
          dispatch(setMedecin({ medecin: medecinData }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId, token, dispatch]);

  if (!user) {
    return null;
  }

  return (
    <Box>
      <FlexBetween gap="0.5rem" pb="1.1rem" onClick={onClick}>
        <FlexBetween gap="1rem">
          <UserImage image={user.picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {user.firstname} {user.lastname}
            </Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>
    </Box>
  );
};

export default UserWidget;
