/* 
 * WORK IN PROGRESS
 * 
*/
module.exports = {
    'name': 'sign',
    async exec(input) {
        msg = input[0]
        const keyv = require('keyv')

        var db = new keyv(`mysql://${process.env.SQL_USER}:${process.env.SQL_SECRET}@${process.env.SQL_HOST}:3306/${process.env.SQL_DATABASE}`)

        db.on('error', err => {
            console.log('database: Connection error:', err)
            return 0
        })

        var guild = await db.get(msg.guild.id)
        if (!guild.owner) {
            guild.owner = msg.author.id
        } else {
            msg.author.send(`Хозяин бота на сервере \`${msg.guild.name}\` уже назначен!`)
            return 0
        }
        await db.set(msg.guild.id, guild)

        msg.author.send(`Вы назначены хозяином бота на сервере \`${msg.guild.name}!\``)
    }
}