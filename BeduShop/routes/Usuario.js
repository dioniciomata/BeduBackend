const router = require('express').Router();
const{
    getUsuario,
    getUsuarios,
    crearUsuario,
    updateUsuario,
    deleteUsuario
} = require('../controllers/Usuario');

router.get('/usuarios', getUsuarios);
router.get('/usuarios/:id', getUsuario);
router.post('/', crearUsuario);
router.patch('/:id', updateUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

module.exports = router;