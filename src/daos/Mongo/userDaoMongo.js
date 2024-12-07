const { userModel } = require("../models/users.model.js")
const CartDaoMongo = require("./cartDaoMongo.js")

const cart = new CartDaoMongo()


class UserDaoMongo {
    constructor(){
        this.model = userModel
    }


    create = async ({first_name,last_name,email,password}) => await this.model.create({first_name,last_name,email,password,role,atCreated,cartID: await cart.create()})
    
    get = async () => await this.model.find()
    getByUser = async (userData) => await this.model.findOne({...userData})

    delete = async (id) => await this.model.deleteOne({_id:id})

    update = async(id,dataBody) => await this.model.updateOne({_id:id},dataBody) //Verificar 
    
    
  
}

module.exports = UserDaoMongo

