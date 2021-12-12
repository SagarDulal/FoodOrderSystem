var express = require('express');
var router = express.Router();
var Order = require('../models/order')

var auth = require('../config/auth');
var isUser = auth.isUser;
// Get Product model
var Product = require('../models/product');
var cartController = require('../controllers/cart');
const { urlencoded } = require('body-parser');
const bodyParser = require('body-parser');
const { body } = require('express-validator/check');
const { Form } = require('react-bootstrap');
const order = require('../models/order');
const urlencodedParser = bodyParser.urlencoded({extended: false});
/*
 * GET add product to cart
 */
router.get('/add/:product', cartController.getAddProduct)
/*
 * GET checkout page
 */
router.get('/checkout', isUser, cartController.getCheckout)

/*
 * GET update product
 */
router.get('/update/:product', cartController.getUpdateProduct)

/*
 * GET clear cart
 */
router.get('/clear', cartController.getClearCart)
/*
 * GET buy now
 */
router.get('/buynow', cartController.getOrderNow)

// const orderData = (bodyData)=>{
//     console.log(bodyData)
//     console.log(bodyData)
//    const order = new Order();
//     // Order({data:bodyData}).save((err)=>{
//     //     if(err){
//     //         throw err;

//     //     }
//     // })
//     order.save()
// }
    
// router.post('/ordernow',(req,res)=>{
//     var order = new Order({
//         user: req.user,
//         data: req.body.data
//     })
//     order.save(function(err){
//         if(err){
//             console.log(err)
//         }
//     })
// })

// res.render('buynow',{name:req.body.name})


router.post('/ordernow',(req,res)=>{
    console.log(req.body)
    const order = new Order({
        data: req.body,
        user: req.user
    })
    order.save().then(result=>{
        console.log(result);
    })
    .catch(err=>{
        console.log(err)
    })
    req.flash("success", "Order succesfully placed")
    res.redirect('/')
})


// router.get('/buynow',(req,res)=>{
    
//     var user = "";
//     var data = "";
    
//     Order.find({}, function(err, orders){
//         if(err){
//             console.log(err)
//         }
//         res.render('buynow',{orders: orders})
//     })

// })

// Exports
module.exports = router;


