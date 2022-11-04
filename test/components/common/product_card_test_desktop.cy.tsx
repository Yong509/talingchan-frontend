import ProductCard from "components/common/product_card";
import { ProductPayload } from "model/product_model";

describe("Product card test", () => {
  const mockProductPayload: ProductPayload = {
    PID: 1,
    PName:
      "DR. EARTH ORGANIC AND NATURAL NATURAL WONDER® FRUIT TREE FERTILIZER 5-5-2",
    PDescription: `Natural Wonder® fertilizer is formulated to feed all fruit trees, berries, 
      and fruiting vines in containers or any backyard soils. It can be used during the initial 
      transplanting after digging the hole or anytime of the year to feed actively growing fruit trees and vines.`,
    PPrice: 200,
    PInStock: 100,
    UID: 1,
    PUnit: "KG",
    PPicture:
      "https://drearth.com/wp-content/uploads/9NatWonder_4LB_708p-1.jpg",
  };

  const mockUnavailableProductPayload: ProductPayload = {
    PID: 1,
    PName:
      "DR. EARTH ORGANIC AND NATURAL NATURAL WONDER® FRUIT TREE FERTILIZER 5-5-2",
    PDescription: `Natural Wonder® fertilizer is formulated to feed all fruit trees, berries, 
      and fruiting vines in containers or any backyard soils. It can be used during the initial 
      transplanting after digging the hole or anytime of the year to feed actively growing fruit trees and vines.`,
    PPrice: 200,
    PInStock: 0,
    UID: 1,
    PUnit: "KG",
    PPicture:
      "https://drearth.com/wp-content/uploads/9NatWonder_4LB_708p-1.jpg",
  };

  context("Product card available Desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1280, 1080);
      cy.mount(<ProductCard product={mockProductPayload} />);
    });

    it("should render correctly", () => {
      cy.get(".MuiPaper-root").find("#product_img");
      cy.get(".MuiPaper-root").find("#product_id");
      cy.get(".MuiPaper-root").find("#product_name");
      cy.get(".MuiPaper-root").find("#product_description");
      cy.get(".MuiPaper-root").find("#product_price");
      cy.get(".MuiPaper-root").find("#product_instock");
      cy.get(".MuiPaper-root").find("#product_total");
      cy.get(".MuiPaper-root").find("#submit_button");
      cy.get(".MuiPaper-root").find("#input-quantity")
    });

    it("input quantity should type able only digit", () => {
      cy.get("#input-quantity")
        .click()
        .type("Hello world")
        .should("have.value", 0);
    });

    it("input quantity should type able", () => {
      cy.get("#input-quantity").click().type("1").should("have.value", 1);
    });

    it("input quantity value should not accept negative", () => {
      cy.get("#input-quantity").click().type("-1").should("have.value", 1);
    });

    it("input quantity value should not accept dot", () => {
      cy.get("#input-quantity").click().type("1.2").should("have.value", 12);
    });

    it("input quantity value should not more than product instock", () => {
      cy.get("#input-quantity")
        .click()
        .type("123")
        .should("have.value", mockProductPayload.PInStock);
    });

    it("increase button should increase value", () => {
      cy.get("#increase-button").click();
      cy.get("#input-quantity").should("have.value", 1);
    });

    it("increase button should not increase more than product instock", () => {
      for (let n = 0; n < mockProductPayload.PInStock + 20; n++) {
        cy.get("#increase-button").click();
      }

      cy.get("#input-quantity").should("have.value", 100);
    });

    it("decrease button should decrease value", () => {
      cy.get("#input-quantity").click().type("10");
      cy.get("#decrease-button").click();
      cy.get("#input-quantity").should("have.value", 9);
    });

    it("decrease button should not decrease to negative value", () => {
      cy.get("#input-quantity").click().type("0");
      cy.get("#decrease-button").click();
      cy.get("#input-quantity").should("have.value", 0);
    });

    it("total product should calculate correctly", () => {
      cy.get("#input-quantity").click().type("10");
      cy.get('#total_price').should("have.text", 'TOTAL 2000 BAHT')
    });

    it("button should able to click", () => {
      cy.get("#submit_button").click();
    });

    context("product card un available Desktop resolution", () => {
      beforeEach(() => {
        cy.viewport(1280, 1080);
        cy.mount(<ProductCard product={mockUnavailableProductPayload} />);
      });

      it("should render correctly", () => {
        cy.get(".MuiPaper-root").find("#product_img");
        cy.get(".MuiPaper-root").find("#product_id");
        cy.get(".MuiPaper-root").find("#product_name");
        cy.get(".MuiPaper-root").find("#product_description");
        cy.get(".MuiPaper-root").find("#product_price");
        cy.get(".MuiPaper-root").find("#product_instock");
        cy.get(".MuiPaper-root").find("#product_total");
        cy.get(".MuiPaper-root").find("#submit_button").should("not.exist");
        cy.get(".MuiPaper-root").find("#input-quantity")
      });

      it("decrease-button should be disable", () => {
        cy.get("#decrease-button").should('be.disabled');
      });

      it("increase-button should be disable", () => {
        cy.get("#increase-button").should('be.disabled');
      });

      it("input-quantity should be disable", () => {
        cy.get("#input-quantity").should('be.disabled');
      });

      it("should show unavailable text", () => {
        cy.get(".MuiPaper-root")
          .find("#product_instock")
          .should("have.text", "unavailable");
        cy.contains("unavailable");
      });
    });
  });
});
