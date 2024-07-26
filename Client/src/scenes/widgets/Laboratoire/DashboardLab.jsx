import React, { useEffect, useState, useCallback } from 'react';
import { Row, Col, Card, Statistic, Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setLaboratoire } from 'state'; // Update with your actual action
import { getUser, confirmAppointment, deleteAppointment } from 'Requests'; // Make sure these functions are correctly imported
import { Box, Button, Typography } from '@mui/material';
import FlexBetween from 'components/FlexBetween';

const Dashboard = ({ userId, token }) => {
  const dispatch = useDispatch();
  const [laboratory, setLaboratory] = useState(null);
  const [patients, setPatients] = useState([]); // Local state to store patients
  const apiUrl = process.env.REACT_APP_API_URL;
  const laboratoire = useSelector((state) => state.laboratoires);
  const [appointments, setAppointments] = useState([]);
const{CountApprouved,setCountApprouved}=useState(0)
  const getLaboratory = useCallback(async () => {
    try {
      console.log('Fetching laboratory data...');
      const response = await fetch(`${apiUrl}/users/${userId}/laboratoires`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setLaboratory(data);
      dispatch(setLaboratoire({ laboratoires: data }));
      setAppointments(data.RendezVous || []);
    } catch (error) {
      console.error('Error fetching laboratory data:', error);
      // Handle the error, e.g., display an error message to the user
    }
  }, [apiUrl, userId, token, dispatch]);

  const getUserDetails = async (patientId) => {
    try {
      const userData = await getUser(patientId, token);
      setPatients((prevPatients) => {
        if (!prevPatients.some((patient) => patient.id === userData.id)) {
          return [...prevPatients, userData];
        }
        return prevPatients;
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleConfirm = async (appointmentId) => {
    try {
      setCountApprouved=()=>{
      CountApprouved=CountApprouved+1
    }
      await confirmAppointment(laboratory._id, appointmentId, token);
      getLaboratory(); // Refresh data after confirming
    } catch (error) {
      console.error('Error confirming appointment:', error);
    }
  };

  const handleDelete = async (appointmentId) => {
    try {
      await deleteAppointment(laboratory._id, appointmentId, token);
      getLaboratory(); // Refresh data after deleting
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  useEffect(() => {
    console.log('Executing getLaboratory useEffect...');
    getLaboratory();
  }, [getLaboratory]);

  useEffect(() => {
    console.log('Executing fetchPatients useEffect...');
    if (appointments.length > 0) {
      const fetchPatients = async () => {
        for (const appointment of appointments) {
          await getUserDetails(appointment.IdPatient);
        }
      };
      fetchPatients();
    }
  }, [appointments]);

  if (!laboratory) {
    return <div>Loading...</div>;
  }

  return (
    <Card style={{ borderRadius: '10px', backgroundColor: 'white', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }} hoverable>
      <div style={{ padding: '20px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '24px' }}>Laboratoire : {laboratoire.nomLaboratoire}</h1>
        <Row gutter={[16, 16]} justify="space-around" align="middle">
          <Col span={6}>
            <Card style={{ borderRadius: '10px' }} hoverable>
              <Statistic title="Nombre total de rendez-vous" value={appointments.length} />
            </Card>
          </Col>
          <Col span={6}>
            <Card style={{ borderRadius: '10px' }} hoverable>
              <Statistic title="Rendez-vous non approuvé" value={1} />
            </Card>
          </Col>
          <Col span={6}>
            <Card style={{ borderRadius: '10px' }} hoverable>
              <Statistic title="Rendez-vous approuvé" value={CountApprouved} />
            </Card>
          </Col>
        </Row>
        <Divider />
        <Row gutter={[16, 16]} justify="space-around" align="middle">
          <Col span={12}>
            <Card style={{ borderRadius: '10px' }} title="Nouveaux rendez-vous" hoverable>
              <ul>
                {patients.map((patient) => (
                  <li key={patient.IdPatient}>
                    <div>
                      <Box>
                        <FlexBetween mb={"1rem"} gap={"7.5rem"}>
                        <Typography
                          variant="h4"
                          color={'black'}
                          fontWeight="100"
                          sx={{
                            "&:hover": {
                              cursor: "pointer",
                            },
                          }}
                        >
                          {patient.firstname} {patient.lastname}
                        </Typography>
                        <Box>
                        <Button onClick={() => handleConfirm(patient.IdPatient)}>Approuvé</Button>
                        <Button onClick={() => handleDelete(patient.IdPatient)}>Supprimer</Button>
                        </Box>
                        </FlexBetween>
                      </Box>

                      {/* Display other relevant data */}
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </Col>
          <Col span={12}>
            <Card style={{ borderRadius: '10px' }} title="Analyse envoyée" hoverable>
              {/* Display recently completed tests content */}
            </Card>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default Dashboard;
