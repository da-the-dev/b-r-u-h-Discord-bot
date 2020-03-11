module.exports = {
    "name": "cleardb",
    exec(input) {
        console.log('dev: CLEARING DB...')
        global.db.clear()
            .then(() => {
                console.log('dev: DATABASE CLEARED')
            })
    }
}