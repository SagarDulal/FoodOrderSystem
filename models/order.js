var mongoose = require('mongoose');

// Product Schema
var OrderSchema = mongoose.Schema({
   
user:{
    type:mongoose.Schema.Types.ObjectId ,
     ref:'User'
},
data:{
    type:Object
}
});

module.exports = mongoose.model('Order', OrderSchema);

