const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');


const csCon = require('../controllers/creatureSpe');

router.get('/', auth, csCon.getAllcreatureSpe);
router.get('/:id', csCon.getCreatureSpeById);

router.post('/', auth, csCon.createCreatureSpe);
router.put('/:id', auth, csCon.updateCreatureSpe);
router.delete('/:id', auth, csCon.deleteCreatureSpe);

module.exports = router;