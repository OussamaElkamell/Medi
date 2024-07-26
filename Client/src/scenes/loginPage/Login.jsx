import React, { useState } from 'react';
import { Box, TextField, useTheme, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Formik } from 'formik';
import { setLogin } from 'state';
import { Spin, notification } from 'antd';

const Login = () => {
    const { palette } = useTheme();
    const [notificationVisibleSuccess, setNotificationVisibleSuccess] = useState(false);
    const [notificationVisibleFailed, setNotificationVisibleFailed] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;
    const initialValuesLogin = {
        email: '',
        password: '',
    };

    const loginSchema = yup.object().shape({
        email: yup.string().email('Invalid email').required('Required'),
        password: yup.string().required('Required'),
    });

    const handleFormSubmit = async (values, onSubmitProps) => {
        setLoading(true);
        try {
            const loggedInResponse = await fetch(`${apiUrl}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (!loggedInResponse.ok) {
                throw new Error('Login failed');
            }

            const loggedIn = await loggedInResponse.json();

            onSubmitProps.resetForm();
            if (loggedIn) {
                dispatch(
                    setLogin({
                        user: loggedIn.user,
                        medecin: loggedIn.user.medecin,
                        token: loggedIn.token,
                        patient: loggedIn.patient,
                    })
                );
                setNotificationVisibleSuccess(true);
                navigate('/home');
                console.log('User logged in successfully');
            } else {
                setNotificationVisibleFailed(true);
            }
        } catch (error) {
            console.error('Error during login:', error.message);
            setNotificationVisibleFailed(true);
        } finally {
            setLoading(false);
        }
    };

    const openNotificationSuccess = () => {
        notification.success({
            message: 'Welcome',
            description: 'You have successfully logged in',
            onClose: () => setNotificationVisibleSuccess(false),
        });
    };

    const openNotificationFailed = () => {
        notification.error({
            message: 'Error',
            description: 'Please verify your credentials',
            onClose: () => setNotificationVisibleFailed(false),
        });
    };

    return (
        <Box>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValuesLogin}
                validationSchema={loginSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display='grid'
                            gap='30px'
                            gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                        >
                            <TextField
                                label='Email'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name='email'
                                error={Boolean(touched.email) && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: 'span 4' }}
                            />
                            <TextField
                                label='Mot de passe'
                                type='password'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name='password'
                                error={Boolean(touched.password) && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                sx={{ gridColumn: 'span 4' }}
                            />
                        </Box>
                        <Button
                            fullWidth
                            type='submit'
                            disabled={loading}
                            sx={{
                                m: '2rem 0',
                                p: '1rem',
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                '&:hover': { color: palette.primary.main },
                                position: 'relative',
                            }}
                        >
                            {loading ? <Spin /> : 'Login'}
                        </Button>
                    </form>
                )}
            </Formik>
            {notificationVisibleSuccess && openNotificationSuccess()}
            {notificationVisibleFailed && openNotificationFailed()}
        </Box>
    );
};

export default Login;
