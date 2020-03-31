/*Command: [p]tournament create 
           [p]tournament assign judge `tournamentName` @mention
           [p]tournament winner `tournamentName` @mention
*/
const Discord = require('discord.js')
const DB = require('../dbController.js')
module.exports = {
    "name": "tournament",
    "description": ".",
    "onlyOwner": true,

    shuffleArray(array) { // Technical stuff
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
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
        return tournamentName
    },

    async assign(tourName, whoToAssign, user) {
        tourData = await DB.getGuildField(tourName)
        switch (whoToAssign) {
            case 'judge':
                tourData.judges.push(user)
                break
            default:
                return 0
        }

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
                        console.log(playerPairs)
                        var tourData = await DB.getGuildField(msg, tourName)
                        delete tourData.players
                        tourData.playerPairs = playerPairs

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

    // Actual command handler
    /**
     *
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
                console.log(name)
                if (name == false) return 0
                this.tournamentLaunch(msg, name, client)

                break
            case 'assign':
                this.assign(args[3], args[1], msg.mentions.users.first().id)
                break
            case 'winner':
                if (await DB.getGuildField()) {
                    msg.reply('еще никакой турнир не начат!')
                }
        }
    }
}