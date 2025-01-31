import React, { useState } from 'react';
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Spin, notification } from 'antd';

const PatientForm = ({ handleFormSubmit }) => {
  const { palette } = useTheme();
  const role = "patient";
  const [loading, setLoading] = useState(false);
  

  const initialValuesRegister = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "patient",
    picture: null,
  };

  const registerSchema = yup.object().shape({
    firstname: yup.string().required("Champ requis"),
    lastname: yup.string().required("Champ requis"),
    email: yup.string().email("Email invalide").required("Champ requis"),
    password: yup.string().required("Champ requis"),
    picture: yup.mixed().required("required"),
  });

  const handleSubmit = async (values, onSubmitProps) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("firstname", values.firstname);
    formData.append("lastname", values.lastname);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("role", role);
    formData.append("picturePath", values.picture.name);
    
    await handleFormSubmit(formData, onSubmitProps);
    setLoading(false);

  };

  

  

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          >
            <TextField
              label="Prénom"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstname}
              name="firstname"
              error={Boolean(touched.firstname) && Boolean(errors.firstname)}
              helperText={touched.firstname && errors.firstname}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Nom"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastname}
              name="lastname"
              error={Boolean(touched.lastname) && Boolean(errors.lastname)}
              helperText={touched.lastname && errors.lastname}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Mot de passe"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
            {/* Image de profil */}
            <Box
              gridColumn="span 4"
              border={`1px solid ${palette.neutral.medium}`}
              borderRadius="5px"
              p="1rem"
            >
              <Dropzone
                acceptedFiles={['image/jpeg', 'image/jpg', 'image/png']}
                multiple={false}
                onDrop={(acceptedFiles) =>
                  setFieldValue('picture', acceptedFiles[0])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    sx={{ '&:hover': { cursor: 'pointer' } }}
                  >
                    <input {...getInputProps()} />
                    {!values.picture ? (
                      <p>Ajouter une photo ici</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{values.picture.name}</Typography>
                        <EditOutlinedIcon />
                      </FlexBetween>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Box>
          </Box>
          {/* Boutons et autres éléments UI */}
          <Button
            fullWidth
            type="submit"
            disabled={loading}
            sx={{
              m: "2rem 0",
              p: "1rem",
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
              "&:hover": { color: palette.primary.main },
              position: 'relative',
            }}
          >
            {loading ? <Spin /> : "S'INSCRIRE EN TANT QUE PATIENT"}
          </Button>
         
         
        </form>
      )}
    </Formik>
  );
};

export default PatientForm;
