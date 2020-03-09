module.exports = {
    "name": "delgrp",
    "description": "Удаляет команды созданные 'mkgrp'.",
    async exec(msg, args, client) {
        const keyv = require('keyv')

        var db = new keyv(`mysql://${process.env.SQL_USER}:${process.env.SQL_SECRET}@${process.env.SQL_HOST}:3306/${process.env.SQL_DATABASE}`)

        db.on('error', err => {
            console.log('database: Connection error:', err)
            return 0
        })

        var info = await db.get(msg.author.id)
        if (info) {
            await msg.guild.channels.get(info.textid).delete('Group deletion.')
                .then(channel => {
                    console.log("bot: User", msg.author.username, "DELETED the TEXT channel of the group:", channel.id)
                })
                .catch(e => {
                    console.log(e)
                    return 0
                })
            await msg.guild.channels.get(info.voiceid).delete('Group deletion')
                .then(channel => {
                    console.log("bot: User", msg.author.username, "has DELETED the VOICE channel of the group:", channel.id)
                })
                .catch(e => {
                    console.log(e)
                    return 0
                })
        }
        await db.delete(msg.author.id)

        msg.reply('группа успешно удалена!')
    }
}