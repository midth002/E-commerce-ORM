const router = require('express').Router();
const { Category, Product } = require('../../models');
const { update } = require('../../models/Product');

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
    const updateCategory = await Category.update(req.body, {
      where : {
        id: req.params.id
      }
    }); 

    // If the user has a unknown id in the req.params.id section in the url. Send back a 400 bad request error that there is no category with that ID in the db.
    if (!updateCategory[0]) {
      res.status(404).json({ message: 'No category data found for this ID in our database to update on.' });
      return; 
    }

    res.status(200).json(updateCategory)

  }
    catch (error) {
      res.status(500).json(error)
    }
  

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where : {
        id: req.params.id
      }
    });

    if (!deleteCategory) {
      res.status(404).json({ message : `No category data found for this ID in our database to delete on.`}); 
      return;
    }

    res.status(200).json({ message :  `Deleted ${deleteCategory} from category` })

  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;
