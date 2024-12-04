const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
// re-add auth back in to post, put, delete


const csCon = require('../controllers/creatureSpe');

router.get('/', csCon.getAllcreatureSpe);
router.get('/:id', csCon.getCreatureSpeById);

router.post('/', csCon.createCreatureSpe);
router.put('/:id', csCon.updateCreatureSpe);
router.delete('/:id', csCon.deleteCreatureSpe);

module.exports = router;