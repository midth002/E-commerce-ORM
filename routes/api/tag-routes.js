const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include : [{ model : Product }],
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const oneTag = await Tag.findByPk(req.params.id,  {
      include : [{ model : Product }]
    });

    if (!oneTag) {
      res.status(404).json({ message : `There is no such ID for Tags in the database.`})
    }
    res.status(200).json(oneTag);
  } catch (error) {
    res.status(500).json(error);
  }

});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const createTag = await Tag.create({
      tag_name : req.body.tag_name,
      products : req.body.products
    });
    res.status(200).json(createTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where : {
        id : req.params.id
      }
    });

    if (!updateTag[0]) {
      res.status(404).json({ message : `No Tag data found for this ID in our database.`})
    }
    
    res.status(200).json(updateTag)
  } catch (error) {
    res.status(500).json(error);
  }

});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where : {
        id: req.params.id
      }
    });

    if (!deleteTag) {
      res.status(404).json({ message : `No category data found for this ID in our database to delete on.`}); 
      return;
    }

    res.status(200).json({ message :  `Deleted ${deleteTag} from tag` })

  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;
