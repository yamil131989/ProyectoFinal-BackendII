const dotenv = require('dotenv')
const program = require('../utils/commander.js')

program.parse(process.argv)

const { mode } = program.opts()
dotenv.config({ path: mode === 'development' ? './.env.development' : './.env.production'})


const configObject = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    PERSISTENCE: process.env.PERSISTENCE || 'MONGO',
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    gmailUser: process.env.GMAIL_USER,
    gmailPassword: process.env.GMAIL_PASS,
}

module.exports = {configObject} 