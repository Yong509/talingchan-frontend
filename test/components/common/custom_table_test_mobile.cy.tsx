import CustomTable from "components/common/custom_table";
import { ProductPayload } from "model/product_model";

describe("Custom table test", () => {
  const testTableColumn = ["Test1", "Test2"];
  const data: Array<ProductPayload> = [
    {
      id: 1,
      name: "Asdghfsjghfdjkgjihjisdobkmfsl;kvoivnodmivpmdsiofvsdij",
      description: "B",
      price: 500,
      quantity: 3,
      picture: "pic",
      unit: "a",
    },
    {
      id: 30,
      name: "A",
      description: "B",
      price: 500,
      quantity: 3,
      picture: "",
      unit: "a",
    },
  ];

  context("Custom table without delete record", () => {
    beforeEach(() => {
      cy.viewport("iphone-xr");
      cy.mount(
        <CustomTable
          tableHead={testTableColumn}
          data={data.map((item) => {
            return [String(item.id), String(item.name)];
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
            return [String(item.id), String(item.name)];
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
