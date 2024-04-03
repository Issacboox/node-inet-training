var express = require("express");
var router = express.Router();
var productModel = require("../models/product");
const mongoose = require("mongoose");

router.use(express.json());
/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    let products = await productModel.find();
    return res.status(200).send({
      data: products,
      message: "success",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "error",
      success: false,
    });
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "id Invalid",
        success: false,
        error: ["id is not a ObjectId"],
      });
    }
    let products = await productModel.findById(id);
    return res.status(200).send({
      data: products,
      message: "success",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "server error",
      success: false,
    });
  }
});

router.post("/", async function (req, res, next) {
  try {
    const { prod_name, price, amount } = req.body;
    let newProduct = new productModel({
      prod_name: prod_name,
      price: price,
      amount: amount,
    });
    let product = await newProduct.save();
    return res.status(201).send({
      data: product,
      message: "product create successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "error creating product",
      success: false,
    });
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    const { prod_name, price, amount } = req.body;
    let product = await productModel.findByIdAndUpdate(
      req.params.id,
      {
        prod_name: prod_name,
        price: price,
        amount: amount,
      },
      { new: true }
    );
    return res.status(200).send({
      data: product,
      message: "product updated successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "error updating product",
      success: false,
    });
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    let product = await productModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
        data: product,
        message: 'product deleted successfully',
        success: true,
    })
  } catch (error) {
    console.error(error);
    return res.status(500).send({
        message:'error deleting product',
        success:false,
    })
  }
});


module.exports = router;
