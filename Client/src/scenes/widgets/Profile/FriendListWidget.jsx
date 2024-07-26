import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

const FriendListWidget = ({ userId, onSelectFriend, TypePage }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const user = useSelector((state) => state.user);
  const apiUrl = process.env.REACT_APP_API_URL;
  const getFriends = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/users/${userId}/friends`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.error("Failed to fetch friends:", error);
    }
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
   <Box>
      <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
        Amis(e)s
      </Typography>
      <Typography color={medium} mb="1rem">
        {user.Friends.length} amis(e)s
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        gap="1.5rem"
        maxHeight="200px"
        overflow="auto"
      >
        {Array.isArray(friends) ?
          friends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstname} ${friend.lastname}`}
              userPicturePath={friend.picturePath}
              onClick={() => onSelectFriend(friend._id)}
            />
          )): <div></div>}
      </Box>
      </Box>
  );
};

export default FriendListWidget;
