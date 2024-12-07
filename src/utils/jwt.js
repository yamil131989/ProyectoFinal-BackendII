const jwt = require('jsonwebtoken')
require('dotenv').config

const PRIVATE_KEY = process.env.PRIVATE_KEY

//const generateToken = user => jwt.sign(user, PRIVATE_KEY, {expiresIn: '1d'})
const TokenGenerado = (user) =>{ jwt.sign(JSON.parse(JSON.stringify(user),PRIVATE_KEY,{expiresIn:"1d"}))}



const authTokenMiddleware = (req, res, next) => {
    /// lo que viene en headers
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    if(!authHeader) return res.status(401).send({status: 'error', error: 'not authenticated'})
    
    const token = authHeader.split(' ')[1]
    jwt.verify(token, PRIVATE_KEY, (error, dataToken) => {
        if(error) return res.status(401).send({status:'error',msg:'not authenticated'})
        req.user = dataToken.user
        // if (dataToken.role !== 'admin') {
        //     return res.send('chau')
        // }        
        next()
    })
}

module.exports = {
    TokenGenerado,
    authTokenMiddleware
}