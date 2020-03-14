module.exports = {
    "name": "trade",
    "description": "Для начала трейда, упомините партнера так: `!trade @partner`, где `@partner` ⏤ пользователь, с кем тогруетесь. Важно чтобы тот написал свою ссылку на трейд в трейд-канале.",
    async exec(input) {
        global.msg = input[0]
        msg.guild.channels.get('657862996403683328').fetchMessages()
            .then(async messages => {
                const open = require('open')

                messages = messages.array().reverse()

                var partnerId = global.msg.mentions.users.first().id
                for (m of messages) {
                    if (m.content.startsWith('https://steamcommunity.com/tradeoffer/new/?partner=') && m.author.id == partnerId) {
                        await open(m.content)
                        return 0
                    }
                }
            })
            .catch(e => {
                console.log(e)
            })
    }
}