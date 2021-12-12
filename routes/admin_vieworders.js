const express = require('express');
const Order = require('../models/order')
const User = require('../models/user')
const router = express.Router()

router.get('/',(req,res)=>{
User.findById({} ,(function(err, user){
    if(user !== null){

        Order.find({}, function(err, orders) {
            if(err){console.log(err)}
                res.render('admin/vieworders', {
                    orders : orders
                });
                
            });
    }
    else{
        console.log("Cannot find the user")
    }
}))

});


module.exports = router