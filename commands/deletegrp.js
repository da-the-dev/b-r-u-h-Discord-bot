module.exports = {
    "name": "delgrp",
    "description": "Удаляет команды созданные 'mkgrp'.",
    async exec(msg, args, client) {
        const keyv = require('keyv')

        const db = new keyv(`mysql://${process.env.SQL_USER}:${process.env.SQL_SECRET}@${process.env.SQL_HOST}:3306/${process.env.SQL_DATABASE}`)
        db.on('error', err => {
            console.log('database: Connection error:', err)
            return 0
        })

        var info = await db.get(msg.author.id)
        if (info) {
            await msg.guild.channels.get(info.textid).delete('Group deletion.')
                .then(channel => {
                    console.log("bot: User", msg.author.username, "deleted the TEXT channel of the group:", channel.id)
                })
            await msg.guild.channels.get(info.voiceid).delete('Group deletion')
                .then(channel => {
                    console.log("bot: User", msg.author.username, "deleted the VOICE channel of the group:", channel.id)
                })
        }
        await db.delete(msg.author.id)
    }
}