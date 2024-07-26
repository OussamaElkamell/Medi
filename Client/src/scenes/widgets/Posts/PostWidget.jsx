import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Input, Typography, useTheme } from "@mui/material";
import { getMedecinUser } from "Requests";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const apiUrl = process.env.REACT_APP_API_URL;

const PostWidget = ({
  postId,
  postUserId,
  name,
  createdAt,
  title,
  description,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [newComment, setNewComment] = useState(""); // State to manage new comment input
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const [medecin, setMedecin] = useState([]);
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const dark = palette.neutral.dark;
  const primary = palette.primary.main;

  const patchLike = useCallback(async () => {
    const response = await fetch(`${apiUrl}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  }, [dispatch, loggedInUserId, postId, token]);

  const addComment = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId, comment: newComment }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setNewComment(""); // Clear the new comment input
    } catch (error) {
      console.error("Error adding comment:", error);
      // Handle error
    }
  }, [dispatch, loggedInUserId, newComment, postId, token]);

  const calculateTimeDifference = () => {
    const currentDate = new Date();
    const postDate = new Date(createdAt);
    const differenceInMilliseconds = currentDate - postDate;
    const diffHours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
    const diffMinutes = Math.floor(
      (differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );
  
    if (diffHours >= 1) {
      return `${diffHours < 10 ? `0${diffHours}` : diffHours} heures et ${
        diffMinutes < 10 ? `0${diffMinutes}` : diffMinutes
      } minutes`;
    } else if (diffMinutes >= 1) {
      return `${diffMinutes < 10 ? `0${diffMinutes}` : diffMinutes} minutes`;
    } else {
      return "À l'instant";
    }
  };
  const [formattedTimeDifference, setFormattedTimeDifference] = useState(calculateTimeDifference());

  useEffect(() => {
    const interval = setInterval(() => {
      setFormattedTimeDifference(calculateTimeDifference());
    }, 60000); // Update every 60 seconds

    return () => {
      clearInterval(interval); // Cleanup interval on component unmount
    };
  }, [createdAt]);
  useEffect(() => {
    const fetchMedecin = async () => {
      try {
        const medecinData = await getMedecinUser(postUserId, token);
        setMedecin(medecinData);
      } catch (error) {
        console.error("Error fetching medecin data:", error);
      }
      
    };

 fetchMedecin()
  }, [postUserId, token]);
  return (
    <WidgetWrapper m="1.5rem 0" gap={"1rem"} mb={"1rem"} >
      <FlexBetween mb={"1rem "} gap={"1rem"}>
      <Friend friendId={postUserId} name={name} userPicturePath={userPicturePath} />

          </FlexBetween>
      <FlexBetween>
        <Box>
      
        <Typography  fontSize={"11px"} sx={{ mt: "1rem", textAlign: "left", position:"relative" , bottom:"52px", left:"70px"}}>
          {formattedTimeDifference}
          </Typography>
        
          <Typography color={dark} sx={{ mt: "1rem", textAlign: "left", fontWeight: "500", fontSize: "20" }}>
            {title}
          </Typography>
          <Typography color={main} sx={{ mt: "1rem", textAlign: "left" }}>
            {description}
          </Typography>
        </Box>
        {picturePath && (
          <img
            width="30%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:3005/assets/${picturePath}`}
          />
        )}
      </FlexBetween>
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? <FavoriteOutlined sx={{ color: primary }} /> : <FavoriteBorderOutlined />}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          <Divider />
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>{comment}</Typography>
            </Box>
          ))}
          <Divider />
          {/* New comment input */}
          <Box mt="0.5rem" display="flex" alignItems="center">
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              fullWidth
              sx={{ marginRight: "0.5rem" }}
            />
            <IconButton onClick={addComment}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
          </Box>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
