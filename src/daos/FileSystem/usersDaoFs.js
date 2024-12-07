const fs = require('fs')
const path = './dbjson/usersDb.json'


class UserManagerFs { 
    constructor(){        
        this.path = path
    }


    readUsers = async () => {
        if(fs.existsSync(path)){
            const userJson = await fs.promises.readFile(path, 'utf-8')
            const usersJs = JSON.parse(usersJson)
            return usersJs
        } 
        return []        
    }

    // crud productos
    getUsers   = async () => {
        const users =  await this.readUsers()
        return users
    }

    getProduct    = async () => {}
    
    createProduct = async newUser => { //Copiado de profesor no sirve mal el id
        try {
            const users = await this.readUsers()
            // [1, 3, 4] -> 2 + 1 = 3
            if(users.length === 0){
                newUser.id = 1
            } else {
                newUser.id = users[users.length-1].id + 1
            }
            users.push(newUser)
            await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))
            return newUser
        } catch (error) {
            console.log(error)
        }
    }

    updateProduct = async () => {}
    deleteProduct = async () => {}
}

module.exports = UserManagerFs