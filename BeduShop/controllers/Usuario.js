const Usuario = require('../models/Usuario');

function crearUsuario(req,res){
    const body = req.body;
    Usuario.create(body).then(usuario=>{
        res.status(201).json(usuario);
    });
}

async function getUsuario(req, res){
    const id = req.params.id;
    const usuario = await Usuario.findByPk(id);
    if (!usuario){
        res.status(404).send("user not found");
        return;
    }
    res.json(usuario);
}

async function getUsuarios(req, res){
    const usuarios = await Usuario.findAll();
    const nombre = req.query.nombre;
    const email = req.query.email; 
    const direccion = req.query.direccion;
    function Resultados(query){
        if (query.length!==0){
            return res.status(200).json(query);
        } else {return res.status(400).json({message: "no users match the query"})}
    };
    if (nombre){
        const resultados = await Usuario.findAll({where: {nombre: nombre}})
        return Resultados(resultados);
    } else  if (email){
        const resultados = await Usuario.findAll({where: {email: email}})
        return Resultados(resultados);
    } else if (direccion){
        const resultados = await Usuario.findAll({where: {direccion: direccion}})
        return Resultados(resultados);
    }
    return res.status(200).json(usuarios);
}

async function updateUsuario(req, res){
    const id = req.params.id;
    const usuario = req.body;
    if (!id){
        res.status(401).send("id not provided");
        return;
    }
    const update = await Usuario.update(usuario, {where: {id: id}});
    const user_updated = await Usuario.findByPk(update[0]);
    res.status(201).json(user_updated);
}

async function deleteUsuario(req, res){
    const id = req.params.id;
    const deleted = Usuario.destroy(
        {where: {id: id}}
    ); //{id: id} or {id}
    const usuarios = await Usuario.findAll();
    res.status(201).json(usuarios);
}

module.exports = {
    getUsuario,
    getUsuarios,
    crearUsuario,
    updateUsuario,
    deleteUsuario
}