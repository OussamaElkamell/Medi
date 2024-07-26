import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { Link } from "react-router-dom";
import { Avatar, Badge, Button, Divider, Dropdown, Space } from "antd";
const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const role=useSelector((state) => state.user.role);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const token = useSelector((state) => state.token);
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const apiUrl = process.env.REACT_APP_API_URL;
  const [input,setInput]=useState("")
  const[notificationNumber,SetnotificationNumber]=useState(3)
console.log("NaviRole",role)

const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
       le laboratoire Ben Foulen est approuvée votre analyse de nfs
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        Dr.Amir Ben Foulen est approuvé  Votre Rendez-vous 
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
           Dr.Amir Ben Foulen est approuvé  Votre Rendez-vous 
      </a>
    ),
  },
];
const handleLogout = () => {
  // Dispatch the setLogout action to update the Redux state
  dispatch(setLogout());

  // Perform the logout API call or any additional logout logic
  logout();
};
const  fullName = `${user.firstname} ${user.lastname}`;
const handleRemoveProfile = async () => {
  try {
    const response = await fetch(`${apiUrl}/users/remove-profile/${user._id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to remove profile');
    }
    // Handle successful deletion
  } catch (error) {
    console.error('Error removing profile:', error.message);
    // Handle error
  }
navigate("/");
};
const logout = async (req,res)=>{


try {
  const loggedInResponse = await fetch(`${apiUrl}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'
        ,  Authorization: `Bearer ${token}`,
       },
      body: JSON.stringify(),
  });
} catch (error ){
  console.error('Error during logout:', error);
}
}
const fetch = async (value) => {
  try {
    const response = await fetch(`${apiUrl}/users/${value}/fetch`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const filteredData = data.filter((user) => user && user.firstname && user.firstname.toLowerCase().includes(value.toLowerCase()));
    // Do something with the filtered data, like updating state
    console.log(filteredData);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};



const handlechange=(value)=>
{
  fetch(value)
  setInput(value)
}
  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt} boxShadow={1} position={"sticky"} top={0} zIndex={1000}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Medilink
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." 
            value={input}
            onChange={(e)=> {handlechange(e.target.value)}}
            />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem"  position={'absolute'} right={90}>
        
          <a  href="/chat"><Message sx={{ fontSize: "25px", color: "black" }} /></a>
       
          
      <Dropdown
    menu={{
      items,
      
    }}
    
    placement="bottom"
    trigger={['click']}
    overlayStyle={{ width: "300px" }}
  >
    
    <a onClick={(e) => e.preventDefault()}>
      <Space>
      
        <Badge count={notificationNumber}>
            <Notifications sx={{ fontSize: "25px" }} style={{cursor:"pointer"}} />
   
    </Badge>
      </Space>
    </a>
  </Dropdown>
          <a href="/Question" style={{ textDecoration: "none" }}>
            <Help sx={{ fontSize: "25px", color: "black" }} /></a>



          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => { handleRemoveProfile(); dispatch(setLogout()); }}>
                  Remove profil
                </MenuItem>
              <MenuItem onClick={() => handleLogout()}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <div>
        <IconButton 
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
        </div>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} to="/chat" />
           
            <Badge count={5}>
            <Notifications sx={{ fontSize: "25px" }}  />
      <Avatar shape="square" size="large" />
    </Badge>
   
    
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={handleRemoveProfile}>
                  Remove profil
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
