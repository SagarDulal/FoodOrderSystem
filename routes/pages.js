var express = require('express');
var router = express.Router();

// Get Page model
var Page = require('../models/page');
const pageController = require('../controllers/pages')
/*
 * GET / page in admin dashboard
 */
router.get('/', pageController.getPage)

/*
 * GET a page slug
 */
router.get('/:slug', pageController.getSlug)



// Exports
module.exports = router;


