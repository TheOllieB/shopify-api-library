# Shopify-api-library

![alt text](https://img.shields.io/badge/shopify--api--library-300-green)

A library of function's for interacting with Shopify. Based on the shopify-node-api package.

## Installation

```sh
npm install shopify-api-library
```

#### Usage

```js
const shopifyApi = require("shopify-api-library");
```

##### function auth - auth function for connecting to a Shopify store.

param {string} store - name of the store to authenticate to

param {string} apiKey - store API key

param {string} token - store access token

##### function createShopifyOrder - Create an order in Shopify.

POST

param {object} ordersObj - Object containing the order details to create in Shopify

##### function addOrderNote - Add a note to a Shopify order.

PUT

param {string} orderNote - The note to add to the order

param {\*} orderId - ID of the order

##### function getCustomerByEmail - Retrieves a customer by their email

GET

param {string} email - email of the customer to search for

returns {Promise} returns a Promise of the macthed customers data

##### function createGiftCard - creates a gift card

POST

param {object} giftCardObj - object containg gift card details

returns {Promise} returns a Promise representing the gift card response data

##### function getCustomerOrders - Retrieves a list of orders made by a customer

GET

param {number} customerId - Id of the customer to search for orders

returns {object} data - returns customer orders data

##### function getSmartCollections - Retrieve a list of smart collections

GET

param {number} pageNo - The smart collection page number

returns {array} - returns a list of smart collections

##### function updateCollectionPositions - Updates the product positions of a collection

PUT
param {array} productsArray - Array containing the variant ids in the position order required
param {number} collectionId - ID of the collection
returns {object} data - object contains the data of the updated collection

##### function getFulfilledShopifyOrder - Gets a fulfilled Shopify order

GET

param {number} orderId - The ID of the order to check its fulfillment

returns {object} - returns the fulfilled order object

##### function getCustomCollections - Gets an array of custom collections

GET

returns {array} - returns an array of objects containing collections data

##### function createCollection - creates a collection in Shopify

POST

param {object} collection - The data of the collection to be created in Shopify

returns {object} - returns an object of the created collection data
