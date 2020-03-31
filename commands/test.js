module.exports = {
    "name": "test",
    "description": "Позволяет понять, работает ли сейчас бот.",
    'onlyOwner': true,
    exec(msg, args, client) {
        msg.reply('я здесь!')
    }
}