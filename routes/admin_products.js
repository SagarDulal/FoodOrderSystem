var express = require('express');
var router = express.Router();
var mkdirp = require('mkdirp');
var fs = require('fs-extra');
var resizeImg = require('resize-img');
var auth = require('../config/auth');
var isAdmin = auth.isAdmin;
var adminProductController = require('../controllers/admin_products')
/*
 * GET products index
 */
router.get('/', isAdmin, adminProductController.getProduct)

/*
 * GET add product
 */
router.get('/add-product', isAdmin, adminProductController.getAddProduct)
/*
 * POST add product
 */
router.post('/add-product', adminProductController.postAddProduct)
/*
 * GET edit product
 */
router.get('/edit-product/:id', isAdmin, adminProductController.getEditProduct)

/*
 * POST edit product
 */
router.post('/edit-product/:id', adminProductController.postEditProduct)

/*
 * POST product gallery
 */

/*
//  * GET delete image
//  */
// router.get('/delete-image/:image', isAdmin, function (req, res) {

//     var originalImage = 'public/product_images/' + req.query.id + '/gallery/' + req.params.image;
//     var thumbImage = 'public/product_images/' + req.query.id + '/gallery/thumbs/' + req.params.image;

//     fs.remove(originalImage, function (err) {
//         if (err) {
//             console.log(err);
//         } else {
//             fs.remove(thumbImage, function (err) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     req.flash('success', 'Image deleted!');
//                     res.redirect('/admin/products/edit-product/' + req.query.id);
//                 }
//             });
//         }
//     });
// });

/*
 * GET delete product
 */
router.get('/delete-product/:id', isAdmin, adminProductController.getDeleteProduct)

// Exports
module.exports = router;


