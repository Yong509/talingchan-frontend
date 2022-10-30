import Typography from "@mui/material/Typography/Typography";
import CustomAppBar from "components/common/custom_app_bar";
import CustomTable from "components/common/custom_table";
import ProductCard from "components/common/product_card";
import SearchForm from "components/search/search_form";
import { props } from "cypress/types/bluebird";
import { ProductPayload } from "model/product_model";
import { NextPage } from "next";
import router from "next/router";
import React from "react";

interface pageProps {
  data?: Array<ProductPayload>;
}

const CartIndexPage: NextPage = (props: pageProps) => {
  const data: Array<ProductPayload> = [
    {
      id: 1,
      name: "Asdghfsjghfdjkgjihjisdobkmfsl;kvoivnodmivpmdsiofvsdij",
      description: "B",
      price: 500,
      quantity: 3,
      picture: "pic",
      unit: "a",
    },
    {
      id: 30,
      name: "A",
      description: "B",
      price: 500,
      quantity: 3,
      picture: "",
      unit: "a",
    },
    {
      id: 26,
      name: "A",
      description: "B",
      price: 500,
      quantity: 3,
      picture: "",
      unit: "a",
    },
  ];
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
        <div className="pt-44 content-center">
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
            tableHead={["A", "B", "C", "D", "E", "F", "G"]}
            data={data.map((item) => {
              return [
                String(item.id),
                String(item.name),
                String(item.description),
                String(item.price),
                String(item.unit),
                String(item.quantity),
                String(item.picture),
              ];
            })}
          />
        </div>
      </div>
    </>
  );
};

export default CartIndexPage;
