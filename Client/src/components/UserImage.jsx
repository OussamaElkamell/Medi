import { Box } from "@mui/material";

const UserImage = ({ image, size = "80px" }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  return (

    <Box width={size} height={size}  >
      <img
        style={{ objectFit: "cover", borderRadius: "50%"}}
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:3005/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
