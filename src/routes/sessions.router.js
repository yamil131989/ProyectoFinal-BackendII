const { Router } = require('express')

const {passportCall} = require('../passport/passportCall')
const {autenticacionAdv} = require('../passport/authorization')
const SessionController = require('../controller/session.controller')

// const { createHash, isValidPassword } = require('../utils/hash.js')

const router = Router()

const {
    register,
    login,
    current,
    changePassword,
    logout } = new SessionController()

    
    
router.post('/register',register)

router.post('/login',login)

router.get('/logut',passportCall('jwt'),logout)
//router.post('')

router.get('/current',passportCall('jwt'),autenticacionAdv(['admin','user','user_premium']),current)

router.post('/cambiarPass',passportCall('jwt'),autenticacionAdv(['user','user_premium']),changePassword)


module.exports = router

// // zod libreria para validar data que se envia de formulario

