const User = require('../models/users');

async function getUsers(req, res){
    const users = await User.findAll();
    return res.status(201).json(users);
}

async function deleteUser(req, res){
    const id = req.params.id;
    const deleted = User.destroy(
        {where: {id}}
    ); //{id: id} or {id}
    res.status(200).json({deleted : "deleted"});
}

async function signUp(req,res){
    const body = req.body;
    try {
        const user = await User.create(body);
        const {salt, hash} = User.crearPassword(body['password']);
        user.password_salt = salt;
        user.password_hash = hash;
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        if (["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(err.name)){
            return res.status(400).send(err.name)
        }
        else {
            throw err
        }
    }
    
}

async function logIn(req,res){
    const body = req.body;
    const user = await User.findOne({where: {username: body["username"]}});
    // return res.status(200).send("test works")
    if (!user){
        return res.status(404).json({error: "user not found"})
    }
    if (User.validarPassword(body['password'], user.password_salt, user.password_hash) ){
        return res.status(200).json({
            user: user.username,
            email: user.email,
            token: User.generateJWT(user),
        }); // método que nos regrese una representación en JSON del usuario ya autenticado JWT
    } else {
        return res.status(400).json({mensaje: "incorrect"})
    }
}

module.exports = {signUp, logIn, getUsers, deleteUser};