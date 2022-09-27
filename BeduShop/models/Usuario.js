const {Sequelize, DataTypes} =  require('sequelize');
const sequelize  = require('../config/db');

const Usuario = sequelize.define('Usuario', {
    nombre:{
        type: DataTypes.CHAR(64)
    },
    email: {
        type: DataTypes.CHAR(64)
    },
    direccion :{
        type:DataTypes.CHAR(64),
    }
});

// sequelize.sync().then(res=>{
//     console.log("sequelize synced successfully")
// });

// Usuario.create({
//         nombre: "Alejandar",
//         email: "malee@mail.com",
//         direccion: "Aviacion 12"
// })
// .then(usuario=>{res.status(201).json(usuario)});

// Usuario.findAll()
// .then((res)=>{console.log(res)});

module.exports = Usuario;