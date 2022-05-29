const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {

  try {
    const categoryData = await Category.findAll({
      include: [{
        model: Product,
        // required: true
      }]
    });
    if(!categoryData) {
      res.status(404).json({message: "Not found"});
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  // find all categories


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{
        model: Product,
        // required: true
      }]
    });
    if(!categoryData) {
      res.status(404).json({message: "Not found"});
    }
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async(req, res) => {
  try {
    const updatedCategory = await Category.update({
      id: req.params.id,
      category_name: req.body.category_name
    }, {
      where: {
        id: req.params.id
      }
    });
    if(!updatedCategory[0]) {
      res.status(404).json({message:"Not Found"});
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try{
    const deletedCategory = await Category.destroy(
      {
        where: {
          id: req.params.id
        }
      }
    );
    if(!deletedCategory) {
      res.status(404).json({message: "Not Found"});
    }
    res.status(200).json(deletedCategory);
  }catch{
    res.status(500).json(error);
  }
});

module.exports = router;
