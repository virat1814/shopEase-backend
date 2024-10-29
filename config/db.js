const mongoose = require('mongoose')
require('dotenv').config();

const mongodb = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Mongodb connected')
    } catch(error){
        console.log('Mongodb connection error:', error)
    }
}

module.exports = mongodb;