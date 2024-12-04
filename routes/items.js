const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
// re-add auth back in to post, put, delete

const itemsCon = require('../controllers/items');

router.get('/', itemsCon.getAllItems);
router.get('/:id', itemsCon.getItemById);

router.post('/', itemsCon.createItem);
router.put('/:id',  itemsCon.updateItem);
router.delete('/:id', itemsCon.deleteItem);

module.exports = router;