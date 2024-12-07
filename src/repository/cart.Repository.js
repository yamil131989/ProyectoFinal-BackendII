class CartRepository {
    constructor(dao){
        this.dao = dao
    }
    createCart = async() => await this.dao.create()
    getCarts = async () => await this.dao.get()
    getCartById = async(cid) => await this.dao.getCart(cid)
    
    //funcionalidades de producto
    modifyProduct = async(cid,pid) => await this.dao.modifyProduct(cid,pid) //verificar
    cleanCart = async(cid) => await this.dao.cleanCart(cid) //verificar
    deleteProduct = async(cid,pid) => await this.dao.deleteOne(cid,pid) // verificar
    deleteCart = async(cid) => await this.dao.delete(cid)


}

module.exports = {CartRepository}