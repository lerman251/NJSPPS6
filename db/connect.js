const mongoose = require('mongoose')


const connectDB = (URL) => {
    return mongoose.connect(URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
}

module.exports = connectDB