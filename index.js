const Discord = require('discord.js')
const fs = require('fs')
var client = new Discord.Client()

require('dotenv').config()

const token = process.env.TOKEN

client.commands = new Array
fs.readdirSync(`${process.cwd()}/commands`).filter(f => f.endsWith('js')).forEach(f => {
    var command = require(`${process.cwd()}/commands/${f}`)
    client.commands.push(command)
})

client.login(token)

client.on('ready', () => {
    console.log("Ready")
})

client.on('message', async msg => {
    if (msg.content == "!dev:cleardb" && msg.author.id == "315339158912761856") {
        const keyv = require('keyv')

        const db = new keyv(`mysql://${process.env.SQL_USER}:${process.env.SQL_SECRET}@${process.env.SQL_HOST}:3306/${process.env.SQL_USER}`)
        db.on('error', err => {
            console.log('Connection error:', err)
        })

        await db.clear()
            .then(() => {
                console.log("DB CLEARED")
            })
    }
    if (msg.content[0] === '!' && !msg.author.bot) {
        var args = msg.content.trim().slice(1).split(' ')
        var command = args.shift()

        client.commands.forEach(c => {
            if (c.name == command) {
                c.exec(msg, args, client)
            }
        })
    }
})