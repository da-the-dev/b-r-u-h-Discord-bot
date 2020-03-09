module.exports = {
    "name": "mkgrp",
    "description": "С помощью этой команды можно создать приватную/публичную группу с текстовым и голосвым каналами.",
    async exec(msg, args, client) {
        //Getting access to the database
        global.error = false
        const keyv = require('keyv')
        var db = new keyv(`mysql://${process.env.SQL_USER}:${process.env.SQL_SECRET}@${process.env.SQL_HOST}:3306/${process.env.SQL_DATABASE}`)
        db.on('error', err => {
            console.log('database: Connection error:', err)
            msg.reply("проблемы с подключением, попробуйте через 10-20 сек.")
            global.error = true
        })

        if (global.error) {
            return 0
        }

        //Get the guild info
        var guild = await db.get(msg.guild.id)
        if (guild[msg.author.id]) {
            await msg.reply("ты уже создал группу!")
            return 0
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
            parent: "685748399173271553",
            permissionOverwrites: permissionOverwritesText
        })
            .then((channel) => {
                console.log(`bot: User '${msg.author.username}' has CREATED the TEXT channel: ${channel.id}`)
                return channel.id
            })
            .catch((e) => {
                console.log(e)
                return 0
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
            userLimit: msg.mentions.users.array.length + 1,
            type: "voice",
            parent: "685748399173271553",
            permissionOverwrites: permissionOverwritesVoice
        })
            .then(channel => {
                console.log(`bot: User '${msg.author.username}' has CREATED the VOICE channel: ${channel.id}`)
                return channel.id
            })
            .catch(e => {
                console.log(e)
                return 0
            })

        //Setting the guild info with addition of new group owner
        guild[msg.author.id] = {
            'textid': textid,
            'voiceid': voiceid
        }
        await db.set(msg.guild.id, guild)

        msg.reply(`создана группа: ${name}!`)
    }
} 