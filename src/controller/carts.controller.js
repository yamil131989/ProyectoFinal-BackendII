const { configObject } = require("../config/config.js")
const { CartService, ProductService, TicketService, } = require("../services/index.js")
const {v4:uuidv4} = require('uuid')


class CartController {
    constructor(){
        // this.service = new ProductDaoMongo()
        this.service = CartService
    }
    getCarts = async (req,res)=>{
        try {
            const carts = await this.service.getCarts()
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
            const cart = await this.service.create({})
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
            const carrito = await this.service.getCartById({_id:id})
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
                await this.service.addProduct(cid,pid)
                res.status(200).send({status:'success',msg:`Producto ${producto.tittle} agregado correctamente `})
            }

        } catch (error) {
            console.log(error)
        }
    }
    deleteProd = async (req,res) =>{
        try {
            
            const {cid,pid} = req.params
            const carrito = await this.service.deleteProd(cid,pid)
    
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
            const carrito = await this.service.cleanCart(cid)
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
            const carrito = await this.service.getCartById(cid)
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
              await this.ProductService.updateProduct(producto,{stock:stock - quantity})
              await this.service.deleteProduct(carrito,producto)

            })
            const compraTotal = productosComprados.reduce((acc,item)=> acc+item.quantity,0)
            const precioTotal = productosComprados.reduce((acc,item)=> acc+item.producto.price* item.quantity,0).toFixed(3)

            if(!productosComprados.length){
                res.status(404).send({status:'Error',msg:'No hay stock suficiente de los productos', payload:constrolStock.map(prod=>prod.tittle)})
                
            }
            if(productosComprados.length >0){
                const ticket = await TicketService.createTicket({code:uuidv4,amount:compraTotal, purchaser: req.user.mail})
                await transport.sendMail({
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


// // getCartsbyId = async  (req,res)=>{
// //     try {
// //         const {cid} = req.params
// //         // const cart = await cartModel.findById(cid).populate('products.id')
// //         const cart = await this.service.getOne(cid).populate('products.id')
        
// //         if(cart)
// //              return res.json({cart})
// //         res.status(404).json({msg:"Carrito no existe"})
// //      } catch (error) {    
// //         console.log(error)
// //         // return res.status(401).json({msg:'Server Error , obteniendo el carrito '})
// //     }
// // }
// getCartsbyId = async (cid)=>{
//     try {
        
//         // const cart = await cartModel.findById(cid).populate('products.id')
//         const cart = await this.service.getOne(cid)
//         // console.log(cart)
//         if(cart)
//              return cart
//         return null 
//      } catch (error) {    
//         console.log(error)
//         // return res.status(401).json({msg:'Server Error , obteniendo el carrito '})
//     }
// }
// addProductToCart= async (req,res)=>{
//     try {
//         const {cid,pid} = req.params

//         // const cart = await cartModel.findById(cid) //getone
//         const cart = await this.service.getOne(cid) //getone
//         console.log("eL CARRITO Es ",cart._id)
      

//         if(!cart)
//             return res.status(404).json({msg:"El Carrito no existe"})            
        
//         // const prod = this.service.products.find(prod=>prod.id.toString()===pid) 
//         const productoexistente = ProductService       
//         // const exiteProduct = productoexistente.find(prod=>prod.id.toString()===pid)
//         // console.log("exiteproduct ", exiteProduct._id)
//         // const prod = this.service.products.find(prod=>prod.id.toString()===pid)        
//         const prod = this.service.getOneProduct(prod=>prod.id.toString()===pid)
//         console.log('El producto es',prod._id)
// //PROBANDO NUEVAS FORMAS


// //++++++


//         // console.log({prod})    
//         // const prodinCart = cart.products.find(prod=>prod.id.toString() === pid)  //getoneproduct          

//         // const prodinCart = this.service.getOneProduct(prod=>prod.id.toString() === pid)  //getoneproduct          
    
//         // const prodinCart = this.service.getOneProduct()  //getoneproduct          
//         const prodinCart = this.service.getOneProduct(prod)


//         if(prodinCart){
//             prodinCart.quantity++                
//         } else {
//             cart.products.push({id:pid,quantity:1})
//         }
        
//         cart.save()
//         return res.json({msg:"Producto agregado",cart})            

//     } catch (error) {    
//         console.log(error)
//         return res.status(500).json({msg:'Server Error , agregando el producto al carrito '})
//     }
// }
// deleteProductinCart= async (req,res)=>{
//     try {
//         const {cid,pid} = req.params
//         // const cart = await cartModel.findByIdAndUpdate(cid,{$pull:{'products':{id:pid}}},{new:true})
//         const cart = await this.CartService.delete(cid,{$pull:{'products':{id:pid}}},{new:true})

//         if(!cart)
//             return res.status(404).json({msg:"No se pudo eliminar el producto"})
//         return res.json({msg:"Producto eliminado",cart})

//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({msg:'Server Error , eliminando el producto al carrito '})
//     }
// }
// updateproductinCart= async (req,res)=>{
//     try {
//         const {cid,pid} = req.params
//         const {quantity} = req.body
        
//         if(!quantity|| !Number.isInteger(quantity))
//             return res.status(900).json({msg:"Ingresar quantity numerico"})

//         // const cart = await cartModel.findOneAndUpdate({_id:cid,'products.id':pid},{$set:{'products.$.quantity':quantity}},{new:true})
//         const cart = await this.CartService.update({_id:cid,'products.id':pid},{$set:{'products.$.quantity':quantity}},{new:true})

//         if(!cart)
//             return res.status(404).json({msg:"No se pudo eliminar el producto"})
//         return res.json({msg:"Producto modificado",cart})

//      } catch (error) {    
//         console.log(error)
//         return res.status(500).json({msg:'Server Error , obteniendo el carrito '})
//     }
// }
// deleteCart= async (req,res)=>{
//     try {
//         const {cid} = req.params
//         // const cart = await cartModel.findByIdAndDelete(cid)
//         const cart = await this.service.delete(cid)

//         if(!cart)
//             return res.status(4049).json({msg:"No se pudo eliminar el carrito"})
//         return res.json({msg:"Carrito eliminado",cart})
//     } catch (error) {
        
//     }
// }
// getCartsbyIdHandle= async (req,res)=>{
//     try {
//         const {cid} = req.params
//         // const result = await cartModel.findById(cid).populate('products.id').lean()
//         const result = await this.service.getOne(cid).populate('products.id').lean()

//         console.log(result)
//         return result
                              
//       } catch (error) {    
//          console.log(error)
         
//      }
// }