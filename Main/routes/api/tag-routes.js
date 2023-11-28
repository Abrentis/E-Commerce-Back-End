const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Gets all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Gets a specific tag
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Creates a new tag
router.post('/', async (req, res) => {
  try {
    const newTagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Updates an existing tag
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id);

    if (!tagData) {
      return res.status(404).send({ message: "Tag not found" });
    };

    const updatedTag = await tagData.update(req.body);
    res.send(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Deletes a specific tag
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json({ message: 'Successfully deleted entry!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
