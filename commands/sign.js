/* 
 * WORK IN PROGRESS
 * 
*/
module.exports = {
    'name': 'sign',
    async exec(msg, args, client) {
        global.db.on('error', err => {
            console.log('database: Connection error:', err)
            return 0
        })

        var guild = await global.db.get(msg.guild.id)
        if (!guild.owner) {
            guild.owner = msg.author.id
        } else {
            msg.author.send(`Хозяин бота на сервере \`${msg.guild.name}\` уже назначен!`)
            return 0
        }
        await global.db.set(msg.guild.id, guild)

        msg.author.send(`Вы назначены хозяином бота на сервере \`${msg.guild.name}!\``)
    }
}