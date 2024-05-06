const {response, request} = require('express');
const Usuario = require('../models/usuarios');
const jwt = require('jsonwebtoken');


// El middleware tiene 3 argumentos
const validarJWT = async (req = request, res = response, next) => {
const token = req.header('x-token');

if(!token) {
    return res.status(401).json({
        msg: 'no hay token en la peticion'})
}

try {
 const {uid} =  jwt.verify(token, process.env.SECRETORPRIVATEKEY);
 
 // leer el usuario que corresponde al uid
 const usuario = await Usuario.findById(uid);

 if(!usuario) {
    return res.status(401).json({
        msg: 'token no valido - usuario no existente'
 })};
 
 //verificar si el uid estado true
 if(!usuario.estado) {
    return res.status(401).json({
        msg: 'token no valido - usuario estado: false'
    })

 }

 
 req.usuario = usuario;
 
 
 //const payload =  jwt.verify(token, process.env.SECRETORPRIVATEKEY);
 //console.log(payload);
  next();  
} 
catch (error) {
console.log(error);
res.status(401).json({
    msg:'token no valido'
})
}

console.log(token);


}


module.exports = {
    validarJWT
}