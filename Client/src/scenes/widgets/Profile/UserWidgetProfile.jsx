import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Divider, useTheme, Button } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { getMedecinUser } from "Requests";
import { EditOutlined } from "@mui/icons-material";


const UserWidgetProfile = ({ user, userId }) => {
  const { palette } = useTheme();
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const [medecin, setMedecin] = useState([]);
  const isMedecin = user.role === "medecin";
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchMedecin = async () => {
      try {
        const medecinData = await getMedecinUser(userId, token);
        setMedecin(medecinData);
      } catch (error) {
        console.error("Error fetching medecin data:", error);
      }
    };

    if (isMedecin) {
      fetchMedecin();
    }
  }, [userId, token, isMedecin]);

  return (
    <WidgetWrapper>
      <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
        Profile
      </Typography>
      <Divider />
      {/* First ROW */}
      {isMedecin && medecin && (
        <Box p="1rem 0">
          <Button>Editer</Button>
          <FlexBetween>
            <Typography color={medium}>Specialité : </Typography>
            <Typography color={main} fontWeight="500">
              {medecin.specialite}
            </Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography color={medium}>Adresse : </Typography>
            <Typography color={main} fontWeight="500">
              {medecin.adresse}
            </Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography color={medium}>Gouvernorat : </Typography>
            <Typography color={main} fontWeight="500">
              {medecin.gouvernorat}
            </Typography>
          </FlexBetween>
        </Box>
      )}
      <Divider />
      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Medilink</Typography>
            </Box>
          </FlexBetween>
          
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidgetProfile;
