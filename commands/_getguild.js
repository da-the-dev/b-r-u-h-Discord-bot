const Dbcontroller = require('../dbController.js')
module.exports = {
    "name": "getguild",
    async exec(msg, args, client) {
        console.log('dev: GETTING GUILD INFO...')

        var guild = await Dbcontroller.getGuild(msg)

        console.log('dev: GOT GUILD INFO:', guild)
    }
}