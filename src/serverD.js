const express                = require("express")
const handlebars             = require("express-handlebars")
const cookieParser           = require("cookie-parser")
const session                = require("express-session")
const mongoStore             = require("connect-mongo")
const passport               = require("passport")
const cors                   = require("cors")
const {connectDB} = require('./config/index.js')

const { Server: ServerHTTP}  = require("http")
const { Server: ServerIO }   = require("socket.io")


const initializePassport = require('./passport/passport.config.js')




require("dotenv")


const app                    = express()
const serverHttp             = new ServerHTTP(app)
const socketServer           = new ServerIO(serverHttp)
const PORT                   = process.env.PORT

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use("/static", express.static(__dirname+"/public"))
app.use(cors())
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine", "handlebars")


app.use(cookieParser("palabrasecreta"))
app.use(session({
    store: mongoStore.create({
        mongoUrl: process.env.MONGO_URL,
    }),
    secret : "secreto", resave: false, saveUninitialized: false
}))

initializePassport()

passport.use(passport.initialize())
passport.use(passport.session())



const CartRouter = require('./routes/carts.router.js')
const userRouter = require('./routes/user.router.js')
const sessionRouter = require('./routes/sessions.router.js')
const productRouter = require('./routes/products.router.js')
const ticketRouter = require('./routes/ticket.router.js')
const profileRouter = require('./routes/profile.router.js')
const viewsRouter = require('./routes/views.router.js')

connectDB()


app.use('/',viewsRouter)
app.use('/api/users',userRouter)
app.use('/api/session',sessionRouter)
app.use('/api/products',productRouter)
app.use('/api/carts',CartRouter)
app.use('/api/tickets',ticketRouter)
app.use('/profile',profileRouter)

const startServer = async () => {
    try {
      await connectDB();  // Esperar que la base de datos se conecte
      serverHttp.listen(PORT, () => {
        console.log(`Servidor ejecutándose en el puerto: ${PORT}`);
      });
    } catch (error) {
      console.error("No se pudo iniciar el servidor:", error);
    }
  };
  
  startServer();
