const jwt = require('jsonwebtoken');


const generarJWT = (uid = '') => {

return new Promise((resolve, reject) => {
const payload1 = {uid};
jwt.sign(payload1, process.env.SECRETORPRIVATEKEY, {
    expiresIn: '24h'
}, (err, token) => {
    if(err) {
        console.log(err);
        reject('No se pudo generar el token')
    } else{
        resolve(token, process.env.SECRETORPRIVATEKEY);
    }
}

)
})
}

module.exports = {
    generarJWT
}









