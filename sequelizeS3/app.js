import {Sequelize, DataTypes, where, Op} from 'sequelize';

// Option 2: Passing parameters separately (sqlite)
// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: './db.sqlite3'
// });

import pg from "pg";
pg.defaults.ssl = true;

// Option 3: Passing parameters separately (other dialects)
// Conected to Heroku DB named postgresql-regular-03530
const sequelize = new Sequelize(
    'd8dscl6vocjghu',
    'skmwuklynnbvio', 
    'ed9bd1dce33d828ce6801bdd622157ad94b83e5fb2230b9f3dc44b3bd5b3429b',
    {
    host: 'ec2-44-207-126-176.compute-1.amazonaws.com',
    "dialect": "postgres",
    "dialectOptions": {
        "ssl": {
        "rejectUnauthorized": false
        }
    }   
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}

// Define modelo de user
const User = sequelize.define("User", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false },
    email: {
        type: DataTypes.STRING,
        allowNull: false },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false }
});

// Define modelo de Producto
const Producto = sequelize.define("Producto", {
    nombre:{
        type: DataTypes.STRING,
        allowNull: false },
    precio:{
        type: DataTypes.DOUBLE,
        allowNull: false },
    categoria:{
        type: DataTypes.STRING,
        allowNull: false },
    descripcion:DataTypes.TEXT
})

// Define modelo de Venta
const Order = sequelize.define("Order",{
    pago:DataTypes.DOUBLE,
    fecha:{
        type: DataTypes.DATE,
        allowNull: false }
});

User.hasMany(Order, {foreignKey: {allowNull: false}});
Order.belongsTo(User);

Producto.hasMany(Order, {foreignKey: {allowNull: false}});
Order.belongsTo(Producto);

// await User.sync();
// await Producto.sync();
// await Order.sync();

await sequelize.sync();


// Create user, producto or order
// const user = await User.create({
//     nombre: "Alejandar",
//     email: "malee@mail.com",
//     direccion: "Aviacion 12"
// });

// const producto = await Producto.create({
//     nombre: "Queso",
//     precio: 60,
//     categoria: "lacteos",
//     descripcion: "para cenar"
// });

// const order = await Order.create({
//     pago: 60,
//     fecha: Date.now(),
//     ProductoId: producto.id,
//     UserId: user.id
// })

// Loggear las tables
const usuarios = await User.findAll();
console.log(usuarios);

const productos = await Producto.findAll();
console.log(productos);

const orders = await Order.findAll();
console.log(orders);

const resultado = await Producto.findAll();
console.log(resultado.length);

// Consultas con queries
const menor_50 = await Producto.findAll({
    where: { precio: {[Op.lte]: 50}}
});
console.log(menor_50);

const mayor_500 = await Producto.findAll({
    where: { precio: {[Op.lte]: 500}}
});
console.log(mayor_500);

const limitQuery = await Producto.findAll({
    limit:3,
    offset:1,
    order:['precio'],
    where: {
        precio: {[Op.lte]:50}
    }
})

limitQuery.forEach(Producto => console.log(Producto.nombre, Producto.id))

// Update a product by id
// Producto.update({
//     nombre: "Motoneta"},
//    { where: {
//         id: 2
//     }
// });

// Delete a product by id
// Producto.destroy(
//    { where: {
//         id: 1
//     }
// });

// const borrado = await Producto.destroy({
//     where:{
//         id: 1
//     }
// });

// console.log("productos borrados "+ borrado);