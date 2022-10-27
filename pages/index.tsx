import type { NextPage } from "next";
import CustomAppBar from "components/common/custom_app_bar";
import SearchForm from "components/search/search_form";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import ProductCard from "components/common/product_card";

const Home: NextPage = () => {
  return (
    <>
      <div className="bg-white">
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
        <div className="pt-24">
        <div className="grid grid-cols-1 gap-y-12 gap-x-auto h-full justify-items-center py-10  xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        
       <ProductCard />
       <ProductCard />
       <ProductCard />
       <ProductCard />
       <ProductCard />
       <ProductCard />
       <ProductCard />
       <ProductCard />
       <ProductCard />
       <ProductCard />
       <ProductCard />
       <ProductCard />
       <ProductCard />
       <ProductCard />
       <ProductCard />
       <ProductCard />
       <ProductCard />
       <ProductCard />
       <ProductCard />
       <ProductCard />
       <ProductCard />
       <ProductCard />
        </div>
        </div>
      </div>
    </>
  );
};

export default Home;
