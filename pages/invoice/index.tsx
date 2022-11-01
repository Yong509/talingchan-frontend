import { Typography } from "@mui/material";
import CustomAppBar from "components/common/custom_app_bar";
import CustomTable from "components/common/custom_table";
import router from "next/router";

const InvoicePage = () => {
  return (
    <>
      <div className="bg-white">
        <div className="w-full">
          <CustomAppBar
            title="Talingchan Fertilizer"
            button={[
              { buttonTitle: "Receive", onClick: () => {} },
              {
                buttonTitle: "Cart",
                onClick: (e) => {
                  e.preventDefault();
                  router.push("/cart/");
                },
              },
              { buttonTitle: "Login", onClick: () => {} },
            ]}
            id={"HomeAppBar"}
          />
        </div>
        <div className="pt-44">
          {" "}
          <Typography
            id="cart_title"
            gutterBottom
            component="div"
            align="center"
            sx={{
              fontWeight: "650",
              fontSize: "2.5rem",
              color: "black",
            }}
          >
            Invoice
          </Typography>
        </div>
      </div>
      <div className="pt-24">
        <div className="pt-24 md:px-16 px-4">
          <CustomTable
            total={false}
            tableHead={[
              { title: "Product ID", style: "" },
              { title: "Product", style: "w-80" },
              { title: "Quantity", style: "" },
              { title: "Price per Unit", style: "" },
              { title: "Total", style: "" },
            ]}
            data={[["AAAAAA", "AAAAAA", "AAAAAA", "AAAAAA", "AAAAAA"]]}
          />
        </div>
      </div>
    </>
  );
};

export default InvoicePage;
