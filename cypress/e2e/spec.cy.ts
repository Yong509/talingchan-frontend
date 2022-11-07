describe("Index page", () => {
  context("Desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1280, 1080);
    });
    it("should render correctly", () => {
      cy.visit(Cypress.env("BASE_URL"));
      cy.get(".MuiToolbar-root").find("#titleText");
      cy.get(".MuiToolbar-root").find("#Receive");
      cy.get(".MuiToolbar-root").find("#Cart");
      cy.get(".MuiToolbar-root").find("#Report");
      cy.get("#product_img").should("have.length", 4);
    });
  });
});
export {};
