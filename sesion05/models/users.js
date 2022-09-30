const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const crypto = require('crypto');                             
const jwt = require('jsonwebtoken');                          
//Importando módulo jsonwebtoken, pendiente de instalar.
const secret = require('../config/secret');
// ???? es un misterio que resolveremos en la última sesión

const User = sequelize.define('User',{
    username:{
        type: DataTypes.CHAR(64),
        allowNull: false,
        unique: true,
        validate : {
            isLowercase: true,
            is: /^[a-zA-Z0-9_-]+$/,
        }
    },
    name:{
        type: DataTypes.CHAR(64),
        allowNull: false
    },
    surname:{
        type: DataTypes.CHAR(128),
        allowNull: false
    },
    email:{
        type: DataTypes.CHAR(64),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password_hash:{
        type: DataTypes.CHAR(64),
        // allowNull: false
    },
    password_salt:{
        type: DataTypes.CHAR(64),
        // allowNull: false
    },
    tarjeta:{
        type: DataTypes.CHAR(16),
        allowNull: false,
        unique: true,
        validate : {
            is: /([0-9])\d+/g,
        }
    },
    tipo_tarjeta:{
        type: DataTypes.CHAR(64)
    }
});

User.crearPassword = function (password) {
    const salt = crypto.randomBytes(16).toString("hex"); // generando una "salt" random para cada usuario
    const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 512, "sha512")
    .toString("hex"); // generando un hash utilizando la salt
    return { salt : salt, hash: hash }
}

User.validarPassword = function (password, user_salt, user_hash)  {
    const hash = crypto
      .pbkdf2Sync(password, user_salt, 10000, 512, "sha512")
      .toString("hex");
    return user_hash === hash;
}

User.generateJWT = function(user){
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60); // 60 días antes de expirar

    return jwt.sign({
        id: user._id,
        username: user.username,
        exp: parseInt(exp.getTime() / 1000), // En segundos
    }, secret);
}

 
module.exports = User;