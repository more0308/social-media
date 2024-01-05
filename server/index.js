(async () => {
    try {
        const {MongoWrapper} = require('./mongo-wrapper')
        console.log(MongoWrapper.checkConnection)

        await MongoWrapper.init('mongodb://mongo/test', {connectTimeoutMS: 200})
    } catch (e) {
        console.log(e)
    }
})()
