const router = require('express').Router();
const gods = require('./gods');

router.get('/', (req,res) => {
    res.json({'info':'Welcome to Gods API'})
});

router.use('/gods', gods);

module.exports = router;