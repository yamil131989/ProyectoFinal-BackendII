// const CartDaoMongo = require("../daos/Mongo/cartDaoMongo.js");
// const ProductDaoMongo = require("../daos/Mongo/productDaoMongo.js");
// const UserDaoMongo = require("../daos/Mongo/userDaoMongo.js");
// const TicketDaoMongo = require('../daos/Mongo/ticketDaoMongo.js')

//Repository
const { CartRepository } = require('../repository/cart.Repository.js');
const { ProductRepository} = require("../repository/product.repository");
const {TicketRepository} =require('../repository/ticket.Repository.js');
const { UserRepository } = require('../repository/user.repository.js');
const {PerfilRepository} = require('../repository/perfil.Repository.js')


//factory.js
const {ProductDao,UserDao,CartDao,TicketDao} = require('../daos/factory.js');




const ProductService = new ProductRepository(ProductDao) 
const UserService = new UserRepository(UserDao)
const CartService = new CartRepository(CartDao)
const TicketService = new TicketRepository(TicketDao)
const PerfilService = new PerfilRepository(UserDao)



module.exports = {ProductService,UserService,CartService , TicketService, PerfilService}

