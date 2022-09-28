const User = require('../models/users');

async function signUp(req,res){
    const body = req.body;
    try {
        User.create(body).then((user)=>{
            res.status(201).json(user);
        });
    } catch (err) {
        if (err.name === "SequelizeValidationError"){
            return res.status(400).json({
                error : err.error.map(e=>e.message)
            })
        }
    }
    
}

module.exports = {signUp};