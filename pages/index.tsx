import type { NextPage } from "next";
import CustomAppBar from "components/common/custom_app_bar";
import SearchForm from "components/search/search_form";
import TextField from '@mui/material/TextField';
import { Box, Button } from "@mui/material";

const Home: NextPage = () => {
  return (
    <>
    <div className="bg-background">
      <div className="w-full">
      <CustomAppBar
        title="Talingchan Fertilizer"
        button={[
          { buttonTitle: "Receive", onClick: () => {} },
          { buttonTitle: "Cart", onClick: () => {} },
          { buttonTitle: "Login", onClick: () => {} },
        ]}
        id={"HomeAppBar"}
      />
      </div>
      <div className="pt-44">
        <SearchForm />
      </div>
      </div>
    </>
  );
};

export default Home;
