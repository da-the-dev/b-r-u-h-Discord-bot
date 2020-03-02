global.test = new Number
module.exports = {
    "name": "mkgrp",
    "description": "С помощью этой команды можно создать приватную/публичную группу с текстовым и голосвым каналами.",
    exec(msg, args, client) {
        // Text permissions base
        let permissionOverwritesText = [
            {
                id: msg.guild.id,
                deny: ["SEND_MESSAGES", "VIEW_CHANNEL"],
            },
            {
                id: msg.author.id,
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
            }
        ]

        // Text permissions are updated for mentioned users
        let name = args.shift()
        msg.mentions.users.array().forEach(u => {
            permissionOverwritesText.push({
                id: u.id,
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
            })
        });

        // Create this text channel
        msg.guild.createChannel(name, {
            userLimit: 5,
            type: "text",
            parent: 681160371595509762,
            permissionOverwrites: permissionOverwritesText
        })
            .then((channel) => {
                channel.send("все, охапка дров, канал готов.")
                global.test = channel.id
            })
            .catch((e) => {
                console.log(e)
            })
        console.log(global.test)
        // Voice permissions base
        let permissionOverwritesVoice = [
            {
                id: msg.guild.id,
                deny: ['VIEW_CHANNEL', 'SPEAK', 'CONNECT']
            },
            {
                id: msg.author.id,
                allow: ['VIEW_CHANNEL', 'SPEAK', 'CONNECT']
            }
        ]

        // Voice permissions are updated for mentioned users
        msg.mentions.users.array().forEach(u => {
            permissionOverwritesVoice.push({
                id: u.id,
                allow: ['VIEW_CHANNEL', 'SPEAK', 'CONNECT']
            })
        });

        // Create this voice channel
        msg.guild.createChannel(name, {
            userLimit: 5,
            type: "voice",
            parent: 681160371595509762,
            permissionOverwrites: permissionOverwritesVoice
        })
    }
}