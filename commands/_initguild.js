const DbController = require('../dbController.js')
const Discord = require('discord.js')
module.exports = {
    "name": "initguild",
    async exec(msg, args, client) {
        console.log('dev: INITIALIZING GUILD INFO...')

        await DbController.initGuild(msg)

        console.log('dev: INITIALIZED GUILD INFO.')
    }
}