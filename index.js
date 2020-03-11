const Discord = require('discord.js')
const fs = require('fs')
var client = new Discord.Client()
require('dotenv').config()
const keyv = require('keyv')
global.db = new keyv(`mysql://${process.env.SQL_USER}:${process.env.SQL_SECRET}@${process.env.SQL_HOST}:3306/${process.env.SQL_DATABASE}`)

const token = process.env.TOKEN

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

client.on('message', async msg => {
    //Developer commands
    if (msg.content.startsWith('dev:') && msg.author.id == "315339158912761856") {
        client._commands.forEach(c => {
            if (c.name == msg.content.substring(4)) {
                c.exec(msg, args, client)
                msg.delete()
            }
        })
    }
    //Regular commands
    if (msg.content[0] === '!' && !msg.author.bot) {
        var args = msg.content.trim().slice(1).split(' ')
        var command = args.shift()
        client.commands.forEach(c => {
            if (c.name == command) {
                c.exec([msg, args, client])
            }
        })
    }
})