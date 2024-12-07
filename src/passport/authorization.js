const autenticacion = role =>{
    return async (req, res, next) => {
        if(!req.user){            
            return res.status(401).send({error: 'Unauthorized'})
        }    
        if(req.user.role !== role){
            return res.status(401).send({error: 'Acceso usuario Sin permisos especiales '})
        } 
        next()
    }
}
const autenticacionAdv = role =>{
    return async (req, res, next) => {
        const getRole = role.find(role => role == req.user.role)
        if(!req.user){            
            return res.status(401).send({error: 'Unauthorized'})
        }    
        if(req.user.role !== getRole){
            return res.status(401).send({error: 'Acceso usuario Sin permisos especiales '})
        } 
        next()
    }
}


module.exports = {autenticacion,autenticacionAdv}