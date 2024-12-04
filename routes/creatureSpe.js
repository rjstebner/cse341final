const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const csCon = require('../controllers/creatureSpe');

router.get('/', csCon.getAllProducts);
router.get('/:id', csCon.getProductById);

router.post('/', auth, csCon.createProduct);
router.put('/:id', auth, csCon.updateProduct);
router.delete('/:id', auth, csCon.deleteProduct);

module.exports = router;