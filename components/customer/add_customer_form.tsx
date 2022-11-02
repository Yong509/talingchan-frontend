import React from "react";
import { Grid, Box, TextField, Button, InputAdornment } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AccountCircle, ContactSupportOutlined } from "@mui/icons-material";
import PhoneIcon from '@mui/icons-material/Phone';
import { Customer } from "model/customer_model";
import axios from "axios";




const addCustomerForm: React.FC = () => {

    const [value, setValue] = useState<string>();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        clearErrors,
        reset,
    } = useForm();


    const customer: Customer = {
        CName: watch('name'),
        CTel: watch('tel')
    }


    const addCustomer = async () => {
        console.log(customer)
        await axios
        .post(process.env.API_BASE_URL + "customers" ,customer)
        .then(function (response) {
            console.log(response.data)
        })
        .catch(function(error){
            console.log(error)
        }
        );
    }


    function onSubmit(e: any): void {
        setValue(e.value);
        console.log(customer);

        const regName = new RegExp("[a-z]+");
        const nameValid = regName.test(watch('name'));

        const regTel = new RegExp("0[0-9]{9}");
        const telValid = regTel.test(watch('tel'));

        nameValid && telValid ? console.log('Pass') : console.log('Fail');

        // connect to db & set validation
        addCustomer();
    }



    return (
        <>
            <div className="add-customer-body">
                <Grid container spacing={2} columns={24} >
                    <Grid item xs={6} />
                    <Grid item xs={12} >
                        <h1 className="add-customer-heading">Add Customer</h1>
                        <h1 className="add-customer-subheading">create customer account</h1>
                        <Box component="form"
                            onSubmit={handleSubmit((e) => { onSubmit(e) })}
                            sx={{ mt: 1 }}>

                            <TextField
                                margin="normal"
                                // required
                                id="customerName"
                                label="name"
                                autoComplete="customerName"
                                autoFocus
                                {...register("customerName", {
                                    required: "Can not be empty",
                                })}
                                onBlur={() => {
                                    clearErrors("customerName")
                                }
                                }
                                helperText={errors.customerName?.message?.toString()}
                                error={errors.customerName?.message ? true : false}
                                sx={{
                                    width: { sm: 300, md: 400, xl: 400 }
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <br />
                            <TextField
                                margin="normal"
                                // required
                                label="tel"
                                id="customerTel"
                                autoComplete="customerTel"
                                autoFocus
                                {...register("customerTel", {
                                    required: "Can not be empty",
                                })}
                                onBlur={() => {
                                    clearErrors("customerTel")
                                }
                                }
                                helperText={errors.customerTel?.message?.toString()}
                                error={errors.customerTel?.message ? true : false}
                                sx={{
                                    width: { sm: 300, md: 400, xl: 400 }
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <br />
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                style={{
                                    backgroundColor: "black",
                                }}
                            >
                                Submit
                            </Button>
                        </Box>

                    </Grid>
                    <Grid item xs={6} />
                </Grid>
            </div>
        </>
    );
}

export default addCustomerForm;