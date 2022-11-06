import { LabelRounded } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import axios, { Axios, AxiosStatic } from "axios";
import CustomAppBar from "components/common/custom_app_bar";
import ReportChart from "components/common/report_chart";
import { ProductReport } from "model/product_report";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let data: Array<ProductReport> = [];
  await axios
    .get(process.env.API_BASE_URL + "report_product")
    .then(function (response) {
      data = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  console.log(data);
  return {
    props: { data },
  };
};

const Report = (data: any) => {
  const router = useRouter();

  console.log(data);

  const label: Array<string> = [];
  const dataSet: Array<number> = [];

  const keyData = Object.keys(data.data[0]);

  console.log(data.data);

  console.log(keyData);

  for (let index = 0; index < data.data.length; index++) {
    label.push(data.data[index][keyData[1]]);
    dataSet.push(data.data[index][keyData[0]]["INVQty"]);
  }
  console.log(label);
  console.log(dataSet);

  return (
    <>
      <div className="bg-white">
        <div className="w-full">
          <CustomAppBar
            id="ReportAppBar"
            button={[
              {
                buttonTitle: "Receive",
                onClick: (e) => {
                  e.preventDefault();
                  router.push("/receive/");
                },
              },
              {
                buttonTitle: "Cart",
                onClick: (e) => {
                  e.preventDefault();
                  router.push("/cart/");
                },
              },
              {
                buttonTitle: "Report",
                onClick: (e) => {
                  e.preventDefault();
                  router.push("/");
                },
              },
            ]}
          />
          <div className="pt-40"></div>
          <Grid container spacing={2} columns={8}>
            <Grid item xs={1} sx={{ display: { xs: "none", md: "block" }}}/>
            <Grid item xs={5} >
              <ReportChart
                heading="Report Product Chart"
                sub_heading="total product sold report , november 2022"
                label={label}
                dataset={dataSet}
              />
            </Grid>
            <Grid item xs={1} >
              <div className="pt-40" ></div>
              <h1 className="add-heading">Product</h1>
              <h1 className="add-subheading">add new product to store</h1>
              <Button
                variant="contained"
                component="label"
                sx={{ mt: 3, mb: 2 }}
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/add_product/");
                }}
              >
                Add Product
              </Button>
              <div className="pt-5"></div>
              <h1 className="add-heading">Stock</h1>
              <h1 className="add-subheading">add quantity to stock</h1>
              <Button
                variant="contained"
                component="label"
                sx={{ mt: 3, mb: 2 }}
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/");
                }}
              >
                Add Stock
              </Button>
            </Grid>
            <Grid item xs={1} sx={{ display: { xs: "none", md: "block" }}} />
          </Grid>
          <div className="pt-40"></div>
        </div>
      </div>
    </>
  );
};

export default Report;
