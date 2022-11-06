import { Padding } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { CartModel } from "model/cart_model";
import { ProductPayload } from "model/product_model";
import { useState } from "react";
import { FieldValue, useForm } from "react-hook-form";

interface AddStockCardProps {
  product: ProductPayload;
  onSelectProduct?: (product: CartModel) => void;
}

const AddStockCard: React.FC<AddStockCardProps> = (
  props: AddStockCardProps
) => {
  const [selectQuantity, setSelectQuantity] = useState<number>(0);
  const [selectProduct, setSelectProduct] = useState<Array<CartModel>>([]);
  const [errorQuantity, setErrorQuantity] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm();

  const onSubmit =(e:any)=>{
        console.log('on submit')
        console.log(e)
  }

  return (
    <>
      <Box
        sx={{
          "& > :not(style)": {
            width: {
              xs: "375px",
              md: "335px",
              lg: "400px",
              xl: "450px",
            },
            borderRadius: 5,
            padding: "20px",
          },
        }}
        component="form"
        onSubmit={handleSubmit((e) => {
            onSubmit(e);
        })}
      >
        <Card elevation={3}>
          <CardMedia
            id="product_img"
            component="img"
            image={props.product.PPicture}
            sx={{ height: "295px", objectFit: "contain" }}
          />
          <Divider id="pic_detail_divider" sx={{ borderBottomWidth: 1 }} />
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              paddingTop: "10px",
              height: "260px",
            }}
          >
            {/* <Typography
                id="product_id"
                gutterBottom
                component="div"
                sx={{
                  paddingTop: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                  fontWeight: "650",
                  fontSize: "0.82rem",
                }}
              >
                Product ID: {props.product.PID}
              </Typography> */}
            <Typography
              id="product_name"
              gutterBottom
              component="div"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                fontWeight: "650",
                fontSize: "1.2rem",
              }}
            >
              {props.product.PName} #{props.product.PID}
            </Typography>
            <Typography
              id="product_description"
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "10",
                WebkitBoxOrient: "vertical",
              }}
            >
              {props.product.PDescription}
            </Typography>
            <Divider sx={{ borderBottomWidth: 1 }} />
          </CardContent>
          <CardActions>
            <Grid container spacing={0} columns={5}>
              <Grid item xs={5}>
                <Typography
                  id="product_price"
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    fontWeight: "750",
                  }}
                >
                  Old Price : {props.product.PPrice} BAHT
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id=""
                  label="New Price"
                  size="small"
                  margin="normal"
                  autoComplete="newPrice"
                  {...register("newPrice", {
                    required: {
                      value: true,
                      message: "Please enter Quantity",
                    },
                    pattern: {
                      value: /^\d*(\d+.{0,1}\d{0,1}){0,1}\d$/i,
                      message: "Please enter integer or 2 decimal flaot",
                    },
                    min: {
                      value: 0.5,
                      message: "Value should be atleast 0.5",
                    },
                  })}
                  onBlur={() => {
                    clearErrors("newPrice");
                  }}
                  helperText={errors.newPrice?.message?.toString()}
                  error={errors.newPrice?.message ? true : false}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  id="change_button"
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "#000",
                    //   margin: 2,
                    //   paddingTop :2
                    marginLeft: 5,
                  }}
                  onClick={(e) => {
                    console.log("change clicked");
                    console.log(e);
                  }}
                >
                  Change
                </Button>
              </Grid>

              <Grid item xs={5}>
                <Divider sx={{ borderBottomWidth: 1, margin: 2 }} />
              </Grid>

              <Grid item xs={5}>
                <Typography
                  id="product_instock"
                  variant="body2"
                  color={props.product.PInStock != 0 ? "#4caf50" : "#ff5722"}
                  sx={{
                    fontWeight: "750",
                    padding: "5px",
                  }}
                >
                  {`In Stock: ${props.product.PInStock} ${props.product.PUnit}`}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Button
                  id="decrease_stock_button"
                  onClick={() => {
                    selectQuantity <= 0
                      ? setSelectQuantity(0)
                      : setSelectQuantity(selectQuantity - 1);
                  }}
                  style={{
                    maxWidth: "90px",
                    backgroundColor: "#EBEBEB",
                    height: 34,
                    borderRadius: 10,
                    color: "#000000",
                  }}
                  sx={{
                    boxShadow: 0,
                  }}
                  variant="contained"
                >
                  -
                </Button>
              </Grid>
              <Grid item xs={1}>
                <TextField
                  size="small"
                  value={selectQuantity}
                  variant="standard"
                  inputProps={{
                    style: {
                      textAlign: "center",
                    },
                  }}
                  sx={{
                    maxWidth: "90px",
                    height: 34,
                    borderRadius: 0,
                    fontSize: { xs: "13px", md: "15px" },
                    padding: "5px",
                  }}
                  error={errorQuantity}
                  id="input_stock"
                  onChange={(e) => {
                    if (
                      parseInt(e.target.value) < 0 ||
                      !e.target.value ||
                      e.target.value == undefined ||
                      isNaN(parseInt(e.target.value))
                    ) {
                      setSelectQuantity(0);
                    } else if (
                      parseInt(e.target.value) >= props.product.PInStock
                    ) {
                      setSelectQuantity(props.product.PInStock);
                    } else {
                      setSelectQuantity(parseInt(e.target.value));
                    }
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <Button
                  id="increase-button"
                  onClick={() => {
                    selectQuantity >= props.product.PInStock
                      ? setSelectQuantity(props.product.PInStock)
                      : setSelectQuantity(selectQuantity + 1);
                  }}
                  style={{
                    width: 20,
                    backgroundColor: "#EBEBEB",
                    height: 34,
                    borderRadius: 10,
                    color: "#000000",
                  }}
                  sx={{
                    boxShadow: 0,
                  }}
                  variant="contained"
                >
                  +
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button
                  id="submit_button"
                  type="submit"
                  variant="contained"
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "#4caf50",
                    marginLeft : '10px'
                  }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};

export default AddStockCard;
