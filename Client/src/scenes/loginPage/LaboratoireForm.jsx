import React from 'react';
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const LaboratoireForm = ({ handleFormSubmit }) => {
    const { palette } = useTheme();
    const initialValuesRegister = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        nomLaboratoire: "",
        gouvernorat: "",
        municipalites: "",
        adresse: "",
        picture: null, // Adding the picture field for image upload
    };

    const registerSchema = yup.object().shape({
        firstname: yup.string().required("Champ requis"),
        lastname: yup.string().required("Champ requis"),
        email: yup.string().email("Email invalide").required("Champ requis"),
        password: yup.string().required("Champ requis"),
        nomLaboratoire: yup.string().required("Champ requis"),
        gouvernorat: yup.string().required("Champ requis"),
        municipalites: yup.string().required("Champ requis"),
        adresse: yup.string().required("Champ requis"),
        picture: yup.string().required("required"), // Adding validation for picture upload
    });

    const handleSubmit = async (values, onSubmitProps) => {
        // Créer un FormData spécifique au rôle du laboratoire
        const formData = new FormData();
        formData.append("firstname", values.firstname);
        formData.append("lastname", values.lastname);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("nomLaboratoire", values.nomLaboratoire);
        formData.append("gouvernorat", values.gouvernorat);
        formData.append("municipalites", values.municipalites);
        formData.append("adresse", values.adresse);
        formData.append("picture", values.picture); // Appending the picture to FormData
        formData.append("role", "laboratoire");
        // Appeler la fonction de soumission du formulaire dans le composant parent
        handleFormSubmit(formData, onSubmitProps);
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
                       
                        <TextField
                            label="Nom de Laboratoire"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.nomLaboratoire}
                            name="nomLaboratoire"
                            error={Boolean(touched.nomLaboratoire) && Boolean(errors.nomLaboratoire)}
                            helperText={touched.nomLaboratoire && errors.nomLaboratoire}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            label="Gouvernorat"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.gouvernorat}
                            name="gouvernorat"
                            error={Boolean(touched.gouvernorat) && Boolean(errors.gouvernorat)}
                            helperText={touched.gouvernorat && errors.gouvernorat}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            label="Municipalités"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.municipalites}
                            name="municipalites"
                            error={Boolean(touched.municipalites) && Boolean(errors.municipalites)}
                            helperText={touched.municipalites && errors.municipalites}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            label="Adresse"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.adresse}
                            name="adresse"
                            error={Boolean(touched.adresse) && Boolean(errors.adresse)}
                            helperText={touched.adresse && errors.adresse}
                            sx={{ gridColumn: "span 4" }}
                        />
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
                                            <Typography>Ajouter une photo ici</Typography>
                                        ) : (
                                            <FlexBetween>
                                                <Typography>{values.picture.name}</Typography>
                                                <EditOutlinedIcon />
                                            </FlexBetween>
                                        )}
                                    </Box>
                                )}
                            </Dropzone>
                            {touched.picture && errors.picture && (
                                <Typography variant="body2" color="error">
                                    {errors.picture}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                    {/* Boutons et autres éléments UI */}
                    <Button
                        fullWidth
                        type="submit"
                        sx={{
                            m: "2rem 0",
                            p: "1rem",
                            backgroundColor: palette.primary.main,
                            color: palette.background.alt,
                            "&:hover": { color: palette.primary.main },
                        }}
                    >
                        S'INSCRIRE EN TANT QUE LABORATOIRE
                    </Button>
                </form>
            )}
        </Formik>
    );
};

export default LaboratoireForm;
