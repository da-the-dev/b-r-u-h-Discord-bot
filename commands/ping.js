module.exports = {
    "name": "ping",
    "description": "Показывает пинг бота",
    exec(msg, args, client) {
        msg.reply(`мой пинг: ${client.ping.toFixed(1)}.`)
        console.log(`мой пинг: ${client.ping.toFixed(1)}.`)
    }
}