const DB = require('../dbController.js')
module.exports = {
    "name": "delgrp",
    "description": "Удаляет группы, созданные 'mkgrp'.",
    async exec(msg, args, client) {
        var guild = await DB.getGuild(msg)
        if (guild) {
            await msg.guild.channels.get(guild[msg.author.id].textid).delete('Group deletion.')
                .then(channel => {
                    console.log("bot: User", msg.author.username, "DELETED the TEXT channel of the group:", channel.id)
                })
                .catch(e => {
                    console.log(e)
                    return 0
                })
            await msg.guild.channels.get(guild[msg.author.id].voiceid).delete('Group deletion')
                .then(channel => {
                    console.log("bot: User", msg.author.username, "has DELETED the VOICE channel of the group:", channel.id)
                })
                .catch(e => {
                    console.log(e)
                    return 0
                })

            await DB.removeFromGuild(msg, msg.author.id)

            msg.reply('группа успешно удалена!')
        }
    }
}