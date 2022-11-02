import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";

import axios from "axios";
import CustomAppBar from "components/common/custom_app_bar";
import CustomDialog from "components/common/custom_dialog";
import CustomTable from "components/common/custom_table";
import { getCookie, setCookie } from "cookies-next";
import { data } from "cypress/types/jquery";
import { CartModel } from "model/cart_model";
import { CustomerModel } from "model/customer";
import { InvoiceModel } from "model/invoice_model";
import { ProductPayload } from "model/product_model";
import { GetServerSideProps, NextPage } from "next";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface productProps {
  dataProduct?: Array<CartModel>;
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
  const [productName, setProductName] = useState<string>();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [cartOrder, setCartOrder] = useState<Array<Array<string>>>([[]]);

  useState(() => {
    setCookie("temp", dataProduct);
  });

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
    setOpen(true);
  };

  const handleError = () => {
    setOpen(false);
    setErrorOpen(true);
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
  };

  console.log("cookie = ", dataProduct);

  const handleSearchCustomer = async (customer: string) => {
    let data: CustomerModel = { CID: 0, CName: "", CTel: "" };
    await axios
      .get(process.env.API_BASE_URL + "customers/" + customer)
      .then(function (response) {
        data = response.data;
      })
      .then(function (error) {
        console.log(error);
      });
    if (data || data != undefined) {
      handleClick();
      setSearchCustomer(data);
    } else {
      handleError();
    }
  };

  const handleCreateInvoice = async (cartOrderData: Array<Array<string>>) => {
    let invoiceData: InvoiceModel = {
      status: "Ordering",
      customerId: 0,
      employeeId: 1,
    };

    invoiceData.customerId = searchCustomer!.id;

    console.log("invoice create ", invoiceData);
  };

  return (
    <>
      <div className="bg-white">
        <div className="w-full">
          <CustomAppBar
            title="Talingchan Fertilizer"
            button={[
              { buttonTitle: "Receive", onClick: () => {} },
              {
                buttonTitle: "Cart",
                onClick: (e) => {
                  e.preventDefault();
                  router.push("/cart/");
                },
              },
              { buttonTitle: "Login", onClick: () => {} },
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
        <div className="pt-24 md:px-16 px-4">
          <CustomTable
            deleteAble={true}
            total={true}
            onOrder={(data) => {
              if (searchCustomer != undefined || searchCustomer) {
                setOpenConfirmDialog(true);
                setCartOrder(data);
              }
            }}
            onDelete={(product) => {
              setProductName(product);
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
            data={dataProduct?.map((item) => {
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

        <div className="py-10">
          <form
            onSubmit={handleSubmit((e) => {
              handleSearchCustomer(e.search_customer);
            })}
          >
            <div className="w-full flex justify-center">
              <Box style={{ position: "absolute" }}>
                <TextField
                  id="serach_customer"
                  placeholder="Customer"
                  variant="outlined"
                  InputProps={{
                    sx: {
                      height: { xs: "33px", md: "55px" },
                      fontSize: { xs: "12px", md: "16px" },
                      width: { xs: "120px", md: "250px" },
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

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: "110px",
                    height: {
                      xs: "33px",
                      md: "55px",
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
              </Box>
            </div>
          </form>
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
        <Snackbar
          open={errorOpen}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert severity="error" onClose={handleClose} sx={{ width: "100%" }}>
            Not found
          </Alert>
        </Snackbar>
        <CustomDialog
          title={{
            text: `Remove ${productName} out of cart.`,
            color: "#F26161",
          }}
          content={`Are you sure you want to remove ${productName} out of your cart?`}
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
        />

        <CustomDialog
          title={{
            text: `Confirme Order`,
            color: "black",
          }}
          content={`Are you sure you want to order?`}
          open={openConfirmDialog}
          cancelButton={{ text: "cancel", fontColor: "black" }}
          confirmButton={{
            text: "confirm",
            color: "#F26161",
            fontColor: "white",
          }}
          onConfirm={() => {
            handleCreateInvoice(cartOrder);
          }}
          onCancel={() => {
            setOpenDialog(false);
          }}
        />
      </div>
    </>
  );
};

export default CartIndexPage;
