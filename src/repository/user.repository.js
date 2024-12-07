class UserRepository {
    constructor(dao){
        this.dao = dao
    }
    getUsers = async () => await this.dao.get()
    createUser = async (newuser) => await this.dao.create(newuser)
    getUser = async (data) => await this.dao.getByUser(data)
    updateUser = async(uid,updateData) => await this.dao.update(uid,updateData)    
    deleteUser = async(uid) => await this.dao.delete(uid)
    
}

module.exports = {UserRepository}