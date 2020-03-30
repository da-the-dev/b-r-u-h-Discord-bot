const DB = require('../dbController.js')
const emojies = require('@da_dev/emojies')
const Discord = require('discord.js')
const hex_colors = require('hex_colors')
module.exports = {
    "name": "settings",
    "description": "",
    /**
     * 
     * @param {Discord.Message} msg Main message
     * @param {object} args 
     * @param {Discord.Client} client 
     */
    async exec(msg, args, client) {
        if (msg.author.id != await DB.getGuildField(msg, 'owner')) { //Checking if the user is an owner 
            return 0
        }
        global.msg = msg
        var embed = new Discord.RichEmbed() //Creating an embed message with the settings menu
            .setTitle('Настройки')
            .addField('**A**', "Установить канал для трейда.")
            .addField('**B**', "Установить категорию, в которой создавать группы пользователей.")
            .addField('**С**', "Установить новый префикс.")
            .setColor(hex_colors.Red)

        global.msg.reply(embed) //Replying with the settings menu
            .then(async message => {
                await message.react(emojies.a) //Reacting with all of the options from the settings menu
                await message.react(emojies.b)
                await message.react(emojies.c)

                message.awaitReactions((reaction, user) => user.id == global.msg.author.id, { maxEmojis: 1 }) //Collecting the reactioN from the owner
                    .then(async reactions => {
                        const ownId = msg.author.id
                        switch (reactions.first().emoji.name) {
                            case emojies.a:
                                msg.reply('отправь мне id кнала для трейда.')
                                    .then(question => {
                                        msg.channel.awaitMessages(msg => msg.author.id == ownId, { max: 1 })
                                            .then(async messages => {
                                                let idMessage = messages.first()
                                                await DB.addToGuild(msg, 'tradeChannel')
                                                msg.reply(`успешно установил новый канал для трейда!`)
                                                    .then(reply => {
                                                        msg.delete(2000)
                                                            .then(m => {
                                                                message.delete()
                                                                question.delete()
                                                                messages.first().delete()
                                                                reply.delete()
                                                            })
                                                    })
                                            })
                                    })
                                break;
                            case emojies.b:
                                msg.reply('отправь мне id категории для групп.')
                                    .then(question => {
                                        msg.channel.awaitMessages(msg => msg.author.id == ownId, { max: 1 })
                                            .then(async messages => {
                                                let idMessage = messages.first()
                                                await DB.addToGuild(msg, 'groupCategory')
                                                msg.reply(`успешно установил новую категорию для групп!`)
                                                    .then(reply => {
                                                        msg.delete(2000)
                                                            .then(m => {
                                                                message.delete()
                                                                question.delete()
                                                                messages.first().delete()
                                                                reply.delete()
                                                            })
                                                    })
                                            })
                                    })
                                break
                            case emojies.c:
                                msg.reply('отправь мне новый префикс.')
                                    .then(question => {
                                        msg.channel.awaitMessages(msg => msg.author.id == ownId, { max: 1 })
                                            .then(async messages => {
                                                let prefix = messages.first()
                                                console.log(prefix.content)
                                                await DB.addToGuild(msg, 'prefix', prefix.content)
                                                msg.reply(`успешно установил новый префикс!`)
                                                    .then(reply => {
                                                        msg.delete(2000)
                                                            .then(m => {
                                                                message.delete()
                                                                question.delete()
                                                                messages.first().delete()
                                                                reply.delete()
                                                            })
                                                    })
                                            })
                                    })
                            default:
                                break;
                        }
                    })
            })
    }
}