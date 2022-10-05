const router = require('express').Router();
const {
    signUp, 
    logIn, 
    getUsers, 
    deleteUser
} = require('../controllers/users');

router.get('/', getUsers);
router.post('/signup', signUp);
router.post('/login', logIn);
router.delete('/:id', deleteUser);

module.exports = router;