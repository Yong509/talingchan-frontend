import Typography from "@mui/material/Typography/Typography";
import axios from "axios";
import CustomAppBar from "components/common/custom_app_bar";
import CustomTable from "components/common/custom_table";
import { CartModel } from "model/cart_model";
import { CustomerModel } from "model/customer";
import { Employee } from "model/employee_model";
import { InvoiceDetailModel } from "model/invoice_detail_model";
import { InvoiceModel } from "model/invoice_model";
import { ProductPayload } from "model/product_model";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

interface receiveModel {
  IID: number;
  IStatus: string;
  IDate: string;
  CNAME: string;
  ENAME: string;
  Total: number;
}

interface purchaseCartModel {
  invoiceID: number;
  invoiceStatus: string;
  cart: Array<CartModel>;
}

interface productCart {
  products: Array<ProductPayload>;
}

interface pageProps {
  receive: Array<receiveModel>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let invoice: Array<InvoiceModel> = [
    { IID: 0, IStatus: "", IDate: "", CID: 0, EmpID: 0 },
  ];
  let receive: Array<receiveModel> = [
    {
      IID: 0,
      IStatus: "",
      IDate: "",
      CNAME: "",
      ENAME: "",
      Total: 0,
    },
  ];

  await axios
    .get(process.env.API_BASE_URL + "invoices")
    .then(function (response) {
      invoice = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  invoice.map((item) => {
    let date = new Date(item.IDate);
    receive.push({
      IID: item.IID,
      IStatus: item.IStatus,
      IDate: date.toISOString().substring(0, 10),
      CNAME: "",
      ENAME: "",
      Total: 0,
    });
  });

  for (let index = 0; index < invoice.length; index++) {
    let tempInvoiceDetail: Array<InvoiceDetailModel> = [
      {
        INVID: 0,
        INVQty: 0,
        INVPrice: "",
        PID: 0,
        IID: 0,
      },
    ];

    await axios
      .get(
        process.env.API_BASE_URL +
          "invoiceDetails/invoice/" +
          invoice[index].IID
      )
      .then(function (response) {
        tempInvoiceDetail = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    tempInvoiceDetail.map((item) => {
      receive[index + 1].Total += parseFloat(item.INVPrice);
    });
  }

  for (let index = 0; index < invoice.length; index++) {
    let customer: Array<CustomerModel> = [];

    await axios
      .get(process.env.API_BASE_URL + "customers")
      .then(function (response) {
        customer = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    for (let j = 0; j < customer.length; j++) {
      if (invoice[index].CID == customer[j].CID) {
        receive[index + 1].CNAME = customer[j].CName;
      }
    }
  }

  for (let index = 0; index < invoice.length; index++) {
    let employee: Array<Employee> = [];

    await axios
      .get(process.env.API_BASE_URL + "employees")
      .then(function (response) {
        employee = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    for (let j = 0; j < employee.length; j++) {
      if (invoice[index].EmpID == employee[j].EmpID) {
        receive[index + 1].ENAME = employee[j].EmpName;
      }
    }
  }

  receive.shift();

  return {
    props: {
      receive,
    },
  };
};

const Receive = (props: pageProps) => {
  const router = useRouter();
  let purchaseCart: purchaseCartModel = {
    invoiceID: 0,
    invoiceStatus: "",
    cart: [],
  };

  let data = props.receive.filter((item) => item.IStatus === "Preorder");

  const handleClickReceive = async (invoiceID: number, status: string) => {
    purchaseCart = { invoiceID: invoiceID, invoiceStatus: status, cart: [] };
    let invoiceDetail: Array<InvoiceDetailModel> = [
      {
        INVID: 0,
        INVQty: 0,
        INVPrice: "",
        PID: 0,
        IID: 0,
      },
    ];
    let cart: Array<CartModel> = [
      {
        id: 0,
        name: "",
        quantity: 0,
        pricePerUnit: 0,
        total: 0,
      },
    ];
    let productCart: productCart = { products: [] };
    await axios
      .get(process.env.API_BASE_URL + "invoiceDetails/invoice/" + invoiceID)
      .then(function (response) {
        invoiceDetail = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    cart.shift();
    invoiceDetail.map((item, index) => {
      cart.push({
        id: item.PID,
        name: "",
        quantity: item.INVQty,
        pricePerUnit: 0,
        total: parseFloat(item.INVPrice),
      });
    });

    await axios
      .get(process.env.API_BASE_URL + "products/")
      .then(function (response) {
        productCart = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    cart.map((cart) => {
      productCart.products.map((item) => {
        if (cart.id == item.PID) {
          cart.name = item.PName;
          cart.pricePerUnit = item.PPrice;
        }
      });
    });

    purchaseCart.cart = cart;
    router.push("invoice/" + JSON.stringify(purchaseCart));
  };

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

        <div className="pt-44 pb-8">
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
            Receive
          </Typography>
          <div className="pt-24">
            <div className=" md:px-24 px-4">
              <CustomTable
                tableHead={[
                  { title: "Invoice no", style: "" },
                  { title: "Status", style: "" },
                  { title: "Date", style: "" },
                  { title: "Customer", style: "" },
                  { title: "Employee", style: "" },
                ]}
                data={data.map((item) => {
                  return [
                    String(item.IID),
                    String(item.IStatus),
                    item.IDate,
                    item.CNAME,
                    item.ENAME,
                  ];
                })}
                deleteAble={true}
                onDelete={() => {
                  console.log("delete");
                }}
                onOpen={(id, status) => {
                  handleClickReceive(id, status!);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Receive;
