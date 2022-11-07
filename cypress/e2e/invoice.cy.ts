describe("Invoice page", () => {
  const pumpInvoicePage = () => {
    cy.visit(Cypress.env("BASE_URL"));
    for (let index = 0; index < 5; index++) {
      cy.get(
        "#product-card-1 > .MuiPaper-root > .MuiCardActions-root > .grid > #product_total > .flex > #increase-button"
      ).click();
    }
    cy.get(
      "#product-card-1 > .MuiPaper-root > .MuiCardActions-root > .grid > .items-end > #submit_button"
    ).click();
    cy.get(".MuiSnackbar-root > .MuiPaper-root").should(
      "have.text",
      "Added 5 of DR. SOIL successfully!"
    );
    cy.get("#Cart").click();
    cy.location("pathname", { timeout: 60000 }).should("include", "/cart");
    cy.get("#serach_customer").click().type("0123456789");
    cy.get("#search_employee").click().type("1");
    cy.get(".w-full > .MuiButtonBase-root").click();
    cy.get(".MuiTableCell-alignLeft").should("have.text", "1");
    cy.get("#table-row > :nth-child(2)").should("have.text", "DR. SOIL");
    cy.get("#table-row > :nth-child(3)").should("have.text", "5");
    cy.get("#table-row > :nth-child(4)").should("have.text", "1500");
    cy.get("#table-row > :nth-child(5)").should("have.text", "7500");
    cy.get("#total_price").should("have.text", "7500");
    cy.wait(2000);
    cy.get("#purchase-btn").click();
    cy.get("#confirm-button").click();
  };

  context("Desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1280, 1080);
      cy.visit(Cypress.env("BASE_URL") + "cart");
      pumpInvoicePage();
    });

    it("should render correctly", () => {
      cy.get("#cart_title").should("have.text", "Invoice");
      cy.get("#invoice-table");
      cy.get(".MuiTableCell-alignLeft").should("have.text", 1);
      cy.get("#table-row > :nth-child(2)").should("have.text", "DR. SOIL");
      cy.get("#table-row > :nth-child(3)").should("have.text", 5);
      cy.get("#table-row > :nth-child(4)").should("have.text", 1500);
      cy.get("#table-row > :nth-child(5)").should("have.text", 7500);
      cy.get("#total_price").should("have.text", 7500);
      cy.get("#order-btn").should("have.text", "Purchase");
    });

    it("should able to purchase order", () => {
      cy.get("#order-btn").click();
      cy.get("#alert-dialog-title").contains("Confirme Purchase");
      cy.get("#alert-dialog-title").contains("Confirme Purchase");
      cy.get("#confirm-button").should("have.text", "purchase");
      cy.get("#cancel-button").should("have.text", "cancel");
      cy.get("#confirm-button").click();

      cy.intercept("https://talingchan-api-yong509.koyeb.app/invoices/94").as(
        "token"
      );
      cy.wait("@token").then((intercept) => {
        expect(intercept.response?.statusCode).to.eq(200);
      });
    });
  });
});
export {};
