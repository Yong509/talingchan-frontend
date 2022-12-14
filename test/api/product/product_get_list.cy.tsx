import { ProductPayload } from "model/product_model";

describe("Product get list", () => {
  let productList: Array<ProductPayload>;
  it("fetches Product list - GET", () => {
    cy.request(Cypress.env("API_BASE_URL") + "products").should((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      expect(response.body.products[0]).to.have.all.keys(
        "PID",
        "PName",
        "PPrice",
        "PDescription",
        "PPicture",
        "PInStock",
        "UID"
      );
      expect(response.body.products.length).to.eq(4);
    });
  });
});
