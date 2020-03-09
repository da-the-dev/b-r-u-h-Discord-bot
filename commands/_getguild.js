module.exports = {
    "name": "getguild",
    async exec(msg, args, client) {
        global.error = false
        const keyv = require('keyv')
        var db = new keyv(`mysql://${process.env.SQL_USER}:${process.env.SQL_SECRET}@${process.env.SQL_HOST}:3306/${process.env.SQL_DATABASE}`)
        db.on('error', err => {
            console.log('database: Connection error:', err)
            global.error = true
        })

        if (global.error) {
            return 0
        }

        console.log('dev: GETTING GUILD INFO...')

        var guild = await db.get(msg.guild.id, {})

        console.log('dev: GOT GUILD INFO:', guild)
    }
}