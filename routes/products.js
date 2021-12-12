var express = require('express');
var router = express.Router();
var fs = require('fs-extra');
var auth = require('../config/auth');
var isUser = auth.isUser;

// Get Product model
var Product = require('../models/product');

// Get Category model
var Category = require('../models/category');

var productController = require('../controllers/products')
/*
 * GET all products
 */
router.get('/', isUser, productController.getAllProducts)


/*
 * GET products by category
 */
router.get('/:category', isUser, productController.getProductByCategory)
/*
 * GET product details
 */
router.get('/:category/:product', productController.getProductDetails)

// Exports
module.exports = router;


