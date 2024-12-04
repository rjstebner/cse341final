const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const cgCon = require('../controllers/creatureGen');

router.get('/', cgCon.getAllProducts);
router.get('/:id', cgCon.getProductById);

router.post('/', auth, cgCon.createProduct);
router.put('/:id', auth, cgCon.updateProduct);
router.delete('/:id', auth, cgCon.deleteProduct);

module.exports = router;