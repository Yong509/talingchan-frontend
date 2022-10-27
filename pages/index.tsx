import type { NextPage } from "next";
import CustomAppBar from "components/common/custom_app_bar";
import SearchForm from "components/search/search_form";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import ProductCard from "components/common/product_card";
import { ProductPayload } from "model/product_model";

const Home: NextPage = () => {
  const productArray: Array<ProductPayload> = [
    {
      id: 1,
      name: "DR. EARTH ORGANIC AND NATURAL NATURAL WONDER® FRUIT TREE FERTILIZER 5-5-2",
      description: `Natural Wonder® fertilizer is formulated to feed all fruit trees, berries, 
        and fruiting vines in containers or any backyard soils. It can be used during the initial 
        transplanting after digging the hole or anytime of the year to feed actively growing fruit trees and vines.`,
      price: 200,
      quantity: 3,
      picture:
        "https://drearth.com/wp-content/uploads/9NatWonder_4LB_708p-1.jpg",
    },
    {
      id: 2,
      name: `DR. EARTH
      ORGANIC & NATURAL
      POT OF GOLD®
      ALL PURPOSE POTTING SOIL`,
      description: `Pot of Gold® All Purpose Potting Soil is recommended for use in all outdoor and indoor potting and container applications. Pot of Gold® is great for many projects in the garden. In addition to container planting, Pot of Gold® can be used as a soil amendment for in-ground planting: trees, shrubs, bare root planting, flowers and vegetables; mulching; and seed cover. Great for indoor garden production.`,
      price: 300,
      quantity: 5,
      picture:
        "https://drearth.com/wp-content/uploads/PotofGoldSoil_4QT_818-2.jpg",
    },
    {
      id: 3,
      name: `DR. EARTH
      ORGANIC & NATURAL
      POT OF GOLD®
      ALL PURPOSE LIQUID PLANT FOOD 1-1-1`,
      description: `Pot of Gold is our 100% sustainable all purpose plant food. Made from the highest quality human grade ingredients. Turning yesterdays produce, fish and meat into the highest quality fertilizer on the market.`,
      price: 180,
      quantity: 15,
      picture:
        "https://drearth.com/wp-content/uploads/PotOfGoldBottles-1000x1000-1.jpg",
    },
  ];

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
            {productArray.map((item, index) => {
              return (
                <ProductCard
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  quantity={item.quantity}
                  picture={item.picture}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
