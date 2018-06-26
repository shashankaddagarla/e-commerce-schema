/* app.js
 * ------
 * author: Shashank Addagarla
 * date: 06-24-18
 */

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var database = mongoose.connection;
database.on('error', console.error.bind(console, 'failed to connect'));

/* models a department catalog */
var catalogSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId
});

/* models categories in each department. one to many relationship,
each catalog has multiple categories, reference-based approach for speed of access */
var categorySchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	catalogId: mongoose.Schema.Types.ObjectId,
	name: String,
	image: String,
	is_root: Boolean,
	child_categories: [Schema.Types.ObjectId],
	parent_categories: [Schema.Types.ObjectId],
	seo: {
		title: String,
		keywords: String,
		desc: String
	}
});

/* models products being sold. many to many relationship,
each product can be in multiple categories. not embedded to preserve scalability. furthermore, we don't want category modification to change the products. */
var productSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	categoryIDs: [Schema.Types.ObjectId],
	name: String,
	index: true,
	desc: String,
	price: { /* embedded for speed of access */
		list_price: Schema.Types.Decimal128,
		sale_price: Schema.Types.Decimal128,
		used_prices: [Schema.Types.Decimal128]
	},
	images: { /* likewise */
		thumbnail_image: String,
		image: String,
		actual_image: String, /* to display when clicked on */
		alternate_images: [String]
	},
	exists_coupon: Boolean,
	seller: String,
	productID: String, /* UPC or ISBN or whatever */
	manufacturer: String,
	product_spec: [String],
	product_meta: [String], /* any other details such as #of pages, etc... used as a placeholder for schema-less design */
	shipping_info: {
		weight: Schema.Types.Decimal128,
		dimensions: {
			height: Schema.Types.Decimal128,
			width: Schema.Types.Decimal128,
			length: Schema.Types.Decimal128
		}
	},
	date: {type: Date},
	avg_review: Schema.Types.Decimal128,
	seo: {
		title: String,
		keywords: String,
		desc: String
	}
});

/* models review system, one to many relationship.
if we embedded reviews, we'd have to constantly change the object because reviews are user-generated and therefore the array size would be mutable. 
furthermore, allows easy integration of third-party review systems */
var reviewSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	productID: mongoose.Schema.Types.ObjectId,
	title: String,
	body: String,
	date: {type: Date, default: Date.now} /* should hopefully be pushing reviews immediately as they are written */
	rating: Schema.Types.Decimal128,
	review_helpfulness: {
		helpful: Number,
		reviewers: Number
	},
	author: String,
	verified: Boolean
});

/* for a site like amazon, each product has an inventory, since there can be multiple of the product -- so we will need a one-to-one relationship between product and inventory.
implemented via reference based approach for scalability/potential third-party integration */
var inventorySchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	productID: mongoose.Schema.Types.ObjectId,
	catalogID: mongoose.Schema.Types.ObjectId,
	descr: String,
	avail: Boolean
	num_avail: Number,
	inventory: [{seller: String, date: Date}]
});

/* ---------------------------------------------------------------------------------------------------------- */
/* -					end of product catalog schemas 					    - */												   - */
/* ---------------------------------------------------------------------------------------------------------- */

var userSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	is_premium: Boolean,
	is_active: Boolean,
	name: String,
	number: Number,
	billing_address: String,
	shipping_address: String, 
	balance: Number,
	payment_options: [{type: String, number: String, cvid: Number}],
	password: String /* the previous two lines will be encrypted */
	wishlist: [Schema.Types.ObjectId], // product IDs
	profile: String,
	reviews: [Schema.Types.ObjectId],
	shopping_cart: [Schema.Types.ObjectId] // won't grow too large, embedded is quicker and works fine
	recent_buys: [Schema.Types.ObjectId]
});

var sellerSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	userID: mongoose.Schema.Types.ObjectId,
	corporate: Boolean,
	business_name: String,
	password: String,
	address: String,
	billing_info: [{type: String, number: String, cvid: Number}],
	for_sale: [{product: Schema.Types.ObjectId, date: Date}],
	reviews: [Schema.Types.ObjectId]
})
