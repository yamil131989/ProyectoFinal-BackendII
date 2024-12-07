const express       = require('express')
const logger        = require('morgan')
const {connectDB}   = require('./config/index.js')
//const appRouter     = require('./routes/')
//const {initializePassport} = require('./config/passport.config.js')
const {initializePassport} = require('./passport/passport.config.js' )
const passport      = require('passport')


const cors =require('cors')

//SOCKET ******************************
const {Server} = require('socket.io')
const {engine} = require('express-handlebars')
// const { productModel } = require('./daos/models/products.model.js')
const cookieParser = require('cookie-parser')
//******************************************* */

const app = express()
const PORT = 8080


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(cors())
//app.use(logger('dev'))

app.engine('handlebars',engine())
app.set('view engine','handlebars')
app.set('views',__dirname+'/views')

// endpoint
app.use(cookieParser('palabrasecreta'))

//router

const CartRouter = require('./routes/carts.router.js')
const userRouter = require('./routes/user.router.js')
const sessionRouter = require('./routes/sessions.router.js')
const productRouter = require('./routes/products.router.js')
const ticketRouter = require('./routes/ticket.router.js')
const profileRouter = require('./routes/profile.router.js')
const viewsRouter = require('./routes/views.router.js')



//app.use(appRouter)

//Passport JWT
initializePassport()
app.use(passport.initialize())


app.use((error, req, res, next) => {
    console.log(error.stack)
    res.status(500).send('error de server')
})

app.use('/',viewsRouter)
app.use('/api/users',userRouter)
app.use('/api/session',sessionRouter)
app.use('/api/products',productRouter)
app.use('/api/carts',CartRouter)
app.use('/api/tickets',ticketRouter)
app.use('/profile',profileRouter)





const httpServer = app.listen(PORT,()=>{
    console.log(`Listening : ${PORT}`)
})

//base de datos mongo
connectDB()



// const io = new Server(httpServer)

// io.on('connection', async(socket) =>{  
//     console.log("Cliente conectado")
//     const productos = await productModel.find()
//     // socket.emit('productos',productos)
//     socket.emit('realTimeProducts',productos)


//     socket.on('addProducto',async(product)=>{
    
//         //const result = prodManagerFs.createProductwebsocket(newproduct)
//         const nwproduct = await productModel.create({...product})
//         if(nwproduct)
//             productos.push(nwproduct)
//             console.log(productos)
//             // socket.emit('productos',productos)
//             socket.emit('realTimeProducts',productos)

    
//     })
// })
