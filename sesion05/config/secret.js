require('dotenv').config();
console.log(process.env) // remove this after you've confirmed it is working

module.exports = process.env.JWT_SECRET;