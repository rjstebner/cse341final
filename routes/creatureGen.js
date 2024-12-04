const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
// re-add auth back in to post, put, delete


const cgCon = require('../controllers/creatureGen');

router.get('/', cgCon.getAllCreatureGen);
router.get('/:id', cgCon.getCreatureGenById);

router.post('/', cgCon.createCreatureGen);
router.put('/:id', cgCon.updateCreatureGen);
router.delete('/:id', cgCon.deleteCreatureGen,
);

module.exports = router;