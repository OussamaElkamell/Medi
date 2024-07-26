import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WidgetWrapper from "../WidgetWrapper";
import FlexBetween from "../FlexBetween";
import { Box, Button, Typography } from "@mui/material";
import UserImage from "../UserImage";
import { setFriends } from "state";
import { useNavigate } from "react-router-dom";
import { getMedecins } from "Requests";
import { Select } from "antd";

const { Option } = Select;

const Doctors = ({ token, userId }) => {
  const dispatch = useDispatch();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [medecins, setMedecins] = useState([]);
  const [specialityFilter, setSpecialityFilter] = useState('');
  const [governorateFilter, setGovernorateFilter] = useState('');
  const friends = useSelector((state) => state.user.friends);
  const navigate = useNavigate();

  const handleAppointment = async (userId, IdMedecin) => {
    try {
      const response = await fetch(`${apiUrl}/users/medecin/${IdMedecin}/appointment`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const updatedMedecin = await response.json();
      // Handle the updated medecin data if needed
    } catch (error) {
      console.error("Error handling appointment:", error);
      // Handle error appropriately, e.g., show a notification to the user
    }
  };

  const patchFriend = async (userId, IdMedecin) => {
    const response = await fetch(
      `${apiUrl}/users/${userId}/${IdMedecin}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    const fetchMedecins = async () => {
      try {
        const data = await getMedecins(token);
        setMedecins(data);
      } catch (error) {
        // Handle the error, e.g., display an error message to the user
      }
    };

    if (token) {
      fetchMedecins();
    }
  }, [token]);

  const handleSpecialityChange = (value) => {
    setSpecialityFilter(value);
  };

  const handleGovernorateChange = (value) => {
    setGovernorateFilter(value);
  };

  const filteredMedecins = medecins.filter(medecin => {
    return (
      (!specialityFilter || medecin.specialite === specialityFilter) &&
      (!governorateFilter || medecin.gouvernorat === governorateFilter)
    );
  });

  return (
    <>
      <WidgetWrapper gap={"1.5rem"} mb={"1rem"}>
      <Typography color={"black"} fontWeight="500" textAlign={"left"}>
      Filtrer par:
      </Typography>
      
        <FlexBetween>
          <Select
            placeholder="Specialité"
            style={{ width: 200 }}
            onChange={handleSpecialityChange}
          >
            {/* Add options for specialties dynamically if needed */}
            <Option value="Cardiology">Cardiology</Option>
            <Option value="Dermatology">Dermatology</Option>
            <Option value="Neurology">Neurology</Option>
          </Select>
          <Select
            placeholder="Gouvernorat"
            style={{ width: 200 }}
            onChange={handleGovernorateChange}
          >
            {/* Add options for governorates dynamically if needed */}
            <Option value="Tunis">Tunis</Option>
            <Option value="Sfax">Sfax</Option>
            <Option value="Sousse">Sousse</Option>
          </Select>
        </FlexBetween>
      </WidgetWrapper>

      {filteredMedecins.length === 0 ? (
        <WidgetWrapper>
          <Typography color={"black"} fontWeight="500">Pas des medecins!</Typography>
        </WidgetWrapper>
      ) : (
        filteredMedecins.map((medecin) => (
          medecin.user && (
            <WidgetWrapper key={medecin._id} gap={"1.5rem"} mb={"1rem"}>
              <FlexBetween gap="7rem">
                <FlexBetween
                  gap="4rem"
                  mb="1.5rem"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/profile/${medecin.user._id}`)}
                >
                  <UserImage image={medecin.user.picturePath} size="55px" />
                  <Box>
                    <Typography color={"black"} fontWeight="500" textAlign={"left"}>
                      {medecin.user.firstname} {medecin.user.lastname}
                    </Typography>
                    <Typography color={"black"} fontWeight="50" fontSize={12} textAlign={"left"} marginLeft={"20px"}>
                      {medecin.specialite}
                    </Typography>
                    <FlexBetween>
                      <img src="../assets/Position.jpeg" alt="Position" style={{ width: '15px', height: '15px' }} />
                      <Typography color={"black"} fontWeight="50" fontSize={12} textAlign={"left"}>
                        {medecin.gouvernorat}, {medecin.adresse}
                      </Typography>
                    </FlexBetween>
                  </Box>
                </FlexBetween>
                <FlexBetween position={"absolute"} right={400}>
                  <Button onClick={() => handleAppointment(userId, medecin._id)}>Rendez-vous</Button>
                  <Button onClick={() => patchFriend(userId, medecin.user._id)}>
                    {friends && friends.find((friend) => friend._id === medecin.user._id) ? "retirer" : "Suivre"}
                  </Button>
                </FlexBetween>
              </FlexBetween>
            </WidgetWrapper>
          )
        ))
      )}
    </>
  );
};

export default Doctors;
