import React, { useState } from 'react';
import { Box, TextField, Typography, useTheme, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Spin } from 'antd';
import FlexBetween from 'components/FlexBetween';

const specialites = [
  "Anesthésiologie", "Cardiologie", "Chirurgie générale", "Chirurgie orthopédique",
  "Dermatologie", "Endocrinologie", "Gastroentérologie", "Gynécologie", "Hématologie",
  "Médecine générale", "Médecine interne", "Néphrologie", "Neurologie", "Oncologie",
  "Ophtalmologie", "Oto-rhino-laryngologie", "Pédiatrie", "Psychiatrie", "Pneumologie",
  "Radiologie", "Rhumatologie", "Urologie"
];

const SpecialiteSelect = ({ values, handleBlur, handleChange, touched, errors }) => (
  <FormControl sx={{ gridColumn: "span 4" }} error={Boolean(touched.specialite) && Boolean(errors.specialite)}>
    <InputLabel>Spécialité</InputLabel>
    <Select
      label="Spécialité"
      onBlur={handleBlur}
      onChange={handleChange}
      value={values.specialite}
      name="specialite"
    >
      {specialites.map((specialite, index) => (
        <MenuItem key={index} value={specialite}>
          {specialite}
        </MenuItem>
      ))}
    </Select>
    {touched.specialite && errors.specialite && (
      <FormHelperText>{errors.specialite}</FormHelperText>
    )}
  </FormControl>
);

const MedecinForm = ({ handleFormSubmit }) => {
  const { palette } = useTheme();
  const role = "medecin";
  const [loading, setLoading] = useState(false);

  const initialValuesRegister = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    numeroSerie: "",
    specialite: "",
    adresse: "",
    ville: "",
    gouvernorat: "",
    role: "medecin",
    picture: null,
  };

  const registerSchema = yup.object().shape({
    firstname: yup.string().required("Champ requis"),
    lastname: yup.string().required("Champ requis"),
    email: yup.string().email("Email invalide").required("Champ requis"),
    password: yup.string().required("Champ requis"),
    numeroSerie: yup.string().required("Champ requis"),
    specialite: yup.string().required("Champ requis"),
    adresse: yup.string().required("Champ requis"),
    ville: yup.string().required("Champ requis"),
    gouvernorat: yup.string().required("Champ requis"),
    picture: yup.mixed().required("required"),
  });

  const handleSubmit = async (values, onSubmitProps) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("firstname", values.firstname);
    formData.append("lastname", values.lastname);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("numeroSerie", values.numeroSerie);
    formData.append("specialite", values.specialite);
    formData.append("adresse", values.adresse);
    formData.append("ville", values.ville);
    formData.append("gouvernorat", values.gouvernorat);
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
            {/* Champs principaux */}
            <TextField
              label="Prénom"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstname}
              name="firstname"
              error={Boolean(touched.firstname && errors.firstname)}
              helperText={touched.firstname && errors.firstname}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Nom"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastname}
              name="lastname"
              error={Boolean(touched.lastname && errors.lastname)}
              helperText={touched.lastname && errors.lastname}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email && errors.email)}
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
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
            {/* Champs spécifiques aux médecins */}
            <TextField
              label="Numéro de série"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.numeroSerie}
              name="numeroSerie"
              error={Boolean(touched.numeroSerie && errors.numeroSerie)}
              helperText={touched.numeroSerie && errors.numeroSerie}
              sx={{ gridColumn: "span 4" }}
            />
            <SpecialiteSelect
              values={values}
              handleBlur={handleBlur}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
            />
            <TextField
              label="Adresse"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.adresse}
              name="adresse"
              error={Boolean(touched.adresse && errors.adresse)}
              helperText={touched.adresse && errors.adresse}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Gouvernorat"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.ville}
              name="ville"
              error={Boolean(touched.ville && errors.ville)}
              helperText={touched.ville && errors.ville}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Municipalité"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.gouvernorat}
              name="gouvernorat"
              error={Boolean(touched.gouvernorat && errors.gouvernorat)}
              helperText={touched.gouvernorat && errors.gouvernorat}
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
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) =>
                  setFieldValue("picture", acceptedFiles[0])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    sx={{ "&:hover": { cursor: "pointer" } }}
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
            {loading ? <Spin /> : "S'INSCRIRE EN TANT QUE MÉDECIN"}
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default MedecinForm;
