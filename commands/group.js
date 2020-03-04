module.exports = {
    "name": "mkgrp",
    "description": "С помощью этой команды можно создать приватную/публичную группу с текстовым и голосвым каналами.",
    async exec(msg, args, client) {
        const db = require('better-sqlite3')('data.db', { verbose: console.log })

        var grpWasCreated = false
        var rows = db.prepare('select * from gropowners').all()

        for (let i = 0; i < rows.length; i++) {
            if (rows[i].ownersid == msg.author.id) {
                console.log("Error: grop was already created by the user")
                msg.reply('ты уже создал группу!')
                return 0
            }
        }

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
        var textid = await msg.guild.createChannel(name, {
            userLimit: 5,
            type: "text",
            parent: "681160371595509762",
            permissionOverwrites: permissionOverwritesText
        })
            .then((channel) => {
                //channel.send("все, охапка дров, канал готов.")
                return channel.id
            })
            .catch((e) => {
                console.log(e)
            })

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
                allow: ['VIEW_CHANNEL', 'SPEAK', 'CONNECT'],
            })
        });

        // Create this voice channel
        var voiceid = await msg.guild.createChannel(name, {
            userLimit: 5,
            type: "voice",
            parent: "681160371595509762",
            permissionOverwrites: permissionOverwritesVoice
        }).then(channel => {
            return channel.id
        })

        db.prepare(`insert into gropowners(ownersid, textid, voiceid) 
                    values (${msg.author.id},${textid},${voiceid});`).run()

    }
} 