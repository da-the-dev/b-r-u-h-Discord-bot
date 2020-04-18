/*Command: [p]tournament create `name` @mentions
           [p]tournament assign judge `tournamentName` @mention
           [p]tournament winner `tournamentName` @mention
*/
const Discord = require('discord.js')
const DB = require('../dbController.js')
module.exports = {
    "name": "tournament",
    "description": ".",
    "onlyOwner": true,

    // Actual command handler
    /**
     * @param {Discord.Message} msg Main message
     * @param {object} args
     * @param {Discord.Client} client
     */
    async exec(msg, args, client) {
        if (!args[0]) {
            msg.reply('не хватает аргументов! (create, assign, winner)')
            return 0
        }
        switch (args[0]) {
            case 'create':
                var name = await this.createTournament(msg, args)

                if (name == false) return 0
                this.tournamentLaunch(msg, name, client)
                break
            case 'assign':  // !tournament assign `name` `whoToAssign` @user
                this.assign(msg, args[1], args[2], msg.mentions.users.first().id)
                break
            case 'winner':  // !tournament winner `name` @winner
                this.setWinner(msg, args[1], msg.mentions.users.first())
                break
        }
    },

    // Create a new tournament on the server
    // !tournament create `name` @mentions...
    /**
     * 
     * @param {Discord.Message} msg 
     * @param {*} args 
     */
    async createTournament(msg, args) {
        let tournamentName = args[1]
        let tournamentObj = {}

        let players = msg.mentions.users.array()

        if (players.length == 0 && !Number.isInteger(Math.log2(players.length))) {
            msg.reply('количество участников не является степенью двойки!')
            return false
        }

        var playersIds = []
        players.forEach(p => playersIds.push(p.id))

        tournamentObj.players = playersIds
        tournamentObj.judges = []

        await DB.addToGuild(msg, tournamentName, tournamentObj)
        msg.reply(`создал новый турнир \`${tournamentName}\`!`)
        return tournamentName
    },

    // Launch the created tournament
    /**
     * 
     * @param {Discord.Message} msg 
     * @param {Discord.Client} client
     */
    async tournamentLaunch(msg, tourName, client) {
        msg.guild.createChannel(tourName, { type: 'category' })
            .then(tourCategory => {
                msg.guild.createChannel('Таблица', { type: 'text', parent: tourCategory.id })
                    .then(async tableChannel => {
                        var temp = await DB.getGuildField(msg, tourName)
                        let players = temp['players']

                        playrs = this.shuffleArray(players)

                        var playerPairs = []

                        while (players.length) {
                            playerPairs.push(players.splice(0, 2))
                        }

                        var tourData = await DB.getGuildField(msg, tourName)
                        delete tourData.players
                        tourData.playerPairs = playerPairs
                        tourData.tableChannel = tableChannel.id

                        await DB.addToGuild(msg, tourName, tourData)

                        let table = new Discord.RichEmbed()
                            .setTitle('Таблица участников турнира ' + tourName)
                        playerPairs.forEach(pp => {
                            table.addField(client.users.get(pp[0]).username, client.users.get(pp[1]).username, true)
                        })

                        tableChannel.send(table)
                    })
            })
    },

    // !tournament assign `name` `whoToAssign` @user
    /**
     * 
     * @param {Discord.Message} msg Message to get the guild id
     * @param {string} tourName The name of the tournament
     * @param {string} whoToAssign Who to assign (judge, player)
     * @param {Discord.User} user User to assign
     */
    async assign(msg, tourName, whoToAssign, user) {
        let tourData = await DB.getGuildField(msg, tourName)
        switch (whoToAssign) {
            case 'judge':
                tourData.judges.push(user)
                await DB.addToGuild(msg, tourName, tourData)
                msg.reply(`установил нового судью \`${user.username}\` турнира \`${tourName}\``)
                break
            default:
                return 0
        }

    },

    // !tournament winner `name` @winner
    /**
     * @param {Discord.Message} msg 
     * @param {string} tourName 
     * @param {Discord.User} winner 
     * 
     * 
     */
    async setWinner(msg, tourName, winner) {
        let tourData = await DB.getGuildField(msg, tourName)
        if (!tourData['winners']) {
            tourData['winners'] = []
        }
        tourData['winners'].push(winner.id)

        await DB.addToGuild(msg, tourName, tourData)

        // console.log(tourData['playerPairs'].length, tourData['winners'].length)
        if (tourData['playerPairs'].length == tourData['winners'].length) {
            console.log('bot: new stage!')
            this.nextStage(msg, tourName)
        }
        msg.reply(`объявил нового победителя \`${winner.username}\` турнира \`${tourName}\`!`)
    },

    /**
     * 
     * @param {Discord.Message} msg 
     * @param {string} tourName 
     */
    async nextStage(msg, tourName) {
        let tourData = await DB.getGuildField(msg, tourName)

        let tempPlayers = tourData['winners']
        delete tourData['winners']

        this.shuffleArray(tempPlayers)
        while (tempPlayers.length) {
            tempPlayers.push(tempPlayers.splice(0, 2))
        }

        tourData['playerPairs'] = tempPlayers

        let table = new Discord.RichEmbed()
            .setTitle('Таблица участников турнира ' + tourName)
        tempPlayers.forEach(pp => {
            table.addField(client.users.get(pp[0]).username, client.users.get(pp[1]).username, true)
        })

        console.log(msg.guild.channels.get(tourData.tableChannel))

        await DB.addToGuild(msg, tourName)
    },

    shuffleArray(array) { // Technical stuff
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}