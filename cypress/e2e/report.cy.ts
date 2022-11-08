import { InvoiceModel } from "model/invoice_model";

describe("Report page", () => {
  context("Desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1280, 1080);
      cy.visit(Cypress.env("BASE_URL"));
      cy.get("#Report").click();
      cy.location("pathname", { timeout: 60000 }).should("include", "/report");
      cy.request(Cypress.env("API_BASE_URL") + "invoices").should(
        (response) => {
          expect(response.status).to.eq(200);
        }
      );
    });

    it("should render correctly", () => {
      cy.get(".text-body > .add-heading").should(
        "have.text",
        "Report Product Chart"
      );
      cy.get(".text-body > .add-subheading").should(
        "have.text",
        "total product sold report , november 2022"
      );
      cy.get("canvas");
      cy.get(".css-1duidt6-MuiGrid-root > :nth-child(4)").should(
        "have.text",
        "Add Product"
      );
      cy.get(".css-1duidt6-MuiGrid-root > :nth-child(8)").should(
        "have.text",
        "Add Stock"
      );

      cy.get(".MuiGrid-grid-xs-6 > .add-heading").should(
        "have.text",
        "Invoice"
      );
    });
  });
});
export {};
