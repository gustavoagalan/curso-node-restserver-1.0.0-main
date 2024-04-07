const { Router } = require('express');
const {check} = require('express-validator');
const {esRoleValido, emailExiste, existeUsuarioPorId} = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios_controllers');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuariosGet );

router.put('/:id',
[ check('id', 'No es un ID Valido de MongoDB').isMongoId().bail().custom(existeUsuarioPorId),
  //.bail() deja de ejecutar validaciones si alguna de las anteriores ha fallado. 
  //Útil para evitar que se ejecute un validador personalizado que toca una base de datos
  // o una API externa cuando sabe que fallará.
  // check('id').custom(existeUsuarioPorId),check('rol').custom(esRoleValido),
validarCampos
],
usuariosPut );

router.post('/', 
[   
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser de mas de 6 letras gus').isLength({min:6}),
    check('correo','El correo no es valido Gus Galan').isEmail(),
    check('correo').custom(emailExiste),
 // check('rol', 'No es un rol permitido').isIn([ 'ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido),
   validarCampos
],
usuariosPost );

router.delete('/:id', 
[
   check('id', 'No es un ID Valido de MongoDB').isMongoId().bail().custom(existeUsuarioPorId),
   validarCampos



],
usuariosDelete );

router.patch('/', usuariosPatch );
module.exports = router;




