

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

    const [searchValue, setSearchValue] = useState<string>();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        clearErrors,
        reset,
    } = useForm();

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
                                setSearchValue(e.search_input);
                                console.log('Hello form login submit');
                            })}
                            noValidate
                            sx={{ mt: 1 }}>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="EmpID"
                                label="Employee ID"
                                // name="email"
                                autoComplete="empID"
                                {...register("empID", {
                                    required: "Can not be empty",
                                  })}
                                  onBlur={() => {
                                    clearErrors("empID")
                                  }}
                                helperText={errors.empID?.message?.toString()}
                                error={errors.search_input?.message ? true : false}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                // name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                autoFocus
                                {...register("password", {
                                    required: "Can not be empty",
                                  })}
                                  onBlur={() => {
                                    clearErrors("password")
                                  }}
                                helperText = {errors.password?.message?.toString()}
                                error={errors.search_input?.message ? true : false}
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