import SearchForm from "components/search/search_form";

describe("Search form test for desktop resolution", () => {
  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1280, 1080);
    });
    it("Should render correctly", () => {
      cy.mount(<SearchForm />);
    });

    it("Should typeable and clearable", () => {
      cy.mount(<SearchForm />);
      cy.get("#serach-input").type("test search product");
      cy.get("#serach-input").should("have.value","test search product");
      cy.get("#serach-input").clear();
    });

    it('Submit search button should clickable', () => {
        cy.mount(<SearchForm />);
        cy.get("#serach-input").type("test search product");
        cy.get("#serach-input").should("have.value","test search product");
        cy.get('.MuiButtonBase-root').click();
    });

    it('Validate cannot be null', () => {
        cy.mount(<SearchForm />);
        cy.get('.MuiButtonBase-root').click();
        cy.contains("Can not be empty");
    });

    it('Error message should not appear when on blur', () => {
        cy.mount(<SearchForm />);
        cy.get("#serach-input").should('have.value', '');
        cy.get('.MuiButtonBase-root').click();
        cy.contains("Can not be empty");
        cy.get("#serach-input").focus().blur();
        
    });
  });
});
