var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a Product');
});

router.post('/',async function(req, res, next) {
  try {
    const { prod_name, price, amount } = req.body;
    let newProduct = new productModel({
        prod_name: prod_name,
        price: price,
        amount: amount,
    })
    let product = await newProduct.save();
    return res.status(201).send({
        data:product,
        message:'product create successfully',
        success:true,
    })
  } catch (error) {
    return res.status(500).send({
        message:'error creating product',
        success:false,
    })
  }
});

router.put('/', function(req, res, next) {
  res.send('Method Put');
});

router.delete('/', function(req, res, next) {
  res.send('Method Delete');
});

module.exports = router;
