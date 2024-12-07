const passport = require('passport')
const jwt = require('passport-jwt')
const { configObject } = require('../config/config.js')


const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const initializePassport = ()=>{
    //extrae las cookie del req
    const cookieExtractor = req => {
        let token = null
        if(req && req.cookies){
            token = req.cookies['tokenCookie']
        }
        return token
    }
    //middleware 
    passport.use('jwt',new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: configObject.PRIVATE_KEY //firma de token
    }, async (jwt_payload, done)=>{
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))
}


//jwt_payload contenido del token desencriptado


module.exports = initializePassport
