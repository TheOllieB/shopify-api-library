"use strict";

const shopifyAPI = require("shopify-node-api");

let Shopify;

/**
 * @function auth
 * @param {string} store - name of the store to authenticate to
 * @param {string} apiKey - store API key
 * @param {string} token - store access token
 */
const auth = (store, apiKey, token) => {
	Shopify = new shopifyAPI({
		shop: store,
		shopify_api_key: apiKey,
		access_token: token,
		verbose: false
	});
};

/**
 * @function createShopifyOrder
 * @param {object} ordersObj - Object containing the order details to create in Shopify
 */
const createOrder = ordersObj => {
	return new Promise((resolve, reject) => {
		Shopify.post(
			`/admin/api/2019-04/orders.json`,
			ordersObj,
			async (err, data) => {
				if (err) {
					console.log(err);
					resolve(err);
				} else {
					resolve(data);
				}
			}
		);
	});
};

/**
 * @function addOrderNote
 * @param {string} orderNote - The note to add to the order
 * @param {*} orderId - ID of the order
 */
const addOrderNote = (orderNote, orderId) => {
	return new Promise((resolve, reject) => {
		Shopify.put(
			`/admin/api/2019-04/orders/${orderId}.json`,
			orderNote,
			async (err, data) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					console.log(data);
					resolve(data);
				}
			}
		);
	});
};

/**
 * @function getCustomerByEmail
 * @param {string} email - email of the customer to search for
 * @returns {Promise} returns a Promise of the macthed customers data
 */
const getCustomerByEmail = email => {
	return new Promise((resolve, reject) => {
		Shopify.get(`/admin/customers/search.json?query=${email}`, (err, data) => {
			if (err) reject(err);
			resolve(data);
		});
	});
};

/**
 * @function createGiftCard
 * @param {object} giftCardObj - object containg gift card details
 * @returns {Promise} returns a Promise representing the gift card response data
 */
const createGiftCard = giftCardObj => {
	return new Promise((resolve, reject) => {
		Shopify.post(
			`/admin/api/2019-04/gift_cards.json`,
			giftCardObj,
			async (err, data) => {
				if (err) {
					console.log(err);
					await createGiftCard(giftCardObj);
				} else {
					console.log(data);
					resolve(data);
				}
			}
		);
	});
};

/**
 * @function getOrders
 * @param {number} customerId - Id of the customer to search for orders
 * @returns {object} data - returns customer orders data
 */
const getCustomerOrders = customerId => {
	return new Promise((resolve, reject) => {
		Shopify.get(
			`/admin/api/2019-07/customers/${customerId}/orders.json?limit=250&status=any`,
			(err, data) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					//console.log(data);
					resolve(data);
				}
			}
		);
	});
};

/**
 * @function getSmartCollections
 * @param {number} pageNo - The smart collection page number
 * @returns {array} - returns a list of smart collections
 */
const getSmartCollections = pageNo => {
	return new Promise((resolve, reject) => {
		Shopify.get(
			`/admin/api/2019-04/smart_collections.json?page=${i}`,
			(err, data) => {
				if (err) {
					console.log(err);
					resolve(err);
				} else {
					resolve(data.smart_collections);
				}
			}
		);
	});
};

module.exports = {
	getCustomerByEmail,
	getCustomerOrders,
	createGiftCard,
	createOrder,
	getSmartCollections,
	addOrderNote,
	auth
};
