import CustomAppBar from "components/common/custom_app_bar";

describe("Custom app bar test", () => {
  context("Desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1280, 60);
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
        <CustomAppBar id="HomeAppBar" menu={["Test1", "Test2", "Test3"]} />
      );
      cy.get("[id = 'HomeAppBar']").should(
        "have.text",
        "Talingchan FertilizerTest1Test2Test3"
      );
    });

    it("Menu should clickable", () => {
      cy.mount(
        <CustomAppBar id="HomeAppBar" menu={["Test1", "Test2", "Test3"]} />
      );
      cy.get("[id = 'Test1']").click();
      cy.get("[id = 'Test2']").click();
      cy.get("[id = 'Test3']").click();
    });
  });

});
