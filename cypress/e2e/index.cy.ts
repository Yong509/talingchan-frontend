import { ProductPayload } from "model/product_model";

describe("Index page", () => {
  let itemLength: number = 0;
  let product: Array<ProductPayload> = [];
  context("Desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1280, 1080);
      cy.request(Cypress.env("API_BASE_URL") + "products").should(
        (response) => {
          cy.log(JSON.stringify(response.body));
          expect(response.status).to.eq(200);
          itemLength = response.body.products.length;
          product = response.body.products;
        }
      );
    });
    it("should render correctly", () => {
      cy.visit(Cypress.env("BASE_URL"));
      cy.get(".MuiToolbar-root").find("#titleText");
      cy.get(".MuiToolbar-root").find("#Receive");
      cy.get(".MuiToolbar-root").find("#Cart");
      cy.get(".MuiToolbar-root").find("#Report");
      for (let index = 0; index < itemLength; index++) {
        cy.get(`#product-card-${product[index].PID} > .MuiPaper-root`);
      }
      cy.get("#serach-input").click();
      cy.get(".MuiBox-root > .MuiButtonBase-root").click();
    });

    it("should able to search product", () => {
      cy.get("#serach-input").type("1");
      cy.get(".MuiBox-root > .MuiButtonBase-root").click();
      cy.get("#product-card-1 > .MuiPaper-root");
      cy.get("#product-card-7 > .MuiPaper-root");
    });

    it("should able to search product not found any", () => {
      cy.get("#serach-input").type("1dfkjoghdfiughedfiug");
      cy.get(".MuiBox-root > .MuiButtonBase-root").click();
      cy.contains("Not found 11dfkjoghdfiughedfiug");
      cy.get("#serach-input").clear();
      cy.get(".MuiBox-root > .MuiButtonBase-root").click();
    });

    it("should able to select product", () => {
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
    });

    it("should able to rote to cart", () => {
      cy.get("#Cart").click();
      cy.location("pathname", { timeout: 60000 }).should("include", "/cart");
    });

    it("should able to rote to report", () => {
      cy.visit(Cypress.env("BASE_URL"));
      cy.get("#Report").click();
      cy.location("pathname", { timeout: 60000 }).should("include", "/report");
    });

    it("should able to rote to receive", () => {
      cy.visit(Cypress.env("BASE_URL"));
      cy.get("#Receive").click();
      cy.location("pathname", { timeout: 60000 }).should("include", "/receive");
    });
  });
});
export {};
