const {Router} = require('express')
const { passportCall } = require('../passport/passportCall')
const { autenticacionAdv } = require('../passport/authorization')
const TicketController = require('../controller/ticket.controller')

const router = new Router()
const {
    getTicket,
    getTickets    
    
} = new TicketController()

router.get('/:tid',passportCall('jwt'),autenticacionAdv(['admin','user','user_premium']),getTicket)
router.get('/',passportCall('jwt'),autenticacionAdv(['admin']),getTickets)

module.exports = router
