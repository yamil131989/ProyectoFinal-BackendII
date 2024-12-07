const {ticketModel} = require('../models/tickets.model.js')

class TicketDaoMongo { 
    constructor(){
        this.model = ticketModel
    }

    get = async () => await this.model.find({})
    create = async () => await this.model.create(ticket)
    getById = async (tid) => await this.model.findById(tid)

    
}

module.exports = TicketDaoMongo