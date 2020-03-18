module.exports = {
    "name": "cleardb",
    exec(msg, args, client) {
        console.log('dev: CLEARING DB...')
        global.db.clear()
            .then(() => {
                console.log('dev: DATABASE CLEARED')
            })
    }
}