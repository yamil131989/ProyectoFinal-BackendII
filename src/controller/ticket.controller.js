const { TicketService } = require("../services");

class TicketController {
    constructor(){
        // this.service = new ProductDaoMongo()
        this.service = TicketService
    }

    getTickets = async (req,res) =>{
        try {
            const tickets = await this.service.getTickets()
            if(tickets){
                res.send({status:'success',payload:tickets})
            } else {
                res.send(404).send({status:'Error',msg:'No se encontraron tickets'})
            }

        } catch (error) {
            console.log(error)
        }
    }



    getTicket = async (req,res)=>{
        try {
            const {tid} = req.params
            const ticket = await this.service.getTicket(tid)

            if(!ticket) res.status(404).send({status:'Error',msg:'No existe el ticket'})
                res.status(200).send({status:'success',payload:'ticket'})
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = TicketController