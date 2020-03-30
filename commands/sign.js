const DB = require('../dbController.js')
module.exports = {
    'name': 'sign',
    async exec(msg, args, client) {
        let owner = await DB.getGuildField(msg, 'owner')
        console.log(owner)

        if (owner) {
            msg.author.send(`Хозяин бота на сервере \`${msg.guild.name}\` уже назначен!`)
            return 0
        } else {
            await DB.addToGuild(msg, 'owner', msg.author.id)
            msg.author.send(`Вы назначены хозяином бота на сервере \`${msg.guild.name}!\``)
        }
    }
}