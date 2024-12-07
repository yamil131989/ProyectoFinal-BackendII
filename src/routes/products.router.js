const { Router } = require('express')
const ProductController = require('../controller/product.controller')
const { passportCall } = require('../passport/passportCall')
const { autenticacionAdv } = require('../passport/authorization')



// const { getProducts,getProduct,addProduct,updateProduct,deleteProduct } = require('../daos/products.dao.js')
const router = Router()

const {
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
} = new ProductController()


router.get('/', passportCall('jwt'),getProducts) 
router.post('/',passportCall('jwt'),autenticacionAdv(['admin']), createProduct) 

router.get('/:id',passportCall('jwt'), getProduct) 

router.put('/:id',passportCall('jwt'), autenticacionAdv(['admin']),updateProduct) 

router.delete('/:id',passportCall('jwt'),autenticacionAdv(['admin']),deleteProduct) 

module.exports = router
