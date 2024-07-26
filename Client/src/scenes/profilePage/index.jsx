import { Box, useMediaQuery } from "@mui/material";
import CustomLineChart from "components/Chart";

import Question from "components/Question";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/Profile/FriendListWidget";
import LeftWidget from "scenes/widgets/LeftWidgetHome";
import LeftWidgetProfile from "scenes/widgets/Profile/LeftWidgetProfile";
import MyPostWidget from "scenes/widgets/Posts/MyPostWidget";
import PostsWidget from "scenes/widgets/Posts/PostsWidget";
import ProfileWidget from "scenes/widgets/Profile/ProfileWidget";
import UserWidget from "scenes/widgets/UserWidget";
import UserWidgetProfile from "scenes/widgets/Profile/UserWidgetProfile";
import { Calendar, Spin, theme } from 'antd';
import Chart from "components/Chart";
const onPanelChange = (value, mode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};
const ProfilePage = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

const[user,setUser]=useState("")
 
const {userId}=useParams()

  console.log("id ProfilePage", userId)
  console.log(" ProfilePage user", user)
  const token = useSelector((state) => state.token);
  const { role } = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const isLoading=useSelector((state)=> state.isLoading)
const isPatient=user.role==="patient"

  const data = [
    { name: 'Jan', value: 100 },
    { name: 'Feb', value: 90 },
    { name: 'Mar', value: 120 },
    { name: 'Apr', value: 70 },
    { name: 'May', value: 133 },
  ];

  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  const getUser=async(Id)=>
    {
     
const response =await fetch(`${apiUrl}/users/${userId}`,
{
  method: "GET",
 
})
const data = await response.json();
    setUser(data);
    }
    useEffect(()=>{
      getUser()
    },[])
  const render=()=>{

  return (
    <Box>
      <Navbar />
      
        
      <ProfileWidget user={user} userId={userId}/>
      <Box
        width="100%"
        padding="2rem 1%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="1rem"
        justifyContent="center"
      >
         <Box
          flexBasis={isNonMobileScreens ? "30%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
      <LeftWidgetProfile user={user} userId={userId} picturePath={user.picturePath}  />
      </Box>
      
        <Box
          flexBasis={isNonMobileScreens ? "50%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
         
      
        
         
      {isPatient&&
        <Chart data={data} xAxisKey="name" yAxisKey="value" yAxisLabel="blood glucose level,"  />
      }
        <PostsWidget userId={userId} token={token} isProfile={true} />
        </Box>
      
      
        <Box
          flexBasis={isNonMobileScreens ? "20%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
         <div style={wrapperStyle}>
         {isPatient&&
      <Calendar fullscreen={false} onPanelChange={onPanelChange} />
    }
    </div>
      
      </Box>
      </Box>
      
      
      
     
     
   
    </Box>
  );
}
  return (
    <>
      {isLoading && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
    <Spin />

  </div>}
    {render()}
  
  </>
  )
};

export default ProfilePage;
