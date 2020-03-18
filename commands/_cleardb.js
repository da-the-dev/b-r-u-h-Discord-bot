const Dbcontroller = require('../dbController.js')
module.exports = {
    "name": "cleardb",
    exec(msg, args, client) {
        console.log('dev: CLEARING DB...')
        Dbcontroller.clearDB()
            .then(() => {
                console.log('dev: DATABASE CLEARED')
            })
    }
}