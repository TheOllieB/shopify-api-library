//README.md

# Shopify-api-library

A library of function's for interacting with Shopify. Based on the shopify-node-api package.

#### Installation

npm install shopify-api-library

#### Use

function auth - auth function for connecting to a Shopify store.
param {string} store - name of the store to authenticate to
param {string} apiKey - store API key
param {string} token - store access token

function createShopifyOrder - Create an order in Shopify.
param {object} ordersObj - Object containing the order details to create in Shopify

function addOrderNote - Add a note to a Shopify order.
param {string} orderNote - The note to add to the order
param {\*} orderId - ID of the order

function getCustomerByEmail - Retrieves a customer by their email
param {string} email - email of the customer to search for
returns {Promise} returns a Promise of the macthed customers data

function createGiftCard
param {object} giftCardObj - object containg gift card details
returns {Promise} returns a Promise representing the gift card response data

function getCustomerOrders - Retrieves a list of orders made by a customer
param {number} customerId - Id of the customer to search for orders
returns {object} data - returns customer orders data

function getSmartCollections - Retrieve a list of smart collections
param {number} pageNo - The smart collection page number
returns {array} - returns a list of smart collections
