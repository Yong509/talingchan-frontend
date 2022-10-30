import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SearchForm: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>();
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
          setSearchValue(e.search_input);
        })}
      >
        <div className="w-full flex justify-center">
          <Box style={{ position: "absolute" }}>
            <TextField
              id="serach-input"
              placeholder="Product"
              variant="outlined"
              InputProps={{
                sx: {
                  height: { xs: "33px", md: "55px" },
                  fontSize: { xs: "12px", md: "16px" },
                  width: { xs: "120px", md: "250px" },
                },
              }}
              {...register("search_input", {
                required: "Can not be empty",
              })}
              onBlur={() => {
                clearErrors("search_input");
              }}
              helperText={errors.search_input?.message?.toString()}
              error={errors.search_input?.message ? true : false}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "110px",
                height: {
                  xs: "33px",
                  md: "55px",
                },
                fontSize: {
                  xs: "12px",
                  md: "16px",
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
