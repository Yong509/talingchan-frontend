import { InvoiceModel } from "model/invoice_model";

describe("Receive page", () => {
  let preorderStatusLenght: number = 0;
  context("Desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1280, 1080);
      cy.visit(Cypress.env("BASE_URL"));
      cy.get("#Receive").click();
      cy.location("pathname", { timeout: 60000 }).should("include", "/receive");
      cy.request(Cypress.env("API_BASE_URL") + "invoices").should(
        (response) => {
          let data: Array<InvoiceModel> = response.body;
          expect(response.status).to.eq(200);
          data.map((item) => {
            if (item.IStatus == "Preorder") {
              preorderStatusLenght += 1;
            }
          });
        }
      );
    });

    it("should render correctly", () => {
      cy.get("#Receive-table");
    });

    it("Table row should be clickable", () => {
      cy.get("#table-cell-0").click();
      cy.location("pathname", { timeout: 60000 }).should(
        "include",
        "/invoice/"
      );
    });
  });
});
export {};
