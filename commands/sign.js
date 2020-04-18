const DB = require('../dbController.js')
const Discord = require('discord.js')
module.exports = {
    'name': 'sign',
    'description': '.',
    'onlyOwner': false,

    /**
    * @param {Discord.Message} msg 
    */
    async exec(msg, args, client) {
        let owner = await DB.getGuildField(msg, 'owner')

        if (owner) {
            msg.author.send(`Хозяин бота на сервере \`${msg.guild.name}\` уже назначен!`)
            return 0
        }
        await DB.addToGuild(msg, 'owner', msg.author.id)
        msg.author.send(`Вы назначены хоязином бота на сервере \`${msg.guild.name}\`!`)
    }
}