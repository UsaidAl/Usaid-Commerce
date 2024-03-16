const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // This will get all the products
  try {
    const allCategoryData = await Category.findAll({
      include: [{ model: Product }, { model: Tag }],
    });
    if (!allCategoryData) {
      res.status(400).json({ message: `No category found` });
      return;
    }
    res.status(200).json(allCategoryData);
  } catch (error) {
    res.status(400).json(err);
  }
  // be sure to include its associated Category and Tag data
});

// This will get one product by its 'id'
router.get("/:id", async (req, res) => {
  try {
    const catData = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Product }],
    });
    if (!catData) {
      res.status(400).json({ message: `No Category found` });
      return;
    }
    res.status(200).json(catData);
    return;
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  // New category will be created
  const { category_name } = req.body;
  if (!category_name)
    return res.status(400).json({ message: `No category_name sent!` });
  try {
    const createCategory = await Category.create({
      category_name: category_name,
    });

    res.status(200).json(createCategory);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id", async (req, res) => {
  // Update a category by its `id` value
  const { category_name } = req.body;

  if (!category_name)
    return res.status(400).json({ message: `No category_name!` });
  try {
    const updateCategory = await Category.update(
      { category_name: category_name },
      { where: { id: req.params.id } }
    );
    if (updateCategory[0] === 0) {
      res.status(200).json({ message: `No category updated!` });
      return;
    }

    res.status(200).json(updateCategory);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  // Able to delete a category by its `id` value
  try {
    const delCategory = await Category.destroy({
      where: { id: req.params.id },
    });

    if (delCategory === 0) {
      res.status(200).json({ message: `No category found to delete!` });
      return;
    }
    res.status(200).json(delCategory);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
