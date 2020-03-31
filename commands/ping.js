module.exports = {
    "name": "ping",
    "description": "Показывает пинг бота",
    "onlyOwner": true,
    exec(msg, args, client) {
        msg.reply(`мой пинг: ${client.ping.toFixed(0)}.`)
        console.log(`мой пинг: ${client.ping.toFixed(0)}.`)
    }
}