const { configObject } = require("../config/config.js")
const { CartService, ProductService, TicketService, } = require("../services/index.js")
const {v4:uuidv4} = require('uuid')
const { sendMail } = require("../utils/sendmail.js")


class CartController {
    // constructor(){
    //     // this.service = new ProductDaoMongo()
    //     this.service = CartService
    // }
    getCarts = async (req,res)=>{
        try {
            const carts = await CartService.getCarts()
            //console.log({carts})
            // return res.json({msg:"Carritos",carts})
            // return carts
            res.status(200).send({status:'success',payload: carts})
            
        } catch (error) {
            console.log(error)
        }
    }


    createCart = async (req,res) =>{
        try {
            const cart = await CartService.create({})
            // return res.json({msg:"Carrito creado",cart})
            if(!cart){
                res.status(404).send({status:'Error',msg:'Ocurrio un problema creando el carrito'})
            }
            res.status(200).send({status:'success',payload:cart}) 
            
        } catch (error) {    
            console.log(error)
            return res.status(500).json({msg:'Server Error , agregando el carrito '})
        }
    }
    addProduct = async (req,res) =>{
        try {
            const {cid,pid} = req.params
            const carrito = await CartService.getCartById({_id:id})
            const producto = await ProductService.getProducts({_id:pid})

            if(!producto){
                res.status(404).send({status:'Error',msg:'No existe el producto'})
            }
            if(!carrito){
                res.status(404).send({status:'Error',msg:'No existe el carrito'})
            }
            //validaciones
            if(producto.stock <1){
                res.status(404).send({status:'Error',msg:'Producto sin stock'})
            }
            if(cart && producto){
                await CartService.addProduct(cid,pid)
                res.status(200).send({status:'success',msg:`Producto ${producto.tittle} agregado correctamente `})
            }

        } catch (error) {
            console.log(error)
        }
    }
    deleteProd = async (req,res) =>{
        try {
            
            const {cid,pid} = req.params
            const carrito = await CartService.deleteProd(cid,pid)
    
            if(!carrito){
                res.status(404).send({status:'Error',msg:'Carrito no existe'})
            }
            res.status(200).send({status:'success',msg:'El producto fue removido correctamente.',payload:carrito})
        } catch (error) {
            console.log(error)
        }

    }
    getCart = async (req,res) =>{
        
    }

    deleteProds = async (req,res) =>{
        try {
            const {cid} = req.params
            const carrito = await CartService.cleanCart(cid)
            if(!carrito){
                res.status(404).send({status:'Error',msg:'Carrito no existe'})
            }
            res.status(200).send({status:'success',msg:'Carrito Vacio.',payload:carrito})

        } catch (error) {
            console.log(error)
        }
    }
    cartBuy = async (req,res)=>{
        try {
            const {cid} = req.params
            const carrito = await CartService.getCartById(cid)
            const productosComprados = []
            const constrolStock= []

            if(!carrito){
                res.status(404).send({status:'Error',msg:'Carrito no existe'})
            }
            carrito.products.forEach(async element => {
              const producto = element.producto
              const stock = element.stock
              const quantity = element.quantity
              
              if(stock<quantity){
                constrolStock.push({producto})
              } else {
                productosComprados.push({producto,quantity})
              }
              await ProductService.updateProduct(producto,{stock:stock - quantity})
              await CartService.service.deleteProduct(carrito,producto)

            })
            const compraTotal = productosComprados.reduce((acc,item)=> acc+item.quantity,0)
            const precioTotal = productosComprados.reduce((acc,item)=> acc+item.producto.price* item.quantity,0).toFixed(3)

            if(!productosComprados.length){
                res.status(404).send({status:'Error',msg:'No hay stock suficiente de los productos', payload:constrolStock.map(prod=>prod.tittle)})
                
            }
            if(productosComprados.length >0){
                const ticket = await TicketService.createTicket({code:uuidv4,amount:compraTotal, purchaser: req.user.mail})
                await sendMail.sendMail({
                    from: configObject.gmailUser,
                    to: req.user.email,
                    subject: "Gracias por su compra",
                    html:  `<div>
                                <h1>
                                    Gracias por su compra, el total para pagar es ${precioTotal}$
                                </h1>
                            </div>`

                }) 
                return res.send({status:'success',msg:'Compra exitosa', toTicket:ticket})
            }

        } catch (error) {   
            console.log(error)
        }
    }
}


module.exports = CartController


