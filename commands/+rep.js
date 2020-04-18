const DB = require('../dbController.js')
const Discord = require('discord.js')
module.exports = {
    "name": "+rep",
    "onlyOwner": false,

    /**
     * 
     * @param {Discord.Message} msg 
     * @param {object} args 
     * @param {Discord.Client} client 
     */
    async exec(msg, args, client) {
        let repTable = await DB.getGuildField(msg, 'repTable')

        if (!repTable) {
            await DB.addToGuild(msg, 'repTable', {})
            repTable = {}
        }

        let sender = msg.author.id
        let reciever = msg.mentions.users.first()

        if (!reciever) {
            msg.reply('не указан получатель!')
            return 0
        }

        if (!repTable[sender]) repTable[sender] = 0
        if (!repTable[reciever]) repTable[reciever] = 0

        if (repTable[sender] < args[1]) {
            msg.reply(`не могу отправить больше репутации, чем есть! (${repTable[sender]} < ${args[1]})`)
            return 0
        }

        repTable[reciever] += args[1]
        repTable[sender] -= args[1]

        await DB.addToGuild(msg, 'repTable', repTable)
    }
}