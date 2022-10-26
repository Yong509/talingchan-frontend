import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SearchForm: React.FC = () => {
  const [errorsInput, setErrorInput] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors 
  } = useForm();

  console.log(errors.search_input?.message?.toString());

  const styles = {
    textField: {
      fontSize: 16,
      "@media (min-width: 576px)": {
        fontSize: 20,
      },
      "@media (min-width: 768px)": {
        fontSize: 22,
      },
    },
  };

  return (
    <>
      <form
        onSubmit={handleSubmit((e) => {
          console.log(e);
            clearErrors
        })}
      >
        <div className="w-full flex justify-center bg-black">
          <Box style={{ position: "absolute" }}>
            <TextField
              id="serach-input"
              placeholder="Product"
              variant="outlined"
          
              InputProps={{
                sx: {
                  height: { xs: "33px", md: "55px" },
                  fontSize: { xs: "18px", md: "14px" },
                  width: { xs: "120px", md: "184px" },
                  textAlign: "center"
                },
              }}
              {...register("search_input", {
                required: "Can not be empty",
              })}
              helperText={errors.search_input?.message?.toString()}
            
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                height: {
                  xs: "33px",
                  md: "55px",
                },
              }}
              style={{
                marginLeft: "12px",
                borderRadius: "10px",
                backgroundColor: "black",
              }}
            >
              Search
            </Button>
          </Box>
        </div>
      </form>
    </>
  );
};

export default SearchForm;
