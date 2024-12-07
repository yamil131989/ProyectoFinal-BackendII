const {Command} = require('commander')

const program = new Command()

program
        .option('-p <PORT>','Define el puerto del servidor', 8080)
        .option('-m , --mode <MODE>', 'Define el modo de trabajo -development o -production','development')
        

module.exports = program