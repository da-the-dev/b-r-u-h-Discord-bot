module.exports = {
    "name": "delgrp",
    "description": "Удаляет команды созданные 'mkgrp'.",
    async exec(input) {
        msg = input[0]
        global.db.on('error', err => {
            console.log('database: Connection error:', err)
            return 0
        })

        var guild = await global.db.get(msg.guild.id)
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

            delete guild[msg.author.id]
            await global.db.set(msg.guild.id, guild)

            msg.reply('группа успешно удалена!')
        }


    }
}