class TicketRepository {
    constructor(dao){
        this.dao = dao
    }

    getTickets = async () => await this.dao.get()
    getTicket  = async(tid) => await this.dao.getById(tid)
    createTicket = async(data) => await this.dao.create(data)
    
}

module.exports = {TicketRepository }