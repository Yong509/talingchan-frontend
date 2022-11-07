import { CompressOutlined, Route } from "@mui/icons-material";
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
import axios from "axios";
import { UnitPayload } from "model/unit_model";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface ProductPayload {
  PName: string;
  PDescription: string;
  PPrice: number;
  PPicture: string;
  PInStock: number;
  UID: number;
}

const AddProductForm: React.FC = () => {
  // console.log(props.unit);

  const [file, setFile] = useState<any>();
  const [fileDataURL, setFileDataURL] = useState(null);
  const [uploadingStatus, setUploadingStatus] = useState<any>();
  const [uploadedFile, setUploadedFile] = useState<any>();
  const [selectUnit, setSelectUnit] = useState<number>(0);
  const [errorSelect, setErrorSelect] = useState<boolean>(false);
  const BUCKET_URL = "https://tc-storage-v1.s3.ap-southeast-1.amazonaws.com/";
  const changePictureHandler = (e: any) => {
    const file = e.target.files[0];
    console.log(file);
    setFile(e.target.files[0]);
  };

  const [unit, setUnit] = useState<UnitPayload[]>([]);

  useEffect(() => {
    let data: UnitPayload[] = [];
    const getUnit = async () => {
      await axios
        .get(process.env.API_BASE_URL + "units")
        .then(function (response) {
          for (let index = 0; index < response.data.length; index++) {
            data.push({
              UID: response.data[index].UID,
              UDetail: response.data[index].UDetail,
            });
          }
          setUnit(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getUnit();
  }, []);

  const dumbUnit: string[] = [];
  for (let index = 0; index < unit.length; index++) {
    dumbUnit.push(unit[index].UDetail);
  }

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

  const uploadFile = async () => {
    setUploadingStatus("Uploading the file to AWS S3");

    let { data } = await axios.post("/api/s3/uploadFile", {
      name: file?.name,
      type: file?.type,
    });

    console.log(data);

    const url = data.url;
    let { data: newData } = await axios.put(url, file, {
      headers: {
        "Content-type": file.type,
        "Access-Control-Allow-Origin": "*",
      },
    });

    setUploadedFile(BUCKET_URL + file.name);
    setFile(null);
  };

  const [uid, setUID] = useState<number>(0);

  const createProduct = async () => {
    for (let index = 0; index < unit.length; index++) {
      if (unit[index].UDetail === watch("productUnit")) {
        setUID(unit[index].UID);
      }
    }
    const payload: ProductPayload = {
      PName: watch("productName"),
      PDescription: watch("productDescription"),
      PPrice: parseFloat(watch("productPrice")),
      PPicture: BUCKET_URL + file?.name,
      PInStock: parseFloat(watch("productQuantity")),
      UID: uid,
    };
    console.log(payload);

    await axios
      .post(process.env.API_BASE_URL + "products/", payload)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const router = useRouter();

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
              onSubmit={handleSubmit((e) => {
                uploadFile();
                //api
                createProduct();
                router.push("/");
              })}
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
