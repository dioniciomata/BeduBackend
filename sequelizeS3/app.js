import {Sequelize, DataTypes} from 'sequelize';

// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite3'
});

const User = sequelize.define("User", {
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    direccion: DataTypes.STRING
});

await User.sync();

// User.create({
//     nombre: "Dio",
//     email: "dionicio@mail.com",
//     direccion: "libramiento 226"
// });

const usuarios = await User.findByPk(1);
console.log(usuarios);