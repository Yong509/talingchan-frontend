import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import Box from "@mui/material/Box";
import { height } from "@mui/system";
import { ProductPayload } from "model/product_model";
import { useState } from "react";
import { render } from "react-dom";
import { useForm } from "react-hook-form";
import { CartModel } from "model/cart_model";

interface productCardProps {
  product: ProductPayload;
  onSelectProduct?: (product: CartModel) => void;
}

const ProductCard: React.FC<productCardProps> = (props: productCardProps) => {
  const [selectQuantity, setSelectQuantity] = useState<number>(0);
  const [selectProduct, setSelectProduct] = useState<Array<CartModel>>([]);
  const [errorSelect, setErrorSelect] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm();

  return (
    <>
      <form
        id="product_card"
        onSubmit={handleSubmit((e) => {
          const tempSelectProduct: CartModel[] = selectProduct;
          if (selectQuantity == 0) {
            setErrorSelect(true);
          } else {
            props.onSelectProduct?.({
              id: props.product.PID,
              name: props.product.PName,
              quantity: selectQuantity,
              pricePerUnit: props.product.PPrice,
              total: selectQuantity * props.product.PPrice,
            });
          }
        })}
      >
        <Box
          sx={{
            "& > :not(style)": {
              width: {
                xs: "375px",
                md: "335px",
                lg: "400px",
                xl: "450px",
              },
              height: 660,
              borderRadius: 5,
            },
          }}
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
              </Typography>
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
                {props.product.PName}
              </Typography>
              <Typography
                id="product_description"
                variant="body2"
                color="text.secondary"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "4",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {props.product.PDescription}
              </Typography>
              <Typography
                id="product_price"
                variant="body1"
                color="text.secondary"
                sx={{
                  paddingTop: 1,
                  color: "#4caf50",
                  fontWeight: "750",
                }}
              >
                {props.product.PPrice} BAHT
              </Typography>
              <Typography
                id="product_instock"
                variant="body2"
                color={props.product.PQuantity != 0 ? "#4caf50" : "#ff5722"}
                sx={{
                  fontWeight: "750",
                }}
              >
                {props.product.PQuantity != 0
                  ? `In Stock: ${props.product.PQuantity} ${props.product.PUnit}`
                  : `unavailable`}
              </Typography>
            </CardContent>
            <Divider sx={{ borderBottomWidth: 1 }} />
            <CardActions>
              <div className="grid grid-cols-3 gap-x-5">
                <div className="px-1 col-span-2" id="product_total">
                  <InputLabel sx={{ fontSize: { xs: "10px", md: "12px" } }}>
                    {props.product.PQuantity != 0
                      ? `In Stock: ${props.product.PQuantity} ${props.product.PUnit}`
                      : `unavailable`}
                  </InputLabel>
                  <Select
                    disabled={props.product.PQuantity != 0 ? false : true}
                    id="select_quantity"
                    autoWidth
                    displayEmpty
                    defaultValue="deselect"
                    sx={{
                      minWidth: "190px",
                      height: 34,
                      fontSize: { xs: "10px", md: "12px" },
                    }}
                    error={errorSelect}
                    {...register("select_quantity", {
                      validate: (value) => {
                        if (value + 1 == 0) {
                          setErrorSelect(true);
                          return "Error";
                        } else {
                          setErrorSelect(false);
                        }
                      },
                    })}
                    onChange={(e) => {
                      if (e.target.value == "deselect") {
                        setSelectQuantity(0);
                      } else {
                        setSelectQuantity(parseInt(e.target.value + 1));
                      }
                    }}
                  >
                    <MenuItem key={"deselect_menuitem"} value={"deselect"}>
                      <em>None</em>
                    </MenuItem>
                    {Array.from(Array(props.product.PQuantity).keys()).map(
                      (item, index) => {
                        return (
                          <MenuItem key={`${index}_menuitem`} value={index}>
                            {item + 1} {props.product.PUnit}
                          </MenuItem>
                        );
                      }
                    )}
                  </Select>
                  <Typography
                    id="total_price"
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      pt: 1,
                      fontWeight: "750",
                    }}
                  >
                    TOTAL {props.product.PPrice * selectQuantity} BAHT
                  </Typography>
                </div>
                {props.product.PQuantity != 0 ? (
                  <div className="flex items-end place-content-end">
                    <Button
                      id="submit_button"
                      type="submit"
                      variant="contained"
                      sx={{
                        minWidth: {
                          xs: "120px",
                          md: "110px",
                          lg: "130px",
                        },
                      }}
                      style={{
                        borderRadius: "10px",
                        backgroundColor: "#4caf50",
                      }}
                    >
                      Add
                    </Button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </CardActions>
          </Card>
        </Box>
      </form>
    </>
  );
};

export default ProductCard;
