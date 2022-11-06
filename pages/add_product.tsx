import CustomAppBar from "components/common/custom_app_bar";
import type { NextPage } from "next";
import AddCustomerForm from "components/customer/add_customer_form";
import { NextResponse } from "next/server";
import { useRouter } from "next/router";
import AddProductForm from "components/product/add_product_form";

const AddProduct: NextPage = (props) => {
  const router = useRouter();

  return (
    <>
      <div className="bg-white">
        <div className="w-full">
          <CustomAppBar
            id={"addCustomerBar"}
            button={[
              {
                buttonTitle: "Receive",
                onClick: (e) => {
                  e.preventDefault();
                  router.push("/receive/");
                },
              },
              {
                buttonTitle: "Cart",
                onClick: (e) => {
                  e.preventDefault();
                  router.push("/cart/");
                },
              },
              {
                buttonTitle: "Report",
                onClick: (e) => {
                  e.preventDefault();
                  router.push("/report/");
                },
              },
            ]}
          />
          <div className="pt-44"></div>
          <AddProductForm />
        </div>
      </div>
    </>
  );
};

export default AddProduct;
