import {
  Box,
  Typography,
  Divider,
  useTheme,
} from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ActiveUser = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);  
  const medecin = useSelector(state => state.user.medecin);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const fullName = `${user.firstname} ${user.lastname}`;
  const idMedecin = user.role === "medecin";
  const medecinSpecialite = medecin && medecin.specialite;
  const friends = useSelector((state) => state.user.friends);
  const apiUrl = process.env.REACT_APP_API_URL;
  
  const [loadedFriends, setLoadedFriends] = useState([]);

  useEffect(() => {
    fetchFriends(); // Initial fetch
    const interval = setInterval(fetchFriends, 10000); // Fetch every 10 seconds

    return () => {
      clearInterval(interval); // Cleanup interval on component unmount
    };
  }, []);

  const fetchFriends = async () => {
    try {
      const friendsPromises = friends.map(async (friend) => {
        if (!friend) return null;
        const response = await fetch(
          `${apiUrl}/users/${friend._id}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        return data;
      });

      const friendsData = await Promise.all(friendsPromises);
      setLoadedFriends(friendsData.filter(Boolean));
    } catch (error) {
      console.error("Failed to fetch friends:", error);
    }
  };

  return (
    <WidgetWrapper maxHeight="370px" style={{ overflow: 'auto' }}>
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Contacts
        </Typography>
        {loadedFriends.map((friend) => (
          friend && (
            <FlexBetween key={friend._id} mb="1.5rem" gap="0.5rem" onClick={() => {
              navigate(`/FriendProfile/${friend._id}`);
              navigate(0);
            }}>
              {friend.isActive && (
                <>
                  <UserImage image={friend.picturePath} size="55px" />
                  <div>
                    <img
                      src="../assets/greenIcon.png"
                      alt="Active icon"
                      style={{ width: '13px', height: '13px', marginLeft: '-20px', marginBottom: '-20px' }}
                    />
                  </div>
                  <Box>
                    <Typography
                      variant="h5"
                      color={dark}
                      fontWeight="500"
                      sx={{
                        '&:hover': {
                          color: palette.primary.light,
                          cursor: 'pointer',
                        },
                      }}
                    >
                      {friend.firstname} {friend.lastname}
                    </Typography>
                  </Box>
                </>
              )}
            </FlexBetween>
          )
        ))}
      </Box>
      <Divider />
    </WidgetWrapper>
  );
};

export default ActiveUser;
