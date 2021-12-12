var express = require('express');
var router = express.Router();
var auth = require('../config/auth');
var isAdmin = auth.isAdmin;

// Get Category model
var Category = require('../models/category');
var adminCategoryController = require('../controllers/admin_categories')
/*
 * GET category index          ||Working
 */
router.get('/', isAdmin, adminCategoryController.getCategory)

/*
 * GET add category             ||Working
 */
router.get('/add-category', isAdmin, adminCategoryController.getAddCategory)

/*
 * POST add category
 */
router.post('/add-category', adminCategoryController.postAddCategory)

/*
 * GET edit category
 */
router.get('/edit-category/:id', isAdmin, adminCategoryController.getEditCategory)
/*
 * POST edit category        ||Done Working
 */
router.post('/edit-category/:id', adminCategoryController.postEditCategory)

/*
 * GET delete category  ||Done Working
 */
router.get('/delete-category/:id', isAdmin, adminCategoryController.getDeleteCategory)


router.get('/vieworders',(req,res)=>{
    res.send("I am sagar dulal")
})




// Exports
module.exports = router;


