const { error } = require('console')
const fs = require('fs')
const path = './dbjson/productsdb.json'



class ProductsManagerFs {
    constructor(){ 
        this.path = path
    }
    readProducts = async ()=>{
        try {
            if(fs.existsSync(path)){
                const productsJson = await fs.promises.readFile(path,'utf-8')
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
    getProducts = async ()=>{
        try {
        //return await this.readProducts()
            const products = await this.readProducts()
            return products    
        } catch (error) {
            console.log(error)
        }
                    
    }
        
   

    createProduct = async newProduct =>{
        if(
            !newProduct.title ||
            !newProduct.description ||
            !newProduct.code ||
            !newProduct.price ||
            !newProduct.status ||
            !newProduct.stock
        )  
        {            
            return ("Producto incompleto")
        }        
        try {
            const products = await this.readProducts()
            if(products.length === 0 ){
                newProduct.id = 1
            } else {
                newProduct.id = products[products.length-1].id + 1
            }
            products.push(newProduct) 
            await fs.promises.writeFile(path,JSON.stringify(products,null,'\t')) //sobreescibimos en la ruta
            return newProduct 

        } catch (error) {
            console.log(error)
        }

    }
    getProduct = async (id)=>{
        try {            
            const productos = await this.readProducts()            
            let producto = productos.find(prod =>prod.id === id)
            if(producto){               
                return producto
            }else{
                return ('producto no encontrado')
            }             
           
        } catch (error) {
            console.log(error)
        }
    } //buscar 1 producto especifico
    updateProduct = async (id,product)=>{ 
        try {            
            let producto = await this.getProduct(id)
            console.log(producto)
            if(!producto) return "Producto no encontrado"
            await this.deleteProduct(id)
           
            //console.log(JSON.stringify(product))
            let productosPrevios = await this.readProducts()
            let productos = [{...product,id:id}, ...productosPrevios]
            await fs.promises.writeFile(path,JSON.stringify(productos,null,'\t'))
            
            return "Producto actualizado"
            }            
            catch (error) {
            console.log(error)
            }
    } 

    deleteProduct = async (id)=>{
        try {
            let productos = await this.readProducts()
            let prodExistentes = productos.some(prod=>prod.id === id)
            if (prodExistentes){
                let prodFiltrados = productos.filter(prod => prod.id != id)
                
                await fs.promises.writeFile(path,JSON.stringify(prodFiltrados,null,'\t'))
                return prodFiltrados
            } else {
                return "producto no encontrado"
            }
        } catch (error) {
            console.log(error)
        }
    } 

}


module.exports = ProductsManagerFs