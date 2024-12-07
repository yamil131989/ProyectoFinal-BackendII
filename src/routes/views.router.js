const { Router } = require('express')
const { passportCall } = require('../passport/passportCall')
const { autenticacionAdv } = require('../passport/authorization')
const ViewsController = require('../controller/views.controller')
const { sendMail } = require('../utils/sendmail')



const {
   VistaLogin,
   VistaRegister,
   VistachangePassword,
   VistagetUsers,
   VistaRealtimeProducts,
   VistaCurrent
} = new ViewsController()


const router = Router()

router.get('/login',VistaLogin)
router.get('/login/changPassword',VistachangePassword)
router.get('/register',VistaRegister)
router.get('/users',VistagetUsers)
router.get('/realtimeproducts',VistaRealtimeProducts)
router.get('/current',VistaCurrent)


router.get('email',async(req,res)=>{
   await sendMail()
   res.send('email enviado')
})

