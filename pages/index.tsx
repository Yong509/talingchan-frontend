import type { GetServerSideProps, NextPage } from "next";
import CustomAppBar from "components/common/custom_app_bar";
import SearchForm from "components/search/search_form";
import TextField from "@mui/material/TextField";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import ProductCard from "components/common/product_card";
import { ProductPayload } from "model/product_model";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { UnitPayload } from "model/unit_model";
import { useRouter } from "next/router";
import { CartModel } from "model/cart_model";
import { getCookie, setCookie } from "cookies-next";

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

const Home: NextPage = (props: pageProps) => {
  const router = useRouter();
  const [searchProduct, setSearchProduct] = useState<string>("");
  const [selectProduct, setSelectProduct] = useState<Array<CartModel>>([]);
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorQuantityOpen, setErrorQuantityOpen] = useState(false);
  const [addProduct, setAddProduct] = useState<CartModel>();
  const [backdrop, setBackdrop] = useState<boolean>(false);

  useEffect(() => {
    let dataProduct: Array<CartModel> = getCookie("selectProductCookies")
      ? JSON.parse(getCookie("selectProductCookies")!.toString())
      : [];
    setSelectProduct(dataProduct);
  }, []);

  const showData = () => {
    let found = false;
    const data = props.data?.map((item, index) => {
      if (
        item.PName.toUpperCase().includes(searchProduct.toUpperCase()) ||
        searchProduct == item.PID.toString()
      ) {
        found = true;
        return (
          <React.Fragment key={item.PID}>
            <ProductCard
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
          </React.Fragment>
        );
      }
    });
    if (found == false) {
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
            Not found {searchProduct}
          </Typography>
        );
      }
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
                  e.preventDefault();
                  setBackdrop(true);
                  router.push("/report/");
                },
              },
            ]}
            id={"HomeAppBar"}
          />
        </div>
        <div className="pt-44">
          <div>
            <SearchForm
              onChange={(value) => {
                setSearchProduct(value);
              }}
            />
          </div>
        </div>
        <div className="pt-24">
          <div className="grid grid-cols-1 gap-y-12 gap-x-auto h-full justify-items-center py-10  xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {searchProduct.length == 0
              ? props.data?.map((itemProduct, index) => {
                  return (
                    <React.Fragment key={itemProduct.PID}>
                      <ProductCard
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
                          handleClick(product);
                          let errorAddMore = false;
                          let haveItem = false;
                          let newProduct = selectProduct.map((item) => {
                            if (item.name == product.name) {
                              if (
                                item.quantity + product.quantity <=
                                itemProduct.PInStock
                              ) {
                                item.quantity += product.quantity;
                                haveItem = true;
                                return item;
                              } else {
                                errorAddMore = true;
                                setErrorQuantityOpen(true);
                              }
                            }
                            return item;
                          });
                          if (!errorAddMore) {
                            if (!haveItem) {
                              newProduct = [...newProduct, product];
                            }
                            setCookie(
                              "selectProductCookies",
                              JSON.stringify(newProduct)
                            );
                            setSelectProduct(newProduct);
                          }
                        }}
                      />
                    </React.Fragment>
                  );
                })
              : showData()}
          </div>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Added {addProduct?.quantity} of {addProduct?.name} successfully!
          </Alert>
        </Snackbar>

        <Snackbar
          open={errorQuantityOpen}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert severity="error" onClose={handleClose} sx={{ width: "100%" }}>
            You cannot add more than product instock
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

export default Home;
