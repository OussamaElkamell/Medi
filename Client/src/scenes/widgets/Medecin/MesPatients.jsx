import React, { useState } from "react";
import { Modal, Button, Typography,  Result } from "antd";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import { Box } from "@mui/material";

const MesPatients = () => {
  const [isAppointmentModalVisible, setIsAppointmentModalVisible] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [resultMsg, setResultMsg] = useState(false);

  const patients = [
    {
      _id: "1",
      nom: "Jean Dupont",
      gouvernorat: "Tunis",
      municipalites: "Tunis",
      adresse: "123 Rue de Paris",
    },
    {
      _id: "2",
      nom: "Marie Curie",
      gouvernorat: "Ariana",
      municipalites: "Ariana Ville",
      adresse: "456 Avenue de l'Indépendance",
    },
    {
      _id: "3",
      nom: "Ahmed Ben Ali",
      gouvernorat: "Sfax",
      municipalites: "Sfax",
      adresse: "789 Boulevard Habib Bourguiba",
    },
    // Ajoutez d'autres patients ici
  ];

  const handleAppointment = () => {
    if (!selectedPatientId) return;

    try {
      const updatedPatient = { ...patients.find(patient => patient._id === selectedPatientId), appointment: true };
      console.log("Appointment confirmed for patient:", updatedPatient);
      setIsAppointmentModalVisible(false);
      setResultMsg(true);
    } catch (error) {
      console.error("Error handling appointment:", error);
    }
  };

  return (
    <>
    
      {patients.length === 0 ? (
        <WidgetWrapper>
          <Typography color={"black"} fontWeight="500">Pas de patients!</Typography>
        </WidgetWrapper>
      ) : (
        
        patients.map((patient) => (
          <WidgetWrapper key={patient._id} gap={"1.5rem"} mb={"1rem"}>
            <FlexBetween gap="1rem" mb="1.5rem">
              <img src="../assets/patient.png" alt="patient" style={{ width: '40px', height: '40px' }} />
              <Box>
                <Typography color={"black"} fontWeight="500">{patient.nom}</Typography>
                <FlexBetween>
                  <img src="../assets/Position.jpeg" alt="Position" style={{ width: '15px', height: '15px' }} />
                  <Typography color={"black"} fontWeight="50" fontSize={12}>{patient.gouvernorat}, {patient.municipalites}, {patient.adresse}</Typography>
                </FlexBetween>
              </Box>
              <FlexBetween position={"absolute"} right={400}>
                <Button onClick={() => { setSelectedPatientId(patient._id); setIsAppointmentModalVisible(true); }}>Voir dossier medicale</Button>
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
        {/* Contenu de votre modal de rendez-vous */}
        <Typography>Êtes-vous sûr de vouloir prendre un rendez-vous avec ce patient ?</Typography>
      </Modal>

      <Modal
        open={resultMsg}
        onOk={() => setResultMsg(false)}
        onCancel={() => setResultMsg(false)}
      >
        <Result
          status="success"
          title="Votre Rendez-vous a bien été envoyé"
          subTitle="Vous allez bientôt recevoir la confirmation, merci pour votre patience!"
        />
      </Modal>
    </>
  );
};

export default MesPatients;
