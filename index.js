const Discord = require('discord.js')
const fs = require('fs')
var client = new Discord.Client()
require('dotenv').config()
const token = process.env.TOKEN
const DB = require('./dbController.js')

// Regular command parsing
client.commands = new Array
fs.readdirSync(`${process.cwd()}/commands`).filter(f => !f.startsWith('_') && f.endsWith('.js')).forEach(f => {
    var command = require(`${process.cwd()}/commands/${f}`)
    client.commands.push(command)
})

// Dev command parsing
client._commands = new Array
fs.readdirSync(`${process.cwd()}/commands`).filter(f => f.startsWith('_') && f.endsWith('.js')).forEach(c => {
    client._commands.push(require(`${process.cwd()}/commands/${c}`))
})

client.login(token)

client.on('ready', () => {
    console.log("Ready")
})

/** 
 * @param {Discord.Message} msg
*/
client.on('message', async msg => {
    if (!client[msg.guild.id]) {
        client[msg.guild.id] = await DB.getGuildField(msg, 'prefix')
    }


    //Developer commands
    if (msg.content.startsWith('dev:') && msg.author.id == "315339158912761856") {
        client._commands.forEach(c => {
            if (c.name == msg.content.substring(4)) {
                c.exec(msg, args, client)
            }
        })
    }

    //Regular commands
    if (msg.content[0] == client[msg.guild.id] && !msg.author.bot) {
        var args = msg.content.trim().slice(1).split(' ')
        var command = args.shift()
        client.commands.forEach(c => {
            if (c.name == command) {
                c.exec(msg, args, client)
            }
        })
    }
})