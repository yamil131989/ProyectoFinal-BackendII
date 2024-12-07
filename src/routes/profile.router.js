const {Router} = require('express')
const { UserService, CartService } = require('../services')
const { passportCall } = require('../passport/passportCall')
const { autenticacionAdv } = require('../passport/authorization')

const router = Router()

router.get('/',passportCall('jwt'),autenticacionAdv(['user','user_premium','admin']), async(req,res)=>{
    try {
        const {email} = req.user
        const user = await UserService.getUser({email})

        if(user){
            res.status(200).send({status:'success',payload:user})
        } else {
            res.status(400).send({status:'Error',msg:'Hubo un problema cargando la informacion'})
        }

    } catch (error) {
        console.log(error)
    }
})

router.get('/carrito',passportCall('jwt'),autenticacionAdv(['user','user_premium'])), async(req,res)=>{
    const {cart} = req.user
    const user = await UserService.getUser({cart})
    const carrito = await CartService.getCartById(user.cart._id)

    const cartObj = {
        title:'Carrito',
        id: carrito._id,
        products : carrito.products
    }
    if(carrito){
        console.log(carrito)
        res.render('carritoInfo',cartObj)
    }else{
        res.send({status:'Error',msg:'Carrito no encontrado'})
    }    
}

router.get('/',(req,res)=>{})

module.exports = router