import CustomDialog from "components/common/custom_dialog";
import { useState } from "react";

describe("Custom Dialog test", () => {
  let openDialog = true;
  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport("iphone-xr");
      cy.mount(
        <CustomDialog
          title={{
            text: `Remove Test out of cart.`,
            color: "#F26161",
          }}
          content={`Are you sure you want to remove Test out of your cart?`}
          open={openDialog}
          cancelButton={{ text: "cancel", fontColor: "black" }}
          confirmButton={{
            text: "confirm",
            color: "#F26161",
            fontColor: "white",
          }}
          onCancel={() => {}}
        />
      );
    });

    it("should render correctly", () => {
      cy.get("#alert-dialog-title").should(
        "have.text",
        "Remove Test out of cart."
      );
      cy.get("#alert-dialog-description").should(
        "have.text",
        "Are you sure you want to remove Test out of your cart?"
      );
      cy.get("#cancel-button")
        .should("have.text", "cancel")
        .should("have.css", "background-color")
        .and("eq", "rgba(0, 0, 0, 0)");
      cy.get("#confirm-button")
        .should("have.text", "confirm")
        .should("have.css", "background-color")
        .and("eq", "rgb(242, 97, 97)");
    });

    it("should click able", () => {
      cy.get("#cancel-button")
        .invoke("attr", "aria-disabled")
        .then((ariaDisabled) => {
          cy.log(`ariaDisabled is ${ariaDisabled}`);
          if (ariaDisabled !== "true") {
            cy.log("Button exists and is disabled!");
            return;
          }
          cy.log("Button exists and is enabled!");
          cy.get("#Button").click();
        });

      cy.get("#confirm-button")
        .invoke("attr", "aria-disabled")
        .then((ariaDisabled) => {
          cy.log(`ariaDisabled is ${ariaDisabled}`);
          if (ariaDisabled !== "true") {
            cy.log("Button exists and is disabled!");
            return;
          }
          cy.log("Button exists and is enabled!");
          cy.get("#Button").click();
        });
    });
  });
});
