const router = require('express').Router();
const gods = require('./gods');
const users = require('./users');
// const {signUp, logIn} = require('../controllers/users');

router.get('/', (req,res) => {
    res.json({'info':'Welcome to Gods API secured'})
});

router.use('/gods', gods);
router.use('/users', users);

module.exports = router;