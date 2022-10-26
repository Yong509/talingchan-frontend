import CustomAppBar from "components/common/custom_app_bar";

describe("Custom App bar test mobile resolution", () => {
  context("mobile resolution", () => {
    beforeEach(() => {
      cy.viewport("iphone-xr");
    });
    it("Should have default title", () => {
      cy.mount(<CustomAppBar id="HomeAppBar" />);
      cy.get("[id = 'HomeAppBar']").should(
        "have.text",
        "Talingchan Fertilizer"
      );
    });

    it("Should have title props", () => {
      cy.mount(<CustomAppBar id="HomeAppBar" title="TestTitle" />);
      cy.get("[id = 'HomeAppBar']").should("have.text", "TestTitle");
    });

    it("Should have menu props", () => {
      cy.mount(
        <CustomAppBar
          id="HomeAppBar"
          button={[
            { buttonTitle: "Test1", onClick: () => {} },
            { buttonTitle: "Test2", onClick: () => {} },
            { buttonTitle: "Test3", onClick: () => {} },
          ]}
        />
      );
      cy.get("[id = 'HomeAppBar']").should(
        "have.text",
        "Talingchan FertilizerTest1Test2Test3"
      );
    });

    it("Menu and submenu should clickable", () => {
      cy.mount(
        <CustomAppBar
          id="HomeAppBar"
          button={[
            { buttonTitle: "Test1", onClick: () => {console.log('click 1')} },
            { buttonTitle: "Test2", onClick: () => {} },
            { buttonTitle: "Test3", onClick: () => {} },
          ]}
        />
      );
      cy.get('[data-testid="MenuIcon"]').click();
      cy.get('.MuiList-root > :nth-child(1) > .MuiButtonBase-root').click();  
    });


  });
});
