const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');


const cgCon = require('../controllers/creatureGen');

router.get('/', auth, cgCon.getAllCreatureGen);
router.get('/:id', cgCon.getCreatureGenById);

router.post('/', auth, cgCon.createCreatureGen);
router.put('/:id', auth, cgCon.updateCreatureGen);
router.delete('/:id', auth, cgCon.deleteCreatureGen,
);

module.exports = router;