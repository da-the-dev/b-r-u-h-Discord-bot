const Discord = require('discord.js')
module.exports = class DB {
    static keyv = require('keyv')
    static db = new DB.keyv(`mysql://${process.env.SQL_USER}:${process.env.SQL_SECRET}@${process.env.SQL_HOST}:3306/${process.env.SQL_DATABASE}`)
    /**
     * @description Returns the current guild data.
     * @param {Discord.Message} msg Message to get current guild's id.
     */
    static async getGuild(msg) {
        return await DB.db.get(msg.guild.id)
    }

    /**
     * @description Get a specific field from the guild data
     * @param {Discord.Message} msg Message to get current guild's id.
     * @param {any} field Field to return
     */
    static async getGuildField(msg, field) {
        var guild = await DB.getGuild(msg)
        return guild[field]
    }


    /**
     * @description Adds data into current guild data.
     * @param {Discord.Message} msg Message to get current guild's id.
     * @param {string} field In which field to add data.
     * @param {object} data Data to add.
     */
    static async addToGuild(msg, field, data) {
        let guild = await DB.getGuild(msg)

        guild[field] = data

        await DB.db.set(msg.guild.id, guild)
    }

    /**
     * @description Remove a field from guild data.
     * @param {Discord.Message} msg Message to get current guild's id.
     * @param {string} field Field to delete from the guild data.
     */
    static async removeFromGuild(msg, field) {
        let guild = await DB.getGuild(msg)
        delete guild[field]
        DB.db.set(msg.guild.id)
    }

    /**
     * @description Reset the guild data.
     * @param {Discord.Message} msg Message to get current guild's id
     */
    static async initGuild(msg) {
        await DB.db.set(msg.guild.id, { prefix: "." })
    }

    /**
     * @description Clear the whole database completly
     */
    static async clearDB() {
        await DB.db.clear()
    }
}