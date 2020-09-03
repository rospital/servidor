const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const authController = require('../controllers/authController')
const auth = require('../middleware/auth')

//Iniciar session
// api/auth
/*

[
        check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6 })
    ],

*/
router.post('/',
    authController.autenticarUsuario
)

router.get('/',
    auth,
    authController.usuarioAutenticado
)

module.exports = router;