const Discord = require('discord.js')
module.exports = {
    "name": "help",
    "description": "Присылает в личные сообщения информацию о всех командах.",
    exec(input) {
        // Custom sort func just to get more control
        var sortFunc = (a, b) => {
            if (a.name > b.name) return 1
            if (a.name < b.name) return -1
            return 0
        }

        msg = input[0]
        client = input[2]

        embed = new Discord.RichEmbed()
            .setTitle("Список команд")
            .setColor("#ff4040")

        // Sorting commands array and adding name and description to the field in embed
        client.commands.sort(sortFunc).forEach(c => {
            if (c.name != 'sign') {
                embed.addField(`**!${c.name}**`, c.description)
            }
        });

        msg.author.send(embed)
    }
}