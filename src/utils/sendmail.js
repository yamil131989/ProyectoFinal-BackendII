
const nodeMailer    = require("nodemailer")
const configObject  = require("../config/config")


const transport = nodeMailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: configObject.gmailUser,
        pass: configObject.gmailPassword
    }
})

exports.sendMail = async () =>{
    await transport.sendMail({
        from:` Mail enviado desde <${configObject.gmailUser}>`,
        to: 'jekyllhide2020@gmail.com ',
        subject:'Correo de prueba',
        html:` <div><h1>Email de prueba</h1></div>`
    })
}