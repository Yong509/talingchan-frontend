import { Grid, Typography } from "@mui/material";
import axios from "axios";
import CustomAppBar from "components/common/custom_app_bar";
import ProductCard from "components/common/product_card";
import AddStockCard from "components/product/add_stock_card";
import SearchForm from "components/search/search_form";
import { getCookie, setCookie } from "cookies-next";
import { CartModel } from "model/cart_model";
import { ProductPayload } from "model/product_model";
import { UnitPayload } from "model/unit_model";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface pageProps {
  data?: Array<ProductPayload>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let data: Array<ProductPayload> = [];
  let unitProduct: Array<UnitPayload> = [];

  await axios
    .get(process.env.API_BASE_URL + "products")
    .then(function (response) {
      data = response.data.products;
    })
    .catch(function (error) {
      console.log(error);
    });

  await axios
    .get(process.env.API_BASE_URL + "units")
    .then(function (response) {
      unitProduct = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  for (let index = 0; index < data.length; index++) {
    for (let j = 0; j < unitProduct.length; j++) {
      if (data[index].UID == unitProduct[j].UID) {
        data[index].PUnit = unitProduct[j].UDetail;
      }
    }
  }
  return {
    props: {
      data,
    },
  };
};

const AddStock: NextPage = (props: pageProps) => {
  const router = useRouter();
  const [searchProduct, setSearchProduct] = useState<string>("");
  const [selectProduct, setSelectProduct] = useState<Array<CartModel>>([]);
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorQuantityOpen, setErrorQuantityOpen] = useState(false);
  const [addProduct, setAddProduct] = useState<CartModel>();

  useEffect(() => {
    let dataProduct: Array<CartModel> = getCookie("selectProductCookies")
      ? JSON.parse(getCookie("selectProductCookies")!.toString())
      : [];
    setSelectProduct(dataProduct);
  }, []);

  const showData = () => {
    const data = props.data?.map((item, index) => {
      if (
        item.PName.toUpperCase().includes(searchProduct.toUpperCase()) ||
        searchProduct == item.PID.toString()
      ) {
        return (
          <Grid item xs={1} key={item.PID}>
            <AddStockCard
              product={{
                PID: item.PID,
                PName: item.PName,
                PDescription: item.PDescription,
                PPrice: item.PPrice,
                PInStock: item.PInStock,
                UID: item.UID,
                PUnit: item.PUnit,
                PPicture: item.PPicture,
              }}
              onSelectProduct={(product) => {
                setSelectProduct((searchProduct) => [
                  ...searchProduct,
                  product,
                ]);
              }}
            />
          </Grid>
        );
      }
    });
    console.log(data);
    if (!data || data[0] == undefined) {
      console.log("Not found");
      return (
        <Typography
          id="total_price"
          variant="body1"
          color="text.secondary"
          sx={{
            pt: 1,
            fontWeight: "750",
            color: "black",
          }}
        >
          <h1 className="add-subheading">Not found {searchProduct}</h1>
        </Typography>
      );
    }
    return data;
  };

  const handleClick = (product: CartModel) => {
    setAddProduct(product);
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
    setErrorQuantityOpen(false);
  };

  return (
    <>
      <div className="bg-white">
        <div className="w-full">
          <CustomAppBar
            title="Talingchan Fertilizer"
            id={"AddStockBar"}
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
                  router.push("/report/");
                },
              },
            ]}
          />
          <div className="pt-44" />
          <Grid container spacing={2} columns={6}>
            <Grid item xs={1}></Grid>
            <Grid item xs={4}>
              <h1 className="add-heading">Add Stock</h1>
              <h1 className="add-subheading">add quantity to stock</h1>
              <div className="pt-10"></div>
              <div>
                <SearchForm
                  onChange={(value) => {
                    setSearchProduct(value);
                  }}
                />
                <div className="pt-10"></div>
              </div>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
          <div className="pt-10"></div>
          <div className="add-body">
          <div className="grid grid-cols-1 gap-y-12 gap-x-auto h-full justify-items-center py-10  xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
            {searchProduct.length == 0
              ? props.data?.map((itemProduct, index) => {
                  return (
                    <Grid container spacing={2} columns={3} key={itemProduct.PID}>
                      <Grid item xs={1} >
                        <AddStockCard
                          product={{
                            PID: itemProduct.PID,
                            PName: itemProduct.PName,
                            PDescription: itemProduct.PDescription,
                            PPrice: itemProduct.PPrice,
                            PInStock: itemProduct.PInStock,
                            UID: itemProduct.UID,
                            PUnit: itemProduct.PUnit,
                            PPicture: itemProduct.PPicture,
                          }}
                          onSelectProduct={(product) => {
                            //handleClick(product);
                            console.log(product);
                          }}
                        />
                      </Grid>
                    </Grid>
                  );
                })
              : showData()}
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddStock;
