import type { NextPage } from "next";
import CustomAppBar from "components/common/custom_app_bar";


const Home: NextPage = () => {
  return (
   <>
     <CustomAppBar title="Talingchan Fertilizer"  button={[{ buttonTitle: "Test1", onClick: () => {} },{ buttonTitle: "Test2", onClick: () => {} },{ buttonTitle: "Test3", onClick: () => {} }]} id={"HomeAppBar"}/>
   </>
  );
};

export default Home;
