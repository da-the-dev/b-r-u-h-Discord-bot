module.exports = {
    "name": "ping",
    "description": "Показывает пинг бота",
    exec(input) {
        msg = input[0]
        msg.reply(`мой пинг: ${client.ping.toFixed(0)}.`)
        console.log(`мой пинг: ${client.ping.toFixed(0)}.`)
    }
}