const { UserService, PerfilService } = require("../services")
const { createHash, isValidPassword } = require("../utils/bcrypthash.js")

const {TokenGenerado} = require('../utils/jwt.js')



class SessionController {
    
    register = async(req,res) =>{
        try {
            // const{first_name , last_name, email, password, role} = req.body 
            const{first_name , last_name, email, password} = req.body

            if(!first_name || !last_name|| !email|| !password)    return res.status(400).send({staus:'Error',msg:'Faltan campos requeridos'})
                        
            const emailCheck = await UserService.getUser({email})
            if(emailCheck) return res.status(400).send({status:'Error',msg:'El usuario ya esta registrado, olvidaste tu contraseña?'})
            
            //
            let token = TokenGenerado({first_name,last_name,email})
            const user = await UserService.createUser({first_name,last_name,email,password:createHash(password)}) //mas datos?
            if(!user)
                res.status(500).send({status:'error',msg:'Ups Hubo un problema con el registro, verifica los datos'})
            res.status(200).send({status:'success',msg:'Usuario registrado correctamente',token})
        } catch (error) {
            console.log(error)
        }
    }
    login = async(req,res) =>{
        try {
            const {email,password} = req.body
            const user = await UserService.getUser({email})
            if(email === ""||password === "") return res.status(400).send({status:'Error',msg:'Controle los datos ingresados.'})
            if(!isValidPassword(user,password)) return res.status(400).send({status:'Error',msg:'Password incorrecta'})
            
            
            //Validacion admin 
            if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
                await UserService.updateUser({_id:user},{role:'admin'})
            }

            let token = TokenGenerado(user)
            if (req.user.role){
                res.status(200).cookie('Tokencookie',token,{maxAge:60 * 60 *1000, httpOnly:true}).send({status:'success',msg:`Bienvenido: ${user.first_name}`})
            } else {
                res.status(404).send({status:'Error',msg:'Error al loguearse, intentelo nuevamente'})
            }            

        } catch (error) {
            console.log(error)
        }
    }
    changePassword =  async(req,res)=>{
        try {
            const user = req.user
            const {password,verifyPassword} = req.body

            if(password == '' || verifyPassword == ''){
                return res.status(400).send({status:'Error',msg:'Complete todos los campos'})
            }
            if(verifyPassword !== password){
                return res.status(400).send({status:'Error',msg:'Las passwords no coinciden'})
            }

            if(!isValidPassword(verifyPassword,user)){
                await UserService.updateUser({_id: user._id},{password: createHash(verifyPassword)})
                res.status(200).send({status:'success',msg:'Password actualizada correctamente'})
            } else {
                res.status(500).send({status:'Error',msg:'Debes ingresar una contraseña nueva'})
            }

        } catch (error) {
            console.log(error)
        }
    }
    current = async(req,res)=>{
        try {
            const {email} = req.user
            const perfil = await PerfilService.getPerfil({email})

            if(perfil){
                res.status(200).send({status:'success',payload:perfil})
            } else {
                res.status(404).send({status:'Error',msg:'No existe informacion '})
            }
        } catch (error) {
            console.log(error)
        }
    }


    logout = async(req,res)=>{
        try {
            res.clearCookie('Tokencookie').redirect('/login')
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = SessionController