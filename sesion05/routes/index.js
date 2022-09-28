const router = require('express').Router();
const gods = require('./gods');
const users = require('./users');
const {signUp} = require('../controllers/users');

router.get('/', (req,res) => {
    res.json({'info':'Welcome to Gods API secured'})
});

router.use('/gods', gods);
router.use('/users', users);

router.post('/users/signup', signUp);

module.exports = router;