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
		Shopify.get(
			`/admin/customers/search.json?query=${email}`,
			(err, data) => {
				if (err) reject(err);
				resolve(data);
			}
		);
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
 * @function getCustomerOrders
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

/**
 * @function updateCollectionPositions
 * @param {array} productsArray - Array containing the variant ids in the position order required
 * @param {number} collectionId - ID of the collection
 * @returns {object} data - object contains the data of the uodated collection
 */
const updateCollectionPositions = (productsArray, collectionId) => {
	return new Promise((resolve, reject) => {
		Shopify.put(
			`/admin/api/2019-04/smart_collections/${collectionId}/order.json`,
			productsArray,
			(err, data) => {
				if (err) reject(err);
				resolve(data);
			}
		);
	});
};

/**
 * @function getFulfilledShopifyOrder
 * @param {number} orderId - Object containing the order details to create in Shopify
 */
const getFulfilledShopifyOrder = orderId => {
	return new Promise((resolve, reject) => {
		Shopify.get(
			`/admin/api/2019-04/orders/${orderId}/fulfillments.json`,
			(err, data) => {
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
 * @function getCustomCollections
 * @returns {array} - returns an array of objects containing collections data
 */
const getCustomCollections = () => {
	return new Promise((resolve, reject) => {
		Shopify.get(`/admin/custom_collections.json`, (err, data) => {
			if (err) reject(err);
			resolve(data);
		});
	});
};
/**
 * @function createCollection
 * @param {object} collection - The data of the collection to be created in Shopify
 * @returns {object} - returns an object of the created collection data
 */
const createCollection = collection => {
	return new Promise((resolve, reject) => {
		Shopify.post(
			`/admin/custom_collections.json`,
			collection,
			(err, data) => {
				if (err) reject(err);
				resolve(data);
			}
		);
	});
};

/**
 * @function getProductCount - Find the number of products in the store
 * @returns {Promise} Promise object represents the total number of products in the store
 * */
const getProductCount = async () => {
	return new Promise((resolve, reject) => {
		Shopify.get("/admin/products/count.json", (err, data) => {
			if (err) reject(err);
			resolve(data.count);
		});
	});
};

module.exports = {
	getCustomerByEmail,
	createCollection,
	getCustomerOrders,
	createGiftCard,
	createOrder,
	getSmartCollections,
	addOrderNote,
	getFulfilledShopifyOrder,
	auth,
	updateCollectionPositions,
	getCustomCollections,
	getProductCount
};
