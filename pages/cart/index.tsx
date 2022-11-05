import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Snackbar,
  Backdrop,
  CircularProgress,
  InputLabel,
  FormHelperText,
  FormControl,
} from "@mui/material";
import { maxWidth, width } from "@mui/system";
import axios from "axios";
import CustomAppBar from "components/common/custom_app_bar";
import CustomDialog from "components/common/custom_dialog";
import CustomTable from "components/common/custom_table";
import {
  deleteCookie,
  getCookie,
  removeCookies,
  setCookie,
} from "cookies-next";
import { data } from "cypress/types/jquery";
import { CartModel } from "model/cart_model";
import { CustomerModel } from "model/customer";
import { Employee } from "model/employee_model";
import { InvoiceDetailCreateModel } from "model/invoice_detail_model";
import { InvoiceCreateModel } from "model/invoice_model";
import { ProductPayload } from "model/product_model";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface productProps {
  dataProduct?: Array<CartModel>;
}

interface purchaseCartModel {
  invoiceID: number;
  cart: Array<CartModel>;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  let dataProduct: Array<CartModel> = getCookie("selectProductCookies", {
    req,
    res,
  })
    ? JSON.parse(getCookie("selectProductCookies", { req, res })!.toString())
    : [];

  return {
    props: {
      dataProduct,
    },
  };
};

