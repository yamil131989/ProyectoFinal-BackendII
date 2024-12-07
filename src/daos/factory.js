
const {config, configObject} = require('../config/config.js');


const { connectDB } = require('../config/index.js');

let ProductDao 
let CartDao 
let UserDao
let TicketDao 



switch(configObject.persistence) {
    case "FILESYSTEM":
        config.connectDB()
        const ProductDaoFs = require('./FileSystem/productsDaoFs.js')
        const CartDaoFs = require('./FileSystem/cartsDaoFs.js')
        const UserDaoFs = require('./FileSystem/usersDaoFs.js')
        const TicketDaoFs = require('./FileSystem/ticketsDaoFs.js')

        ProductDao = new ProductDaoFs()
        CartDao = new CartDaoFs()
        UserDao = new UserDaoFs()
        TicketDao = new TicketDaoFs()
       
        break;

    case "MEMORY":
        config.connectDB()
        
        const MemoryProductsDAO = require('./Memory/productsDaoMemory.js')        
        //completar
        break;         


    case "MONGO" :
        configObject.connectDB()
        const ProductDaoMongo = require('./Mongo/productDaoMongo.js')
        const UserDaoMongo = require('./Mongo/userDaoMongo.js')
        const TicketDaoMongo = require('./Mongo/ticketDaoMongo.js')
        const CartDaoMongo = require('./Mongo/cartDaoMongo.js')

        ProductDao = new ProductDaoMongo()
        UserDao = new UserDaoMongo()
        TicketDao = new TicketDaoMongo()
        CartDao = new CartDaoMongo()
        
        break;
   
}

module.exports = {ProductDao,UserDao,CartDao,TicketDao}