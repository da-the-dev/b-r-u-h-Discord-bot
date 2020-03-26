const DB = require('../dbController.js')
const emojies = require('emojies')
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
            .addField('Установить канал для трейда', ".")
            .addField()
            .setColor(hex_colors.Red)

        global.msg.reply(embed) //Replying with the settings menu
            .then(async message => {
                await message.react(emojies.a) //Reacting with all of the options from the settings menu
                await message.react(emojies.b)

                message.awaitReactions((reaction, user) => user.id == global.msg.author.id, { maxEmojis: 1 }) //Collecting the reactioN from the owner
                    .then(reactions => {
                        switch (reactions.first().emoji.name) {
                            case emojies.a:
                                msg.reply('отправьте мне id канала для трейда.') //Responding with request to send the id of the trade channel
                                    .then(setting => {
                                        setting.channel.awaitMessages(m => m.author.id == msg.author.id, { max: 1 }) //Collecting messagE in the channel
                                            .then(async messages => {
                                                let msgg = messages.first() //Setting the 'tradeChannel' to the id in the owner's responce
                                                await DB.addToGuild(global.msg, 'tradeChannel', msgg.content)
                                                messages.first().reply(`успешно установил канал для трейда на \`${msgg.guild.channels.get(msgg.content).name}\`!`)
                                            })
                                    })
                                break;
                            case emojies.b:
                                msg.reply('отправьте мне id категории для групп.') //Responding with request to send the id of the trade channel
                                    .then(setting => {
                                        setting.channel.awaitMessages(m => m.author.id == msg.author.id, { max: 1 }) //Collecting messagE in the channel
                                            .then(async messages => {
                                                let msgg = messages.first() //Setting the 'tradeChannel' to the id in the owner's responce
                                                await DB.addToGuild(global.msg, 'groupCategory', msgg.content)
                                                messages.first().reply(`успешно установил категорию для групп на \`${msgg.guild.channels.get(msgg.content).name}\`!`)
                                            })
                                    })
                            default:
                                break;
                        }
                    })
            })
    }
}