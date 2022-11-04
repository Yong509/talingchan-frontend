import CustomTable from "components/common/custom_table";
import { ProductPayload } from "model/product_model";

describe("Custom table test", () => {
  const testTableColumn = [
    { title: "Test1", style: "" },
    { title: "Test2", style: "" },
  ];
  const data: Array<ProductPayload> = [
    {
      PID: 1,
      PName: "Asdghfsjghfdjkgjihjisdobkmfsl;kvoivnodmivpmdsiofvsdij",
      PDescription: "B",
      PPrice: 500,
      PInStock: 3,
      PPicture: "pic",
      PUnit: "a",
      UID: 1,
    },
    {
      PID: 30,
      PName: "A",
      PDescription: "B",
      PPrice: 500,
      PInStock: 3,
      PPicture: "",
      PUnit: "a",
      UID: 1,
    },
  ];

  context("Custom table without delete record", () => {
    beforeEach(() => {
      cy.viewport("iphone-xr");
      cy.mount(
        <CustomTable
          tableHead={testTableColumn}
          data={data.map((item) => {
            return [String(item.PID), String(item.PName)];
          })}
        />
      );
    });

    it("should render correctly", () => {
      cy.get(".css-1ygcj2i-MuiTableCell-root").should("have.text", "Test1");
      cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(2)").should(
        "have.text",
        "Test2"
      );

      cy.get('[style="background: white;"] > .MuiTableCell-alignLeft').should(
        "have.text",
        "1"
      );
      cy.get(
        '[style="background: rgb(247, 247, 247);"] > .MuiTableCell-alignLeft'
      ).should("have.text", "30");
      cy.get('[style="background: white;"] > :nth-child(2)').should(
        "have.text",
        "Asdghfsjghfdjkgjihjisdobkmfsl;kvoivnodmivpmdsiofvsdij"
      );
      cy.get(
        '[style="background: rgb(247, 247, 247);"] > :nth-child(2)'
      ).should("have.text", "A");
    });

    it("record should clickable", () => {
      cy.get('[style="background: white;"] > .MuiTableCell-alignLeft').click();
    });
  });

  context("Custom table with delete record", () => {
    beforeEach(() => {
      cy.viewport("iphone-xr");
      cy.mount(
        <CustomTable
          tableHead={testTableColumn}
          deleteAble={true}
          data={data.map((item) => {
            return [String(item.PID), String(item.PName)];
          })}
        />
      );
    });

    it("should render correctly", () => {
      cy.get(".css-1ygcj2i-MuiTableCell-root").should("have.text", "Test1");
      cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(2)").should(
        "have.text",
        "Test2"
      );

      cy.get('[style="background: white;"] > .MuiTableCell-alignLeft').should(
        "have.text",
        "1"
      );
      cy.get(
        '[style="background: rgb(247, 247, 247);"] > .MuiTableCell-alignLeft'
      ).should("have.text", "30");
      cy.get('[style="background: white;"] > :nth-child(2)').should(
        "have.text",
        "Asdghfsjghfdjkgjihjisdobkmfsl;kvoivnodmivpmdsiofvsdij"
      );
      cy.get(
        '[style="background: rgb(247, 247, 247);"] > :nth-child(2)'
      ).should("have.text", "A");
      cy.get("[id='trash-icon']").should("have.length", 2);
    });
  });
});
