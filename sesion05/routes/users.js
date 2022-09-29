const router = require('express').Router();
const {signUp, logIn} = require('../controllers/users');

router.post('/', signUp);
router.post('/users/signup', signUp);
router.post('/users/login', logIn);

module.exports = router;