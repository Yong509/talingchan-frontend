import type { GetServerSideProps, NextPage } from "next";
import CustomAppBar from "components/common/custom_app_bar";
import SearchForm from "components/search/search_form";
import TextField from "@mui/material/TextField";
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import ProductCard from "components/common/product_card";
import { ProductPayload } from "model/product_model";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { LotPayload } from "model/lot_model";
import { UnitPayload } from "model/unit_model";
import { useRouter } from "next/router";
import { CartModel } from "model/cart_model";
import { getCookie, setCookie } from "cookies-next";

interface pageProps {
  data?: Array<ProductPayload>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let data: Array<ProductPayload> = [];
  let lotProduct: Array<LotPayload> = [];
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
    .get(process.env.API_BASE_URL + "lots")
    .then(function (response) {
      lotProduct = response.data;
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
    for (let j = 0; j < lotProduct.length; j++) {
      if (data[index].id == lotProduct[j].productId) {
        data[index].quantity = lotProduct[j].quantity;
      }
    }
  }

  for (let index = 0; index < lotProduct.length; index++) {
    for (let j = 0; j < unitProduct.length; j++) {
      if (lotProduct[index].unitId == unitProduct[j].id) {
        data[index].unit = unitProduct[j].detail;
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
  const [addProduct, setAddProduct] = useState<CartModel>();

  setCookie("selectProductCookies", JSON.stringify(selectProduct));
  const showData = () => {
    const data = props.data?.map((item, index) => {
      if (
        item.name.toUpperCase().includes(searchProduct.toUpperCase()) ||
        searchProduct == item.id.toString()
      ) {
        return (
          <React.Fragment key={item.id}>
            <ProductCard
              product={{
                id: item.id,
                name: item.name,
                description: item.description,
                price: item.price,
                quantity: item.quantity,
                unit: item.unit,
                picture: item.picture,
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
          Not found {searchProduct}
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
              ? props.data?.map((item, index) => {
                  return (
                    <React.Fragment key={item.id}>
                      <ProductCard
                        product={{
                          id: item.id,
                          name: item.name,
                          description: item.description,
                          price: item.price,
                          quantity: item.quantity,
                          unit: item.unit,
                          picture: item.picture,
                        }}
                        onSelectProduct={(product) => {
                          handleClick(product);
                          setSelectProduct((searchProduct) => [
                            ...searchProduct,
                            product,
                          ]);
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
          open={errorOpen}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert severity="error" onClose={handleClose} sx={{ width: "100%" }}>
            Not found
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default Home;
