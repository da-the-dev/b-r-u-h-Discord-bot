module.exports = {
    "name": "createdb",
    async exec(input) {
        const keyv = require('keyv')
        var db = new keyv(`mysql://${process.env.SQL_USER}:${process.env.SQL_SECRET}@${process.env.SQL_HOST}:3306/${process.env.SQL_DATABASE}`)
        console.log('dev: CREATING DB')

        await db.set('1', '1')
        await db.delete('!')

        console.log('dev: CREATED A DB.')
    }
}