import Typography from "@mui/material/Typography/Typography";
import CustomAppBar from "components/common/custom_app_bar";
import ProductCard from "components/common/product_card";
import SearchForm from "components/search/search_form";
import { props } from "cypress/types/bluebird";
import { NextPage } from "next";
import router from "next/router";
import React from "react";

const CartIndexPage: NextPage = () => {
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
            sx={{
              fontWeight: "650",
              fontSize: "2.5rem",
              color: "black",
            }}
          >
            Cart
          </Typography>
        </div>
        <div className="pt-24"></div>
      </div>
    </>
  );
};

export default CartIndexPage;
