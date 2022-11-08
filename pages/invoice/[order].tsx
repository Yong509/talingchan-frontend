import {
  Alert,
  AlertTitle,
  Backdrop,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import CustomAppBar from "components/common/custom_app_bar";
import CustomDialog from "components/common/custom_dialog";
import CustomTable from "components/common/custom_table";
import { CartModel } from "model/cart_model";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface purchaseCartModel {
  invoiceID: number;
  invoiceStatus: string;
  cart: Array<CartModel>;
}

interface updateInStock {
  PInStock: number;
}

interface updateStatus {
  IStatus: string;
}

const InvoicePage: NextPage = () => {
  const router = useRouter();
  const { order } = router.query;
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [routerQuery, setRouterQuery] = useState<purchaseCartModel>({
    invoiceID: 0,
    invoiceStatus: "",
    cart: [],
  });
  const [backdrop, setBackdrop] = useState<boolean>(false);
  const [successPurchase, setSuccessPurchase] = useState<boolean>(false);
  const [failPurchase, setFailPurchase] = useState<boolean>(false);

  useEffect(() => {
    try {
      let data: purchaseCartModel = JSON.parse(order as string);
      if (data != undefined) {
        setRouterQuery(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [order]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessPurchase(false);
    setFailPurchase(false);
  };
  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handlePurchaseProduct = async () => {
    setOpenConfirmDialog(false);
    setBackdrop(true);
    routerQuery.cart.map(async (item) => {
      let afterCutStock: number = 0;
      let productInStock: number = 0;
      let updateInStock: updateInStock = { PInStock: 0 };
      let updateStatus: updateStatus = { IStatus: "" };
      await axios
        .get(process.env.API_BASE_URL + "products/" + item.id)
        .then(function (response) {
          productInStock = response.data.PInStock;
        })
        .catch(function (error) {
          console.log(error);
        });
      if (item.quantity <= productInStock) {
        afterCutStock = productInStock - item.quantity;
        updateInStock = { PInStock: afterCutStock };
        updateStatus = { IStatus: "Purchased" };

        await axios
          .put(process.env.API_BASE_URL + "products/" + item.id, updateInStock)
          .catch(function (error) {
            console.log(error);
            setFailPurchase(true);
          });

        await axios
          .put(
            process.env.API_BASE_URL + "invoices/" + routerQuery.invoiceID,
            updateStatus
          )
          .then(function (response) {
            setSuccessPurchase(true);
          })
          .catch(function (error) {
            console.log(error);
            setFailPurchase(true);
          });

        setBackdrop(false);
      } else {
        setBackdrop(false);
        setFailPurchase(true);
      }
    });
    router.push("/");
  };

  return (
    <>
      <div className="bg-white">
        <div className="w-full">
          <CustomAppBar
            title="Talingchan Fertilizer"
            button={[
              {
                buttonTitle: "Receive",
                onClick: (e) => {
                  e.preventDefault();
                  setBackdrop(true);
                  router.push("/receive/");
                },
              },
              {
                buttonTitle: "Cart",
                onClick: (e) => {
                  e.preventDefault();
                  setBackdrop(true);
                  router.push("/cart/");
                },
              },
              {
                buttonTitle: "Report",
                onClick: (e) => {
                  setBackdrop(true);
                  router.push("/report/");
                },
              },
            ]}
            id={"HomeAppBar"}
          />
        </div>
        <div className="pt-44">
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
            Invoice
          </Typography>
        </div>
      </div>
      <div className="pt-24">
        <div className=" md:px-16 px-4" id="invoice-table">
          <CustomTable
            total={true}
            btCaption={{
              btCaptionTitle: "Purchase",
              disable: routerQuery?.invoiceStatus == "Preorder" ? true : false,
            }}
            onPurchase={() => {
              setOpenConfirmDialog(true);
            }}
            tableHead={[
              { title: "Product ID", style: "" },
              { title: "Product", style: "w-80" },
              { title: "Quantity", style: "" },
              { title: "Price per Unit", style: "" },
              { title: "Total", style: "" },
            ]}
            data={routerQuery?.cart.map((item: CartModel) => {
              return [
                String(item.id),
                item.name,
                String(item.quantity),
                String(item.pricePerUnit),
                String(item.total),
              ];
            })}
          />
        </div>

        <CustomDialog
          title={{
            text: `Confirme Purchase`,
            color: "black",
          }}
          content={`Please confirm your purchase`}
          open={openConfirmDialog}
          cancelButton={{ text: "cancel", fontColor: "black" }}
          confirmButton={{
            text: "purchase",
            color: "#4caf50",
            fontColor: "white",
          }}
          onConfirm={() => {
            handlePurchaseProduct();
          }}
          onCancel={() => {
            setOpenConfirmDialog(false);
          }}
        />

        <Snackbar
          open={failPurchase}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert severity="error">
            <AlertTitle>Purchase Fail</AlertTitle>
            <strong>Something went wrong!</strong>
          </Alert>
        </Snackbar>

        <Snackbar
          open={successPurchase}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert severity="success">
            <AlertTitle>Purchase Success</AlertTitle>
            <strong>Thank you for shopping with us!</strong>
          </Alert>
        </Snackbar>

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

export default InvoicePage;
