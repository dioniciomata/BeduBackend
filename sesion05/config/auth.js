const secret = require('./secret');
const { expressjwt } = require('express-jwt');

// Obtenemos el jwt del header de la petición y verificamos su existencia.
// Bearer <JWT>
function getTokenFromHeader(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
      req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }

    return null;
}

const auth = {
    required: expressjwt({
      secret: secret,
      algorithms: ['HS256'],
      userProperty: 'user',
      getToken: getTokenFromHeader
    }),
    opcional: expressjwt({
      secret: secret,
      algorithms: ['HS256'],
      userProperty: 'usuario',
      credentialsRequired: false,
      getToken: getTokenFromHeader
    })
};

  module.exports = auth;