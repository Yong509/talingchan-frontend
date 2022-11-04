import { Typography } from "@mui/material";
import axios from "axios";
import CustomAppBar from "components/common/custom_app_bar";
import CustomDialog from "components/common/custom_dialog";
import CustomTable from "components/common/custom_table";
import { CartModel } from "model/cart_model";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const InvoicePage: NextPage = () => {
  const router = useRouter();
  const { order } = router.query;

  const routerQuery = JSON.parse(order as string);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);

  const handlePurchaseProduct = async () => {
    await axios.get(process.env.API_BASE_URL + "");
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
        <div className=" md:px-16 px-4">
          <CustomTable
            total={true}
            btCaptionTitle="Purchase"
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
            data={routerQuery.cart.map((item: CartModel) => {
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
            text: "confirm",
            color: "#F26161",
            fontColor: "white",
          }}
          onConfirm={() => {
            handlePurchaseProduct();
          }}
          onCancel={() => {
            setOpenConfirmDialog(false);
          }}
        />
      </div>
    </>
  );
};

export default InvoicePage;
