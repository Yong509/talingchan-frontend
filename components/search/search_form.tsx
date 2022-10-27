import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SearchForm: React.FC = () => {
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
        onSubmit={handleSubmit((e) => {
          console.log(e);
          clearErrors;
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
                  textAlign: "center",
                },
              }}
              {...register("search_input", {
                required: "Can not be empty",
              })}
              onBlur={() => {
                console.log("on blur");
                clearErrors("search_input")
              }}
              helperText={errors.search_input?.message?.toString()}
              error={errors.search_input?.message ? true : false}
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
function useRef(arg0: null) {
  throw new Error("Function not implemented.");
}
