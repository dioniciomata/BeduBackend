const router = require('express').Router();
const {signUp} = require('../controllers/users');

router.post('/', signUp);
router.post('/users/signup', signUp);

module.exports = router;