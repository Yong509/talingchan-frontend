import type { GetServerSideProps, NextPage } from "next";
import CustomAppBar from "components/common/custom_app_bar";
import SearchForm from "components/search/search_form";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import ProductCard from "components/common/product_card";
import { ProductPayload } from "model/product_model";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { LotPayload } from "model/lot_model";
import { UnitPayload } from "model/unit_model";

interface pageProps {
  data?: Array<ProductPayload>;
}

export async function getServerSideProps() {
  let data: Array<ProductPayload> = [];
  let lotProduct: Array<LotPayload> = [];
  let unitProduct: Array<UnitPayload> = [];
  await axios
    .get(process.env.API_BASE_URL + "/products")
    .then(function (response) {
      data = response.data.products;
    })
    .catch(function (error) {
      console.log(error);
    });

  await axios
    .get(process.env.API_BASE_URL + "/lots")
    .then(function (response) {
      lotProduct = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  await axios
    .get(process.env.API_BASE_URL + "/units")
    .then(function (response) {
      unitProduct = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  for (let index = 0; index < lotProduct.length; index++) {
    if (lotProduct[index].productId == data.at(index)?.id) {
      data[index].quantity = lotProduct[index].quantity;
    }
  }
  for (let index = 0; index < unitProduct.length; index++) {
    if (unitProduct[index].id == lotProduct.at(index)?.unitId) {
      data[index].unit = unitProduct[index].detail;
    }
  }
  return {
    props: {
      data,
    },
  };
};

const Home: NextPage = (props: pageProps) => {
  console.log(props.data);
  return (
    <>
      <div className="bg-white">
        <div className="w-full">
          <CustomAppBar
            title="Talingchan Fertilizer"
            button={[
              { buttonTitle: "Receive", onClick: () => {} },
              { buttonTitle: "Cart", onClick: () => {} },
              { buttonTitle: "Login", onClick: () => {} },
            ]}
            id={"HomeAppBar"}
          />
        </div>
        <div className="pt-44">
          <SearchForm />
        </div>
        <div className="pt-24">
          <div className="grid grid-cols-1 gap-y-12 gap-x-auto h-full justify-items-center py-10  xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {props.data?.map((item, index) => {
              return (
                <React.Fragment key={item.id}>
                  <ProductCard
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    quantity={item.quantity}
                    unit={item.unit}
                    picture={item.picture}
                  />
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
