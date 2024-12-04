const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const itemsCon = require('../controllers/items');

router.get('/', itemsCon.getAllProducts);
router.get('/:id', itemsCon.getProductById);

router.post('/', auth, itemsCon.createProduct);
router.put('/:id', auth, itemsCon.updateProduct);
router.delete('/:id', auth, itemsCon.deleteProduct);

module.exports = router;