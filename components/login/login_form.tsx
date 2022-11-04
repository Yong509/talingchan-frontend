

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, grey } from '@mui/material/colors';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useState } from "react";
import { useForm } from "react-hook-form";
import {  EmployeeLogIn } from 'model/employee_model';


const LoginForm: React.FC = () => {


    const theme = createTheme({
        palette: {
            primary: {
                main: grey[900],
            },
            secondary: {
                main: green[500],
            },
        },
    });

    const [value, setValue] = useState<string>();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        clearErrors,
        reset,
    } = useForm();

    const employee : EmployeeLogIn = {
        EmpID : watch('EmpID'),
        EmpPassword : watch('Password')
    }

    function onSubmit(e:any){
        setValue(e.value);
        console.log(employee);

        // connect to db & set validation
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form"
                            onSubmit={handleSubmit((e) => {
                                onSubmit(e);
                            })}
                            noValidate
                            sx={{ mt: 1 }}>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="EmpID"
                                label="Employee ID"
                                autoComplete="EmpID"
                                {...register("EmpID", {
                                    required: "Can not be empty",
                                  })}
                                  onBlur={() => {
                                    clearErrors("EmpID")
                                  }}
                                helperText={errors.EmpID?.message?.toString()}
                                error={errors.EmpID?.message ? true : false}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                id="Password"
                                autoComplete="current-password"
                                autoFocus
                                {...register("Password", {
                                    required: "Can not be empty",
                                  })}
                                  onBlur={() => {
                                    clearErrors("Password")
                                  }}
                                helperText = {errors.Password?.message?.toString()}
                                error={errors.Password?.message ? true : false}
                            />


                            {/* <FormControlLabel
                                            control={<Checkbox value="remember" color="primary" />}
                                            label="Remember me"
                                        /> */}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                style={{
                                    backgroundColor: "black",
                                }}
                            >
                                Sign In
                            </Button>


                            {/* <Grid container>
                                            <Grid item xs>
                                                <Link href="#" variant="body2">
                                                    Forgot password?
                                                </Link>
                                            </Grid>
                                            <Grid item>
                                                <Link href="#" variant="body2">
                                                    {"Don't have an account? Sign Up"}
                                                </Link>
                                            </Grid>
                                        </Grid> */}


                        </Box>
                    </Box>

                </Container>
            </ThemeProvider>
        </>
    )
}

export default LoginForm;