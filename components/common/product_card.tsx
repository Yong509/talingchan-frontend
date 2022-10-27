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
import { useState } from "react";

interface quantityProps {
  key: number;
  value: number;
}

const ProductCard: React.FC = () => {
  const [selectQuantity, setSelectQuantity] = useState<number>(0);
  const price: number = 250;
  const quntityArray: Array<quantityProps> = [
    { key: 1, value: 1 },
    { key: 2, value: 2 },
    { key: 3, value: 3 },
  ];

  const handleSelectQuantity = (e: SelectChangeEvent) => {
    setSelectQuantity(parseInt(e.target.value));
    console.log(parseInt(e.target.value));
  };
  return (
    <>
      {" "}
      <Box
        sx={{
          "& > :not(style)": {
            width: {
             xs: "375px",
              md: "335px",
             lg: "400px",
             xl: "450px"
            },
            height: 620,
            borderRadius: 5,
          },
        }}
      >
        <Card>
          <CardMedia
            component="img"
            image="https://drearth.com/wp-content/uploads/9NatWonder_4LB_708p-1.jpg"
            sx={{ height: "280px", objectFit: "contain" }}
          />
          <Divider sx={{ borderBottomWidth: 1 }} />
          <CardContent style={{ paddingTop: "10px" }}>
            <Typography
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
                fontSize: "1.2rem",
              }}
            >
              DR. EARTH ORGANIC AND NATURAL NATURAL WONDER® FRUIT TREE
              FERTILIZER 5-5-2
            </Typography>
            <Typography
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
              Natural Wonder® fertilizer is formulated to feed all fruit trees,
              berries, and fruiting vines in containers or any backyard soils.
              It can be used during the initial transplanting after digging the
              hole or anytime of the year to feed actively growing fruit trees
              and vines.
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                paddingTop: 1,
                color: "#4caf50",
                fontWeight: "750",
              }}
            >
              250 BAHT
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontWeight: "750",
              }}
            >
              In Stock: 3 Unit
            </Typography>
          </CardContent>
          <Divider sx={{ borderBottomWidth: 1 }} />
          <CardActions>
            <div className="grid grid-cols-2 grid-flow-col gap-x-5">
              <div className="px-1">
                <InputLabel sx={{ fontSize: { xs: "10px", md: "12px" } }}>
                  In Stock 3 Unit
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  autoWidth
                  displayEmpty
                  onChange={handleSelectQuantity}
                  sx={{
                    
                    minWidth: "190px",
                    height: 34,
                    fontSize: { xs: "10px", md: "12px" },
                  }}
                >
                  <MenuItem value={""}>
                    {" "}
                    <em>0</em>
                  </MenuItem>
                  {quntityArray.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.value}>
                        {item.value}
                      </MenuItem>
                    );
                  })}
                </Select>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    pt: 1,

                    fontWeight: "750",
                  }}
                >
                  TOTAL {price * selectQuantity} BAHT
                </Typography>
              </div>
              <div className="flex items-end place-content-end">
                <Button
                  variant="contained"
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "#4caf50",
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};

export default ProductCard;
