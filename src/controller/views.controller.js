
class ViewsController {    

    VistaLogin = (req,res)=>{
        res.render('login',{title:'Login'})
    }
    VistaRegister = (req,res)=>{
        res.render('register',{title:'Register'})
    }
    VistachangePassword = (req,res)=>{
        res.render('changPassword',{title:'Recuperar Password'})
    }

    //Listado de usuarios
    VistagetUsers = (req,res)=>{
        res.render('users',{title:'Lista de usuarios'})        
    }
    //Listado de productos
    VistaRealtimeProducts = (req,res)=>{
        res.render('realTimeProducts',{title:'RealTimeProducts'})
    }
    //Vista del perfil
    VistaCurrent = (req,res)=>{
        res.render('Perfil',{title:'Perfil'})
    }
}
module.exports = ViewsController