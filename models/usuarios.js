
const { Schema, model } = require(`mongoose`);
const UsuarioSchema = Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre es Obligatorio'],
        },
        correo: {
            type: String,
            required: [true, 'El correo es Obligatorio'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'La contraseña es Obligatoria'],
            unique: true
        },
        rol: {
            type: String,
            required: true,
            // enum: ['ADMIN_ROLE','USER_ROLE', 'VENTAS_ROLE']
        },
        estado: {
            type: Boolean,
            default: true
        },
        google: {
            type: Boolean,
            default: false
        }, img: {
            type: String,
            required: [true, 'La imagen es Obligatoria'],
        },


    });

    //Aqui escogemos que llaves del Usuario no se van a mostrar en la respuesta del body

UsuarioSchema.methods.toJSON = function () {
    const { __v,  google, img, _id, nombre,  ...usuarioojo } = this.toObject();
   usuarioojo.uid = _id;
   usuarioojo.namegus = nombre;
    return usuarioojo;
}

module.exports = model('Usuario', UsuarioSchema)





