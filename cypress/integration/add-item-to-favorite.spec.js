describe("Add item to favorite", () => {
    const {
        buttons,
        constants,
        list
    } = Cypress

    beforeEach(() => {
        cy.intercept(constants.BASE_URL).as('getProducts');
        cy.visit("http://localhost:3000");
        cy.wait(['@getProducts'], {
            timeout: 10000
        });
    });

    it("Add first item to favorite", () => {
        cy.get(list.productList).children().its("length").should("be.gte", 0);
        cy.get(buttons.favoriteButton).first().click();
        cy.wait(100);
        cy.get(buttons.favoriteCount).contains(1);
    });

});
