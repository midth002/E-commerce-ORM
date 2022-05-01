const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      include : [{ model : Product }]
    });
    res.status(200).json(allCategories);
  } catch (error) {
    res.status(500).json(error)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const oneCategory = await Category.findByPk(req.params.id, {
      include : [{ model : Product }]
    });
    res.status(200).json(oneCategory)
  } catch (error){
    res.status(500).json(error)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create({
    category_name : req.body.category_name
  });
  res.status(200).json(createCategory);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const catData = await Category.update(req.body, {
      where : {
        id: req.params.id
      }
    }); 

    // If the user has a unknown id in the req.params.id section in the url. Send back a 400 bad request error that there is no category with that ID in the db.
    if (!catData[0]) {
      res.status(400).json({ message: 'No category data found for this ID in our database' });
      return; 
    }

    res.status(200).json({ message: `Updated category ${catData}`})

  }
    catch (error) {
      res.status(500).json(error)
    }
  

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
