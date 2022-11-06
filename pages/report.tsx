import { LabelRounded } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import axios, { Axios, AxiosStatic } from "axios";
import CustomAppBar from "components/common/custom_app_bar";
import CustomTable from "components/common/custom_table";
import ReportChart from "components/common/report_chart";
import { CustomerModel } from "model/customer";
import { Employee } from "model/employee_model";
import { InvoiceDetailModel } from "model/invoice_detail_model";
import { InvoiceModel } from "model/invoice_model";
import { ProductReport } from "model/product_report";
import { ReceiveModel } from "model/receive_model";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface pageProps {
  dataset: any;
  receive: Array<ReceiveModel>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let dataset: Array<ProductReport> = [];
  await axios
    .get(process.env.API_BASE_URL + "report_product")
    .then(function (response) {
      dataset = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  let invoice: Array<InvoiceModel> = [
    { IID: 0, IStatus: "", IDate: "", CID: 0, EmpID: 0 },
  ];
  let receive: Array<ReceiveModel> = [
    {
      IID: 0,
      IStatus: "",
      IDate: "",
      CNAME: "",
      ENAME: "",
      Total: 0,
    },
  ];

  await axios
    .get(process.env.API_BASE_URL + "invoices")
    .then(function (response) {
      invoice = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  invoice.map((item) => {
    let date = new Date(item.IDate);
    receive.push({
      IID: item.IID,
      IStatus: item.IStatus,
      IDate: date.toISOString().substring(0, 10),
      CNAME: "",
      ENAME: "",
      Total: 0,
    });
  });

  for (let index = 0; index < invoice.length; index++) {
    let tempInvoiceDetail: Array<InvoiceDetailModel> = [
      {
        INVID: 0,
        INVQty: 0,
        INVPrice: "",
        PID: 0,
        IID: 0,
      },
    ];

    await axios
      .get(
        process.env.API_BASE_URL +
          "invoiceDetails/invoice/" +
          invoice[index].IID
      )
      .then(function (response) {
        tempInvoiceDetail = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    tempInvoiceDetail.map((item) => {
      receive[index + 1].Total += parseFloat(item.INVPrice);
    });
  }

  for (let index = 0; index < invoice.length; index++) {
    let customer: Array<CustomerModel> = [];

    await axios
      .get(process.env.API_BASE_URL + "customers")
      .then(function (response) {
        customer = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    for (let j = 0; j < customer.length; j++) {
      if (invoice[index].CID == customer[j].CID) {
        receive[index + 1].CNAME = customer[j].CName;
      }
    }
  }

  for (let index = 0; index < invoice.length; index++) {
    let employee: Array<Employee> = [];

    await axios
      .get(process.env.API_BASE_URL + "employees")
      .then(function (response) {
        employee = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    for (let j = 0; j < employee.length; j++) {
      if (invoice[index].EmpID == employee[j].EmpID) {
        receive[index + 1].ENAME = employee[j].EmpName;
      }
    }
  }

  receive.shift();

  return {
    props: { dataset, receive },
  };
};

const Report = (props: pageProps) => {
  const router = useRouter();

  // console.log(props);

  const label: Array<string> = [];
  const dataSet: Array<number> = [];

  const keyData = Object.keys(props.dataset[0]);

  console.log(props.dataset);
  console.log(props.receive);

  // console.log(keyData);

  for (let index = 0; index < props.dataset.length; index++) {
    label.push(props.dataset[index][keyData[1]]);
    dataSet.push(props.dataset[index][keyData[0]]["INVQty"]);
  }

  //reverse array
  const invoice: Array<ReceiveModel> = [];
  for (let index = 0; index < props.receive.length; index++) {
    invoice.push(props.receive[props.receive.length - index - 1]);
  }

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
                  // router.push("/");
                },
              },
            ]}
          />
          <div className="pt-40"></div>
          <Grid container spacing={2} columns={8}>
            <Grid item xs={1} sx={{ display: { xs: "none", md: "block" } }} />
            <Grid item xs={5}>
              <ReportChart
                heading="Report Product Chart"
                sub_heading="total product sold report , november 2022"
                label={label}
                dataset={dataSet}
              />
            </Grid>
            <Grid item xs={1}>
              <div className="pt-40"></div>
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
                  router.push("/add_stock/");
                }}
              >
                Add Stock
              </Button>
            </Grid>
            <Grid item xs={1} sx={{ display: { xs: "none", md: "block" } }} />
          </Grid>
          <div className="pt-20"></div>
          <Grid container spacing={2} columns={8}>
            <Grid item xs={1} sx={{ display: { xs: "block", md: "block" } }} />
            <Grid item xs={6}>
              <h1 className="add-heading">Invoice</h1>
              <h1 className="add-subheading">all pre-order & purchase invoice log , november 2022</h1>
              <div className="pt-20"></div>
              <CustomTable
                tableHead={[
                  { title: "Invoice no", style: "" },
                  { title: "Status", style: "" },
                  { title: "Date", style: "" },
                  { title: "Customer", style: "" },
                  { title: "Employee", style: "" },
                ]}
                data={invoice.map((item) => {
                  return [
                    String(item.IID),
                    String(item.IStatus),
                    item.IDate,
                    item.CNAME,
                    item.ENAME,
                  ];
                })}
                onOpen={(id, status) => {
                  // handleClickReceive(id, status!);
                }}
              />
            </Grid>
            <Grid item xs={1} sx={{ display: { xs: "none", md: "block" } }} />
          </Grid>

          <div className="pt-40"></div>
        </div>
      </div>
    </>
  );
};

export default Report;
