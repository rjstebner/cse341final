const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');


const itemsCon = require('../controllers/items');

router.get('/', auth, itemsCon.getAllItems);
router.get('/:id', itemsCon.getItemById);

router.post('/', auth, itemsCon.createItem);
router.put('/:id', auth,  itemsCon.updateItem);
router.delete('/:id', auth, itemsCon.deleteItem);

module.exports = router;