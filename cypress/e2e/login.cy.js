describe("Login spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should display login page correctly", () => {
    cy.contains("One Thought at a Time").should("be.visible");

    cy.get('input[placeholder="Email"]').should("be.visible");
    cy.get('input[placeholder="Password"]').should("be.visible");
    cy.get("button")
      .contains(/^Login$/)
      .should("be.visible");
  });

  it("should display alert when email is empty", () => {
    cy.get('input[placeholder="Password"]').type("password123");

    cy.window().then((win) => {
      cy.stub(win, "alert").as("alert");
    });

    cy.get('[data-test="login-button"]').click();

    cy.get("@alert").should(
      "have.been.calledWith",
      '"Email" is not allowed to be empty'
    );
  });

  it("should display alert when password is empty", () => {
    cy.get('input[placeholder="Email"]').type("gus123@gmail.com");

    cy.window().then((win) => {
      cy.stub(win, "alert").as("alert");
    });

    cy.get('[data-test="login-button"]').click();

    cy.get("@alert").should(
      "have.been.calledWith",
      '"Password" is not allowed to be empty'
    );
  });

  it("should login successfully with correct credentials", () => {
    cy.get('input[placeholder="Email"]').type("zack123@gmail.com");
    cy.get('input[placeholder="Password"]').type("password");

    cy.get("button")
      .contains(/^Login$/)
      .click();

    cy.url().should("include", "/");

    cy.contains("Popular Thread").should("be.visible");
  });
});
