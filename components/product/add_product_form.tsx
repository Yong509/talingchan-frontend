import { CompressOutlined } from "@mui/icons-material";
import {
  Button,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AddProductForm: React.FC = () => {
    
  const dumbUnit = ["Kg", "Bag"];

  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);

  const [selectUnit, setSelectUnit] = useState<number>(0);
  const [errorSelect, setErrorSelect] = useState<boolean>(false);

  const changePictureHandler = (e: any) => {
    const file = e.target.files[0];
    console.log(file);
    setFile(file);
  };

  useEffect(() => {
    let fileReader: any,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  const [value, setValue] = useState<string>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm();

  // const product : ProductModel {
  //     id : 0,
  //     name : watch('productName'),
  //     description : watch(),

  // }

  return (
    <>
      <div className="add-body">
        <Grid container spacing={2} columns={22}>
          <Grid item xs={6} />
          <Grid item xs={10}>
            <h1 className="add-heading">Add Product</h1>
            <h1 className="add-subheading">create new lot of product</h1>

            <Box
              component="form"
              onSubmit={handleSubmit((e) => {})}
              sx={{ mt: 1 }}
            >
              {fileDataURL ? (
                <p className="img-preview-wrapper">
                  {<img src={fileDataURL} alt="preview" />}
                </p>
              ) : (
                <p className="img-preview-wrapper">
                  {
                    <img
                      src={
                        "https://codyhouse.co/demo/squeezebox-portfolio-template/img/img.png"
                      }
                      alt="dumb"
                    />
                  }
                </p>
              )}

              <TextField
                id="productName"
                label="Product Name"
                margin="normal"
                style={{
                  marginRight: "2em",
                }}
                autoComplete="productName"
                {...register("productName", {
                  required: {
                    value: true,
                    message: "Please enter Product Name",
                  },
                  pattern: {
                    value: /\D/i,
                    message: "Please enter Product Name",
                  },
                })}
                onBlur={() => {
                  clearErrors("productName");
                }}
                helperText={errors.productName?.message?.toString()}
                error={errors.productName?.message ? true : false}
              />
              <Button
                variant="contained"
                component="label"
                sx={{ mt: 3, mb: 2 }}
                style={{
                  backgroundColor: "black",
                }}
              >
                Upload Pic
                <input
                  id="productPicture"
                  accept="image/*"
                  type="file"
                  hidden
                  onChange={(e) => changePictureHandler(e)}
                />
              </Button>
              <br />

              <TextField
                id="productDescription"
                label="Description"
                margin="normal"
                multiline
                fullWidth
                autoComplete="productDescription"
                {...register("productDescription", {
                  required: "Please enter Product Description",
                })}
                onBlur={() => {
                  clearErrors("productDescription");
                }}
                helperText={errors.productDescription?.message?.toString()}
                error={errors.productDescription?.message ? true : false}
              />
              <Grid container spacing={2}>
                <Grid item>
                  <TextField
                    id="productQuantity"
                    label="Quantity"
                    margin="normal"
                    autoComplete="productQuantity"
                    {...register("productQuantity", {
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
                      clearErrors("productQuantity");
                    }}
                    helperText={errors.productQuantity?.message?.toString()}
                    error={errors.productQuantity?.message ? true : false}
                  />
                </Grid>

                <Grid item>
                  <InputLabel id="productUnitLabel">Unit</InputLabel>
                  <Select
                    labelId="productUnit"
                    id="productUnit"
                    label="Unit"
                    displayEmpty
                    autoWidth
                    defaultValue="deselect"
                    size="small"
                    required
                    error={errorSelect}
                    {...register("productUnit", {
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
                        setSelectUnit(0);
                      } else {
                        // setSelectUnit(parseInt(e.target.value + 1));
                      }
                    }}
                  >
                    <MenuItem key={"deselect_menuitem"} value={"deselect"}>
                      <em>None</em>
                    </MenuItem>
                    {dumbUnit?.map((unit) => {
                      console.log("option : " + unit);
                      return (
                        <MenuItem key={unit} value={unit}>
                          {unit}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>
              </Grid>

              <TextField
                id="productPrice"
                label="Price (Baht)"
                margin="normal"
                autoComplete="productPrice"
                {...register("productPrice", {
                  required: {
                    value: true,
                    message: "Please enter Price",
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
                  clearErrors("productPrice");
                }}
                helperText={errors.productPrice?.message?.toString()}
                error={errors.productPrice?.message ? true : false}
              />
              <br />
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{
                  backgroundColor: "black",
                }}
              >
                Submit
              </Button>
            </Box>
          </Grid>
          <Grid item xs={6} />
        </Grid>
      </div>
    </>
  );
};

export default AddProductForm;
