const mongoose = require('mongoose')


module.exports = async () => {

    const { NODE_ENV, MONGODB_TESTING, MONGODB_PRODUCTION } = process.env

    const conn = NODE_ENV === 'development' || NODE_ENV === 'testing' ? MONGODB_TESTING : MONGODB_PRODUCTION

    try {

        await mongoose.connect(conn, {
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
        })

        console.log('MongoDB Connected')

    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}






// const note = new Note({
//     content: 'Create gustoso app',
//     date: new Date(),
//     important: true
// })

// note.save().then(result => {

//     mongoose.connection.close()
// }).catch(console.error)