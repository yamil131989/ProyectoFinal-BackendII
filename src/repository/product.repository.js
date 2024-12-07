class ProductRepository {
    constructor(dao){
        this.dao = dao
    }
    getProducts = async () => await this.dao.get()
    createProduct = async newproduct => await this.dao.create(newproduct)

    //VERIFICAR
    addProduct = async (title,description,code,price,stock,status,thumbnail,category,create) => await this.dao.create({title,description,code,price,stock,status,thumbnail,category,create})
    
    updateProduct = async(id,dataBody) => await this.dato.update(id,dataBody)

    deleteProduct = async(pid) => await this.dao.delete(pid)

}

module.exports = {ProductRepository}