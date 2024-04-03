const mongoose = require('mongoose');

const products = new mongoose.Schema({
    prod_name:{type:String},
    price:{type:Number},
    amount:{type:Number},
    // img:{type:String}
})

module.exports = mongoose.model('products', products)