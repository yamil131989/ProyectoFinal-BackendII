// const { productModel } = require("../daos/models/products.model")
//// const ProductDaoMongo = require("../daos/Mongo/productDaoMongo")
const { configObject } = require("../config/config")
const { ProductService } = require("../services")
const {uuid} = require('uuid')



class ProductController {
    constructor(){
        // this.service = new ProductDaoMongo()
        this.service = ProductService
    }
    

        getProducts = async (req,res) =>{
            try {
                // const productosDB = await productModel.find({})
                const {page} = req.query
                const {sort="asc"} = req.query



                let productos = await this.service.getProducts(page,sort)
                const { Tdocs, hasPrevPage,hasNextPage,prevPage,nextPage,totalPages} = productos

                if(page > totalPages || page <1) return res.status(404).send({status:'Error',msg:'Pagina no encontrada'})
                if(!productos) return res.status(404).send({status:'Error',msg:'No se han encontrado productos'}) 

                res.render('home',{
                    title:'Home',
                    productos:Tdocs,
                    hasPrevPage,
                    hasNextPage,
                    prevPage,
                    nextPage,
                    totalPages,
                    page,
                    user:req.user
                })


            } catch (error) {
                console.log(error)
            }
        }

        getProduct = async (req,res) =>{
            try {
                const {pid} = req.params
                let producto = await this.service.getProduct({_id:id})

                if(!producto) return res.status(404).send({status:'Error',msg:'No se ha encontrado el producto'}) 
                res.status(200).send({status:'success',payload:producto})

                // const product = await  productModel.findById(id).lean()
                // const product = await this.service.getOne(pid).lean()                                        
            
                } catch (error) {    
                console.log(error)        
            }
        }

        createProduct = async (req,res) =>{
            try {
                // // const {body} = req.body
                //  console.log({body})
                const {title,description,price,stock,status,category,code} = req.body
                        
                if(!title,!description,!code,!price,!stock,!status,!category)   res.status({status:'Error',mgs:'Faltan datos'})
                    // return res.status(500).json({msg:'Faltan datos para ingresar el producto'})

                // const product = await productModel.create({title,description,code,price,stock,status,thumbnail,category,create})        
                
                //Implementacion de codigo random no definido por usuario
                //const code = uuid()
                let prodCode = await this.service.getProduct({code})
                
                if(prodCode) res.status(401).send({status:'Error',msg:'Codigo ya registrado'})
                const product = await  this.service.create({title,description,code,price,stock,status,thumbnail,category,create})        
                if(product){
                    res.status(200).send({status:'success',payload:product})
                } else {
                    res.status(404).send({status:'Error',msg:'Algo salio mal'})
                }
                
            } catch (error) {    
                console.log(error)            
            }
        }

        updateProduct =  async (req,res) =>{
            try {
                const {pid} = req.params
                // const {_id, ...rest} = req.body
                const DataBody = req.body
                
                // const product = await productModel.findByIdAndUpdate(id, {...rest},{new:true}) //doc
                // const product = await this.service.update(pid, {...rest},{new:true}) //VERIFICAR
                const product = await this.service.getProduct({_id:pid})

        
                if(!product) return res.status(404).send({status: 'Error',msg:'No se encontro el producto'})
                
                const updateProduct = async (pid, DataBody) =>{
                    await this.service.updateProduct(pid,DataBody)
                    res.status(200).send({status:'success',msg:'Producto actualizado'})
                }
                if(req.user.role !== 'admin') res.status(401).send({status:'Error',msg:'No tienes permiso para modificar productos'})
                updateProduct(pid,DataBody)
                 
            } catch (error) {    
                console.log(error)
                
            }
        }
        deleteProduct = async (req,res) =>{
            try {
                const {pid}  = req.params
                // const product = await productModel.findByIdAndDelete(id)
                const producto = await this.service.getProduct({_id:pid}) 

                if(!producto)   return res.status(404).send({status:'Error',msg:'Producto no encontrado'})    
                
                const prodDeleteado = async(pid) => {
                    await this.service.deleteProduct(pid)
                    res.status(200).send({status:'success',msg: 'Producto removido'})
                }
                if(req.user.role !== 'admin')   res.status(401).send({status:'Error',msg:'No tienes permiso para eliminar productos'})
                prodDeleteado(pid)


                //mailing
                transport.sendMail({
                    from:configObject.gmailUser,
                    to: req.user.email,
                    html:
                    `
                    <div>
                        <h1> Se ha removido el producto </h1>
                    </div>
                    `
                }) 
                        
                

                // return res.status(200).send({status:'success',msg:'El producto ha sido eliminado',product})        
            } catch (error) {    
                console.log(error)
            
            }
        }        
    
}


module.exports = ProductController

// const ProductDaoMongo = require("../daos/Mongo/userDaoMongo")

// const productController = new UserDaoMongo()


// exports.getProducts =async (req = request,res=response) =>{
//     try {
//         let { limit , page = 1, query ,sort} = req.query
//         page= page==0 ? 1 :page
//         page = Number(page)

//         limit = Number(limit)
        
//         const Tdocs = (page - 1) * Number(limit)

//         const OrdenSort = {'asc':-1,'desc':1}
//         sort = OrdenSort[sort] || null

//         if(query){
//             query = JSON.parse(decodeURIComponent(query))
//         } else { 
//             query = {}
//         }


//         const total = await productModel.countDocuments()
//         let products = await productModel.find(query).limit(Number(limit)).skip(Tdocs)            


//         if(sort !== null){
//            products = await productModel.find(query).limit(Number(limit)).skip(Tdocs).sort({price:sort})
//         } 


//         //paginado
//         const totalPages = Math.ceil(total/Number(limit))        

//         const hasPrevPage = page > 1
//         const hasNextPage = page < totalPages
//         const prevPage = hasPrevPage ? page -1 : null
//         const nextPage = hasNextPage ? page +1 :null

//         //const prevLink = hasPrevPage ? `/products?limit=${Number(limit)}&page=${prevPage}&query=${query}&sort=${sort}` : null
//         const prevLink = hasPrevPage ? `/products?limit=${Number(limit)}&page=${prevPage}` : null
// //            const nextLink = hasNextPage ? `/products?limit=${Number(limit)}&page=${nextPage}&query=${query}&sort=${sort}` : null;
//         const nextLink = hasNextPage ? `/products?limit=${Number(limit)}&page=${nextPage}` : null;


//         const objeto = {
//             status: true,
//             payload: products,
//             totalPages:0,
//             prevPage,
//             nextPage,
//             page:page,
//             hasPrevPage,
//             hasNextPage,
//             prevLink,
//             nextLink
//         }
//         const result = {
//             Tdocs,
//             total,
//             totalPages,
//             prevPage,
//             nextPage,
//             page,
//             hasPrevPage,
//             hasNextPage,
//             prevLink,
//             nextLink,
//             payload: products
//         }

//         return res.json({result})



//     } catch (error) {    
//         console.log(error)       
//     }
// }