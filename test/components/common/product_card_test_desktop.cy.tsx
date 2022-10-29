import ProductCard from "components/common/product_card";
import { ProductPayload } from "model/product_model";

describe("Product card test", () => {
  const mockProductPayload: ProductPayload = {
    id: 1,
    name: "DR. EARTH ORGANIC AND NATURAL NATURAL WONDER® FRUIT TREE FERTILIZER 5-5-2",
    description: `Natural Wonder® fertilizer is formulated to feed all fruit trees, berries, 
      and fruiting vines in containers or any backyard soils. It can be used during the initial 
      transplanting after digging the hole or anytime of the year to feed actively growing fruit trees and vines.`,
    price: 200,
    quantity: 3,
    unit: "KG",
    picture: "https://drearth.com/wp-content/uploads/9NatWonder_4LB_708p-1.jpg",
  };

  context("Desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1280, 1080);
      cy.mount(
        <ProductCard
          id={mockProductPayload.id}
          name={mockProductPayload.name}
          description={mockProductPayload.description}
          price={mockProductPayload.price}
          picture={mockProductPayload.picture}
          quantity={mockProductPayload.quantity}
          unit={mockProductPayload.unit}
        />
      );
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
    });

    it("select quantity should render correctly", () => {
      cy.get("#select_quantity").click();
      cy.contains("0");
      cy.contains("1 KG");
      cy.contains("2 KG");
      cy.contains("3 KG");
    });

    it("should able to select item from dropdown and total price should correct", () => {
      cy.get("#select_quantity").click();
      cy.get('[data-value="1"]').click();
      cy.contains("2 KG");
      cy.contains("TOTAL 400 BAHT");
    });

    it("button should able to click", () => {
      cy.get("#submit_button").click();
    });
  });
});
