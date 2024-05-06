const {response, request} = require('express');
const Usuario = require('../models/usuarios');
const bcryptjs = require('bcryptjs');
const {generarJWT} = require('../helpers/generar-jwt');

const login = async (req = request, res = response) => {

const{correo, password} = req.body;
try {

//verificar si el correo existe
const usuario = await Usuario.findOne(({correo}));
if(!usuario) {
return res.status(400).json({
    msg: 'Usuario / Contraseña no son correctos - correo'
})

}

//Verificar si el usuario esta activo en la base de datos
if(usuario.estado === false) {
return res.status(400).json({
    msg: 'Usuario / Contraseña no son correctos - estado: false'
})

}

//Verificar la contraseña 
const validPassword = bcryptjs.compareSync(password, usuario.password);
if(!validPassword) {
    
return res.status(400).json({
    msg: 'Usuario / Contraseña no son correctos - password'
})

}


//Generar el JWT
const token = await generarJWT(usuario.id);

    res.json({
    msg:'login is ok gustavito',
    usuario,
    token
    
})

} catch (error){
    console.log(error);
    return res.status(500).json (
        {
            msg: 'Hable con el Administrador '
        }
    )
}
}

module.exports = {login}

