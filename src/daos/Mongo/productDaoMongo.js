const { productModel } = require("../models/products.model")


class ProductDaoMongo {
    constructor(){
        this.model = productModel
    }
    delete = async (id) => await this.model.deleteOne({_id:id})
    update = async (id,dataBody) => await this.model.updateOne({_id:id},{dataBody})

    //obtener productos y parametros de filtrado en pagina
    get = async (page,sort) => {
        try {
            let OrdenSort = {}
            if (sort === 'asc') {
                OrdenSort = {price: 1}
            } else if (sort === 'desc') {
                OrdenSort = {price: -1}
            }
            return await this.model.paginate({},{limit:6,page:page,lean:true,sort:OrdenSort})
        }
          catch (error) {
            console.log(error)
        }
    }
    
    //getby
    getOne = async (data) => await this.model.findOne(...data)


    create = async newProduct => await this.model.create(newProduct)
    
    


    // getOne = async (id) => await this.model.findOne({id})



}

module.exports = ProductDaoMongo



    // async getProducts(){
    //     return await this.model.find(query).limit(limit).skip(Tdocs).lean()                      
    // }

    // async getProduct(){
    //     return await this.model.findById(id)           
    // }

    // async addProduct(filter){
    //     return await this.model.create(filter)
    // }

    // async deleteProduct(id){
    //     return await this.model.findByIdAndDelete(id)
    // }
    
    // async updateProduct(id, _id){
    //     return await this.model.findByIdAndUpdate(id, {...rest},{new:true})
    // }