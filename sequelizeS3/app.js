import {Sequelize, DataTypes, where, Op} from 'sequelize';

// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite3'
});

// Define modelo de user
const User = sequelize.define("User", {
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    direccion: DataTypes.STRING
});

// Define modelo de Producto
const Producto = sequelize.define("Producto", {
    nombre:DataTypes.STRING,
    precio:DataTypes.DOUBLE,
    categoria:DataTypes.STRING,
    descripcion:DataTypes.TEXT
})

// Define modelo de Venta
const Order = sequelize.define("Order",{
    pago:DataTypes.DOUBLE,
    fecha:DataTypes.DATE
});

User.hasMany(Order);
Order.belongsTo(User);

Producto.hasMany(Order);
Order.belongsTo(Producto);

// await User.sync();
// await Producto.sync();
// await Order.sync();

await sequelize.sync();

// const user = await User.create({
//     nombre: "Dio",
//     email: "dionicio@mail.com",
//     direccion: "libramiento 226"
// });

// const producto = await Producto.create({
//     nombre: "Jamon",
//     precio: 50,
//     categoria: "salchichoneria",
//     descripcion: "para comer"
// });

// Loggear las tables
// const usuarios = await User.findAll();
// console.log(usuarios);

// const productos = await Producto.findAll();
// console.log(productos);

// const orders = await Order.findAll();
// console.log(orders);

const resultado = await Producto.findAll();
// console.log(resultado.length);

// Consultas con queries
const menor_50 = await Producto.findAll({
    where: { precio: {[Op.lte]: 50}}
});
// console.log(menor_50);

const mayor_500 = await Producto.findAll({
    where: { precio: {[Op.lte]: 500}}
});
// console.log(mayor_500);

const limitQuery = await Producto.findAll({
    limit:3,
    offset:1,
    order:['precio'],
    where: {
        precio: {[Op.lte]:50}
    }
})

limitQuery.forEach(Producto => console.log(Producto.nombre))