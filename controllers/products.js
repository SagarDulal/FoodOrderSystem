const fs = require('fs-extra');
// const auth = require('../config/auth');

const Product = require('../models/product');
const Category = require('../models/category');


const getAllProducts = async (req,res)=>{
   await Product.find(function (err, products) {
        if (err)
            console.log(err);

        res.render('all_products', {
            title: 'All products',
            products: products
        });
    });
}

const getProductByCategory =async (req,res)=>{
    const categorySlug = req.params.category;

    await Category.findOne({slug: categorySlug}, function (err, c) {
        await Product.find({category: categorySlug}, function (err, products) {
            if (err)
                console.log(err);

            res.render('cat_products', {
                title: c.title,
                products: products
            });
        });
    });

}


const getProductDetails =async (req,res)=>{
    const galleryImages = null;
    const loggedIn = (req.isAuthenticated()) ? true : false;

    await Product.findOne({slug: req.params.product}, function (err, product) {
        if (err) {
            console.log(err);
        } else {
            const galleryDir = 'public/product_images/' + product._id + '/gallery';

            fs.readdir(galleryDir, function (err, files) {
                if (err) {
                    console.log(err);
                } else {
                    galleryImages = files;

                    res.render('product', {
                        title: product.title,
                        p: product,
                        galleryImages: galleryImages,
                        loggedIn: loggedIn
                    });
                }
            });
        }
    });

}
module.exports= {
    getAllProducts,
    getProductByCategory,
    getProductDetails
}