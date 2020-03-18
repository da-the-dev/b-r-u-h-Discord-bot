const Discord = require('discord.js')
module.exports = class DB {
    constructor() {
        this.keyv = require('keyv')
        this.db = new this.keyv(`mysql://${process.env.SQL_USER}:${process.env.SQL_SECRET}@${process.env.SQL_HOST}:3306/${process.env.SQL_DATABASE}`)
    }
    /**
     * @description Returns the current guild.
     * @param {Discord.Message} msg Message to get current guild's id.
     */
    static async getGuild(msg) {
        return await this.db.get(msg.guild.id)
    }

    /**
     * @description Adds data into current guild.
     * @param {Discord.Message} msg Message to get current guild's id.
     * @param {string} field In which field to add data.
     * @param {object} data Data to add.
     */
    static async addToGuild(msg, field, data) {
        let guild = await this.getGuild(msg)

        guild[field] = data

        await this.db.set(msg.guild.id, guild)
    }

    /**
     * @description Reset the guild.
     * @param {Discord.Message} msg Message to get current guild's id
     */
    static async initGuild(msg) {
        await this.db.set(msg.guild.id, {})
    }
}