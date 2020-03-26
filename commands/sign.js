const DB = require('../dbController.js')
module.exports = {
    'name': 'sign',
    async exec(msg, args, client) {
        var guild = DB.getGuild(msg)
        if (guild.owner) {
            msg.author.send(`Хозяин бота на сервере \`${msg.guild.name}\` уже назначен!`)
            return 0
        } else {
            guild.owner = msg.author.id
        }
        await DB.addToGuild(msg, 'owner', msg.author.id)

        msg.author.send(`Вы назначены хозяином бота на сервере \`${msg.guild.name}!\``)
    }
}