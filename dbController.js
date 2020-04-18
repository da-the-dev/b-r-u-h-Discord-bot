const Discord = require('discord.js')
const keyv = require('keyv')
const db = new keyv(`mysql://${process.env.SQL_USER}:${process.env.SQL_SECRET}@${process.env.SQL_HOST}:3306/${process.env.SQL_DATABASE}`)
module.exports = class DB {
    /**
     * @description Returns the current guild data.
     * @param {Discord.Message} msg Message to get current guild's id.
     */
    static async getGuild(msg) {
        return await db.get(msg.guild.id)
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

        await db.set(msg.guild.id, guild)
    }

    /**
     * @description Reset the guild data.
     * @param {Discord.Message} msg Message to get current guild's id
     */
    static async initGuild(msg) {
        await db.set(msg.guild.id, { prefix: "~", repTable: {} })
    }

    /**
     * @description Clear the whole database completly
     */
    static async clearDB() {
        await db.clear()
    }
}