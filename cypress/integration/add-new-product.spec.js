/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("Add a new product", () => {
    const {
        buttons,
        inputs,
        constants,
        labels
    } = Cypress

    const productTitle = 'New Product';
    const productPrice = 123;
    const productDesc = 'New Descriptin';

    beforeEach(() => {
        cy.intercept(constants.BASE_URL).as('getProducts');
        cy.visit("http://localhost:3000");
        cy.wait(['@getProducts'], {
            timeout: 10000
        });
    });

    it("Add new product without title", () => {
        cy.get(buttons.openAddNewProduct).click();
        cy.wait(100);
        cy.get(buttons.addNewProduct).click();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Your product needs a title')
        })
    });

    it("Add new product without price", () => {
        cy.get(buttons.openAddNewProduct).click();
        cy.wait(100);
        cy.get(inputs.productTitleInput).type('Product title');
        cy.get(buttons.addNewProduct).click();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Your product needs price')
        })
    });

    it("Add a new product", () => {
        cy.get(buttons.openAddNewProduct).click();
        cy.wait(100);
        cy.get(inputs.productTitleInput).type(productTitle);
        cy.get(inputs.productPriceInput).type(productPrice);
        cy.get(inputs.productDescInput).type(productDesc);
        cy.get(buttons.addNewProduct).click();
        cy.wait(100);
        cy.get(labels.productTotalCount).contains(21);
    });

});
