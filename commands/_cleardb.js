module.exports = {
    "name": "cleardb",
    exec(input) {
        const keyv = require('keyv')
        var db = new keyv(`mysql://${process.env.SQL_USER}:${process.env.SQL_SECRET}@${process.env.SQL_HOST}:3306/${process.env.SQL_USER}`)

        db.on()

        db.clear()
            .then(() => {
                console.log('dev: DATABASE CLEARED')
            })
    }
}