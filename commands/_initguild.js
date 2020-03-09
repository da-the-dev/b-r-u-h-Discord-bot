module.exports = {
    "name": "initguild",
    async exec(msg, args, client) {
        const keyv = require('keyv')
        var db = new keyv(`mysql://${process.env.SQL_USER}:${process.env.SQL_SECRET}@${process.env.SQL_HOST}:3306/${process.env.SQL_DATABASE}`)
        console.log('dev: INITIALIZING GUILD INFO...')

        await db.set(msg.guild.id, {})

        console.log('dev: INITIALIZED GUILD INFO.')
    }
}