const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const crypto = require('crypto');                             
//Importando módulo crypto, pendiente de instalar.
const jwt = require('jsonwebtoken');                          
//Importando módulo jsonwebtoken, pendiente de instalar.
const secret = require('../config').secret;                   
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

User.createPassword = function(password){
    salt = crypto.randomBytes(16).toString('hex');
    hash = crypto.pbkdf2Sync(password, salt, 10000, "sha512")
    .toString("hex"); // generando un hash utilizando la salt
    return { salt : salt, hash: hash }
}

module.exports = User;