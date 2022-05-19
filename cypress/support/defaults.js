import * as Constant from '../../src/constants';

Cypress.buttons = {
    openAddNewProduct: '[data-test=btn-open-new-product]',
    addNewProduct: '[data-test=btn-add-new-product]',
    favoriteButton: '[data-test=favoriteButton]',
    favoriteCount: '[data-test=favoriteCount]'
}

Cypress.inputs = {
    productTitleInput: 'input[name="product-title"]',
    productPriceInput: 'input[name="product-price"]',
    productDescInput: 'textarea[name="product-price"]',
}

Cypress.labels = {
    productTotalCount: '[data-test=prod-total-count]'
}

Cypress.list = {
    productList: '[class=productList]'
}

Cypress.constants = {
    BASE_URL: Constant.API_PRODUCTS_LINK
}