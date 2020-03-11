module.exports = {
    "name": "initguild",
    async exec(msg, args, client) {
        console.log('dev: INITIALIZING GUILD INFO...')

        await global.db.set(msg.guild.id, {})

        console.log('dev: INITIALIZED GUILD INFO.')
    }
}