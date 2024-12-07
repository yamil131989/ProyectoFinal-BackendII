const { Router } = require('express')
// const UserDaoMongo = require('../daos/Mongo/userDaoMongo.js') 

const {passportCall} = require('../passport/passportCall.js')
const {autenticacionAdv} = require('../passport/authorization.js')

const UserController = require('../controller/user.controller.js')



const router = Router()

const {
    getUsers,
    getUserById,
    deleteUser,
    updateUser
} = new UserController()


router.get('/', passportCall('jwt'),autenticacionAdv(['admin'],getUsers)) 
router.get('/:uid', passportCall('jwt'),autenticacionAdv(['user','user_premium','admin'],getUserById)) 

router.put('/:uid',passportCall('jwt'),autenticacionAdv(['admin'],updateUser))

// router.get('/current/:id', getUser) //current 
router.delete('/:uid',passportCall('jwt'),autenticacionAdv(['admin']),deleteUser)


module.exports = router





