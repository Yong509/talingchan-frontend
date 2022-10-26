import type { NextPage } from "next";
import CustomAppBar from "components/common/custom_app_bar";


const Home: NextPage = () => {
  return (
   <>
     <CustomAppBar title="Talingchan Fertilizer" menu={['Recieve', 'Cart', 'Login']} id={"HomeAppBar"}/>
   </>
  );
};

export default Home;
