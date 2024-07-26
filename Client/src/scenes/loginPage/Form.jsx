import React, { useState } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import PatientForm from './PatientForm';
import MedecinForm from './MedecinForm';
import { setLogin } from "state";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import LaboratoireForm from './LaboratoireForm';
import Login from './Login';
import { notification } from 'antd';

const Form = ({ email, password }) => { // Added destructuring for email and password
  const [notificationVisibleSucces, setNotificationVisible] = useState(false);
  const [notificationVisibleFailed, setNotificationVisible1] = useState(false);
  const [pageRole, setPageRole] = useState("patient");
  const [alignement, setAlignment] = useState("patient");
  const [Type, setPageType] = useState("login"); // Corrected variable name from setPageType to setPageType
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const handleNotificationClose = () => {
    setNotificationVisible(false);
    setNotificationVisible1(false);
  };
  const openNotificationSucces = () => {
    notification.success({
      message: 'Registration Successful',
      description: 'You have successfully registered ',
      onClose: handleNotificationClose
    });
  };
  const openNotificationFailed = () => {
    notification.error({ // Corrected method name from Failed to error
      message: 'Merci De Verifier vos Données',
      description: 'Merci De Verifier vos Données ',
      onClose: handleNotificationClose
    });
  };
  const handleFormSubmit = async (formData, onSubmitProps) => {
    try {
      // Envoyer les données du formulaire au serveur
      const response = await fetch(
        `${apiUrl}/auth/register`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        // Gérer les erreurs de réponse du serveur
        console.error("Error:", response.statusText);
        setNotificationVisible1(true);
        return;
      }

      const data = await response.json();

      // Réinitialiser le formulaire

      if (pageRole === "patient") {
        dispatch(
          setLogin({
            user: data.user,
            token: data.token,
            patient: data.patient,
          })
        );
      } else if (pageRole === "medecin") {
        dispatch(
          setLogin({
            user: data.user,
            medecin: data.user.medecin,
            token: data.token,
          })
        );
      } else if (pageRole === "laboratoire") {
        dispatch(
          setLogin({
            user: data.user,
            medecin: data.user.medecin,
            token: data.token,
          })
        );
      }
      setNotificationVisible(true);
    
    } catch (error) {
      console.error("Error during form submission:", error.message);
      // Gérer les erreurs lors de la soumission du formulaire
      setNotificationVisible1(true);
    }
  };

  return (
    <Box>
      {Type === "register" && (
        <>
          <Box sx={{ display: 'flex', position: 'relative', left: "220px", bottom: "40px" }}>
            <ToggleButtonGroup
              color="primary"
              value={alignement}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value="patient" onClick={() => {
                setPageRole("patient");
              }}>Patient</ToggleButton>
              <ToggleButton value="medecin" onClick={() => {
                setPageRole("medecin");
              }}>Medecin</ToggleButton>
              <ToggleButton value="laboratoire" onClick={() => {
                setPageRole("laboratoire");
              }}>Laboratoire
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          {pageRole === "patient" && (
            <PatientForm handleFormSubmit={handleFormSubmit} />
          )}
          {pageRole === "medecin" && (
            <MedecinForm handleFormSubmit={handleFormSubmit} />
          )}
          {pageRole === "laboratoire" && (
            <LaboratoireForm handleFormSubmit={handleFormSubmit} />
          )}
        </>
      )}
      {Type === "login" && (
        <Login />
      )}
      <Box>
        <Typography
          onClick={() => {
            setPageType(Type === "login" ? "register" : "login");
          }}
          sx={{
            textDecoration: "underline",
            color: palette.primary.main,
            "&:hover": {
              cursor: "pointer",
              color: "blue",
            },
          }}
        >
          {Type === "login" ? "Vous n'avez pas de compte ? Inscrivez-vous ici." : "Vous avez déjà un compte ? Connectez-vous ici."}
        </Typography>
      </Box>
      {notificationVisibleSucces && openNotificationSucces()}
      {notificationVisibleFailed && openNotificationFailed()}
    </Box>
  );
};

export default Form;
