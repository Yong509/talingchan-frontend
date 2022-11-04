
import AddCustomerForm from "components/customer/add_customer_form";

describe("Search form test for desktop resolution", () => {
    context("desktop resolution", () => {
      beforeEach(() => {
        cy.viewport(1280, 1080);
      });
      it("Should render correctly", () => {
        cy.mount(<AddCustomerForm/>);
      });
  
      it("Should typeable and clearable", () => {
        cy.mount(<AddCustomerForm/>);
        cy.get("#customerName").type("test password");
        cy.get("#customerName").should("have.value","test password");
        cy.get("#customerName").clear();
      });
  
      it('Submit login button should clickable', () => {
          cy.mount(<AddCustomerForm/>);
          cy.get("#customerName").type("test test password");
          cy.get("#customerName").should("have.value","test test password");
          cy.get('.MuiButtonBase-root').click();
      });
  
      it('Validate cannot be null', () => {
          cy.mount(<AddCustomerForm/>);
          cy.get('.MuiButtonBase-root').click();
          cy.contains("Can not be empty");
      });

      it('Validate cannot be digit', () => {
        cy.mount(<AddCustomerForm/>);
        cy.get("#customerName").type("1234");
        cy.get('.MuiButtonBase-root').click();
        cy.contains("Please enter name - lastname");
    });
  
      it('Error message should not appear when on blur', () => {
          cy.mount(<AddCustomerForm/>);
          cy.get("#customerName").should('have.value', '');
          cy.get('.MuiButtonBase-root').click();
          cy.contains("Can not be empty");
          cy.get("#customerName").focus().blur();
          
      });
    });
  });
  