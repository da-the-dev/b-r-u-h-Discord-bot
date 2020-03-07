module.exports = {
    "name": "trade",
    "description": "Позволяет трейдиться с другими. (в разработке)",
    exec(input) {
        const SteamAPI = require('steamapi')
        const steam = new SteamAPI(process.env.SQL_STEAMAPI_TOKEN)
        msg = input[0]
    }
}
