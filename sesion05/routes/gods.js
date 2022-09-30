const router = require('express').Router();
const{
    getGod,
    getGods,
    createGod,
    updateGod,
    deleteGod
} = require('../controllers/gods');
const auth = require('../config/auth')

router.get('/', auth.opcional, getGods);
router.get('/:id', auth.opcional, getGod);
router.post('/:id', auth.required , createGod);
router.put('/:id', auth.required , updateGod);
router.delete('/:id', auth.isAdmin, deleteGod);

module.exports = router;