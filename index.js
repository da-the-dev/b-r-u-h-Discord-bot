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
    // Get guild data
    let guild = await DB.getGuild(msg)
        .catch(e => {
            console.log(e)
        })

    // DEBUG
    // guild == null ? console.log('bot: guild data is non-existant') : console.log('bot: guild data exists')
    // END DEBUG

    // Init guild data if doesn't exist
    if (!guild) {
        console.log('bot: No db detected! Initialising guild data...')
        await DB.initGuild(msg)
            .catch(e => {
                console.log(e)
            })
    }
    let prefix = guild['prefix']

    // DEBUG
    if (!guild.owner) {
        console.group()
        console.log(`bot: no owner is set on the server \"${msg.guild.name}\"`)
        console.groupEnd()
    } else {
        console.group()
        console.log(`bot: owner's id: ${guild.owner}; msger's id: ${msg.author.id}`)
        guild.owner == msg.author.id ? console.log('bot: they are the same') : console.log('bot: they are different')
        console.groupEnd()
    }
    // END DEBUG

    //Developer commands
    if (msg.content.startsWith('dev:') && msg.author.id == "315339158912761856") {
        let args = msg.content.substr(4).trim().split(' ')
        let command = args.shift()

        console.log(`debug: command ${command}, args ${args}`)
        client._commands.forEach(c => {
            if (c.name == command) {
                c.exec(msg, args, client)
                msg.delete()
            }
        })
    }

    //Regular commands
    if (msg.content[0] == prefix && !msg.author.bot) {
        var args = msg.content.trim().slice(1).split(' ')
        var command = args.shift()
        console.log(`bot: the command is: \'${command}\'`)
        console.log(`bot: the args are: \'${args}\'`)
        client.commands.forEach(c => {
            if (c.name == command) {
                c.ownerOnly ? console.log('bot: this command is \'onlyOnwer\'') : console.log('bot: this command is not \'onlyOnwer\'')
                if (c.onlyOwner)
                    if (msg.author.id == guild.owner) {
                        console.log('bot: executing \'onlyOwner\' command...')
                        c.exec(msg, args, client)
                        return 0
                    }
                c.exec(msg, args, client)
            }

        })
    }

    guild.repTable[msg.author.id] += 1

    await DB.addToGuild(msg, 'repTable', guild.repTable)
})