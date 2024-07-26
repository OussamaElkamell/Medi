import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDoctors } from 'state'; // Assuming you have a setDoctors action in your Redux store
import { Box, Button, Typography, Avatar } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

const DoctorsCarousel = ({ isProfile = false }) => {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctors);
  const token = useSelector((state) => state.token);
  const isLoading = useSelector((state) => state.isLoading); // Assuming you have isLoading state in your Redux store
  const apiUrl = process.env.REACT_APP_API_URL;
  const getAllDoctors = async () => {
    let url = `${apiUrl}/doctors`;
    if (isProfile) {
      // Assuming you have some logic to fetch doctors for a specific user
      url = `${apiUrl}/users/doctors`; // Replace userId with the actual userId
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      dispatch(setDoctors({ doctors: data }));
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  useEffect(() => {
    getAllDoctors();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderDoctors = () => {
    if (!Array.isArray(doctors)) {
      return <div>No doctors available</div>;
    }

    return doctors.map(({ _id, firstname, picturePath }) => (
      <Box key={_id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar src={picturePath} sx={{ width: 100, height: 100, marginBottom: 2 }} />
        <Typography variant="h6" gutterBottom>
          {firstname}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary">
            Appointment
          </Button>
          <Button variant="outlined" color="primary">
            Follow
          </Button>
        </Box>
      </Box>
    ));
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Carousel>{renderDoctors()}</Carousel>
      )}
    </>
  );
};

export default DoctorsCarousel;
