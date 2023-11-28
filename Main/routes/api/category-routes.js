const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Get request for all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get request for a specific category
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Post request to create a new category
router.post('/', async (req, res) => {
  try {
    const newCategoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Put request to update a specific category
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id);

    if (!categoryData) {
      return res.status(404).send({ message: "Category not found" });
    };

    const updatedCategory = await categoryData.update(req.body);
    res.send(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete request to delete a category
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json({ message: 'Successfully deleted entry!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
