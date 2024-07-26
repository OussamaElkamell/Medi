import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLaboratoire } from "state"; // Assuming this is your action creator
import WidgetWrapper from "../WidgetWrapper";
import FlexBetween from "../FlexBetween";
import { Box, Button, Typography } from "@mui/material";
import { Modal, Result } from "antd";
import { handleAppointment as requestHandleAppointment } from "Requests"; // Adjust the path as necessary

const LaboratoryList = ({ token, userId }) => {
  const dispatch = useDispatch();
  const apiUrl = process.env.REACT_APP_API_URL;
  const laboratoires = useSelector((state) => state.laboratoires);
  const [isAppointmentModalVisible, setIsAppointmentModalVisible] = useState(false);
  const [selectedLabId, setSelectedLabId] = useState(null); // State to track selected laboratory ID
  const [laboratories, setLaboratoires] = useState([]);
  const [resultMsg, setResultMsg] = useState(false);

  const handleAppointment = async () => {
    if (!selectedLabId) return;

    try {
      const updatedLab = await requestHandleAppointment({ apiUrl, selectedLabId, token, userId });
      dispatch(setLaboratoire({ laboratoires: updatedLab }));
      setIsAppointmentModalVisible(false); // Close the modal after successful appointment
      setResultMsg(true);
    } catch (error) {
      console.error("Error handling appointment:", error);
      // Handle error appropriately, e.g., show a notification to the user
    }
  };

  const getLaboratories = async () => {
    try {
      const response = await fetch(`${apiUrl}/users/laboratoires`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setLaboratoires(data);
      dispatch(setLaboratoire({ laboratoires: data }));
    } catch (error) {
      console.error("Error fetching laboratory data:", error);
      // Handle the error, e.g., display an error message to the user
      
    }
  };

  useEffect(() => {
    if (token) {
      getLaboratories();
    }
  }, [token]);

  return (
    <>
      {laboratories.length === 0 ? (
        <WidgetWrapper>
          <Typography color={"black"} fontWeight="500">Pas des laboratoires!</Typography>
        </WidgetWrapper>
      ) : (
        laboratories.map((lab) => (
          <WidgetWrapper key={lab._id} gap={"1.5rem"} mb={"1rem"}>
            <FlexBetween gap="1rem" mb="1.5rem">
              <img src="../assets/laboratoire.png" alt="laboratoire" style={{ width: '40px', height: '40px' }} />
              <Box>
                <a href="/Prescription">
                  <Typography color={"black"} fontWeight="500">{lab.nomLaboratoire}</Typography>
                  <FlexBetween>
                    <img src="../assets/Position.jpeg" alt="Position" style={{ width: '15px', height: '15px' }} />
                    <Typography color={"black"} fontWeight="50" fontSize={12}>{lab.gouvernorat}, {lab.municipalites}, {lab.adresse}</Typography>
                  </FlexBetween>
                </a>
              </Box>
              <FlexBetween position={"absolute"} right={400}>
                <Button onClick={() => { setSelectedLabId(lab._id); setIsAppointmentModalVisible(true); }}>Rendez-vous</Button>
                
              </FlexBetween>
            </FlexBetween>
          </WidgetWrapper>
        ))
      )}

      <Modal
        title="Confirmer votre Rendez-Vous"
        open={isAppointmentModalVisible}
        onOk={handleAppointment}
        onCancel={() => setIsAppointmentModalVisible(false)}
        okText="Confirmer"
        cancelText="Annuler"
      >
        {/* Your appointment modal content here */}
      </Modal>

      <Modal
        open={resultMsg}
        onOk={() => setResultMsg(false)}
        onCancel={() => setResultMsg(false)}
      >
        <Result
          status="success"
          title="Votre Rendez-vous a bien été envoyé"
          subTitle="Vous allez bientôt recevoir la confirmation de laboratoire, merci pour votre patience!"
        />
      </Modal>
    </>
  );
};

export default LaboratoryList;
