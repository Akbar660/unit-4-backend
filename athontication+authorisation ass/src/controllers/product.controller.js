const express = require("express");

const Product = require("../models/product.model");

const { uploadSingle, uploadMultiple } = require("../middlewares/upload");

const authenticate = require("../middlewares/authenticate");
const authorise = require("../middlewares/authorise");



const router = express.Router();

router.get("", async (req, res) => {
  try {
    const products = await Product.find()
    .populate("user_id")
    .lean()
    .exec();

    return res.send(products);
  } catch (err) {
    return res.status(500).send(err);
  }
});
router.get("/sellername/:id", async (req, res) => {
  console.log(req.params.id)
  try {
    const products = await Product.find({user_id:req.params.id})
    .populate("user_id")
    .lean()
    .exec();

    return res.send(products);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post(
  "/single",
  authenticate,
  authorise(["seller2","seller3","admin"]),
  uploadSingle("image_urls"),
  async (req, res) => {
    try {
      const product = await Product.create({
        name: req.body.name,
        price: req.body.price,
        image_urls: req.file.path,
        user_id:req.body.user_id
      });

      return res.send({ product });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

router.post(
  "/multiple",
  authenticate,
  uploadMultiple(2, "image_urls"),
  async (req, res) => {
    try {
      const filePaths = req.files.map((file) => file.path);

      const product = await Product.create({
        name: req.body.name,
        price: req.body.price,
        image_urls: filePaths,
      });

      return res.send({ product });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

module.exports = router;
