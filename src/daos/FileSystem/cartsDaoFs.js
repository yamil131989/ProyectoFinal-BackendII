const fs = require('fs')
//const ProductsManagerFs = require('./products.manager.js')
const path = './dbjson/cartsdb.json'
const pathprod = './dbjson/productsdb.json'

class CartsManagerFs {
    constructor(){
        this.path = path
    }
    
    getCarts = async ()=>{
        try {
            if(fs.existsSync(path)){
            const carritos = await fs.promises.readFile(path,'utf-8')
            return JSON.parse(carritos)                                       
        }
        } catch (error) {
            console.log(error)
            return []  
        }
    }
 
        
    addCarts = async ()  => {  
        try {
            let carritos = await this.getCarts()            
            let id = carritos.length + 1                   
            let cartsConcat = [{id:id,products :[]}, ...carritos]
             await fs.promises.writeFile(path,JSON.stringify(cartsConcat,null,2)) 
             return carritos
            
        } catch (error) {
            console.log(error)
        }

    } 
    
   
    
    getCartbyId = async (id)=>{
        try {
            let carritos = await this.getCarts()                    
            const cartbuscado = carritos.find(carrito => carrito.id === id)
            if(!cartbuscado) return "Carrito no encontrado"
            return cartbuscado
            
        } catch (error) {
            console.log(error)    
        }        
    }     
    getProductToCart = async (cId,pId)=>{
        try {
            let carrito = await this.getCartbyId(cId)
            if(!carrito) return "carrito no encontrado"
            let producto = await this.getProduct(pId)            
            if(!producto) return "producto no encontrado"
            
            let carritos =await this.getCarts()

            let cartFiltrado = carritos.filter(prod => prod.id != pId)
            let cartConcat = [{id:cId,products : [{id:producto.id,cantidad:1}]}, ...cartFiltrado]
            console.log(cartConcat)
            await fs.promises.writeFile(path,JSON.stringify(cartConcat,null,2)) 
            return "Productos agregados al carrito"
        } catch (error) {
            console.log(error)
        }
    } 


    //Funcionalidad Productos
    readProducts = async ()=>{
        try {
            if(fs.existsSync(pathprod)){
                const productsJson = await fs.promises.readFile(pathprod,'utf-8')
                const productsJs = JSON.parse(productsJson)
                //console.log(`Esto es una prueba : ${productsJs}`)
                return productsJs
            }
              
        } catch (error) {
            console.log(error)
            return []  
        }
    }

    //crud
    getProduct = async (id)=>{
        try {            
            const productos = await this.readProducts()            
            let producto = productos.find(prod =>prod.id === id)
            if(producto){
                //console.log("dentro del getproduct"+producto)
                return producto
            }else{
                return ('producto no encontrado')
                return []
            }             
           
        } catch (error) {
            console.log(error)
        }
    }
}


module.exports = CartsManagerFs

/*
[
                        (producto entero)
    {id:"",producs:[{productID:'1',quantity:100}]}
]
Agregar un nuevo carrito
POST http://localhost:8080/api/carts/

*/
