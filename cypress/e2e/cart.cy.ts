describe("Cart page", () => {
  context("Desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1280, 1080);
      cy.visit(Cypress.env("BASE_URL") + "cart");
    });
    it("should render correctly", () => {
      cy.get(".MuiToolbar-root").find("#titleText");
      cy.get(".MuiToolbar-root").find("#Receive");
      cy.get(".MuiToolbar-root").find("#Cart");
      cy.get(".MuiToolbar-root").find("#Report");
      cy.get("#serach_customer").should(
        "have.attr",
        "placeholder",
        "Customer Phone Number"
      );
      cy.get("#search_employee").should(
        "have.attr",
        "placeholder",
        "Employee ID"
      );
      cy.get("#outlined-weight-helper-text > a").should(
        "have.text",
        "Add New Customer"
      );
      cy.get(".w-full > .MuiButtonBase-root").click();
      cy.get("#employee-name").should("have.text", "Employee : ");
      cy.get("#custom-table");
    });

    it("should able to add product into cart", () => {
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
      cy.get(".MuiTableCell-alignLeft").should("have.text", "1");
      cy.get("#table-row > :nth-child(2)").should("have.text", "DR. SOIL");
      cy.get("#table-row > :nth-child(3)").should("have.text", "5");
      cy.get("#table-row > :nth-child(4)").should("have.text", "1500");
      cy.get("#table-row > :nth-child(5)").should("have.text", "7500");
      cy.get("#total_price").should("have.text", "7500");
    });

    it("should able to delete product in cart", () => {
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
      cy.get(".MuiTableCell-alignLeft").should("have.text", "1");
      cy.get("#table-row > :nth-child(2)").should("have.text", "DR. SOIL");
      cy.get("#table-row > :nth-child(3)").should("have.text", "5");
      cy.get("#table-row > :nth-child(4)").should("have.text", "1500");
      cy.get("#table-row > :nth-child(5)").should("have.text", "7500");
      cy.get("#total_price").should("have.text", "7500");
      cy.get("#trash-icon").click();
      cy.get("#alert-dialog-title").should(
        "have.text",
        "Remove DR. SOIL out of cart."
      );
      cy.get("#alert-dialog-description").should(
        "have.text",
        "Are you sure you want to remove DR. SOIL out of your cart?"
      );

      cy.get("#confirm-button").click();

      cy.get(".MuiTableCell-alignLeft").should("not.exist");
      cy.get("#table-row > :nth-child(2)").should("not.exist");
      cy.get("#table-row > :nth-child(3)").should("not.exist");
      cy.get("#table-row > :nth-child(4)").should("not.exist");
      cy.get("#table-row > :nth-child(5)").should("not.exist");
      cy.get("#total_price").should("have.text", "0");
    });

    it("should able to place order", () => {
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
    });
  });
});
export {};
