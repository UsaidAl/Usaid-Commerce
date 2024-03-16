const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // This will get all the products
  try {
    const allProducts = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(400).json(error);
  }
  // be sure to include its associated Category and Tag data
});

// This will get one product by its 'id'
router.get("/:id", async (async, res) => {
  try {
    const foundProduct = await Product.findOne({
      include: [{ model: Category }, { model: Tag }],
      where: { id: req.params.id },
    });
    res.status(200).json(foundProduct);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", (req, res) => {
  // create a new category
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