const CartIndexPage: NextPage<productProps> = ({ dataProduct }) => {
  const [searchCustomer, setSearchCustomer] = useState<CustomerModel>();
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorCustomerOpen, setErrorCustomerOpen] = useState(false);
  const [employeeOpen, setEmployeeOpen] = useState(false);
  const [deleteProductName, setDeleteProductName] = useState<string>();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [cartOrder, setCartOrder] = useState<Array<Array<string>>>([[]]);
  const [createInvoiceAlert, setCreateInvoiceAlert] = useState<boolean>(false);
  const [dataProductCart, setDataProductCart] = useState<
    Array<CartModel> | undefined
  >(dataProduct);
  const [backdrop, setBackdrop] = useState<boolean>(false);
  const [errorEmployeeSnackbar, setErrorEmployeeSnackbar] = useState<boolean>(false);
  const [employee, setEmployee] = useState<Employee>();
  let purchaseCart: purchaseCartModel = { invoiceID: 0, cart: [] };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm();

  const handleClick = () => {
    setErrorOpen(false);
    setErrorCustomerOpen(false);
    setOpen(true);
  };

  const handleEmployeeSnackbar = () => {
    setErrorOpen(false);
    setErrorCustomerOpen(false);
    setOpen(false);
    setErrorEmployeeSnackbar(true);
  };

  const handleError = () => {
    setOpen(false);
    setErrorCustomerOpen(false);
    setErrorEmployeeSnackbar(false);
    setErrorOpen(true);
  };

  const handleErrorCustomer = () => {
    setOpen(false);
    setErrorOpen(false);
    setErrorCustomerOpen(true);
  };

  const handleCreateInvoiceAlert = () => {
    setOpen(false);
    setErrorOpen(false);
    setErrorCustomerOpen(false);
    setCreateInvoiceAlert(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setErrorOpen(false);
    setErrorCustomerOpen(false);
    setCreateInvoiceAlert(false);
    setErrorEmployeeSnackbar(false);
  };

  const handleSearchCustomer = async (customer: string) => {
    let data: CustomerModel = { CID: 0, CName: "", CTel: "" };
    console.log(customer);
    await axios
      .get(process.env.API_BASE_URL + "customers_tel/" + customer)
      .then(function (response) {
        data = response.data;
      })
      .then(function (error) {
        console.log(error);
        handleError();
      });
    if (data || data != undefined) {
      handleClick();
      setSearchCustomer(data);
    } else {
      handleError();
    }
  };

  const handleSearchEmployee = async (employee: string) => {
    let data: Employee = {
      EmpID: 0,
      EmpName: "",
      EmpPosition: "",
      EmpTel: "",
      EmpPassword: "",
    };
    await axios
      .get(process.env.API_BASE_URL + "employees/" + employee)
      .then(function (response) {
        data = response.data;
      })
      .then(function (error) {
        console.log(error);
      });
    if (data || data != undefined) {
      handleClick();
      setEmployee(data);
    } else {
      handleEmployeeSnackbar();
    }
  };

  const handleCreateInvoice = async (cartOrderData: Array<Array<string>>) => {
    setBackdrop(true);
    let invoiceData: InvoiceCreateModel = {
      IStatus: "Preorder",
      CID: 0,
      EmpID: 1,
    };

    let invoiceId: number = 0;

    invoiceData.CID = searchCustomer!.CID;
    await axios
      .post(process.env.API_BASE_URL + "invoices", invoiceData)
      .then(function (response) {
        invoiceId = response.data.createdInvoice.IID;

        setOpenConfirmDialog(false);
      })
      .catch(function (error) {
        console.log(error);
      });



    for (let index = 0; index < cartOrderData.length; index++) {
      let dataInvoiceDetail: InvoiceDetailCreateModel = {
        INVQty: parseInt(cartOrderData[index][2]),
        INVPrice: cartOrderData[index][4],
        PID: parseInt(cartOrderData[index][0]),
        IID: invoiceId
      };
      await axios
        .post(process.env.API_BASE_URL + "invoiceDetails", dataInvoiceDetail)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    setCreateInvoiceAlert(true);
    setBackdrop(false);
    purchaseCart = { invoiceID: invoiceId, cart: dataProductCart! };
    console.log(purchaseCart);
    router.push("invoice/" + JSON.stringify(purchaseCart));
    deleteCookie("selectProductCookies");
  };

  return (
    <>
      <div className="bg-white">
        <div className="w-full">
          <CustomAppBar
            title="Talingchan Fertilizer"
            button={[
              { buttonTitle: "Receive", onClick: () => { } },
              {
                buttonTitle: "Cart",
                onClick: (e) => {
                  e.preventDefault();
                  router.push("/cart/");
                },
              },
              { buttonTitle: "Login", onClick: () => { } },
            ]}
            id={"HomeAppBar"}
          />
        </div>
        <div className="content-center pt-32">
          <Typography
            id="cart_title"
            gutterBottom
            component="div"
            align="center"
            sx={{
              fontWeight: "650",
              fontSize: "2.5rem",
              color: "black",
            }}
          >
            Cart
          </Typography>
        </div>

        <div className="py-10">
          <form
            onSubmit={handleSubmit((e) => {
              console.log(e.search_employee);
              handleSearchCustomer(e.search_customer);
              handleSearchEmployee(e.search_employee);
            })}
          >
            <div className="grid grid-cols-3 gap-y-24 lg:gap-2">
              <div className="col-span-2 lg:col-span-1">
                <div className="w-full flex justify-center">
                  <Box style={{ position: "absolute" }}>
                    <InputLabel htmlFor="outlined-adornment-password">
                      Customer Phone Number
                    </InputLabel>
                    <TextField
                      id="serach_customer"
                      placeholder="Customer Phone Number"
                      variant="outlined"
                      InputProps={{
                        sx: {
                          height: { xs: "33px", md: "50px" },
                          fontSize: { xs: "12px", md: "16px" },
                        },
                      }}
                      {...register("search_customer", {
                        required: "Cannot be empty",
                      })}
                      onBlur={() => {
                        clearErrors("search_customer");
                      }}
                      helperText={errors.search_customer?.message?.toString()}
                      error={errors.search_customer?.message ? true : false}
                    />
                     <FormHelperText id="outlined-weight-helper-text"><Link href="/add_customer">Add New Customer</Link></FormHelperText>
                  </Box>
                </div>
              </div>

              <div className="col-span-2 lg:col-span-1">
                <div className="w-full flex justify-center">
                  <Box style={{ position: "absolute" }}>
                    <InputLabel htmlFor="outlined-adornment-password">
                      Employee ID
                    </InputLabel>
                    <TextField
                      id="search_employee"
                      placeholder="Employee ID"
                      variant="outlined"
                      InputProps={{
                        sx: {
                          height: { xs: "33px", md: "50px" },
                          fontSize: { xs: "12px", md: "16px" },
                        },
                      }}
                      {...register("search_employee", {
                        required: "Cannot be empty",
                      })}
                      onBlur={() => {
                        clearErrors("search_employee");
                      }}
                      helperText={errors.search_employee?.message?.toString()}
                      error={errors.search_employee?.message ? true : false}
                    />
                  </Box>
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <div className="w-full flex justify-center">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      marginTop: "10px",
                      width: "110px",
                      height: {
                        xs: "33px",
                        md: "55px",
                      },
                      widht: {
                        xs: "45px",
                        md: "65px",
                      },
                      fontSize: {
                        xs: "12px",
                        md: "16px",
                      },
                    }}
                    style={{
                      marginLeft: "12px",
                      borderRadius: "10px",
                      backgroundColor: "black",
                    }}
                  >
                    Check
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="pt-18 md:px-16 px-4">
          <Typography
            id="cart_title"
            gutterBottom
            component="div"
            align="left"
            sx={{
              fontWeight: "650",
              fontSize: "1.8rem",
              color: "black",
            }}
          >
            Employee : {employee?.EmpName}
          </Typography>
          <CustomTable
            deleteAble={true}
            total={true}
            btCaptionTitle="Order"
            onOrder={(data) => {
              if (searchCustomer != undefined || searchCustomer) {
                setOpenConfirmDialog(true);
                setCartOrder(data);
              } else {
                handleErrorCustomer();
              }
            }}
            onDelete={(product) => {
              setDeleteProductName(product);
              setOpenDialog(true);
            }}
            customer={searchCustomer?.CName}
            tableHead={[
              { title: "Product ID", style: "" },
              { title: "Product", style: "w-80" },
              { title: "Quantity", style: "" },
              { title: "Price per Unit", style: "" },
              { title: "Total", style: "" },
            ]}
            data={dataProductCart?.map((item) => {
              return [
                String(item.id),
                String(item.name),
                String(item.quantity),
                String(item.pricePerUnit),
                String(item.total),
              ];
            })}
          />
        </div>

        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Adding {searchCustomer?.CName} successfully!
          </Alert>
        </Snackbar>

        <Snackbar open={employeeOpen} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Adding {employee?.EmpName} successfully!
          </Alert>
        </Snackbar>
        <Snackbar
          open={createInvoiceAlert}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Create invoice successfully!
          </Alert>
        </Snackbar>
        <Snackbar
          open={errorOpen}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert severity="error" onClose={handleClose} sx={{ width: "100%" }}>
            Customer not found
          </Alert>
        </Snackbar>
        <Snackbar
          open={errorEmployeeSnackbar}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert severity="error" onClose={handleClose} sx={{ width: "100%" }}>
            Employee not found
          </Alert>
        </Snackbar>
        <Snackbar
          open={errorCustomerOpen}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert severity="error" onClose={handleClose} sx={{ width: "100%" }}>
            Customer or Employee are empty
          </Alert>
        </Snackbar>

        <CustomDialog
          title={{
            text: `Remove ${deleteProductName} out of cart.`,
            color: "#F26161",
          }}
          content={`Are you sure you want to remove ${deleteProductName} out of your cart?`}
          open={openDialog}
          cancelButton={{ text: "cancel", fontColor: "black" }}
          confirmButton={{
            text: "confirm",
            color: "#F26161",
            fontColor: "white",
          }}
          onCancel={() => {
            setOpenDialog(false);
          }}
          onConfirm={() => {
            let product = dataProduct?.filter((item) => {
              if (deleteProductName != item.name) {
                return item;
              }
            });
            setCookie("selectProductCookies", JSON.stringify(product));
            setDataProductCart(product);
            setOpenDialog(false);
          }}
        />
        <CustomDialog
          title={{
            text: `Confirme Order`,
            color: "black",
          }}
          content={`You will not be able to edit your order after you place prder. Are you sure you want to order?`}
          open={openConfirmDialog}
          cancelButton={{ text: "cancel", fontColor: "black" }}
          confirmButton={{
            text: "confirm",
            color: "#F26161",
            fontColor: "white",
          }}
          onConfirm={() => {
            handleCreateInvoice(cartOrder);
            setOpenConfirmDialog(false);
          }}
          onCancel={() => {
            setOpenConfirmDialog(false);
          }}
        />
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer - 1 }}
          open={backdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  );
};

export default CartIndexPage;
