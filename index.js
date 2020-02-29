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

client.on('message', msg => {
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