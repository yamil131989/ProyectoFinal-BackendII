const { Router } = require('express')
const CartController = require('../controller/carts.controller.js')
const { passportCall } = require('../passport/passportCall.js')
const { autenticacionAdv } = require('../passport/authorization.js')

const router = Router()

const {
    getCarts,
    createCart,
    getCart,
    deleteProd,
    deleteProds,
    cartBuy,
    addProduct
} = new CartController()

//obtener carritos (admin)
router.get('/',passportCall('jwt'),autenticacionAdv(['admin']), getCarts)
//obtener su carrito c/usuario
router.get('/:cid',passportCall('jwt'),getCart)

//todos puden crear un carrito
router.post('/',passportCall('jwt'),autenticacionAdv(['user','user_premium','admin']),createCart)
router.post('/:cid/compra',passportCall('jwt'),autenticacionAdv(['user','user_premium','admin']),cartBuy)
//todos
router.put('/:cid/products/:pid',passportCall('jwt'),addProduct)

//
router.delete('/:cid/products/:pid',passportCall('jwt'),deleteProd)
router.delete('/:cid',passportCall('jwt'),autenticacionAdv(['user','user_premium','admin']),deleteProds)


module.exports = router

