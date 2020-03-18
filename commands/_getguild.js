module.exports = {
    "name": "getguild",

    async exec(msg, args, client) {
        db.on('error', err => {
            console.log('database: Connection error:', err)
        })
        console.log('dev: GETTING GUILD INFO...')

        var guild = await global.db.get(msg.guild.id)

        console.log('dev: GOT GUILD INFO:', guild)
    }
}