import React, { useEffect, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import MedicalRecordsIcon from '@mui/icons-material/Description';
import DiseaseScreeningIcon from '@mui/icons-material/HealthAndSafety';
import MedicineIcon from '@mui/icons-material/MedicalServices';
import AnalysesRecordsIcon from '@mui/icons-material/Assessment';
import EditIcon from '@mui/icons-material/Edit';
import Dropzone from 'react-dropzone';
import { Formik, Form } from 'formik';
import { Button, Modal } from 'antd';
import { Edit } from '@mui/icons-material';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { apiUrl } from 'index';

const ProfileWidget = ({ user, userId }) => {
  console.log("user from profile widget ", user.role);

  const [upload, setUpload] = useState(false);
  const [profileUpdated, setProfileUpdated] = useState(false); // State to trigger rerender

  const fullName = `${user.firstname} ${user.lastname}`;

  useEffect(() => {
    // Use this effect to rerender when profileUpdated state changes
    if (profileUpdated) {
      // You can fetch updated user data or perform any necessary actions here
      console.log('Profile updated, rerendering...');
      setProfileUpdated(false); // Reset state after rerender
    }
  }, [profileUpdated]);

  const handleUpdate = async (values) => {
    const formData = new FormData();
    formData.append('picture', values.picture);

    try {
      const response = await fetch(`${apiUrl}/users/${userId}/update`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        setProfileUpdated(true); // Trigger rerender
        setUpload(false);
      } else {
        console.error('Failed to update profile');
        // Handle update failure
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ width: '100%' }} />
      <Box
        sx={{
          width: '100%',
          boxShadow: 1,
          p: 2,
          borderRadius: 2,
          marginTop: 1,
          textAlign: 'center',
          backgroundColor: "white"
        }}
      >
        <Avatar
          src={`http://localhost:3005/assets/${user.picturePath}`}
          sx={{ width: 180, height: 180, marginBottom: 2, marginLeft: 6 }}
        />
        <Edit style={{ cursor: 'pointer', color: 'blue', position: "relative", right: "540px", bottom: "40px" }} onClick={() => setUpload(true)} />

        <Typography variant="h1" component="h1" fontSize={50} gutterBottom position="relative" top={"-150px"} textAlign={'center'} right={"150px"}>
          {fullName}
        </Typography>
      </Box>
      {user.role === "patient" &&
        <Box>
          <FlexBetween gap="1rem" mb="0.5rem" position={'absolute'} left={"30%"} alignItems={'center'} color={"black"}>
            <Typography variant="h5" component="h4" gutterBottom>
              <a sx={{ fontSize: "25px", color: "black" }} href="#"><MedicalRecordsIcon /> My Medical records</a>
            </Typography>
            <Typography variant="h5" component="h4" gutterBottom>
              <a sx={{ fontSize: "25px", color: "black" }} href="#"><DiseaseScreeningIcon /> Disease screening</a>
            </Typography>
            <Typography variant="h5" component="h4" gutterBottom>
              <a sx={{ fontSize: "25px", color: "black" }} href="#"><MedicineIcon /> My Medicine</a>
            </Typography>
            <Typography variant="h5" component="h4" gutterBottom>
              <a href="#"><AnalysesRecordsIcon /> My analyses records</a>
            </Typography>
          </FlexBetween>
        </Box>
      }

      <Formik
        initialValues={{ picture: null }}
        onSubmit={handleUpdate}
      >
        {({
          values,
          setFieldValue,
          handleSubmit,
        }) => (
          <Modal
            open={upload}
            onOk={handleSubmit}
            onCancel={() => setUpload(false)}
          >
            <Form>
              <Dropzone
                acceptedFiles={['image/jpeg', 'image/jpg', 'image/png']}
                multiple={false}
                onDrop={(acceptedFiles) => setFieldValue('picture', acceptedFiles[0])}
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed `}
                    p="1rem"
                    sx={{ '&:hover': { cursor: 'pointer' } }}
                  >
                    <input {...getInputProps()} />
                    {!values.picture ? (
                      <Button>Importer une photo</Button>
                    ) : (
                      <FlexBetween>
                        <Typography>{values.picture.name}</Typography>
                        Importer une photo
                      </FlexBetween>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Form>
          </Modal>
        )}
      </Formik>
    </Box>
  );
};

export default ProfileWidget;
