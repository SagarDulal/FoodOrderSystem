var express = require('express');
var router = express.Router();
var auth = require('../config/auth');
var isAdmin = auth.isAdmin;

// Get Page model
var Page = require('../models/page');
var adminPageController = require('../controllers/admin_pages')
/*
 * GET pages index
 */
router.get('/', isAdmin, adminPageController.getAdminPage)

/*
 * GET add page
 */
router.get('/add-page',isAdmin, adminPageController.getAdminAddPage)

/*
 * POST add page
 */
router.post('/add-page', adminPageController.postAdminAddPage)

/*
 * POST reorder pages
 */
router.post('/reorder-pages', adminPageController.reorderPage)

/*
 * GET edit page
 */
router.get('/edit-page/:id', isAdmin, adminPageController.getAdminEditPage)

/*
 * POST edit page
 */
router.post('/edit-page/:id', adminPageController.postAdminEditPage)
/*
 * GET delete page
 */
router.get('/delete-page/:id', isAdmin, adminPageController.getDeletePage)



// Sort pages function
function sortPages(ids, callback) {
    var count = 0;

    for (var i = 0; i < ids.length; i++) {
        var id = ids[i];
        count++;

        (function (count) {
            Page.findById(id, function (err, page) {
                page.sorting = count;
                page.save(function (err) {
                    if (err)
                        return console.log(err);
                    ++count;
                    if (count >= ids.length) {
                        callback();
                    }
                });
            });
        })(count);

    }
}


// Exports
module.exports = router;


