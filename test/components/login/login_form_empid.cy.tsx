import LoginForm from "components/login/login_form";


describe("Search form test for desktop resolution", () => {
    context("desktop resolution", () => {
      beforeEach(() => {
        cy.viewport(1280, 1080);
      });
      it("Should render correctly", () => {
        cy.mount(<LoginForm />);
      });
  
      it("Should typeable and clearable", () => {
        cy.mount(<LoginForm />);
        cy.get("#EmpID").type("test EmpID");
        cy.get("#EmpID").should("have.value","test EmpID");
        cy.get("#EmpID").clear();
      });
  
      it('Submit login button should clickable', () => {
          cy.mount(<LoginForm />);
          cy.get("#EmpID").type("test test EmpID");
          cy.get("#EmpID").should("have.value","test test EmpID");
          cy.get('.MuiButtonBase-root').click();
      });
  
      it('Validate cannot be null', () => {
          cy.mount(<LoginForm />);
          cy.get('.MuiButtonBase-root').click();
          cy.contains("Can not be empty");
      });
  
      it('Error message should not appear when on blur', () => {
          cy.mount(<LoginForm />);
          cy.get("#EmpID").should('have.value', '');
          cy.get('.MuiButtonBase-root').click();
          cy.contains("Can not be empty");
          cy.get("#EmpID").focus().blur();
          
      });
    });
  });
  