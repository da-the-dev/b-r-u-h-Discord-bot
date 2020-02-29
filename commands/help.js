const Discord = require('discord.js')
module.exports = {
    "name": "!help", //Added extra ! to not yet give access to incomple '!mkgrp'
    "description": "Присылает в личные сообщения информацию о всех командах.",
    exec(msg, args, client) {
        embed = new Discord.RichEmbed()
            .setTitle("Список команд")
            .setColor("#ff4040")
        client.commands.forEach(c => {
            embed.addField(`**!${c.name}**`, c.description)
        })
        msg.author.send(embed)
    }
}