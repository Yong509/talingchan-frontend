import { FilePresent, Padding } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import CustomDialog from "components/common/custom_dialog";
import { CartModel } from "model/cart_model";
import { ProductPayload } from "model/product_model";
import { useState } from "react";
import { FieldValue, useForm } from "react-hook-form";

interface AddStockCardProps {
  product: ProductPayload;
  onSelectProduct?: (product: CartModel) => void;
}

const updatePrice = async(id:number,price:number) =>{
  await axios
  .put(process.env.API_BASE_URL + "products/"+ id,{'PPrice':price} )
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

const updateStock = async(id:number,quantity:number) =>{
  await axios
  .put(process.env.API_BASE_URL + "products/"+ id,{'PInStock':quantity} )
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

const AddStockCard: React.FC<AddStockCardProps> = (
  props: AddStockCardProps
) => {
  const [oldPrice, setOldPrice] = useState<number>(props.product.PPrice);
  const [oldQuantity ,setOldQuantity] = useState<number>(props.product.PInStock);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [dialogText, setDialogText] = useState<string>("");
  const [onPrice,setOnPrice] = useState<boolean>(false);
  const [onQuantity,setOnQuantity] = useState<boolean>(false);
  const [quantity,setQuantity] = useState<number>(0)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm();

  const onSubmit = (e: any) => {
    console.log("on submit");
    console.log(e);
  };

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
                  Old Price : {oldPrice.toFixed(2)} BAHT
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
                      value: 0,
                      message: "Price should be atleast 0",
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
                    marginTop: 18,
                    marginBottom: 1,
                    marginRight: 1,
                    marginLeft: 6,
                    alignContent: "center",
                    alignItems: "center",
                  }}
                  onClick={(e) => {
                    console.log("Change Click");
                    const newPrice: number = Number(watch("newPrice"));

                    if (!Number.isNaN(newPrice) && (newPrice * 100) % 1 === 0) {
                      console.log("new price : " + newPrice);

                      //dialog
                      setDialogText(
                        `Confirm change from ${oldPrice.toFixed(
                          2
                        )} baht to ${newPrice.toFixed(2)} baht ?`
                      );
                      setOnPrice(true);
                      setOpenConfirmDialog(true);
                    }
                  }}
                >
                  Change
                </Button>
              </Grid>

              {/* Quantity */}

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
                  {`In Stock: ${oldQuantity} ${props.product.PUnit}`}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Button
                  id="decrease_stock_button"
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
                  onClick={() => {
                      quantity! <= 0 ? setQuantity(0) : setQuantity(quantity! - 1);
                  }}
                >
                  -
                </Button>
              </Grid>
              <Grid item xs={1}>
                <TextField
                  id="input_stock"
                  size="small"
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
                  //register

                  value={quantity}
                  onChange={(e) => {

                    if ( Number.isNaN(parseInt(e.target.value))){
                      setQuantity(0);
                    }
                    if (
                      parseInt(e.target.value) < 0 ||
                      !e.target.value ||
                      e.target.value == undefined ||
                      isNaN(parseInt(e.target.value))
                    ) {
                      setQuantity(0);
                    } else  {
                      setQuantity(parseInt(e.target.value));
                    }
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <Button
                  id="increase-button"
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
                  onClick={() => {
                      setQuantity(quantity! + 1);
                  }}
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
                    marginLeft: "10px",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Add Clicked");

                    //dialog
                    setDialogText(
                      `Confirm add ${quantity} ${props.product.PUnit}`
                    );
                    setOnQuantity(true);
                    setOpenConfirmDialog(true);
                  }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
        <CustomDialog
          title={{
            text: `Confirm?`,
            color: "black",
          }}
          content={dialogText}
          open={openConfirmDialog}
          cancelButton={{ text: "cancel", fontColor: "black" }}
          confirmButton={{
            text: "confirm",
            color: "black",
            fontColor: "white",
          }}
          onConfirm={() => {

            if (onPrice) {

              const newPrice:number = Number(watch("newPrice"));
              //api
              updatePrice(props.product.PID,newPrice);
              setOldPrice(newPrice);
              setOnPrice(false);
              reset({newPrice:""})
            }

            if (onQuantity) {
              //api
              const newQuantity = oldQuantity + quantity;
              updateStock(props.product.PID,newQuantity);
              setOldQuantity(newQuantity);
              setOnQuantity(false);
              setQuantity(0);
            }
            
            setOpenConfirmDialog(false);
          }}
          onCancel={() => {
            setOpenConfirmDialog(false);
            setOnPrice(false);
            setOnQuantity(false);
          }}
        />
      </Box>
    </>
  );
};

export default AddStockCard;
