const passport = require('passport')
const { createHash, isValidPassword } = require('../utils/bcrypthash.js')

const { generateToken } = require('../utils/jwt.js')



const { UserService, CartService } = require("../services/index.js")
const { PerfilDto } = require('../dto/perfilDto.js')



class UserController {
    constructor(){
        // this.service = new ProductDaoMongo()
        this.service = UserService
    }


    getUsers = async (req,res) =>{
        try {
            const usersDB = await this.service.getUsers()
            const users = usersDB.map((user => new PerfilDto(user)))

            res.render('PanelUsuario', {title:'Usuarios',style:'panelUsuario.css',users})
            
        } catch (error) {
            console.log(error)
        }
    }

    getUserById = async (req,res)=>{
        try {
                        
            const {userId} = req.params
            const user = await this.service.getUser({_id: userId})
            
            if(!user)
                console.log(user)
                res.status(404).send({status:'Error',msg:'Usuario no encontrado'})
            res.status(200).send({status:'success',payload:user})
         } catch (error) {    
            console.log(error)            
        }
    }

    deleteUser = async (req,res)=>{
        try {
            const {uid} = req.params
            const user = await this.service.getUser({_id:uid})

            if(user){
                await this.service.deleteUser({_id:uid})
                await CartService.deleteCart({_id: user.cart._id})
                res.status(200).send({status:'success',payload:user})
            } else {
                res.status(400).send({status:'Error',msg:'Error eliminando el usuario '})
            }
        } catch (error) {
            console.log(error)
        }
    }

    updateUser = async(req,res)=>{
        try {
            const {uid} = req.params
            const newUser = req.body
            const user = await this.service.getUser({_id:uid})

            const flagResult = await this.serviece.updateUser({_id:uid},newUser)

            if(!flagResult)
                res.status(404).send({status:'Error',msg:'Ocurrio un error actualizando el usuario'})    
            res.status(200).send({status:'success',msg:'Usuario actualizado correctamente',payload:user})

        } catch (error) {
            console.log(error)
        }
    }

  
}

module.exports = UserController
