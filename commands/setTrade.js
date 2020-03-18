const DB = require('../dbController.js')
module.exports = {
    "name": "setTrade",
    "description": "Устанавливает канал для трейда.",
    async exec(msg, args, client) {
        if (msg.author.id == await DB.getGuildField(msg, 'owner')) {
            if (!args[0]) {
                msg.reply('не указан id канала для трейда!')
                return 0
            }
            var tradeChannel = msg.guild.channels.get(args[0])
            await DB.addToGuild(msg, 'tradeChannel', tradeChannel.id)
            msg.reply(`успешно установил канал \`${tradeChannel.name}\` как канал для трейда!`)
        }
    }
}