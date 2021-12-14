const Category = require('../models/category')
const auth = require('../config/auth');
const isAdmin = auth.isAdmin;



const getCategory = async (req,res)=>{
  await  Category.find( (err, categories) =>{
        if (err)
            return console.log(err);
        res.render('admin/categories', {
            categories: categories
        });
    });
}

const getAddCategory = (req,res)=>{
    const title = "";
    res.render('admin/add_category', {
        title: title
    });
}

const postAddCategory = async (req,res)=>{

    req.checkBody('title', 'Title must have a value.').notEmpty();

    const title = req.body.title;
    const slug = title.replace(/\s+/g, '-').toLowerCase();

    const errors = req.validationErrors();

    if (errors) {
        res.render('admin/add_category', {
            errors: errors,
            title: title
        });
    } else {
      await  Category.findOne({slug: slug}, function (err, category) {
            if (category) {
                req.flash('danger', 'Category title exists, choose another.');
                res.render('admin/add_category', {
                    title: title
                });
            } else {
                const category = new Category({
                    title: title,
                    slug: slug
                });

                category.save(function (err) {
                    if (err)
                        return console.log(err);

                    Category.find(function (err, categories) {
                        if (err) {
                            console.log(err);
                        } else {
                            req.app.locals.categories = categories;
                        }
                    });

                    req.flash('success', 'Category added!');
                    res.redirect('/admin/categories');
                });
            }
        });
    }    
}
const getEditCategory = async (req,res)=>{
    
   await Category.findById(req.params.id, function (err, category) {
        if (err)
            return console.log(err);

        res.render('admin/edit_category', {
            title: category.title,
            id: category._id
        });
    });
}
const postEditCategory = async (req,res)=>{
    req.checkBody('title', 'Title must have a value.').notEmpty();

    const title = req.body.title;
    const slug = title.replace(/\s+/g, '-').toLowerCase();
    const id = req.params.id;

    const errors = req.validationErrors();

    if (errors) {
        res.render('admin/edit_category', {
            errors: errors,
            title: title,
            id: id
        });
    } else {
        Category.findOne({slug: slug, _id: {'$ne': id}}, function (err, category) {
            if (category) {
                req.flash('danger', 'Category title exists, choose another.');
                res.render('admin/edit_category', {
                    title: title,
                    id: id
                });
            } else {
                 Category.findById(id, function (err, category) {
                    if (err)
                        return console.log(err);

                    category.title = title;
                    category.slug = slug;

                    category.save(function (err) {
                        if (err)
                            return console.log(err);

                        Category.find(function (err, categories) {
                            if (err) {
                                console.log(err);
                            } else {
                                req.app.locals.categories = categories;
                            }
                        });

                        req.flash('success', 'Category edited!');
                        res.redirect('/admin/categories/edit-category/' + id);
                    });

                });


            }
        });
    }

}
const getDeleteCategory = async (req,res)=>{
    await Category.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            return console.log(err);

             Category.find(function (err, categories) {
            if (err) {
                console.log(err);
            } else {
                req.app.locals.categories = categories;
            }
        });

        req.flash('success', 'Category deleted!');
        res.redirect('/admin/categories/');
    });
}
module.exports = {
    getCategory,
    getAddCategory,
    postAddCategory,
    getEditCategory,
    postEditCategory,
    getDeleteCategory
}